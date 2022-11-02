<?php
namespace App\Service\Impls;

use App\Models\Notifications;
use App\Service\NotificationService;
use App\Service\UserService;

class NotificationImpls implements NotificationService{

    private $user;
    private UserService $userservice;

    public function __construct(UserService $service)
    {
        $this->user = auth('sanctum')->user();
        $this->userservice = $service;
    }

    public function get(){
        $data = Notifications::where('user_id','=',$this->user->id)->orderBy('id','DESC');
        return $data;
    }
    public function add($data,$type){
        $noti = Notifications::create([
            'user_id'=>$data['userId'],
            'sender_id'=>$this->user->id,
            'blogs_id'=>$data['blogs_id'],
            'type'=>$type,
            'message'=> $this->notificationMessage($type,$data),
            'seen'=>false
        ]);
        return $noti;
    }
    public function seen($id){

    }
    public function remove($id){

    }

    private function notificationMessage($type,$data){
        $msg = '';
        $curuser = $this->userservice->get($data['userId']);
        switch($type){
            case 'like':
                    $msg = $curuser->name." react to your blog.";
                break;
            case 'comment':
                    $msg = $curuser->name." comment to your blog";
                break;
            case 'event':
                    $msg = $data['event_message'];
                break;
        }
        return $msg;
    }
}