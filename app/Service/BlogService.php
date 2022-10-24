<?php
namespace App\Service;

interface BlogService{
    public function getAll();
    public function getMyBlogs();
    public function get($id);
    public function create($data);
    public function update($id,$data);
    public function delete($id);
    public function search($search);
}