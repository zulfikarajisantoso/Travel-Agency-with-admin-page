<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Http\Request;

class Dashcontroller extends Controller
{
    public function totaluser()
    {
        $use = User::all()->count();
        if($use)
        {
            return response()->json([
                'status'=> 200,
                'user'=> $use
            ]);
        }   
    }
    public function totaldestinasi()
    {
        $desti = Trip::all()->count();
        if($desti)
        {
            return response()->json([
                'status'=> 200,
                'destinasi'=> $desti
            ]);
        }   
    }
    public function totalcategory()
    {
        $cate = Category::all()->count();
        if($cate)
        {
            return response()->json([
                'status'=> 200,
                'category'=> $cate
            ]);
        }   
    }
    public function totalorder()
    {
        $orde = Order::all()->count();
        if($orde)
        {
            return response()->json([
                'status'=> 200,
                'order'=> $orde
            ]);
        }   
    }
}
