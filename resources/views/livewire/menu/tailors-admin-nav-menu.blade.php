<div>
    <!-- Sidebar - Brand -->
     <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{route('home')}}">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-home"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Panzabi.com Tailors</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
        <a class="nav-link" href="{{route('admin.dashboard')}}">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
        Interface
    </div>
    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#customerOrder"
            aria-expanded="true" aria-controls="customerOrder">
            <i class="fas fa-fw fa-user"></i>
            <span>অর্ডার @auth @if (session('utype')==='ADM' && Auth::user()->role_id ===1) <span class="text-light bg-danger p-1 rounded d-inline-block">{{DB::table('orders')->count()}}</span> @endif @endauth</span>
        </a>
        <div id="customerOrder" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item" title="নতুন গ্রাহক, অর্ডার এবং আইটেম" href="{{route('customer.all.orders')}}">সকল অর্ডার</a>
                {{-- <a class="collapse-item" title="সকল সকল" href="{{route('customer.customers')}}">সকল সকল</a> --}}
                
                {{-- <a class="collapse-item" href="cards.html">All Customers</a> --}}
            </div>
        </div>
    </li>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#customerCustomer"
            aria-expanded="true" aria-controls="customerCustomer">
            <i class="fas fa-fw fa-user"></i>
            <span>গ্রাহক @auth @if (session('utype')==='ADM' && Auth::user()->role_id ===1) <span class="text-light bg-danger p-1 rounded d-inline-block">{{$customers->count()}}</span> @endif @endauth</span>
        </a>
        <div id="customerCustomer" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item" title="নতুন গ্রাহক, অর্ডার এবং আইটেম" href="{{route('new.customer')}}">নতুন গ্রাহক, অর্ডার এবং আইটেম</a>
                <a class="collapse-item" title="সকল সকল" href="{{route('customer.customers')}}">সকল গ্রাহক</a>
                
                {{-- <a class="collapse-item" href="cards.html">All Customers</a> --}}
            </div>
        </div>
    </li>

    <!-- Nav Item - Utilities Collapse Menu -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
            aria-expanded="true" aria-controls="collapseUtilities">
            <i class="fas fa-fw fa-wrench"></i>
            <span>Utilities</span>
        </a>
        <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Custom Utilities:</h6>
                <a class="collapse-item" href="utilities-color.html">Colors</a>
                <a class="collapse-item" href="utilities-border.html">Borders</a>
                <a class="collapse-item" href="utilities-animation.html">Animations</a>
                <a class="collapse-item" href="utilities-other.html">Other</a>
            </div>
        </div>
    </li>


    {{--============================= ADMIN AREA======================= --}}
    @if ( Auth::user()->role_id === 1) {{-- && Request::is('admin*') --}}

        <!-- Divider -->
    <hr class="sidebar-divider">
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#advancedAdmin"
            aria-expanded="true" aria-controls="advancedAdmin">
            <i class="fas fa-fw fa-wrench"></i>
            <span>Advanced</span>
        </a>
        <div id="advancedAdmin" class="collapse" aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Just those are Admin!</h6>
                <a class="collapse-item" href="{{route('admin.productmanager')}}">Products Fields</a>
                <a class="collapse-item" href="{{route('admin.measuremanager')}}">Measurment Fields</a>
                <a class="collapse-item" href="{{route('admin.stylemeasure')}}">Style Measurment</a>
                <a class="collapse-item" href="{{route('admin.users')}}">Users</a>
                <a class="collapse-item" href="{{route('admin.roles')}}">Roles</a>
                {{-- <a class="collapse-item" href="{{route('admin.productmanager')}}">Products Fields</a> --}}

            </div>
        </div>
    </li>
    @endif


    {{-- @if (Route::has('login'))
            @auth
               //code
            @else
                @if (Route::has('register'))
                //code
                @endif
            @endauth
        </div>
    @endif --}}

    {{-- @if (Route::has('login'))
        <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
            @auth
                <a href="{{ url('/dashboard') }}" class="text-sm text-gray-700 underline">Dashboard</a>
            @else
                <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Log in</a>

                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
                @endif
            @endauth
        </div>
    @endif --}}

</div>
