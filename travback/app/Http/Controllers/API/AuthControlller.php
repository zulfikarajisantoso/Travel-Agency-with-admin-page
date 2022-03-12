<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthControlller extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8'
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validator_errors' => $validator->getMessageBag(),
            ]);
        }
        else{
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_as' => $request->role_as,

            ]);
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response() -> json([
                'status' => 200,
                'username' => $user->name,
                'token'=> $token,
                'message' => 'Register Successfully'
            ]);
        }
        
        
    }
    
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required',

        ]);
        if($validator->fails())
        {
            return response()->json([
                'validator_errors'=> $validator->getMessageBag(),
            ]);
        }
        else{


            $user = User::where('email', $request->email)->first();
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                   'status' => 401,
                    'message' => 'Password or Email False'
                ]);
            }
            else 
            {

                if ($user->role_as == 1)
                 {
                  
                    $role = 'admin';
                   $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }
                else
                {
                    $role = '';
                    $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;

                }
               
                return response() -> json([
                    'status' => 200,
                    'username' => $user->name,
                    'token'=> $token,
                    'message' => 'Loggin Successfully',
                    'role' => $role
                  
                ]);
            }

        }

    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logout Success'
        ]);
    }
}
