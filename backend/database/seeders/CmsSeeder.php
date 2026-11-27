<?php

namespace Database\Seeders;

use App\Models\AboutContent;
use App\Models\Cause;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CmsSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@charitize.org'],
            [
                'name' => 'Andre Macapinlac',
                'password' => Hash::make('password'),
            ]
        );
        AboutContent::query()->updateOrCreate(
            ['id' => 1],
            [
                'title' => 'About',
                'heading' => 'Join Hands, Change the World',
                'image' => '/img/about.jpg',
                'alt' => 'About Charitize Non-Profit Organization',
                'description' => 'Charitize is an independent non-profit initiative dedicated to uplifting underprivileged communities through direct action and technology. We believe that with dedication, empathy, and transparent solutions, we can spark lasting, meaningful impact. Every hand extended in kindness brings us closer to a world where everyone has the opportunity to thrive.',
                'founder_name' => 'Andre Macapinlac',
                'founder_role' => 'Founder & Lead Developer',
                'founder_bio' => 'Charitize was founded to streamline charitable aid using modern web technology. By maintaining a lean, transparent operation, we ensure that resources go straight to communities in need without unnecessary overhead.',
                'mission_title' => 'Our Mission',
                'mission_description' => 'Our mission is to uplift underprivileged communities by providing nutritious food, educational resources, and clean water access through transparent, community-centered initiatives.',
                'mission_points' => [
                    'Nutritious food assistance so no family goes to bed hungry.',
                    'Educational supplies and school kits for underprivileged youths.',
                    '100% transparent and accountable community-first operation.',
                ],
                'callout_text' => 'Every contribution fuels immediate aid, warm meals, and school essentials for families in need.',
                'callout_button_text' => 'Donate Now',
            ]
        );

        $causes = [
            [
                'category' => 'Nutrition',
                'title' => 'Community Food Drives',
                'raised' => 4250,
                'goal' => 5000,
                'img_src' => '/img/donation-1.jpg',
                'description' => 'Providing fresh, nutritious food baskets, warm meals, and pantry staples to vulnerable children and low-income families.',
                'sort_order' => 1,
            ],
            [
                'category' => 'Clean Water',
                'title' => 'Clean Water & Sanitation',
                'raised' => 2850,
                'goal' => 3000,
                'img_src' => '/img/donation-2.jpg',
                'description' => 'Distributing water filtration systems and sanitation hygiene kits to community centers lacking safe drinking water.',
                'sort_order' => 2,
            ],
            [
                'category' => 'Education',
                'title' => 'Youth School Supplies',
                'raised' => 3750,
                'goal' => 5000,
                'img_src' => '/img/donation-3.jpg',
                'description' => 'Equipping underprivileged elementary and high school students with backpacks, notebooks, uniforms, and learning tools.',
                'sort_order' => 3,
            ],
        ];

        if (Cause::query()->count() === 0) {
            foreach ($causes as $cause) {
                Cause::query()->create($cause);
            }
        }

        $members = [
            [
                'name' => 'Andre Macapinlac',
                'role' => 'Project Lead & Full-Stack Developer',
                'title' => 'Lead Dev',
                'image' => '/img/team-1.jpg',
                'is_lead' => true,
                'bio' => 'Leads the overall architecture of the Charitize platform, integrating the React TypeScript frontend, Laravel Headless CMS API, and Stripe checkout workflows.',
                'badges' => ['Project Lead', 'Full-Stack', 'System Architecture'],
                'social' => [
                    'github' => 'https://github.com/akiyun02',
                    'email' => 'mailto:Bacron07@gmail.com',
                    'facebook' => 'https://facebook.com',
                    'twitter' => 'https://x.com',
                ],
                'sort_order' => 1,
            ],
            [
                'name' => 'Sofia Alvarez',
                'role' => 'UI/UX Designer & Frontend Developer',
                'title' => 'Frontend',
                'image' => '/img/team-2.jpg',
                'is_lead' => false,
                'bio' => 'Designs responsive interfaces, page layouts, and interactive components in React and Bootstrap to ensure a clean, accessible donor experience.',
                'badges' => ['React & TypeScript', 'UI/UX Design', 'Responsive CSS'],
                'social' => [
                    'email' => 'mailto:sofia.alvarez@example.com',
                    'facebook' => 'https://facebook.com',
                    'twitter' => 'https://x.com',
                ],
                'sort_order' => 2,
            ],
            [
                'name' => 'Marcus Vance',
                'role' => 'Backend & Laravel API Engineer',
                'title' => 'Backend',
                'image' => '/img/team-3.jpg',
                'is_lead' => false,
                'bio' => 'Builds and maintains the Laravel headless REST API, Filament admin dashboard, and Stripe payment intent endpoints powering dynamic site content.',
                'badges' => ['Laravel 13', 'REST API', 'Filament CMS'],
                'social' => [
                    'email' => 'mailto:marcus.vance@example.com',
                    'twitter' => 'https://x.com',
                ],
                'sort_order' => 3,
            ],
            [
                'name' => 'Elena Ramirez',
                'role' => 'Database & Data Modeling Engineer',
                'title' => 'Database',
                'image' => '/img/team-4.jpg',
                'is_lead' => false,
                'bio' => 'Designs relational database schemas, migrations, and seeders for causes, team profiles, donations, and newsletter records with full data integrity.',
                'badges' => ['SQLite / MySQL', 'Eloquent ORM', 'Schema Design'],
                'social' => [
                    'email' => 'mailto:elena.ramirez@example.com',
                    'facebook' => 'https://facebook.com',
                ],
                'sort_order' => 4,
            ],
            [
                'name' => 'David Chen',
                'role' => 'Payment Security & DevOps Engineer',
                'title' => 'Security',
                'image' => '/img/team-5.jpg',
                'is_lead' => false,
                'bio' => 'Configures CORS policies, environment secrets, Stripe intent validation, and local multi-server startup automation.',
                'badges' => ['Stripe Security', 'API Validation', 'DevOps'],
                'social' => [
                    'email' => 'mailto:david.chen@example.com',
                    'twitter' => 'https://x.com',
                ],
                'sort_order' => 5,
            ],
            [
                'name' => 'Maria Santos',
                'role' => 'QA Tester & Content Strategist',
                'title' => 'QA & Docs',
                'image' => '/img/team-6.jpg',
                'is_lead' => false,
                'bio' => 'Writes automated PHPUnit feature tests, verifies cross-browser button flows, and curates clear, accurate copy across the platform.',
                'badges' => ['PHPUnit Testing', 'QA Verification', 'CMS Content'],
                'social' => [
                    'email' => 'mailto:maria.santos@example.com',
                    'facebook' => 'https://facebook.com',
                ],
                'sort_order' => 6,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::query()->updateOrCreate(
                ['sort_order' => $member['sort_order']],
                $member
            );
        }
    }
}

