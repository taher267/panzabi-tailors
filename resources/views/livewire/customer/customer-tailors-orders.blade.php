<div>
    <style>.active-cyan-2 input.form-control[type=text]:focus:not([readonly]) {border-bottom: 1px solid #4dd0e1;box-shadow: 0 1px 0 0 #4dd0e1;}</style>
    <div class="row">
        
    </div>
        <div class="container my-4">
            <div class="row">
                <div class="col-xl-3"><a class="btn btn-facebook" href="">Add New Order</a></div>
                <div class="col-xl-3"><a class="btn btn-facebook" href="#">Today's Orders</a></div>
                <div class="col-xl-3"><a class="btn btn-outline-primary" href="">Google</a></div>
                <div class="col-xl-3 md-form active-cyan-2">
                    <form class="was-validated">
                        <input class="form-control" type="search" placeholder="Customer search..." wire:model="searchBy" aria-label="Search" required>
                    </form>
                </div>
            </div>
        </div>
        <div class="product_role_container container-fluid">
            <!-- DataTales Example -->
            <div class="card shadow mb-4">
                <div class="card-header">
                    <h3 class="heading text-center"> @if ( sizeof($specificCustomer) >0 )Searching... <span class="text-success">Find {{sizeof($specificCustomer)}} result{{sizeof($specificCustomer)>1 ?'s':''}}</span> @elseif($customers)All Customers information @endif</h3>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr><th>ID</th><th>Name</th><th>Mobile</th><th>Photo</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                @if ( sizeof($specificCustomer) >0 )
                                    @foreach ($specificCustomer as $customer)
                                        
                                            <tr>
                                                <td>{{ $customer->id }}</td> <td>{{ $customer->Full_Name }}</td> <td>{{ $customer->mobile }}</td>
                                                <td>@if($customer->photo)<img class="img-thumbnail" style="width:120px;" src="{{asset("storage/assets/customers/$customer->photo") }}" alt="Photo"> @endif</td>
                                                <td>
                                                    <a href="{{route('customer.neworder', $customer->id)}}" target="_blank" class="btn btn-google"><i class="fa fa-plus"></i> New Order</a>
                                                    <a href="{{route('customer.orders', $customer->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i>Orders</a>
                                                    <a href="{{route('customer.details', $customer->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                                    {{-- <a href="{{route('customer.editinfo', $customer->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                                    @if(session('utype')==='ADM')<a href="#" wire-:click.prevent="productDelete({{$customer->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>@endif --}}
                                                </td>
                                            </tr>
                                    @endforeach
                                    @elseif ($customers)
                                    @foreach ($customers as $customerinfo)
                                    {{-- @if ($customerinfo->created_at >= Carbon\Carbon::today()->setTimezone('Asia/dhaka') && $customerinfo->created_at <= Carbon\Carbon::today()->addDays()->setTimezone('Asia/dhaka')) --}}
                                    <tr  @if ($customerinfo->created_at >= Carbon\Carbon::today()->setTimezone('Asia/dhaka') && $customerinfo->created_at <= Carbon\Carbon::today()->addDays()->setTimezone('Asia/dhaka')) style="background: #4dd0e1;"@endif>
                                        <td>{{ $customerinfo->id }} <span>{{ $customerinfo->created_at }}</span></td> <td>{{ $customerinfo->Full_Name }}</td> <td>{{ $customerinfo->mobile }}</td><td>@if($customerinfo->photo)<img class="img-thumbnail" style="width:120px;" src="{{ asset("storage/assets/customers/$customerinfo->photo") }}" alt="Photo"> @endif</td>

                                        <td>
                                            <a href="{{route('customer.neworder', $customerinfo->id)}}" target="_blank" class="btn btn-google"><i class="fa fa-plus"></i> New Order</a>
                                            <a href="{{route('customer.orders', $customerinfo->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i>Orders</a>
                                            <a href="{{route('customer.details', $customerinfo->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                            {{-- <a href="{{route('customer.editinfo', $customerinfo->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                            @if(session('utype')==='ADM')<a href="#" wire-:click.prevent="productDelete({{$customerinfo->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>@endif --}}
                                        </td>
                                    </tr>
                                    {{-- @else 
                                    <tr>
                                        <td>{{ $customerinfo->id }} <span>{{ $customerinfo->created_at }}</span></td> <td>{{ $customerinfo->Full_Name }}</td> <td>{{ $customerinfo->mobile }}</td><td>@if($customerinfo->photo)<img class="img-thumbnail" style="width:120px;" src="{{ asset("storage/assets/customers/$customerinfo->photo") }}" alt="Photo"> @endif</td>

                                        <td>
                                            <a href="{{route('customer.neworder', $customerinfo->id)}}" target="_blank" class="btn btn-google"><i class="fa fa-plus"></i> New Order</a>
                                            <a href="{{route('customer.orders', $customerinfo->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i>Orders</a>
                                            <a href="{{route('customer.details', $customerinfo->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                            <a href="{{route('customer.editinfo', $customerinfo->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                            @if(session('utype')==='ADM')<a href="#" wire-:click.prevent="productDelete({{$customerinfo->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>@endif
                                        </td>
                                    </tr>
                                    @endif  --}}
                                    @endforeach
                                @endif
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
        <div class="col-xl-12">
            {{-- where('created_at', 'like', '2015-08-20%')->get()User::whereDate('created_at', '=', Carbon::today()->toDateString()); --}}
            <h1>Todays new Customer({{Carbon\Carbon::today()->format('Y-m-d')}})</h1>
            @if ( sizeof($customers) >0 )
            <table class="table table-striped table-inverse">
                <thead class="thead-inverse">
                    <tr>
                        <th>Date</th><th>Name</th><th>Phone</th><th>Photo</th><th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach ($customers as $todaysCustomer)
                            @if ($todaysCustomer->created_at >= Carbon\Carbon::today()->setTimezone('Asia/dhaka') && $todaysCustomer->created_at <= Carbon\Carbon::today()->addDays()->setTimezone('Asia/dhaka'))
                            <tr>
                                <td>{{ Carbon\Carbon::parse($todaysCustomer->created_at)->format('Y-m-d') }}</td> <td>{{ $todaysCustomer->Full_Name }}</td> <td>{{ $todaysCustomer->mobile }}</td><td>@if($todaysCustomer->photo)<img class="img-thumbnail" style="width:120px;" style="width:120px;" src="{{ asset("storage/assets/customers/$todaysCustomer->photo") }}" alt="Photo"> @endif</td>

                                <td>
                                    <a href="{{route('customer.neworder', $todaysCustomer->id)}}" target="_blank" class="btn btn-google"><i class="fa fa-plus"></i> New Order</a>
                                    <a href="{{route('customer.orders', $todaysCustomer->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i>Orders</a>
                                    <a href="{{route('customer.details', $todaysCustomer->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                    {{-- <a href="{{route('customer.editinfo', $todaysCustomer->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-edit"></i></a> --}}
                                    {{-- @if(session('utype')==='ADM')<a href="#" wire-:click.prevent="producpelete($todaysCustomer->id)" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>@endif --}}
                                </td>
                            </tr>
                            @endif
                        @endforeach
                </tbody>
            </table>
            @endif
        </div>
        </div>
</div>
