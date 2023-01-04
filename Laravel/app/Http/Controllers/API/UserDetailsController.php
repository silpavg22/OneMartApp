<?php

namespace App\Http\Controllers\API;

use App\Models\UserDetails;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Passport\HasApiTokens;
use HasFactory, Notifiable;
use Illuminate\Support\Str;



class UserDetailsController extends Controller
{
    public function saveUser(Request $request){
        $userdetails = new UserDetails;
        $userdetails->id=$request->input('id');
        $userdetails->name=$request->input('name');
        $userdetails->dob=$request->input('dob');
        $userdetails->address=$request->input('address');
        $userdetails->contact=$request->input('contact');
        $userdetails->email=$request->input('email');
        $userdetails->password=Hash::make($request->input('password'));
        $userdetails->usertype=$request->input('usertype');
        if($request->hasfile('userimage')) {
            $image =$request->file('userimage');
            $extension =$image->getClientOriginalExtension();
            $imagename = time() .'.'.$extension;
            $image->move('uploads/images/', $imagename);
            $userdetails->userimage='uploads/images/'.$imagename;
        }
        $userdetails->save();

        return response()->json([
            'status'=> 200,
            'message'=>'User Created Successfully'
        ]);

    }

    public function fetchUsers() {
        $users = UserDetails::all();
        return response()->json([
            'status'=> 200,
            'users'=>$users,
        ]);
    }

    public function updateUser(Request $request, $userid)
    {
        $userdetails = UserDetails::find($userid);
        if ($userdetails != null) {
            $userdetails->name=$request->input('name');
            $userdetails->dob=$request->input('dob');
            $userdetails->address=$request->input('address');
            $userdetails->contact=$request->input('contact');
            $userdetails->email=$request->input('email');
            $userdetails->password=Hash::make($request->input('password'));
            $userdetails->usertype=$request->input('usertype');
            if ($request->hasfile('userimage')) {
                $image =$request->file('userimage');
                $extension =$image->getClientOriginalExtension();
                $imagename = time() .'.'.$extension;
                $image->move('uploads/images/', $imagename);
                $userdetails->userimage='uploads/images/'.$imagename;
            }
            $userdetails->update();
             
        return response()->json([
            'status'=> 200,
            'message'=>'User Updated Successfully'
            
        ]);
     }
    }

    public function deleteUser(Request $request, $id)
    {
        $userdetails = UserDetails::find($id);
        $userdetails->delete();

        return response()->json([
            'status'=> 200,
            'message'=>'User Deleted Successfully'
        ]);

    }


    public function registerUser(Request $request){
        try {
        $validator = Validator::make($request->all(),[
            'name'=> 'required|max:191',
            'email'=>'required|max:191|unique:userdetails,email',
            'password'=>'required|max:20',
            'contact'=>'required|max:10',
            'address'=> 'required|max:191',
            'dob'=> 'required',

        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else{
            $userdetails = new UserDetails;
            $userdetails->id=$request->input('id');
            $userdetails->name=$request->input('name');
            $userdetails->dob=$request->input('dob');
            $userdetails->address=$request->input('address');
            $userdetails->contact=$request->input('contact');
            $userdetails->email=$request->input('email');
            $userdetails->password=Hash::make($request->input('password'));
            $userdetails->usertype='author';
            if($request->hasfile('userimage')) {
                $image =$request->file('userimage');
                $extension =$image->getClientOriginalExtension();
                $imagename = time() .'.'.$extension;
                $image->move('uploads/images/', $imagename);
                $userdetails->userimage='uploads/images/'.$imagename;
            }
            $userdetails->save();

            $token =Str::random(32);
            
            $data = [
                'Name'  => $request->input('name'),
                'Email' => $request->input('email'),
                ];
        
                Mail::send('mail', ['data1' => $data], function ($m) {
         
            $m->to('silpavg22@gmail.com')->subject('Congratulations !!!   You have been registered on Onemart!!!');
        });


        return response()->json([
            'status'=> 200,
            'token'=>$token,
            'message'=>'User Created Successfully',
            
        ]);
        }

        
        }
        catch (\Exception $e) {

            return $e->getMessage();
        }
    }


    public function loginUser(Request $request){
        $validator = Validator::make($request->all(),[
            'email'=>'required|max:191',
            'password'=>'required|max:20'
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }

        else{
            $userdetails = UserDetails::where('email',$request->email)->first();

            if(!$userdetails  || !Hash::check($request->password,$userdetails->password)){
                return response()->json([
                    'status'=> 401,
                    'message'=>'Invalid User Credentials',
                    
                ]);
            }

            $token =Str::random(32);

            return response()->json([
                'status'=> 200,
                'token'=>$token,
                'user_role'=>$userdetails->usertype,
                'id'=>$userdetails->id,
                'message'=>'Logged In Successfully',
                
            ]);

        }
    }


    public function contactUs(Request $request) {
        $data = [
            'Name'  => $request->input('name'),
            'Email' => $request->input('email'),
            'Message'=> $request->input('message'),
            ];
    
            Mail::send('mailcontactus', ['data1' => $data], function ($m) {
     
        $m->to('silpavg22@gmail.com')->subject('Queries from users');
    });

    

    }


}
