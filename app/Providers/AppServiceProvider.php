<?php

namespace App\Providers;

use App\DAO\BlogDAO;
use App\DAO\Impls\BlogDAOImpl;
use App\DAO\Impls\NotificationsDAOImpl;
use App\DAO\Impls\ReactionsDAOImpl;
use App\DAO\NotificationsDAO;
use App\DAO\ReactionsDAO;
use App\Service\BlogService;
use App\Service\Impls\BlogServiceImpls;
use App\Service\Impls\NotificationImpls;
use App\Service\Impls\ReactionServiceImpls;
use App\Service\Impls\UserServiceImpls;
use App\Service\NotificationService;
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
        //services
        $this->app->bind(UserService::class,UserServiceImpls::class);
        $this->app->bind(BlogService::class,BlogServiceImpls::class);
        $this->app->bind(ReactionService::class,ReactionServiceImpls::class);
        $this->app->bind(NotificationService::class,NotificationImpls::class);

        //dao
        $this->app->bind(NotificationsDAO::class,NotificationsDAOImpl::class);
        $this->app->bind(BlogDAO::class,BlogDAOImpl::class);
        $this->app->bind(ReactionsDAO::class,ReactionsDAOImpl::class);
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
