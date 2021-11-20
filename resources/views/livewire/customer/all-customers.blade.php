<div>¿
    <style>div#dataTable_wrapper .row:first-child, div#dataTable_wrapper .row:last-child {
        display: none;} nav.flex.items-center.justify-between svg {width: 15px;} </style>
    <style>.active-cyan-2 input.form-control[type=text]:focus:not([readonly]) {border-bottom: 1px solid #4dd0e1;box-shadow: 0 1px 0 0 #4dd0e1;}
    span.relative.z-0.inline-flex.rounded-md.shadow-sm { display: none; }
    </style>
    <div class="row">
        
    </div>
        <div class="container my-4">
            <div class="row">
                <div class="col-xl-3"><a class="btn btn-facebook" href="{{route('customer.new.customer.order.items')}}"><i class="fa fa-plus"></i> নতুন গ্রাহক যুক্ত করুন</a></div>
                <div class="col-xl-3"><a class="btn btn-facebook" href="#">আজকের যুক্ত গ্রাহক</a></div>
                <div class="col-xl-3"><a class="btn btn-outline-primary" href="">Google</a> <button type="button" wire:click.prevent="AddNewCustomer" class="btn btn-primary" data-toggle="modal" data-target="#addCustomer">Add Custoemr</button></div>
                <div class="col-xl-3 md-form active-cyan-2">
                    <form class="was-validated">
                        <input class="form-control" type="search" placeholder="গ্রাহক অনুসন্ধান..." wire:model.defer="searchBy" aria-label="Search" required>
                    </form>
                </div>
            </div>
        </div>
        <!-- Button trigger modal -->

  
 
        <div class="product_role_container container-fluid">
            <!-- DataTales Example -->
            <div class="card shadow mb-4">
                <div class="card-header">
                    <h3 class="heading text-center"> @if ( sizeof($specificCustomer) >0 )অনুসন্ধান করা হচ্ছে... <span class="text-success"> {{sizeof($specificCustomer)}}টি ফলাফল পাওয়া গেছে</span> @elseif($customers)সমস্ত গ্রাহকদের তথ্য @endif</h3>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        {{-- <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0"> --}}
                            <table class="table table-striped table-sm text-center">
                            <thead>
                                <tr class="text-cneter">
                                    <th>তারিখঃ</th>
                                    <th>নামঃ</th>
                                    <th>মোবাঃ</th>
                                    <th>আকশন</th>
                                  </tr>
                            </thead>
                            <tbody>
                                @if ( sizeof($specificCustomer) >0 )
                                    @foreach ($specificCustomer as $customer)
                                        
                                            <tr>
                                                <td>{{ $customer->id }}</td> <td>{{ $customer->Full_Name }}</td> <td>{{ $customer->mobile }}</td>
                                                {{-- <td class="text-center">@if($customer->photo)
                                                    <img class="mx-auto" style="width:40px;" src="{{asset("storage/assets/customers/$customer->photo") }}" alt="Photo"> @endif
                                                </td> --}}
                                                <td>
                                                    <a href="{{route('customer.neworder', $customer->id)}}" title="{{$customer->Full_Name}} এর নতুন অর্ডার যুক্ত করুন" target="_blank" class="btn btn-google"><i class="fa fa-plus"></i></a>
                                                    <a href="{{route('customer.orders', $customer->id)}}" target="_blank" title="{{$customer->Full_Name}} এর সকল অর্ডার দেখুন" class="btn btn-primary"><i class="fa fa-eye"></i>অর্ডারসমূহ</a>
                                                    <a href="{{route('customer.details', $customer->id)}}" title="গ্রাহক({{$customer->Full_Name}}) এর ব্যক্তিগত তথ্য" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i></a>

                                                    <a href="{{--route('customer.editinfo', $customer->id)--}}" target="_blank" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                                    @if(session('utype')==='ADM')<a href="#" wire-:click.prevent="productDelete({{$customer->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>@endif
                                                </td>
                                            </tr>
                                    @endforeach
                                    
                                    @elseif ($customers)
                                    @foreach ($customers as $customerinfo)
                                    {{-- @if ($customerinfo->created_at >= Carbon\Carbon::today()->setTimezone('Asia/dhaka') && $customerinfo->created_at <= Carbon\Carbon::today()->addDays()->setTimezone('Asia/dhaka')) --}}
                                    <tr  @if ($customerinfo->created_at >= Carbon\Carbon::today()->setTimezone('Asia/dhaka') && $customerinfo->created_at <= Carbon\Carbon::today()->addDays()->setTimezone('Asia/dhaka')) style="background: #2597cf; color:#fff"@endif>
                                        <td>{{-- $customerinfo->id--}} <span>{{Carbon\Carbon::now('Asia/Dhaka')->format('d-M-Y',$customerinfo->created_at) }}</span></td> <td>{{ $customerinfo->Full_Name }}</td> <td>{{ $customerinfo->mobile }}</td>
                                        {{-- <td>@if($customerinfo->photo)<img class="mx-auto" style="width:40px;" src="{{ asset("storage/assets/customers/$customerinfo->photo") }}" alt="Photo"> @endif</td> --}}

                                        <td>
                                            <a href="{{route('customer.neworder', $customerinfo->id)}}" title="{{$customerinfo->Full_Name}} এর নতুন অর্ডার যুক্ত করুন" target="_blank" class="btn btn-google"><i class="fa fa-plus"></i></a>
                                            <a href="{{route('customer.orders', $customerinfo->id)}}" title="{{$customerinfo->Full_Name}} এর সকল অর্ডার দেখুন" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i>অর্ডারসমূহ</a>
                                            <a href="{{route('customer.details', $customerinfo->id)}}" title="গ্রাহক({{$customerinfo->Full_Name}}) এর ব্যক্তিগত তথ্য" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                            @if(session('utype')==='ADM'){{--route('customer.editinfo', $customer->id)--}}{{--<button type="button" class="btn btn-primary" data-toggle="modal" wire:click.prevent="edit({{$customerinfo}})" data-target="#staticBackdrop_{{$customerinfo->id}}"><i class="fa fa-edit"></i></button>--}}@endif
                                            @if(session('utype')==='ADM')<a href="#" wire-:click.prevent="productDelete({{$customerinfo->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>@endif
                                        </td>
                                    </tr>
                                    {{-- @else 
                                    <tr>
                                        <td>{{ $customerinfo->id }} <span>{{ $customerinfo->created_at }}</span></td> <td>{{ $customerinfo->Full_Name }}</td> <td>{{ $customerinfo->mobile }}</td><td>@if($customerinfo->photo)<img class="img-thumbnail" style="width:120px;" src="{{ asset("storage/assets/customers/$customerinfo->photo") }}" alt="Photo"> @endif</td>

                                        <td>
                                            <a href="{{route('customer.neworder', $customerinfo->id)}}" title="" target="_blank" class="btn btn-google"><i class="fa fa-plus"></i> New Order</a>
                                            <a href="{{route('customer.orders', $customerinfo->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i>Orders</a>
                                            <a href="{{route('customer.details', $customerinfo->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                            <a href="{{route('customer.editinfo', $customerinfo->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                            @if(session('utype')==='ADM')<a href="#" wire-:click.prevent="productDelete({{$customerinfo->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>@endif
                                        </td>
                                    </tr>
                                    @endif  --}}
                                    {{-- Modal area Start --}}
                                    <!-- Button trigger modal -->
                                                                                
                                        <!-- Modal -->
                                        {{-- <div class="modal fade" id="staticBackdrop_{{$customerinfo->id}}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel_{{$customerinfo->id}}" aria-hidden="true">
                                            <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                <h5 class="modal-title" id="staticBackdropLabel_{{$customerinfo->id}}">{{$customerinfo->Full_Name}}</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form>
                                                        <input type="text" wire:model.defer="state.Full_Name">
                                                    </form>
                                                
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary">Understood</button>
                                                </div>
                                            </div>
                                            </div>
                                        </div> --}}
                                    {{-- Modal area End --}}
                                    @endforeach
                                @endif
                            </tbody>
                        </table>
                        
                        @if ( sizeof($specificCustomer) >0 ){{$specificCustomer->links()}} @else {{$customers->links()}} @endif
                        {{-- --}}
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
        <div class="col-xl-12 text-center">
            {{-- where('created_at', 'like', '2015-08-20%')->get()User::whereDate('created_at', '=', Carbon::today()->toDateString()); --}}
            <h1>আজকের নতুন গ্রাহক({{Carbon\Carbon::today()->format('Y-m-d')}})</h1>
            @if ( sizeof($customers) >0 )
            {{-- <table class="table table-striped table-inverse"> --}}
                <table class="table table-striped table-sm table-inverse">
                <thead class="thead-inverse">
                    <tr class="text-cneter"><th>তারিখঃ</th><th>নামঃ</th><th>মোবাঃ</th><th>আকশন</th></tr>
                    </thead>
                    <tbody>
                        @foreach ($customers as $todaysCustomer)
                            @if ($todaysCustomer->created_at >= Carbon\Carbon::today()->setTimezone('Asia/dhaka') && $todaysCustomer->created_at <= Carbon\Carbon::today()->addDays()->setTimezone('Asia/Dhaka'))
                            <tr>
                                <td>{{ Carbon\Carbon::parse($todaysCustomer->created_at)->format('Y-m-d') }}</td> <td>{{ $todaysCustomer->Full_Name }}</td> <td>{{ $todaysCustomer->mobile }}</td>
                                {{-- <td>@if($todaysCustomer->photo)<img class="mx-auto" style="width:40px;" src="{{ asset("storage/assets/customers/$todaysCustomer->photo") }}" alt="Photo"> @endif</td> --}}

                                <td>
                                    <a href="{{route('customer.neworder', $todaysCustomer->id)}}" target="_blank" class="btn btn-google"><i class="fa fa-plus"></i> নতুন গ্রাহক</a>
                                    <a href="{{route('customer.orders', $todaysCustomer->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i>অর্ডারসমূহ</a>
                                    <a href="{{route('customer.details', $todaysCustomer->id)}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                    <a href="{{--route('customer.editinfo', $customer->id)--}}" target="_blank" class="btn btn-primary"><i class="fa fa-edit"></i></a>
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

         <!-- Modal -->
            <div class="modal fade " id="addNewCustomerModal" tabindex="-1" aria-labelledby="addCustomerLabel" aria-hidden="true" wire:ignore.self>
                <div class="modal-dialog modal-xl">
                   
                <div class="modal-content ">
                    <div class="modal-header">
                    <h5 class="modal-title" id="addCustomerLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <form class="" autocomplete="off" wire:submit.prevent="createCustomer">
                        <div class="modal-body">  
                            <div class="col-lg-6 mb-3">
                                <label for="mobileNumber">মোবাইল নম্বর</label>
                                <input type="text" wire:model.defer="state.Full_Name" class="form-control error('Full_Name') is-invalid enderror" id="mobileNumber" placeholder="মোবাইল নম্বর..">
                                <div class="invalid-feedback"> সঠিক মোবাইল নম্বর দিন!</div>
                                @error('Full_Name')
                                <div class="text-danger"> সঠিক মোবাইল নম্বর দিন!</div>
                                @enderror
                            </div> 
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            
                </div>
            </div>
            {{-- modal end --}}
</div>
