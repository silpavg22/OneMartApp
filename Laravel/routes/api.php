<?php
use App\Http\Controllers\API\UserDetailsController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\ClubController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register-user', [UserDetailsController::class, 'registerUser']);

Route::post('/login-user', [UserDetailsController::class, 'loginUser']);


Route::post('/create-user', [UserDetailsController::class, 'saveUser']);

Route::get('/fetch-users', [UserDetailsController::class, 'fetchUsers']);

Route::put('/update-user/{id}', [UserDetailsController::class, 'updateUser']);

Route::delete('/delete-user/{id}', [UserDetailsController::class, 'deleteUser']);

Route::post('/contact-us', [UserDetailsController::class, 'contactUs']);


Route::get('/fetch-posts', [PostController::class, 'fetchAllPosts']);
Route::delete('/delete-post/{id}', [PostController::class, 'deletePost']);

Route::get('/fetch-clubs', [ClubController::class, 'fetchAllClubs']);
Route::delete('/delete-club/{id}', [ClubController::class, 'deleteClub']);

Route::get('/fetch-products', [ProductController::class, 'fetchAllProducts']);



// Route::get('/send-email', [UserDetailsController::class, 'mail'])->name('email');









Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
