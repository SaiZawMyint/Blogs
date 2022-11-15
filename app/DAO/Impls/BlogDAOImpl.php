<?php
namespace App\DAO\Impls;

use App\DAO\BlogDAO;
use App\DAO\NotificationsDAO;
use App\Models\Blogs;

class BlogDAOImpl implements BlogDAO{

    private $user;
    private NotificationsDAO $notiDao;

    public function __construct(NotificationsDAO $ndao)
    {
        $this->user = auth('sanctum')->user();
        $this->notiDao =$ndao;
    }

    public function getAll(){
        $blogs = Blogs::where('del_flag','!=',true)->orderBy('created_at', 'desc')->get();
        return $blogs;
    }
    public function getUserBlogs()
    {
        $blogs = Blogs::where('user_id','=',$this->user->id)->where('del_flag','!=',true)->orderBy('created_at', 'desc')->get();
        return $blogs;
    }
    public function getById($id){
        $blogs = Blogs::where('id','=',$id)->where('del_flag','!=',true)->orderBy('created_at', 'desc')->first();
        return $blogs;
    }
    public function create($data){
        $blog = new Blogs;
        $blog = Blogs::create([
            'user_id' => $this->user->id,
            'title' => $data['title'],
            'body' => $data['body'],
            'type' => $data['type'],
            'description' => $data['description'],
            'del_flag' => false
        ]);
        return $blog;
    }
    public function update($id,$data){
        Blogs::where('id','=',$id)->update($data);
        $temp = Blogs::find($id);
        $message = "Update blog success!";
        if(array_key_exists('del_flag',$data)){
            $temp->reactions()->delete();
            $this->notiDao->deleteByBlog($id);
            $message = "Delete blog success!";
        }
        return ['data'=>$temp,'message'=>$message];
    }
    public function delete($id){
        return Blogs::find($id)->delete();
    }

    public function getReaction($id,$type){
        $blog = Blogs::find($id);
        if($blog == null) return [];
        if($type == 'comment'){
            return $blog->comments;
        }else if($type == 'like'){
            return $blog->likes;
        }else{
            return [];
        }
    }
    public function search($search)
    {
        return Blogs::where('del_flag','!=',true)->where('title','LIKE','%'.$search.'%')->get();
    }
}