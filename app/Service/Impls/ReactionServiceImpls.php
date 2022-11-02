<?php
namespace App\Service\Impls;

use App\DAO\NotificationsDAO;
use App\Models\Blogs;
use App\Models\Notifications;
use App\Models\Reactions;
use App\Service\NotificationService;
use App\Service\ReactionService;
use App\Service\UserService;

class ReactionServiceImpls implements ReactionService{

    public $user;
    public UserService $userservice;
    public NotificationService $notiService;

    public function __construct(UserService $service,NotificationService $notiService)
    {
        $this->user = auth('sanctum')->user();
        $this->userservice = $service;
        $this->notiService = $notiService;
    }

    public function get($id,$type){
        $blog = Blogs::find($id);
        if($blog == null) return [];
        if($type == 'comment'){
            return $this->resposeReactionData($blog->comments);
        }else if($type == 'like'){
            return $this->resposeReactionData($blog->likes);
        }else{
            return [];
        }
        
    }
    public function comment($data,$id){
        $blog = Blogs::find($id);
        if($blog == null) return ["ok"=>false,"code"=>450,"message"=>"Cannot find post!"];
        $reaction = new Reactions;
        $reaction->comments = $data;
        $reaction->user_id = $this->user->id;
        $reaction->type = 'comment';
        $blog->reactions()->save($reaction);
        $poster_id = $blog->user_id;
        if($poster_id != $this->user->id){
            $this->pushNoti($poster_id,$id,'comment',null);
        }
        return [
            "ok"=>true,
            "code"=> 200,
            "message"=>"Comment to blog success",
            "uid"=>$this->user->id,
            "data"=>$this->resposeReactionData($blog->comments)
        ];
    }
    public function like($id){
        $blog = Blogs::find($id);
        if($blog == null) return ["ok"=>false,"code"=>450,"message"=>"Cannot find post!"];
        $reaction = new Reactions;
        $reaction->user_id = $this->user->id;
        $reaction->type = 'like';
        $poster_id = $blog->user_id;
        if($this->isUserLiked($id)){
            Reactions::where('user_id','=',$this->user->id)
                    ->where('type','=','like')
                    ->where('blogs_id','=',$id)
                    ->delete();
            Notifications::where('user_id','=',$poster_id)
                            ->where('sender_id','=',$this->user->id)
                            ->where('type','=','like')
                            ->where('blogs_id','=',$id)
                            ->delete();
        }else{
            $blog->reactions()->save($reaction);
            
            if($poster_id != $this->user->id){
                $this->pushNoti($poster_id,$id,'like',null);
            }
        }
        
        return [
            "ok"=>true,
            "code"=> 200,
            "uid" => $this->user->id,
            "data"=>$this->resposeReactionData($blog->likes)
        ];
    }

    private function isUserLiked($id){
        return Reactions::where('user_id','=',$this->user->id)
                        ->where('blogs_id','=',$id)
                        ->where('type','=','like')
                        ->where('del_flag','<>',true)
                        ->exists();
    }

    private function resposeReactionData($reactions){
        $data = [];
        foreach($reactions as $react){
            $react['username'] = $this->userservice->get($react['user_id'])['name'];
            array_push($data,$react);
        }
        return $data;
    }

    private function pushNoti($posterId,$blogid,$type,?string $eventmessage){
        $data = [
            'user_id'=> $posterId,
            'blogs_id'=>$blogid,
            'event_message'=> $eventmessage
        ];
        $this->notiService->add($data,$type);
    }
}