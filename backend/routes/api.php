<?php

use App\Http\Controllers\Api\CmsApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('cms')->group(function () {
    Route::get('/health', [CmsApiController::class, 'health']);

    // About & Mission
    Route::get('/about', [CmsApiController::class, 'about']);
    Route::put('/about', [CmsApiController::class, 'updateAbout']);

    // Donation Causes
    Route::get('/causes', [CmsApiController::class, 'causes']);
    Route::post('/causes', [CmsApiController::class, 'storeCause']);
    Route::put('/causes/{cause}', [CmsApiController::class, 'updateCause']);
    Route::delete('/causes/{cause}', [CmsApiController::class, 'destroyCause']);

    // Team Members
    Route::get('/team', [CmsApiController::class, 'team']);
    Route::post('/team', [CmsApiController::class, 'storeTeamMember']);
    Route::put('/team/{teamMember}', [CmsApiController::class, 'updateTeamMember']);
    Route::delete('/team/{teamMember}', [CmsApiController::class, 'destroyTeamMember']);

    // Donations & Newsletter
    Route::get('/donations', [CmsApiController::class, 'donations']);
    Route::post('/donations', [CmsApiController::class, 'storeDonation']);
    Route::post('/newsletter', [CmsApiController::class, 'subscribeNewsletter']);
});

