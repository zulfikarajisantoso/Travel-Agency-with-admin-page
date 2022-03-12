<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Testi;
use Illuminate\Http\Request;


class Testimonials extends Controller
{
    public function add(Request $request)
    {
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
