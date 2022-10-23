<?php
namespace App\Service;

interface UserService{
    public function get($id);
    public function create();
    public function update();
    public function delete();
}