<?php

/**
 * In This File we will only return views and query single records 
 * 
 * all logic will be placed At api.php
 */

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::as('dashboard.')->group(function(){
    Route::view('login', 'dashboard.auth.login')->name('login');
});


Route::middleware('auth')->as('dashboard.')->group(function() {
    Route::view('/dashboard', 'dashboard.index')->name('index');
    
    
    Route::get('/home', 'HomeController@index')->name('home');
});
