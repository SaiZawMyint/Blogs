<?php
namespace App\Utils;

class NotificationUtils{
    public static function notificationMessage($data,$user){
        $msg = '';
        switch($data['type']){
            case 'like':
                    $msg = $user->name." react to your blog.";
                break;
            case 'comment':
                    $msg = $user->name." comment to your blog.";
                break;
            case 'event':
                    $msg = $data['event_message'];
                break;
        }
        return $msg;
    }
}