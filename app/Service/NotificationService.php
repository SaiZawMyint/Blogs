<?php
namespace App\Service;

interface NotificationService{
    public function get();
    public function add($data,$type);
    public function seen($id);
    public function remove($id);
}