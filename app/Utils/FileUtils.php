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

    //image creation
    public static function createImageFile($filenameToSave,$base64,$storagename = 'images'){
        $base64 = preg_replace('/data:image\/(.*?);base64,/','',$base64);
        $base64 = str_replace(' ', '+', $base64);
        Storage::disk($storagename)->put($filenameToSave,base64_decode($base64));
    }

    public static function checkFileExtension($extension){
        if(str_contains($extension,'+')){
            return substr($extension,0,strripos($extension,'+'));
        }
        return $extension;
    }

    public static function getExtension($base64){
        preg_match("/data:image\/(.*?);/",$base64,$extension);
        return $extension[1];
    }

    public static function randomName($length,$prefix =''){
        // String of all alphanumeric character
        $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        return $prefix.''.substr(
            str_shuffle($str_result),
            0,
            $length
        );
    }

    public static function getBase64Imgae($path){
        $extension = substr($path,strrpos($path,'.')+1,strlen($path));
        $data = file_exists($path) ? 
        base64_encode(file_get_contents($path)):
        '';
        $extension = $extension == 'svg' ? $extension . "+xml" : $extension;
        if(strlen($data) > 0) return "data:image/${extension};base64,${data}";
        return '';
    }
}