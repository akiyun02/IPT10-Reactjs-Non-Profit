<?php

namespace App\Filament\Resources\TeamMembers\Schemas;

use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TeamMemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Profile Details')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(150),
                        TextInput::make('role')
                            ->required()
                            ->maxLength(150),
                        TextInput::make('title')
                            ->label('Badge Label (e.g. Lead Dev, Frontend)')
                            ->maxLength(100),
                        Select::make('image')
                            ->options([
                                '/img/team-1.jpg' => 'Team Portrait 1 (/img/team-1.jpg)',
                                '/img/team-2.jpg' => 'Team Portrait 2 (/img/team-2.jpg)',
                                '/img/team-3.jpg' => 'Team Portrait 3 (/img/team-3.jpg)',
                                '/img/team-4.jpg' => 'Team Portrait 4 (/img/team-4.jpg)',
                                '/img/team-5.jpg' => 'Team Portrait 5 (/img/team-5.jpg)',
                                '/img/team-6.jpg' => 'Team Portrait 6 (/img/team-6.jpg)',
                            ])
                            ->searchable()
                            ->required()
                            ->default('/img/team-1.jpg'),
                        Textarea::make('bio')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),

                Section::make('Skills, Social Links & Visibility')
                    ->columns(2)
                    ->schema([
                        TagsInput::make('badges')
                            ->placeholder('Add skill badge...')
                            ->columnSpanFull(),
                        KeyValue::make('social')
                            ->label('Social Links (github, email, facebook, twitter)')
                            ->keyLabel('Platform')
                            ->valueLabel('URL or mailto:')
                            ->columnSpanFull(),
                        TextInput::make('sort_order')
                            ->required()
                            ->numeric()
                            ->default(0),

                        Toggle::make('is_active')
                            ->label('Visible on Website')
                            ->default(true),
                    ]),
            ]);
    }
}
