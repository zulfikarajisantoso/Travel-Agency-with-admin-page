<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Trip;
use Illuminate\Http\Request;

class Frontcontrol extends Controller
{
    public function index()
    {
        $trip = Trip::all();
        return response()-> json([
            'status' => 200,
            'tripp' => $trip,
        ]);
    }
    public function detaitrip($category, $destinasi)
    {
        $category = Category::where('category', $category)->first();
        if($category)
        {
            $destinasi = Trip::where('category_id', $category->id)
                            ->where('id', $destinasi)->first();
            
            if($destinasi)  
            {
                return response()->json([
                    'status' => 200,
                    'destinasi' => $destinasi
                ]);
            }
            else{
                return response()->json([
                    'status' => 400,
                    'message' => 'No Trip Aviable'
                ]);
            }
                            
        }   
        {
            return response()->json([
                'status' => 404,
                'message' => 'No such Category Found'
            ]);
        }
    }   

    public function viewcat()
    {
        $categor = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $categor
        ]);
    }

    public function viewcaprod($category)
    {
        $catego = Category::where('category', $category)->first();
        if($catego)
        {
            $trips = Trip::where('category_id', $catego->id)->get();
            if($trips)
            {
                return response()->json([
                    'status' => 200,
                    'trip_data' => [
                        'trip' => $trips,
                        'category' => $catego
                    ]
                ]);
            }
            else{
                return response()->json([
                    'status' => 400,
                    'message' => 'No Trip Aviable'
                ]);
            }
        }
        return response()->json([
            'status' => 404,
            'message' => 'No such Category Found'
        ]);
    }

}

