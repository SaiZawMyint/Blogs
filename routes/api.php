<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    //user
    Route::get('/me',[AuthController::class,'getUser']);
    Route::post('/logout',[AuthController::class, 'logout']);
    Route::get('/me/blogs',[PostController::class, 'getUserBlogs']);
    

    //blog
    Route::post('/blogs',[PostController::class,'createBlog']);
    Route::get('/blogs',[PostController::class,'getPosts']);

    Route::get('/blogs/search',[PostController::class, 'searchBlog']);

    Route::get('/blogs/{id}',[PostController::class,'getBlog']);
    Route::post('/blogs/{id}',[PostController::class,'updateBlog']);

    //reactions
    Route::post('/blogs/{id}/comment',[ReactionController::class,'comment']);
    Route::get('/blogs/{id}/comment',[ReactionController::class,'getComments']);
    Route::post('/blogs/{id}/like',[ReactionController::class,'like']);
    Route::get('/blogs/{id}/like',[ReactionController::class,'getLikes']);

    //notifications
    Route::get('/notifications/get',[NotificationController::class, 'get']);
    Route::get('/notifications/unseen',[NotificationController::class, 'hasUnseen']);
    Route::post('/notifications/{id}/seen',[NotificationController::class,'seen']);

});

Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
