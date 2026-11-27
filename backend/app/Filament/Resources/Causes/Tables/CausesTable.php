<?php

namespace App\Filament\Resources\Causes\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\TextInputColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class CausesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order', 'asc')
            ->columns([
                TextColumn::make('category')
                    ->badge()
                    ->color('info')
                    ->searchable(),
                TextInputColumn::make('title')
                    ->rules(['required', 'max:255'])
                    ->searchable(),
                TextInputColumn::make('raised')
                    ->label('Raised ($)')
                    ->type('number')
                    ->rules(['required', 'integer', 'min:0'])
                    ->sortable(),
                TextInputColumn::make('goal')
                    ->label('Goal ($)')
                    ->type('number')
                    ->rules(['required', 'integer', 'min:1'])
                    ->sortable(),
                TextColumn::make('progressPercent')
                    ->label('Progress')
                    ->suffix('%')
                    ->badge()
                    ->color(fn (int $state): string => $state >= 80 ? 'success' : 'warning'),
                ToggleColumn::make('is_active')
                    ->label('Visible'),
                TextInputColumn::make('sort_order')
                    ->label('Order')
                    ->type('number')
                    ->rules(['required', 'integer', 'min:0'])
                    ->sortable(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
