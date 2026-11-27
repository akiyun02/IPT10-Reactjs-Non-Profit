<?php

namespace App\Http\Controllers;

use App\Models\AboutContent;
use App\Models\Cause;
use App\Models\Donation;
use App\Models\NewsletterSubscriber;
use App\Models\TeamMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CmsAdminController extends Controller
{
    public function index(): View
    {
        return view('cms.dashboard', [
            'about' => AboutContent::query()->first(),
            'causes' => Cause::query()->orderBy('sort_order')->orderBy('id')->get(),
            'members' => TeamMember::query()->orderBy('sort_order')->orderBy('id')->get(),
            'donations' => Donation::query()->latest()->limit(20)->get(),
            'subscribers' => NewsletterSubscriber::query()->latest()->limit(20)->get(),
            'totalDonated' => (float) Donation::query()->sum('amount'),
        ]);
    }

    public function updateAbout(Request $request): RedirectResponse
    {
        $about = AboutContent::query()->firstOrFail();

        $points = array_values(array_filter(array_map(
            'trim',
            explode("\n", (string) $request->input('mission_points_text', ''))
        )));

        $about->update([
            'title' => $request->input('title', 'About'),
            'heading' => $request->input('heading', $about->heading),
            'description' => $request->input('description', $about->description),
            'founder_name' => $request->input('founder_name', $about->founder_name),
            'founder_role' => $request->input('founder_role', $about->founder_role),
            'founder_bio' => $request->input('founder_bio', $about->founder_bio),
            'mission_title' => $request->input('mission_title', $about->mission_title),
            'mission_description' => $request->input('mission_description', $about->mission_description),
            'mission_points' => $points ?: $about->mission_points,
            'callout_text' => $request->input('callout_text', $about->callout_text),
        ]);

        return back()->with('status', 'About & Mission content updated in database!');
    }

    public function storeCause(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'raised' => 'required|integer|min:0',
            'goal' => 'required|integer|min:1',
            'img_src' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $validated['sort_order'] = (Cause::query()->max('sort_order') ?? 0) + 1;
        Cause::query()->create($validated);

        return back()->with('status', 'New cause added to database!');
    }

    public function updateCause(Request $request, Cause $cause): RedirectResponse
    {
        $validated = $request->validate([
            'category' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'raised' => 'required|integer|min:0',
            'goal' => 'required|integer|min:1',
            'description' => 'required|string',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active');
        $cause->update($validated);

        return back()->with('status', "Cause \"{$cause->title}\" updated!");
    }

    public function destroyCause(Cause $cause): RedirectResponse
    {
        $cause->delete();

        return back()->with('status', 'Cause removed.');
    }

    public function storeTeamMember(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'role' => 'required|string|max:150',
            'title' => 'nullable|string|max:100',
            'image' => 'required|string|max:255',
            'bio' => 'required|string',
            'badges_csv' => 'nullable|string',
            'email' => 'nullable|string|max:255',
        ]);

        $badges = array_values(array_filter(array_map(
            'trim',
            explode(',', (string) ($validated['badges_csv'] ?? ''))
        )));

        TeamMember::query()->create([
            'name' => $validated['name'],
            'role' => $validated['role'],
            'title' => $validated['title'],
            'image' => $validated['image'],
            'bio' => $validated['bio'],
            'badges' => $badges,
            'social' => array_filter([
                'email' => ! empty($validated['email']) ? 'mailto:' . $validated['email'] : null,
            ]),
            'sort_order' => (TeamMember::query()->max('sort_order') ?? 0) + 1,
            'is_active' => true,
        ]);

        return back()->with('status', 'Team member added!');
    }

    public function updateTeamMember(Request $request, TeamMember $teamMember): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'role' => 'required|string|max:150',
            'title' => 'nullable|string|max:100',
            'bio' => 'required|string',
            'badges_csv' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $badges = array_values(array_filter(array_map(
            'trim',
            explode(',', (string) ($validated['badges_csv'] ?? ''))
        )));

        $teamMember->update([
            'name' => $validated['name'],
            'role' => $validated['role'],
            'title' => $validated['title'],
            'bio' => $validated['bio'],
            'badges' => $badges,
            'is_active' => $request->boolean('is_active'),
        ]);

        return back()->with('status', "Team member \"{$teamMember->name}\" updated!");
    }

    public function destroyTeamMember(TeamMember $teamMember): RedirectResponse
    {
        $teamMember->delete();

        return back()->with('status', 'Team member removed.');
    }
}

