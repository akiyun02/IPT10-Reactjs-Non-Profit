<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cause extends Model
{
    protected $fillable = [
        'category',
        'title',
        'raised',
        'goal',
        'img_src',
        'description',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'raised' => 'integer',
        'goal' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = ['progressPercent', 'imgSrc', 'desc'];

    public function getProgressPercentAttribute(): int
    {
        if ($this->goal <= 0) {
            return 0;
        }
        return (int) min(100, round(($this->raised / $this->goal) * 100));
    }

    public function getImgSrcAttribute(): string
    {
        return (string) ($this->attributes['img_src'] ?? '/img/donation-1.jpg');
    }

    public function getDescAttribute(): string
    {
        return (string) ($this->attributes['description'] ?? '');
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }
}
