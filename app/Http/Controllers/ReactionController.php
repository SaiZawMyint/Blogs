<?php

namespace App\Http\Controllers;

use App\Service\ReactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReactionController extends Controller
{
    public ReactionService $reactionservice;
    public function __construct(ReactionService $service)
    {
        $this->reactionservice = $service;
    }

    public function getComments($id){
        return response([
            "ok"=>true,
            "message"=>"Get post's comments success",
            "code" => 200,
            "data" => $this->reactionservice->get($id,'comment')
        ]);
    }

    public function getlikes($id){
        return response([
            "ok"=>true,
            "message"=>"Get post's likes success",
            "code" => 200,
            "uid" => auth('sanctum')->user()->id,
            "data" => $this->reactionservice->get($id,'like')
        ]);
    }

    public function comment(Request $request,$id){
        return response($this->reactionservice->comment($request['comment'],$id));
    }
    public function like($id){
        return response($this->reactionservice->like($id));
    }
}
