<?php
namespace App\Service\Impls;

use App\DAO\BlogDAO;
use App\Models\Blogs;
use App\Models\User;
use App\Service\BlogService;
use App\Service\ReactionService;
use Illuminate\Support\Facades\Storage;

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
        
        if(!$blogs){
            return [];
        }
        $filename = $blogs->body .'.json';

        $path = storage_path('app/public/blogs')."/${filename}";
        $json = json_decode(file_get_contents($path),true);

        return $this->reponseData([$blogs],$json)[0];
    }
    public function create($data){
        $blog = $this->blogDao->create($data->only('title','type','description','body'));
        Storage::disk('blogs')->put($data['body'].'.json', json_encode($data['data']));
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

    private function reponseData($blogs,$extraData = []){
        $data = [];
        foreach($blogs as $blog){
            array_push($data,[
                'blogs'=>$blog,
                'likes'=>$this->reactionservice->get($blog->id,'like'),
                'comments'=>$this->reactionservice->get($blog->id,'comment'),
                'postData'=> count($extraData) > 0 ? $extraData : null
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