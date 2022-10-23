<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model
{
    use HasFactory;

    public function reactions(){
        return $this->hasMany(Reactions::class);
    }

    public function comments(){
        return $this->reactions()->where('type','=','comment')->orderBy('created_at','desc');
    }

    public function likes(){
        return $this->reactions()->where('type','=','like')->orderBy('created_at','desc');
    }

    public function getCreatedAtAttribute()
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $this->attributes['created_at'])->format('d-m-Y h:m A');
    }

    public function getUpdatedAtAttribute()
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $this->attributes['updated_at'])->format('d-m-Y h:m A');
    }

    protected $fillable = [
        'id',
        'user_id',
        'title',
        'body',
        'like_count',
        'del_flag'
    ];
}
