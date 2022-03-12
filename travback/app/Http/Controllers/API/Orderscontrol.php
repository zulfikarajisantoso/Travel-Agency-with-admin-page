<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Trip;
use Illuminate\Contracts\Validation\Validator as ValidationValidator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Orderscontrol extends Controller
{   
    public function checkoutt(Request $request)
    {
        
        if(auth('sanctum')->check())
        {
            
            
            $validator = Validator::make($request->all(), [
                'name'=> 'required|max:191',
                'contact'=> 'required|max:191',
                'date'=> 'required|date',
                'qty'=> 'required',               
         
            ]);
            if($validator->fails())
                {
                    return response()->json([
                        'status'=>422,
                        'error'=> $validator->getMessageBag()
                    ]);
                }
                else {
                   
                    $user_id = auth('sanctum')->user()->id;
                    $trip_id = $request->trip_id;
                    
                    $trip = Category::where('id', $trip_id)->first();
                    if($trip)
                    {
                        if(Order::where('trip_id', $trip_id)->where('user_id', $user_id)->exists())
                        {
                            return response()->json([
                                'status'=>409,
                                'message'=>  $trip->name.  'Already Add to Orders'
                            ]);
                        }
                        else{

                        
                            $order = new Order;                           
                            $order->user_id = $user_id;                                            
                            $order->trip_id = $request->trip_id;
                            $order->name = $request->name;
                            $order->contact = $request->contact;
                            $order->date = $request->date;
                            $order->qty = $request->qty;
                            $order->save();
        
                          
                            return response()->json([
                                'status'=>200,
                                'message'=> 'Succes Checkout'
                            ]);
                        }
                    }
                    else {
                        return response()->json([
                            'status'=>404,
                            'message'=> 'Product Not Found'
                        ]);  
                    }    
                   
                }
            
                
        }
        else{
            
           
                return response()->json([
                    'status'=>401,
                    'message'=> 'Login First'
                ]);
            
        }
    }
    public function ordeview()
    {
        if(auth('sanctum')->check())
        {
            
            $order = Order::all();
            return response()->json([
                'status' => 200,
                'orderr' => $order,
            ]);
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to view order'
            ]);
        }
    }

    public function canceltrip($order_id)
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $orderrs = Order::where('id', $order_id)->where('user_id', $user_id)->first();

            if($orderrs)
            {
                $orderrs->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Success remove order'
                ]);
            }
            else{
                
                return response()->json([
                    'status' => 404,
                    'message' => 'Order not Found'
                ]);
            }

        }
        else{
            return response()->json([
                'status' => 401,
                'message' => 'Login First'
            ]);
        }
    }
     
    public function chekoutconfirm($id)
    {
        $orderr = Order::find($id);
        
            if($orderr)
            {
                 return response()->json([
                'status' => 200,
                'order' => $orderr
                ]);
            }
            return response()->json([
                'status'=> 404,
                'message'=>'Object not found'
            ]);
        
    }

    public function chekoutupdate(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|max:191',
           
        ]);
        if($validator -> fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->getMessageBag(),
            ]);
        }
        else{
            
            $tripp = Order::find($id);
            
            if($tripp)
            {
                $tripp->status = $request->input('status');
                $tripp->update();
            

                return response()->json([
                    'status' => 200,
                    'message' => 'Success Confirm'
                ]);
            }
            else
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product Not Found',
                ]);    
            }

        }

    }


}

