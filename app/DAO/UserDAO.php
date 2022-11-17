<?php
namespace App\DAO;

interface UserDAO{
    public function get($id);
    public function getUserBlogById($id);
    public function create();
    public function update();
    public function delete();
}