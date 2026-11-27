<?php

namespace App\Filament\Resources\Causes\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CauseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('category')
                    ->required()
                    ->placeholder('e.g. Nutrition, Clean Water, Education'),
                TextInput::make('title')
                    ->required(),
                TextInput::make('raised')
                    ->required()
                    ->numeric()
                    ->prefix('$')
                    ->default(0),
                TextInput::make('goal')
                    ->required()
                    ->numeric()
                    ->prefix('$')
                    ->default(5000),
                Select::make('img_src')
                    ->label('Cause Image')
                    ->options([
                        '/img/donation-1.jpg' => 'Donation Image 1 (/img/donation-1.jpg)',
                        '/img/donation-2.jpg' => 'Donation Image 2 (/img/donation-2.jpg)',
                        '/img/donation-3.jpg' => 'Donation Image 3 (/img/donation-3.jpg)',
                    ])
                    ->required()
                    ->default('/img/donation-1.jpg'),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Textarea::make('description')
                    ->required()
                    ->rows(3)
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->label('Visible on Website')
                    ->default(true)
                    ->required(),
            ]);
    }
}
