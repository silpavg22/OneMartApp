<?php

namespace App\Http\Controllers\API;
use App\Models\Post;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function savePost(Request $request){
        $post = new Post;
        $post->postid=$request->input('id');
        $post->postimage=$request->input('postimage');
        $post->posttitle=$request->input('posttitle');
        $post->postuserid=$request->input('postuserid');
        $post->postdescription=$request->input('postdescription');
        $post->save();

        return response()->json([
            'status'=> 200,
            'message'=>'Post Created Successfully'
        ]);

    }


    public function fetchAllPosts() {
        $posts = Post::all();
        return response()->json([
            'status'=> 200,
            'posts'=>$posts,
        ]);
    }

    public function deletePost(Request $request, $id)
    {
        $post = Post::find($id);
        $post->delete();

        return response()->json([
            'status'=> 200,
            'message'=>'Post Deleted Successfully'
        ]);

    }

    
}
