<?php
namespace App\Service\Impls;

use App\DAO\BlogDAO;
use App\DAO\UserDAO;
use App\Models\Blogs;
use App\Models\User;
use App\Service\BlogService;
use App\Service\ReactionService;
use App\Utils\FileUtils;
use GrahamCampbell\ResultType\Success;
use Illuminate\Support\Facades\Storage;

class BlogServiceImpls implements BlogService{

    private ReactionService $reactionservice;
    private BlogDAO $blogDao;
    private UserDAO $userDao;
    
    private $user;

    public function __construct(BlogDAO $bdao,ReactionService $service, UserDAO $userdao)
    {
        $this->reactionservice = $service;
        $this->user = auth('sanctum')->user();
        $this->blogDao= $bdao;
        $this->userDao = $userdao;
    }

    public function getAll(){
        return $this->reponseData($this->blogDao->getAll());
    }
    public function getMyBlogs()
    {
        $blogs = $this->blogDao->getUserBlogs();
        return $this->reponseData($blogs);
    }
    public function get($id){
        $blogs = $this->blogDao->getById($id);
        
        if(!$blogs){
            return [];
        }
        $filename = $blogs->body .'.json';

        $path = storage_path('app/public/blogs')."/${filename}";
        
        $json = file_exists($path) ? json_decode(file_get_contents($path),true):[];

        return $this->reponseData([$blogs],$json)[0];
    }
    public function create($data){
        $blog = $this->blogDao->create($data->only('title','type','description','body'));

        FileUtils::createDiskFile($data['body'].'.json',json_encode($data['data']));

        return [
            'ok' => true,
            'message' => 'Create blogs success!',
            'data' => $blog,
            'code' => 200
        ];
    }
    public function editRequest($id)
    {
        $blog = $this->userDao->getUserBlogById($id);
        if($blog){
            return true;
        }else{
            return false;
        }
    }
    public function update($id,$data){
        $blog = $this->blogDao->update($id,$data->only('title','type','description','body'));
        FileUtils::replaceDiskFile($data['body'].'.json',json_encode($data['data']));
        return [
            "data"=>$data['data'],
            "message"=>$data['message'],
            "data"=>$blog
        ];
    }
    public function delete($id){
        $blog = $this->blogDao->getById($id);
        if($blog){
            $filename = $blog->body.'.json';
            if(file_exists($filename))
                FileUtils::deleteDiskFile($filename);
            return [
                'success'=>true,
                'message'=>'Delete blog success',
                'data'=> $this->blogDao->delete($id)
            ];

        }else{
            return [
                'success'=>false
            ];
        }
        // $deldata = $this->blogDao->delete($id);
        // if($deldata['success']){

        // }else{

        // }
        
    }

    private function reponseData($blogs,$extraData = []){
        $data = [];
        foreach($blogs as $blog){
            array_push($data,[
                'blogs'=>$blog,
                'likes'=>$this->reactionservice->get($blog->id,'like'),
                'comments'=>$this->reactionservice->get($blog->id,'comment'),
                'postData'=> count($extraData) > 0 ? $extraData : []
            ]);
        }
        return $data;
    }

    public function search($search)
    {
        $blogs = $this->blogDao->search($search);
        return $this->reponseData($blogs);
    }
}