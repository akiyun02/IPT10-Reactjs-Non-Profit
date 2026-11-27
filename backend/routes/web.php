<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin');
Route::redirect('/cms', '/admin');
Route::any('/cms/{any}', fn () => redirect('/admin', 303))->where('any', '.*');
