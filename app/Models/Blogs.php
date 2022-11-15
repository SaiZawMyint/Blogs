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
        return Carbon::createFromFormat('Y-m-d H:i:s', $this->attributes['created_at'])->format('m-d-Y h:m:s A');
    }

    public function getUpdatedAtAttribute()
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $this->attributes['updated_at'])->format('m-d-Y h:m:s A');
    }

    protected $fillable = [
        'id',
        'user_id',
        'title',
        'description',
        'body',
        'type',
        'del_flag'
    ];

    public static function boot()
    {
        parent::boot();
        static::deleting(function($blog){
            $blog->reactions()->delete();
        });
    }
}
