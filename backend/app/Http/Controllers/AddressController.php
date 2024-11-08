<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Http\JsonResponse;

class AddressController extends Controller
{
    // Get all addresses for the authenticated user
    public function getAllAddresses(Request $request): JsonResponse
    {
        $user = auth()->user();
        $addresses = Address::where('userId', $user->id)->get();

        if ($addresses->isEmpty()) {
            return response()->json(['message' => 'No addresses found'], 404);
        }

        return response()->json($addresses);
    }

    // Add a new address for the authenticated user
    public function addAddress(Request $request): JsonResponse
    {
        $request->validate([
            'addressAlias' => 'required|string',
            'recipientName' => 'required|string',
            'province' => 'required|string',
            'district' => 'required|string',
            'ward' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
        ]);

        $user = auth()->user();

        $address = Address::create([
            'userId' => $user->id,
            'addressAlias' => $request->addressAlias,
            'recipientName' => $request->recipientName,
            'province' => $request->province,
            'district' => $request->district,
            'ward' => $request->ward,
            'address' => $request->address,
            'phone' => $request->phone,
        ]);

        return response()->json(['message' => 'Address added successfully', 'address' => $address], 201);
    }

    public function deleteAddress($addressId): JsonResponse
    {
        $user = auth()->user();
        $address = Address::where('userId', $user->id)->where('id', $addressId)->first();

        if (!$address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        $address->delete();

        return response()->json(['message' => 'Address deleted successfully']);
    }
}
