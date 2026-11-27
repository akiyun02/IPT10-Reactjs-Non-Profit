<?php

namespace App\Filament\Resources\AboutContents\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class AboutContentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Main About Section')
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->default('About'),
                        TextInput::make('heading')
                            ->required(),
                        Select::make('image')
                            ->options([
                                '/img/about.jpg' => 'About Banner (/img/about.jpg)',
                                '/img/carousel-1.jpg' => 'Carousel 1 (/img/carousel-1.jpg)',
                                '/img/carousel-2.jpg' => 'Carousel 2 (/img/carousel-2.jpg)',
                            ])
                            ->required()
                            ->default('/img/about.jpg'),
                        TextInput::make('alt')
                            ->required()
                            ->default('About Charitize Non-Profit Organization'),
                        Textarea::make('description')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),

                Section::make('Founder Highlight')
                    ->columns(2)
                    ->schema([
                        TextInput::make('founder_name')
                            ->required(),
                        TextInput::make('founder_role')
                            ->required(),
                        Textarea::make('founder_bio')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),

                Section::make('Mission & Donation Callout')
                    ->columns(2)
                    ->schema([
                        TextInput::make('mission_title')
                            ->required()
                            ->default('Our Mission'),
                        TextInput::make('callout_button_text')
                            ->required()
                            ->default('Donate Now'),
                        Textarea::make('mission_description')
                            ->required()
                            ->rows(2)
                            ->columnSpanFull(),
                        TagsInput::make('mission_points')
                            ->label('Mission Bullet Points')
                            ->placeholder('Add a mission point and press Enter')
                            ->required()
                            ->columnSpanFull(),
                        Textarea::make('callout_text')
                            ->required()
                            ->rows(2)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
