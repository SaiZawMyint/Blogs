<?php
namespace App\DAO\Impls;

use App\DAO\ReactionsDAO;

class ReactionsDAOImpl implements ReactionsDAO{
    public $user;
    public function __construct()
    {
        $this->user = auth('sanctum')->user();
    }

    public function getAll(){
        
    }
    public function get($id){}
    public function update($id,$data){}
    public function delete($id){}
}