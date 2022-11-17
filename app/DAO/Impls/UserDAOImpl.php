<?php
namespace App\DAO\Impls;

use App\DAO\UserDAO;
use App\Models\User;

class UserDAOImpl implements UserDAO{

    private $user;

    public function __construct()
    {
        $this->user = auth('sanctum')->user();
    }

    public function get($id){
        return User::find($id);
    }
    public function getUserBlogById($blogid)
    {
        $user = User::find($this->user->id);
        return $user->getBlogById($blogid);
    }
    public function create(){}
    public function update(){}
    public function delete(){}
}