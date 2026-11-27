<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'role',
        'title',
        'image',
        'is_lead',
        'bio',
        'badges',
        'social',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_lead' => 'boolean',
        'is_active' => 'boolean',
        'badges' => 'array',
        'social' => 'array',
        'sort_order' => 'integer',
    ];

    protected $appends = ['isCurrentUser'];

    public function getIsCurrentUserAttribute(): bool
    {
        return (bool) $this->is_lead;
    }
}

