<?php
namespace App\DAO\Impls;

use App\DAO\UserDAO;
use App\Models\User;

class UserDAOImpl implements UserDAO{
    public function get($id){
        return User::find($id);
    }
    public function create(){}
    public function update(){}
    public function delete(){}
}