<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PayOS\PayOS;
use Illuminate\Http\JsonResponse;

class PayosPaymentController extends Controller
{
    public function createPaymentLinkPayos(Request $request): JsonResponse
    {
        $payOS = new PayOS(env('PAYOS_CLIENT_ID'), env('PAYOS_API_KEY'), env('PAYOS_CHECKSUM_KEY'));
        $items = [];
        foreach ($request->orderItemsData as $orderItem) {
            $items[] = [
                "name" => $orderItem['book']['title'],
                "quantity" => $orderItem['quantity'],
                "price" => $orderItem['book']['price'],
            ];

        }

        $data = [
            "orderCode" => $request->orderId,
            "amount" => $request->total,
            "description" => "VKU-BookStore " . $request->orderId,
            "items" => $items,
            "returnUrl" => "http://localhost:5173/order/" . $request->orderId . "/payos_checkout",
            "cancelUrl" => "http://localhost:5173/order/" . $request->orderId . "/payos_checkout",
        ];

        try {
            $url = $payOS->createPaymentLink($data);
            return response()->json($url);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

}
