<?php

namespace App\Filament\Resources\TeamMembers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextInputColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class TeamMembersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order', 'asc')
            ->columns([
                TextInputColumn::make('sort_order')
                    ->label('#')
                    ->type('number')
                    ->rules(['required', 'integer', 'min:0'])
                    ->sortable(),
                TextInputColumn::make('name')
                    ->rules(['required', 'max:150'])
                    ->searchable(),
                TextInputColumn::make('role')
                    ->rules(['required', 'max:150'])
                    ->searchable(),
                TextInputColumn::make('title')
                    ->label('Badge')
                    ->rules(['nullable', 'max:100'])
                    ->searchable(),
                ToggleColumn::make('is_active')
                    ->label('Visible'),
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
