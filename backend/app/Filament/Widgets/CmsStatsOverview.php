<?php

namespace App\Filament\Widgets;

use App\Models\Cause;
use App\Models\Donation;
use App\Models\NewsletterSubscriber;
use App\Models\TeamMember;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CmsStatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $totalDonations = (float) Donation::query()->sum('amount');

        return [
            Stat::make('Active Causes', Cause::query()->where('is_active', true)->count())
                ->description('Visible on frontend')
                ->color('success'),
            Stat::make('Team Members', TeamMember::query()->where('is_active', true)->count())
                ->description('Active leadership & staff')
                ->color('info'),
            Stat::make('Recorded Donations', '$' . number_format($totalDonations, 2))
                ->description(Donation::query()->count() . ' total transactions')
                ->color('warning'),
            Stat::make('Newsletter Subscribers', NewsletterSubscriber::query()->count())
                ->description('Email signups')
                ->color('primary'),
        ];
    }
}

