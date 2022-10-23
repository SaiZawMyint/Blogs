<?php

namespace App\Providers;

use App\Service\BlogService;
use App\Service\Impls\BlogServiceImpls;
use App\Service\Impls\ReactionServiceImpls;
use App\Service\Impls\UserServiceImpls;
use App\Service\ReactionService;
use App\Service\UserService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UserService::class,UserServiceImpls::class);
        $this->app->bind(BlogService::class,BlogServiceImpls::class);
        $this->app->bind(ReactionService::class,ReactionServiceImpls::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
