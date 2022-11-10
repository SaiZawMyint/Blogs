<?php
namespace App\DAO;
interface ReactionsDAO {
    public function getAll();
    public function get($id);
    public function update($id,$data);
    public function delete($blog_id,$id,$type);
    public function like($id);
    public function comment($id,$data);
}