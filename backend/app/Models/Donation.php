<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    protected $fillable = [
        'cause_id',
        'cause_title',
        'donor_name',
        'donor_email',
        'amount',
        'payment_intent_id',
        'status',
    ];

    protected $casts = [
        'amount' => 'float',
    ];

    public function cause(): BelongsTo
    {
        return $this->belongsTo(Cause::class);
    }
}

