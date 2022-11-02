<?php

namespace App\Http\Controllers;

use App\Service\NotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{

    public $user;
    public NotificationService $notificationservice;

    public function __construct(NotificationService $service)
    {
        $this->user = auth('sanctum')->user();
        $this->notificationservice = $service;
    }

    public function get(){
        return response([
            'ok'=>true,
            'code'=>200,
            'message'=>'Get notification success!',
            'data'=>$this->notificationservice->get()
        ]);
    }

    public function add(Request $request,$type){
        return response([
            'ok'=> true,
            'code'=> 200,
            'message' => 'Notification sent success!',
            'data' => $this->notificationservice->add($request->all(),$type)
        ]);
    }
}
