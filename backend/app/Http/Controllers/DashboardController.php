<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function getDashboardMetrics(): JsonResponse
    {
        $totalBooks = Book::count();
        $totalUsers = User::count();
        $totalRevenue = Order::where('status', 'Success')->sum('total');
        $unresolvedOrders = Order::where('status', 'Pending')->count();

        return response()->json([
            'totalBooks' => $totalBooks,
            'totalUsers' => $totalUsers,
            'totalRevenue' => $totalRevenue,
            'unresolvedOrders' => $unresolvedOrders,
        ]);
    }

    public function getChartMetrics(): JsonResponse
    {
        $startDate = Carbon::now()->subDays(6)->startOfDay();
        $endDate = Carbon::now()->endOfDay();
        // Initialize collections to store the counts and revenues for each day
        $dates = collect();
        $orderCounts = collect();
        $revenues = collect();

        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
            $formattedDate = $date->format('d-m-Y');
            $orderCount = Order::whereDate('created_at', $date)->count();
            $dailyRevenue = Order::whereDate('updated_at', $date)
                ->where('status', 'Success')
                ->sum('total');

            $dates->push($formattedDate);
            $orderCounts->push($orderCount);
            $revenues->push($dailyRevenue);
        }

        return response()->json([
            'dates' => $dates,
            'orderCounts' => $orderCounts,
            'revenues' => $revenues,
        ]);
    }

}
