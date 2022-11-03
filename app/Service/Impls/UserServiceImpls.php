<?php
namespace App\Service\Impls;

use App\DAO\UserDAO;
use App\Models\User;
use App\Service\UserService;

class UserServiceImpls implements UserService{

    private UserDAO $userDao;

    public function __construct(UserDAO $udao)
    {
        $this->userDao = $udao;
    }

    public function get($id){
        return $this->userDao->get($id);
    }
    public function create(){

    }
    public function update(){

    }
    public function delete(){
        
    }
}