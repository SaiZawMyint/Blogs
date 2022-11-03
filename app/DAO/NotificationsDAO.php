<?php
namespace App\DAO;

interface NotificationsDAO {
    public function get();
    public function create($data);
    public function update($data);
    public function delete($id);
    public function hasUnseen():bool;
}