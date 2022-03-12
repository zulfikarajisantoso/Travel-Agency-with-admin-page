<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class Paymentcontroller extends Controller
{
    public function pay(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $validator = Validator::make($request->all(), [
                'fullname' => 'required',
                'accountnumber' => 'required|max:191',               
                'image' => 'required|image|mimes:jpeg,png,jpg|max:4048',
            ]);
            if($validator->fails())
            {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->getMessageBag(),
                ]);
            }
            else{
                $user_id = auth('sanctum')->user()->id;
                $paymen = new Payment();
                $paymen->user_id = $user_id;
                $paymen->fullname = $request->fullname;
                $paymen->accountnumber = $request->accountnumber;    
                
                if($request -> hasFile('image'))
                {
                    $file= $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time().'.'.$extension;
                    $file->move('uploads/', $filename);
                    $paymen->image = 'uploads/'.$filename;
                }            
                        
                $paymen->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Thank you and waiting for confirmation'
                ]);

            }
        }
        else
        {         
            return response()->json([
                'status'=>401,
                'message'=> 'Login First'
            ]);
        
        }
    }

    public function viewpay()
    {
        $pay = Payment::all();
        return response()->json([
            'status' => 200,
            'payment' => $pay
        ]);
        
    }
}
