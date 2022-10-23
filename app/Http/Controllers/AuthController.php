<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Service\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public UserService $userservice;
    public function __construct(UserService $service)
    {
        $this->userservice = $service;
    }
    public function register(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|string|unique:user,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);
        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password'])
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user'=>$user,
            'token'=>$token,
            'ok' => true
        ]);
    }
    public function login(Request $request)
    {
        $credential = $request->validate([
            'email'=>'required|email|string|exists:users,email',
            'password'=>'required',
            'remember'=>'boolean'
        ]);
        $remember = $credential['remember'] ?? false;
        unset($credential['remember']);
        if(!Auth::attempt($credential,$remember)){
            return response([
                'ok'=>false,
                'error'=>'Invalid email or password!'
            ]);
        }
        $user = Auth::user();
        
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token,
            'ok'=>true
        ]);
    }
    public function logout()
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response([
            "success"=>true
        ]);
    }
    public function getUser(){
        return response([
            "ok"=>true,
            "message"=> "Get data success!",
            "code"=>200,
            "data"=>auth('sanctum')->user()
        ]);
    }
}
