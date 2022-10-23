<?php
namespace App\Service;

interface ReactionService{
    public function get($id,$type);
    public function comment($data,$id);
    public function like($id);
}