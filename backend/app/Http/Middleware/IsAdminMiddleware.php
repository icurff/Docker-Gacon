<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response

    {
        $user = auth()->user();
        if ($user && $user->isAdmin) {
            return $next($request);
        }
        return response()->json(['message' => 'Unauthorized'], 403);

    }
}
