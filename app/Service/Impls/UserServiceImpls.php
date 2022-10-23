<?php
namespace App\Service\Impls;

use App\Models\User;
use App\Service\UserService;

class UserServiceImpls implements UserService{
    public function get($id){
        return User::find($id);
    }
    public function create(){

    }
    public function update(){

    }
    public function delete(){
        
    }
}