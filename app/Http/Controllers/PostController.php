<?php

namespace App\Http\Controllers;

use App\Service\BlogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public BlogService $blogservice;
    public $user;
    public function __construct(BlogService $service)
    {
        $this->blogservice = $service;
        $this->user = auth('sanctum')->user();
    }

    public function getPosts(){
        return response([
            "ok" => true,
            "message" => "Get all blogs success!",
            "code" => 200,
            "uid"=> $this->user->id,
            "data" => $this->blogservice->getAll()
        ]);
    }

    public function getUserBlogs(){
        return response([
            "ok" => true,
            "message" => "Get all blogs success!",
            "code" => 200,
            "uid"=> $this->user->id,
            "data" => $this->blogservice->getMyBlogs()
        ]);
    }

    public function createBlog(Request $request){
        $validator = Validator::make($request->all(), [
            'title'=>'required',
            'body'=>'required'
        ]);
        if($validator->fails()){
            return response([
                'ok'=> false,
                'message' => $validator->messages(),
                'code' => 450
            ]);
        }
        $blog = $this->blogservice->create($request);
        return response($blog);
    }

    public function getBlog($id){
        $data = $this->blogservice->get($id);
        if(count($data) == 0){
            return response([
                "ok" => false,
                "message" => "Blog dosen't exist!",
                "code" => 440
            ]);
        }
        return response([
            "ok" => true,
            "message" => "Get blog data success!",
            "code" => 200,
            "uid"=> $this->user->id,
            "data" => $this->blogservice->get($id)
        ]);
    }

    public function updateBlog(Request $request,$id){
        $upd = $this->blogservice->update($id,$request->all());
        return response([
            "ok" => true,
            "code" => 201,
            "message" => $upd['message'],
            "uid"=> $this->user->id,
            "data" => $upd['data']
        ]);
    }
}
