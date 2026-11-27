<?php

namespace App\Filament\Resources\Donations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DonationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('donor_name')
                    ->label('Donor')
                    ->weight('bold')
                    ->searchable(),
                TextColumn::make('donor_email')
                    ->label('Email')
                    ->searchable(),
                TextColumn::make('cause_title')
                    ->label('Cause')
                    ->placeholder('General Community Support')
                    ->searchable(),
                TextColumn::make('amount')
                    ->money('USD')
                    ->sortable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => $state === 'succeeded' ? 'success' : 'warning')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime('M d, Y h:i A')
                    ->sortable(),
            ])
            ->recordActions([
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
