<?php

namespace App\Http\Controllers\API;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function fetchAllProducts() {
        $products = Product::all();
        return response()->json([
            'status'=> 200,
            'products'=>$products,
        ]);
    }
}
