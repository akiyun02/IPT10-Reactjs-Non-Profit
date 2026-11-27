<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    protected $fillable = [
        'title',
        'heading',
        'image',
        'alt',
        'description',
        'founder_name',
        'founder_role',
        'founder_bio',
        'mission_title',
        'mission_description',
        'mission_points',
        'callout_text',
        'callout_button_text',
    ];

    protected $casts = [
        'mission_points' => 'array',
    ];
}

