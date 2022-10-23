<?php
namespace App\Service\Impls;

use App\Models\Blogs;
use App\Service\BlogService;
use App\Service\ReactionService;

class BlogServiceImpls implements BlogService{

    public ReactionService $reactionservice;
    public $user;

    public function __construct(ReactionService $service)
    {
        $this->reactionservice = $service;
        $this->user = auth('sanctum')->user();
    }

    public function getAll(){
        $blogs = Blogs::where('del_flag','!=',true)->orderBy('created_at', 'desc')->get();
        return $this->reponseData($blogs);
    }
    public function getMyBlogs()
    {
        $blogs = Blogs::where('user_id','=',$this->user->id)->where('del_flag','!=',true)->orderBy('created_at', 'desc')->get();
        return $this->reponseData($blogs);
    }
    public function get($id){
        $blogs = Blogs::where('id','=',$id)->where('del_flag','!=',true)->orderBy('created_at', 'desc')->get();
        if(count($blogs) == 0){
            return [];
        }
        return $this->reponseData($blogs)[0];
    }
    public function create($data){
        $user = auth('sanctum')->user();
        $blog = Blogs::create([
            'user_id' => $user->id,
            'title' => $data['title'],
            'body' => $data['body'],
            'like_count' => 0,
            'del_flag' => false
        ]);
        return [
            'ok' => true,
            'message' => 'Create blogs success!',
            'data' => $blog,
            'code' => 200
        ];
    }
    public function update($id,$data){
        Blogs::where('id','=',$id)->update($data);
        $temp = Blogs::find($id);
        $message = "Update blog success!";
        if(array_key_exists('del_flag',$data)){
            $temp->reactions()->delete();
            $message = "Delete blog success!";
        }
        return [
            "data"=>$temp,
            "message"=>$message
        ];
    }
    public function delete($id){}

    private function reponseData($blogs){
        $data = [];
        foreach($blogs as $blog){
            array_push($data,[
                'blogs'=>$blog,
                'likes'=>$this->reactionservice->get($blog->id,'like'),
                'comments'=>$this->reactionservice->get($blog->id,'comment'),
            ]);
        }
        return $data;
    }
}