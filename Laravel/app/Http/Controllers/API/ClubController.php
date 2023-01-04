<?php

namespace App\Http\Controllers\API;
use App\Models\Club;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    
    public function fetchAllClubs() {
        $clubs = Club::all();
        return response()->json([
            'status'=> 200,
            'clubs'=>$clubs,
        ]);
    }

    public function deleteClub(Request $request, $id)
    {
        $club = Club::find($id);
        $club->delete();

        return response()->json([
            'status'=> 200,
            'message'=>'Post Deleted Successfully'
        ]);

    }

}
