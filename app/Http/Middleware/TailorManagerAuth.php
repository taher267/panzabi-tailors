<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TailorManagerAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::user()->status){
            if(session('utype')==='ADM' || session('utype')==='MGR'){

                // dd(session('utype'));
                return $next($request);
            }
        }else{
            session()->flush();
            return redirect()->route('login')->withErrors('Account is pending!');
        }
        return $next($request);
    }
}
