<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use App\Models\Cause;
use App\Models\Donation;
use App\Models\NewsletterSubscriber;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CmsApiController extends Controller
{
    public function health(): JsonResponse
    {
        return response()->json([
            'status' => 'ok',
            'service' => 'Charitize Laravel Headless CMS API',
            'causes_count' => Cause::query()->where('is_active', true)->count(),
            'team_count' => TeamMember::query()->where('is_active', true)->count(),
        ]);
    }

    public function about(): JsonResponse
    {
        $about = AboutContent::query()->first();

        if (! $about) {
            return response()->json(['message' => 'About content not found'], 404);
        }

        return response()->json($this->formatAbout($about));
    }

    public function updateAbout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:120',
            'heading' => 'sometimes|string|max:255',
            'image' => 'sometimes|string|max:255',
            'alt' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'founder_name' => 'sometimes|string|max:120',
            'founder_role' => 'sometimes|string|max:120',
            'founder_bio' => 'sometimes|string',
            'mission_title' => 'sometimes|string|max:120',
            'mission_description' => 'sometimes|string',
            'mission_points' => 'sometimes|array',
            'callout_text' => 'sometimes|string',
            'callout_button_text' => 'sometimes|string|max:80',
        ]);

        $about = AboutContent::query()->firstOrFail();
        $about->update($validated);

        return response()->json($this->formatAbout($about->fresh()));
    }

    public function causes(): JsonResponse
    {
        $causes = Cause::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return response()->json($causes);
    }

    public function storeCause(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'raised' => 'integer|min:0',
            'goal' => 'required|integer|min:1',
            'img_src' => 'nullable|string|max:255',
            'description' => 'required|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $cause = Cause::query()->create($validated);

        return response()->json($cause, 201);
    }

    public function updateCause(Request $request, Cause $cause): JsonResponse
    {
        $validated = $request->validate([
            'category' => 'sometimes|string|max:100',
            'title' => 'sometimes|string|max:255',
            'raised' => 'sometimes|integer|min:0',
            'goal' => 'sometimes|integer|min:1',
            'img_src' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'is_active' => 'sometimes|boolean',
            'sort_order' => 'sometimes|integer|min:0',
        ]);

        $cause->update($validated);

        return response()->json($cause->fresh());
    }

    public function destroyCause(Cause $cause): JsonResponse
    {
        $cause->delete();

        return response()->json(['deleted' => true]);
    }

    public function team(): JsonResponse
    {
        $members = TeamMember::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return response()->json($members);
    }

    public function storeTeamMember(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'role' => 'required|string|max:150',
            'title' => 'nullable|string|max:100',
            'image' => 'nullable|string|max:255',
            'is_lead' => 'boolean',
            'bio' => 'required|string',
            'badges' => 'nullable|array',
            'social' => 'nullable|array',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        $member = TeamMember::query()->create($validated);

        return response()->json($member, 201);
    }

    public function updateTeamMember(Request $request, TeamMember $teamMember): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:150',
            'role' => 'sometimes|string|max:150',
            'title' => 'nullable|string|max:100',
            'image' => 'sometimes|string|max:255',
            'is_lead' => 'sometimes|boolean',
            'bio' => 'sometimes|string',
            'badges' => 'nullable|array',
            'social' => 'nullable|array',
            'sort_order' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $teamMember->update($validated);

        return response()->json($teamMember->fresh());
    }

    public function destroyTeamMember(TeamMember $teamMember): JsonResponse
    {
        $teamMember->delete();

        return response()->json(['deleted' => true]);
    }

    public function donations(): JsonResponse
    {
        return response()->json(
            Donation::query()->latest()->limit(50)->get()
        );
    }

    public function storeDonation(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'cause_id' => 'nullable|integer|exists:causes,id',
            'cause_title' => 'nullable|string|max:255',
            'donor_name' => 'required|string|max:150',
            'donor_email' => 'required|email|max:255',
            'amount' => 'required|numeric|min:1',
            'payment_intent_id' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:50',
        ]);

        $cause = null;
        if (! empty($validated['cause_id'])) {
            $cause = Cause::query()->find($validated['cause_id']);
        } elseif (! empty($validated['cause_title'])) {
            $cause = Cause::query()->where('title', $validated['cause_title'])->first();
        }

        if ($cause) {
            $validated['cause_id'] = $cause->id;
            $validated['cause_title'] = $cause->title;
            $cause->increment('raised', (int) round($validated['amount']));
        }

        $donation = Donation::query()->create($validated);

        return response()->json([
            'donation' => $donation,
            'updated_cause' => $cause?->fresh(),
        ], 201);
    }

    public function subscribeNewsletter(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $subscriber = NewsletterSubscriber::query()->firstOrCreate([
            'email' => strtolower(trim($validated['email'])),
        ]);

        return response()->json([
            'subscribed' => true,
            'subscriber' => $subscriber,
        ], 201);
    }

    private function formatAbout(AboutContent $about): array
    {
        return [
            'title' => $about->title,
            'heading' => $about->heading,
            'image' => $about->image,
            'alt' => $about->alt,
            'description' => $about->description,
            'founder' => [
                'name' => $about->founder_name,
                'role' => $about->founder_role,
                'bio' => $about->founder_bio,
            ],
            'mission' => [
                'title' => $about->mission_title,
                'description' => $about->mission_description,
                'points' => $about->mission_points ?? [],
            ],
            'donationCallout' => [
                'text' => $about->callout_text,
                'buttonText' => $about->callout_button_text,
                'buttonLink' => '#donate',
            ],
        ];
    }
}

