<?php
namespace App\DAO;

interface BlogDAO{
    public function getAll();
    public function getUserBlogs();
    public function getById($id);
    public function create($data);
    public function update($id,$data);
    public function delete($id);
    public function getReaction($id,$type);
    public function search($search);

    public function getBlogByComment($comment);
}