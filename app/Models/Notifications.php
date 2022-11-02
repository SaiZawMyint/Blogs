<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    use HasFactory;

    public function users(){
        return $this->belongsTo(User::class);
    }

    protected $fillabled = [
        'user_id',
        'blogs_id',
        'sender_id',
        'type',
        'message',
        'seen'
    ];
}
