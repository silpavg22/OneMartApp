<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserAuthController extends Controller
{
    public function sendMail(Request $request){
        $data = [
                'Name'  => $request->input('name'),
                'Email' => $request->input('email'),
                ];
        
                Mail::send('email.name', ['data1' => $data], function ($m) {
         
            $m->to('silpavg22@gmail.com')->subject('Congragulations !!!   You have been registered on Onemart!!!');
    });
        //Json Response For Angular frontend
        return response()->json(["message" => "Email sent successfully."]);
    }
}
