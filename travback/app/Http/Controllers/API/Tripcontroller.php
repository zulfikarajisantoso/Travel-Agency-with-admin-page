<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class Tripcontroller extends Controller
{
    
    public function addtrip(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'lokasi' => 'required|max:191',
            'harga' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:4048',
        ]);

        if($validator -> fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->getMessageBag(),
            ]);
        }
        else
        {
            $trips = new Trip;
            $trips->category_id = $request->input('category_id');
            $trips->name = $request->input('name');
            $trips->harga = $request->input('harga');
            $trips->description = $request->input('description');
            $trips->lokasi = $request->input('lokasi');

            if($request -> hasFile('image'))
            {
                $file= $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move('uploads/', $filename);
                $trips->image = 'uploads/'.$filename;
            }
            
            $trips->popular = $request->input('popular')  ;
            $trips->save();

            return response()->json([
                'status' => 200,
                'message' => 'Product Add New Trip',
            ]);
        
        }

    }
    public function index ()
    {
        $trip = Trip::all();
        return response()->json([
            'status' => 200,
            'tripp' => $trip
        ]);
    }

    public function destroy($id)
    {
        $trips = Trip::find($id);
        if($trips)
        {
            $trips->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Success Delete'
            ]);
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'No Category Found'
            ]);
        }
    }

    public function editrip($id)
    {
        $trips = Trip::find($id);
        if($trips)
        {
            return response()->json([
                'status' => 200,
                'tripp' => $trips
            ]);
            
        }
        else{
            
            return response()->json([
                'status'=> 404,
                'message'=>'Object not found'
            ]);
        }
    }

    public function updatetri(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
        
            'name' => 'required|max:191',
            'lokasi' => 'required|max:191',
            'harga' => 'required',
            'description' => 'required',
            // 'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if($validator -> fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->getMessageBag(),
            ]);
        }
        else
        {

            $trips = Trip::find($id) ;
            if($trips)
            {
             
                $trips->category_id = $request->input('category_id');
                $trips->name = $request->input('name');
                $trips->harga = $request->input('harga');
                $trips->description = $request->input('description');
                $trips->lokasi = $request->input('lokasi');

            if($request->hasFile('image'))
            {
                $path = $trips->image;
                if(File::exists ($path))
                {
                    File::delete($path); 
                }
                $file= $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move('uploads/', $filename);
                $trips->image = 'uploads/'.$filename;
            }
        
            $trips->popular = $request->input('popular');
            $trips->update();
            
            return response()->json([
                'status' => 200,
                'message' => 'Product Update Success',
            ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product Not Found',
                ]);    
            }
        } 
    }

    public function trippopular()
    {
        $popular = Trip::where('popular', '1')->get();
        return response()-> json([
            'status' => 200,
            'popular' => $popular,
        ]);
    }

}
 