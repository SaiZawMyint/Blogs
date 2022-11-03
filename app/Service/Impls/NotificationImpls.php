<?php
namespace App\Service\Impls;

use App\DAO\BlogDAO;
use App\DAO\NotificationsDAO;
use App\Models\Notifications;
use App\Models\User;
use App\Service\BlogService;
use App\Service\NotificationService;
use App\Service\UserService;

class NotificationImpls implements NotificationService{

    private $user;
    private NotificationsDAO $notiDao;
    private UserService $userservice;
    private BlogDAO $blogDao;

    public function __construct(NotificationsDAO $notiDao,UserService $uservice,BlogDAO $bdao)
    {
        $this->user = auth('sanctum')->user();
        $this->notiDao = $notiDao;
        $this->userservice = $uservice;
        $this->blogDao=$bdao;
    }

    public function get(){
        $data = $this->notiDao->get();
        return $this->notificationResponseData($data);
    }
    public function add($data,$type){
        $data['type'] = $type;
        $data['message'] = $this->notificationMessage($data);
        $noti = $this->notiDao->create($data);
        return $noti;
    }
    public function seen($id){
        $data = [
            'id'=>$id,
            'seen'=>true
        ];
        $noti = $this->notiDao->update($data);
        return $noti;
    }

    public function hasUnseen(): bool
    {
        $unseen = $this->notiDao->hasUnseen();
        return $unseen;
    }

    public function remove($id){

    }

    private function notificationMessage($data){
        $msg = '';
        switch($data['type']){
            case 'like':
                    $msg = $this->user->name." react to your blog.";
                break;
            case 'comment':
                    $msg = $this->user->name." comment to your blog.";
                break;
            case 'event':
                    $msg = $data['event_message'];
                break;
        }
        return $msg;
    }

    private function notificationResponseData($data){
        $response = [];
        foreach($data as $d){
            $sender = $this->userservice->get($d->sender_id);
            $b = $this->blogDao->getById($d->blogs_id);
            if(count($b) > 0){
                array_push($response,[
                    'sender_name'=>$sender->name,
                    'sender_id'=>$sender->id,
                    'message'=>$d->message,
                    'type'=>$d->type,
                    'blogs_title'=> $b[0]->title,
                    'blogs_id'=>$b[0]->id,
                    'seen'=>$d->seen == 1,
                    'time'=>$d->created_at,
                    'nid'=>$d->id
                ]);
            }
        }
        return $response;
    }
}