<?php

namespace App\Http\Middleware;
use App\Providers\RouteServiceProvider;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TailorsAuth
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
        // dd(Auth::user()->role_id);
        if(! session('utype') && 6 != Auth::user()->role_id ){
            if (Auth::user()->role_id <= 6) {
                if (Auth::user()->role_id ===1 ) {
                    session(['utype' => 'ADM']);
                }
                elseif (Auth::user()->role_id === 2 ) {
                    session(['utype' => 'MGR']);
                }
                elseif (Auth::user()->role_id === 3) {
                    session(['utype' => 'AHR']);
                }
                elseif (Auth::user()->role_id === 4) {
                    session(['utype' => 'EDT']);
                }
                elseif (Auth::user()->role_id === 5) {
                    session(['utype' => 'CTB']);
                }

            }else{
                if ( session('utype') === 'ADM' || session('utype') === 'AHR' || session('utype') === 'EDT' || session('utype') === 'MGR' || session('utype') === 'CTB'){
                    return $next($request);

                    }
                    elseif ( session('utype') === 'USR' ){
                       return redirect()->route('dashboard');
                    }
                    else{
                       session()->flush();
                       return redirect()->route('login');
                    }
                }
        }

        if( Auth::user()->role_id==6 ){
           return redirect(RouteServiceProvider::HOME);
        }

         return $next($request);
    }
}
