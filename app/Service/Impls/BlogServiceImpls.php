<?php
namespace App\Service\Impls;

use App\DAO\BlogDAO;
use App\Models\Blogs;
use App\Models\User;
use App\Service\BlogService;
use App\Service\ReactionService;

class BlogServiceImpls implements BlogService{

    private ReactionService $reactionservice;
    private BlogDAO $blogDao;
    private $user;

    public function __construct(BlogDAO $bdao,ReactionService $service)
    {
        $this->reactionservice = $service;
        $this->user = auth('sanctum')->user();
        $this->blogDao= $bdao;
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
        if(count($blogs) == 0){
            return [];
        }
        return $this->reponseData($blogs)[0];
    }
    public function create($data){
        $blog = $this->blogDao->create($data);
        return [
            'ok' => true,
            'message' => 'Create blogs success!',
            'data' => $blog,
            'code' => 200
        ];
    }
    public function update($id,$data){
        $data = $this->blogDao->update($id,$data);
        return [
            "data"=>$data['data'],
            "message"=>$data['message']
        ];
    }
    public function delete($id){
        
    }

    private function reponseData($blogs){
        $data = [];
        foreach($blogs as $blog){
            array_push($data,[
                'blogs'=>$blog,
                'likes'=>$this->reactionservice->get($blog->id,'like'),
                'comments'=>$this->reactionservice->get($blog->id,'comment'),
            ]);
        }
        return $data;
    }

    public function search($search)
    {
        $blogs = Blogs::where('del_flag','!=',true)->where('title','LIKE','%'.$search.'%')->get();

        return $this->reponseData($blogs);
    }
}