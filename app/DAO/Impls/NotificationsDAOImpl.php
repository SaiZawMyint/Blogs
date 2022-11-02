<?php
namespace App\DAO\Impls;

use App\DAO\NotificationsDAO;
use App\Models\Notifications;
use App\Models\User;

class NotificationsDAOImpl implements NotificationsDAO{
    public $user;
    public function __construct()
    {
        $this->user = auth('sanctum')->user();
    }
    public function get(){
        $noti = Notifications::where('user_id','=',$this->user->id)->orderBy('created_at','DESC')->get();
        return $noti;
    }
    public function create($data){
        $mainUser = User::find($data['user_id']);
        $noti = new Notifications();
        $noti->sender_id =$this->user->id;
        $noti->blogs_id = $data['blogs_id'];
        $noti->type = $data['type'];
        $noti->message = $data['message'];
        $noti->seen = false;
        $mainUser->notifications()->save($noti);
        
        return $noti;
    }
    public function update($data){
        $noti = Notifications::where('id','=',$data['id'])->update($data);
        return $noti;
    }
    public function delete($id){}

    public function hasUnseen(): bool
    {
        $unseen = Notifications::where('user_id','=',$this->user->id)->where('seen','<>',true)->get();
        return count($unseen) > 0;
    }
}