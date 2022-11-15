<?php

namespace App\Utils;

use Illuminate\Support\Facades\Storage;
use Stringable;

class FileUtils{
    public static function createDiskFile($filePath,$data,$storagename = 'blogs'){
        Storage::disk($storagename)->put($filePath,$data);
    }
    public static function replaceDiskFile($filePath,$data,$storagename = 'blogs'){
        FileUtils::deleteDiskFile($filePath,$storagename);
        FileUtils::createDiskFile($filePath,$data,$storagename);
    }
    public static function deleteDiskFile($filePath,$storagename = 'blogs')
    {
        Storage::disk($storagename)->delete($filePath);
    }
}