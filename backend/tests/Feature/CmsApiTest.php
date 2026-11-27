<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\CmsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CmsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_cms_endpoints_and_dashboard_return_seeded_data(): void
    {
        $this->seed(CmsSeeder::class);

        $this->getJson('/api/cms/health')
            ->assertOk()
            ->assertJson([
                'status' => 'ok',
                'causes_count' => 3,
                'team_count' => 6,
            ]);

        $this->getJson('/api/cms/about')
            ->assertOk()
            ->assertJsonPath('founder.name', 'Andre Macapinlac');

        $this->getJson('/api/cms/causes')
            ->assertOk()
            ->assertJsonCount(3);

        $this->getJson('/api/cms/team')
            ->assertOk()
            ->assertJsonCount(6);

        $this->postJson('/api/cms/donations', [
            'cause_title' => 'Community Food Drives',
            'donor_name' => 'Test Donor',
            'donor_email' => 'donor@example.com',
            'amount' => 50,
        ])->assertCreated()
            ->assertJsonPath('updated_cause.raised', 4300);

        $this->postJson('/api/cms/newsletter', [
            'email' => 'subscriber@example.com',
        ])->assertCreated()
            ->assertJson(['subscribed' => true]);

        $this->get('/')->assertRedirect('/admin');
        $this->get('/admin')->assertRedirect('/admin/login');

        $admin = User::query()->where('email', 'admin@charitize.org')->firstOrFail();

        $this->get('/admin/login')->assertOk();

        $this->actingAs($admin)
            ->get('/admin')
            ->assertOk()
            ->assertSee('Charitize CMS');

        $this->actingAs($admin)
            ->get('/admin/causes')
            ->assertOk();

        $this->actingAs($admin)
            ->get('/admin/causes/1/edit')
            ->assertOk();

        $this->actingAs($admin)
            ->get('/admin/team-members')
            ->assertOk();

        $this->actingAs($admin)
            ->get('/admin/team-members/1/edit')
            ->assertOk();

        $this->actingAs($admin)
            ->get('/admin/about-contents/1/edit')
            ->assertOk();

        $this->actingAs($admin)
            ->get('/admin/donations')
            ->assertOk();

        $this->actingAs($admin)
            ->get('/admin/newsletter-subscribers')
            ->assertOk();
    }
}

