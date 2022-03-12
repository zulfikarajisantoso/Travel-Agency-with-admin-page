<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;

use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Categorycontroller extends Controller
{
    public function store (Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required|max:191',
            'description' => 'required|max:100',
        

        ]);
        if($validator->fails())
        {
            return response()-> json([
                'status' => 400,
                'error' => $validator->getMessageBag(),
            ]);
        }
        else{
            $category = new Category;
            $category->category = $request->input('category');
            $category->description = $request->input('description');
            
            $category->save();
            return response()->json([
                'status' => 200,
                'message' => 'Succes Add Category'
            ]);
        }
    }

    public function index ()
    {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }
    public function allcat ()
    {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }

    public function delete($id)
    {
        $category = Category::find($id);
        if($category)
        {
            $category->delete();
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

    public function editcat($id)
    {
        $category = Category::find($id);
        
        if($category)
        {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        }
        else {
            return response()->json([
                'status'=> 404,
                'message'=>'Object not found'
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required|max:191',
            'description' => 'required|max:191',

        ]);

        if($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->getMessageBag()
            ]);
        }
        else {
            $category = Category::find($id);
            if($category)
            {
                $category->category = $request->input('category');
                $category->description = $request->input('description');
             
                $category->update();

                 
                return response()->json([
                    'status' => 200,
                    'message' => 'Product Update Success',
                ]);
                

            }
            else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product Not Found',
                ]);    
            }
        }
        
        
    }
   
}
 