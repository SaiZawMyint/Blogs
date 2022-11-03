<?php
namespace App\DAO\Impls;

use App\DAO\NotificationsDAO;
use App\DAO\ReactionsDAO;
use App\DAO\UserDAO;
use App\Models\Blogs;
use App\Models\Notifications;
use App\Models\Reactions;
use App\Utils\NotificationUtils;

class ReactionsDAOImpl implements ReactionsDAO{
    public $user;
    public NotificationsDAO $notiDao;

    public function __construct(NotificationsDAO $ndao)
    {
        $this->user = auth('sanctum')->user();
        $this->notiDao = $ndao;
    }

    public function getAll(){
        
    }
    public function get($id){}
    public function update($id,$data){}
    public function delete($id){}
    public function like($id)
    {
        $blog = Blogs::find($id);
        if($blog == null) return null;
        $reaction = new Reactions();
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
        return $blog;
    }

    public function comment($id,$data)
    {
        $blog = Blogs::find($id);
        if($blog == null) return null;
        $reaction = new Reactions;
        $reaction->comments = $data;
        $reaction->user_id = $this->user->id;
        $reaction->type = 'comment';
        $blog->reactions()->save($reaction);
        $poster_id = $blog->user_id;
        if($poster_id != $this->user->id){
            $this->pushNoti($poster_id,$id,'comment',null);
        }
        return $blog;
    }

    private function isUserLiked($id){
        return Reactions::where('user_id','=',$this->user->id)
                        ->where('blogs_id','=',$id)
                        ->where('type','=','like')
                        ->where('del_flag','<>',true)
                        ->exists();
    }
    private function pushNoti($posterId,$blogid,$type,?string $eventmessage){
        $data = [
            'user_id'=> $posterId,
            'blogs_id'=>$blogid,
            'event_message'=> $eventmessage
        ];
        $data['type'] = $type;
        $data['message'] = NotificationUtils::notificationMessage($data,$this->user);
        
        $this->notiDao->create($data);
    }
}