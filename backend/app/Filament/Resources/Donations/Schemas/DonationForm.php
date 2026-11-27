<?php

namespace App\Filament\Resources\Donations\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DonationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('cause_id')
                    ->relationship('cause', 'title'),
                TextInput::make('cause_title'),
                TextInput::make('donor_name')
                    ->required(),
                TextInput::make('donor_email')
                    ->email()
                    ->required(),
                TextInput::make('amount')
                    ->required()
                    ->numeric(),
                TextInput::make('payment_intent_id'),
                TextInput::make('status')
                    ->required()
                    ->default('succeeded'),
            ]);
    }
}
