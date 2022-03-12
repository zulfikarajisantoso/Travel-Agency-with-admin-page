<?php

use App\Http\Controllers\API\AuthControlller;
use App\Http\Controllers\API\Categorycontroller;
use App\Http\Controllers\API\Dashcontroller;
use App\Http\Controllers\API\Frontcontrol;
use App\Http\Controllers\API\Orderscontrol;
use App\Http\Controllers\API\Paymentcontroller;
use App\Http\Controllers\API\Testimonialscon;
use App\Http\Controllers\API\Tripcontroller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register', [AuthControlller::class, 'register']);
Route::post('login', [AuthControlller::class, 'login']);

Route::get('destinasi', [Frontcontrol::class, 'index']);
Route::get('detaildesti/{category}/{destinasi}', [Frontcontrol::class, 'detaitrip']);

Route::get('categoyview', [Frontcontrol::class, 'viewcat' ]);
Route::get('categoyview/{category}', [Frontcontrol::class, 'viewcaprod' ]);

Route::get('alltrippopular', [Tripcontroller::class, 'trippopular' ] );
Route::post('addtesti', [Testimonialscon::class, 'add' ]);
Route::get('viewtesti', [Testimonialscon::class, 'viewtesti' ]);
Route::delete('deletetesi/{id}', [Testimonialscon::class, 'destroytesti' ]);

Route::middleware(['auth:sanctum', 'isapiadmin'])->group ( function () {

    // Category
    Route::post('addcategory', [Categorycontroller::class, 'store' ]);
    Route::get('viewcategory', [Categorycontroller::class, 'index' ]);
    Route::delete('deletecategory/{id}', [Categorycontroller::class, 'delete' ]);
    Route::get('editcategory/{id}', [Categorycontroller::class, 'editcat' ]);
    Route::post('updatecategory/{id}', [Categorycontroller::class, 'update' ]);
    Route::get('allcategory', [Categorycontroller::class, 'allcat' ]);
    
    //Trip 
    Route::post('addtrip', [Tripcontroller::class, 'addtrip' ]);
    Route::get('viewdestinasi', [Tripcontroller::class, 'index' ]);
    Route::delete('deletetrip/{id}', [Tripcontroller::class, 'destroy' ]);
    Route::get('edittrip/{id}', [Tripcontroller::class, 'editrip' ]);
    Route::post('updatetrip/{id}', [Tripcontroller::class, 'updatetri' ]);



    // Testi



    // auth
    Route::get('/checkingauth', function () {
        return response()->json([
            'message' => 'Your are in ',
            'status' => 200
        ], 200);
    });

    // orders

    Route::post('checkout', [Orderscontrol::class, 'checkoutt' ]);
    Route::get('ordeview', [Orderscontrol::class, 'ordeview' ]);
    Route::post('removeorder/{order_id}', [Orderscontrol::class, 'canceltrip' ]);
    Route::get('chekoutconfirm/{id}', [Orderscontrol::class, 'chekoutconfirm' ]);
    Route::post('chekoutupdate/{id}', [Orderscontrol::class, 'chekoutupdate' ]);

    //pay
    Route::post('pay', [Paymentcontroller::class, 'pay' ]);
    Route::get('viewpay', [Paymentcontroller::class, 'viewpay' ]);
    
    // Dashboard
    Route::get('totaluser', [Dashcontroller::class, 'totaluser' ]);
    Route::get('totaldestinasi', [Dashcontroller::class, 'totaldestinasi' ]);
    Route::get('totalcategory', [Dashcontroller::class, 'totalcategory' ]);
    Route::get('totalorder', [Dashcontroller::class, 'totalorder' ]);

    



});
Route::middleware(['auth:sanctum'])->group ( function () {

    Route::post('logout', [AuthControlller::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
