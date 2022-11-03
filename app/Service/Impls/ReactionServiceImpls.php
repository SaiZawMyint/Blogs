<?php
namespace App\Service\Impls;

use App\DAO\BlogDAO;
use App\DAO\NotificationsDAO;
use App\DAO\ReactionsDAO;
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
    public BlogDAO $blogDao;
    public ReactionsDAO $reactionDao;

    public function __construct(UserService $service,NotificationService $notiService,BlogDAO $bdao,ReactionsDAO $rdao)
    {
        $this->user = auth('sanctum')->user();
        $this->userservice = $service;
        $this->notiService = $notiService;
        $this->blogDao = $bdao;
        $this->reactionDao = $rdao;
    }

    public function get($id,$type){
        $data = $this->blogDao->getReaction($id,$type);
        return $this->resposeReactionData($data);
    }
    public function comment($data,$id){
        $blog = $this->reactionDao->comment($id,$data);
        if($blog == null) return ["ok"=>false,"code"=>450,"message"=>"Cannot find post!"];
        return [
            "ok"=>true,
            "code"=> 200,
            "message"=>"Comment to blog success",
            "uid"=>$this->user->id,
            "data"=>$this->resposeReactionData($blog->comments)
        ];
    }
    public function like($id){
        $blog = $this->reactionDao->like($id);
        if($blog == null) ["ok"=>false,"code"=>450,"message"=>"Cannot find post!"];

        return [
            "ok"=>true,
            "code"=> 200,
            "uid" => $this->user->id,
            "data"=>$this->resposeReactionData($blog->likes)
        ];
    }

    public function delete($id,$type)
    {
        
    }

    

    private function resposeReactionData($reactions){
        $data = [];
        foreach($reactions as $react){
            $react['username'] = $this->userservice->get($react['user_id'])['name'];
            array_push($data,$react);
        }
        return $data;
    }

    

}