<?php
namespace App\Service;

use App\Models\Reactions;

interface ReactionService{
    public function get($id,$type);
    public function comment($data,$id);
    public function like($id);
    public function delete($blog_id,$id,$type);
}