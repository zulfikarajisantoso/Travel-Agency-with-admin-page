<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Testi;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class Testimonialscon extends Controller
{
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:50',
            'asal' => 'required|max:100',
            'ulasan' => 'required|max:191',
            
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errorr'=> $validator->getMessageBag()
            ]);
        }
        else{
            $testi = new Testi;
            $testi->name = $request->input('name');
            $testi->asal = $request->input('asal');
            $testi->ulasan = $request->input('ulasan');
            $testi->bintang = $request->input('bintang');
            $testi->save();
            return response()->json([
                'status' => 200,
                'message' => 'Succes Add Testimonials'
            ]);
        }
        

        
    }
    public function viewtesti ()
    {
        $testi = Testi::all();
        return response()->json([
                'status' => 200,
                'testi' => $testi
        ]);
        
    }

    public function destroytesti($id)
    {
        $testi = Testi::find($id);
        if($testi)
        {
            $testi->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Success Delete'
            ]);
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'Object not Found'
            ]);
        }
    }
}

