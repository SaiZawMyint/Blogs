<?php
namespace App\DAO\Impls;

use App\DAO\BlogDAO;
use App\Models\Blogs;

class BlogDAOImpl implements BlogDAO{
    public function getAll(){
        $blogs = Blogs::where('del_flag','!=',true)->orderBy('created_at', 'desc')->get();
        return $blogs;
    }
    public function getById($id){
        $blogs = Blogs::where('id','=',$id)->where('del_flag','!=',true)->orderBy('created_at', 'desc')->get();
        return $blogs;
    }
    public function create($data){}
    public function update($data){}
    public function delete($id){}
}