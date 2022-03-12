<div>
    <div class="row">
        <div class="col-xl-12">
            <div class="row">
                <div class="col-xl-12 ">
                    <div class="row mb-2">
                        <div class="col-md-6"><h4 class="text-success mb-0">অরডারসমুহ</h4></div>
                        <div class="col-md-6 text-right"><a href="#" class="btn btn-primary "> <i class="fa fa-plus" aria-hidden="true"></i> নতুন অর্ডার</a></div>
                    </div>
                    <div class="row border py-4">
                        <div class="col-lg-4 text-right"><img width="150" src="{{$photo?asset("storage/assets/customers/$photo"):asset("assets/img/single_blog_4.png")}}"></div>
                        <div class="col-lg-8">
                            <div class="row customer_details">
                                <div class="col-lg-12"><span class="detail">নামঃ</span> <span class="text-success">{{$Full_Name}}</span></div> 
                                <div class="col-lg-12"><span class="detail">মোবাইলঃ</span> <span class="text-success">{{$mobile}}</span></div>
                                <div class="col-lg-12"><span class="detail">মোট অর্ডার সংখ্যাঃ</span> <span class="text-success">{{($allOrders->count()<10?'0':'').$allOrders->count()}}</span></div>
                                <div class="col-lg-12"><span class="detail">ঠিকানা </span><span class="text-success">{{$address}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        <script>
            let maxval=[];
           let detail= document.querySelectorAll('.customer_details span.detail');
           detail.forEach(it => {
            maxval.push(parseInt(it.offsetWidth));
           });
           const propertyValues = Object.entries(maxval);
           console.log(Math.max(propertyValues));
        </script>
            <table class="table table-striped table-sm text-center">
                <thead>
                    <tr>
                        <th>অর্ডার নং-</th>
                        <th>আইটেম</th>
                        @php $totalwages = $allOrders->sum('wages')-$allOrders->sum('discount'); @endphp
                        <th>মজুরিঃ <b class="text-success" title="{{$Full_Name." গ্রাহকের সকল অর্ডারের মোট মজুরি".$totalwages}}">({{$totalwages}})</b></th>
                        <th>নমুনাঃ</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($allOrders as $in=> $order)
                    <style> #single_order{cursor: pointer;left:999px;transition: .3s;} #single_order_tr{cursor: pointer;}  .btn.btn-primary:hover .orders-list{left:990px !important;}</style>
                    <tr title="{{"ছাড়ঃ".$order->discount.", এডভান্সঃ ".$order->advance.", মোটঃ ".$order->total.", বাকিঃ ".($order->total-$order->advance)}} " class="position-relative single_order_tr" id="single_order_tr">
                        
                        <td scope="row">{{$order->order_number}}</td>
                        <td scope="row">{{$order->orderitems->count()}}</td>
                        <td>{{ $order->wages-$order->discount  }}</td>
                        <td>@if($order->order_sample_images !=null) @foreach($order->order_sample_images as $sample)<img width="30px" src='{{asset("storage/assets/order-samples/$sample")}}'>  @endforeach @endif</td>
                        {{-- route('customer.orderiteams',  --}}
                        <td>
                            <a href="#{{--route('customer.neworder', $order->id)--}}" class="btn btn-primary">নতুন অর্ডার আইটেম <i class="fa fa-plus"></i></a>
                            <a href="{{route('customer.orderiteams', [$customer_id, $order->id])}}" target="_blank" class="btn btn-success"><i class="fa fa-eye"></i></a>
                            <a href="#" class="btn btn-warning"><i class="fa fa-edit"></i></a>
                            {{-- @if(session('utype')==='ADM')<a href="#" wire-:click.prevent="producpelete($todaysCustomer->id)" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>@endif --}}
                        </td>
                    </tr>
                        {{-- <div class="card text-left position-absolute orders-list" id="single_order">
                            <div class="card-body">
                            <h6 class="card-title">নামঃ{{$order->customer->Full_Name}},অর্ডার নং-{{$order->order_number}},</h6>
                            <p class="card-text">{{"ছাড়ঃ".$order->discount.", এডভান্সঃ ".$order->advance.", মোটঃ ".$order->total.", বাকিঃ ".($order->total-$order->advance).", বাকিঃ ".$order->order_sample_images}}</p>
                            </div>
                      </div> --}}
                    @endforeach
                    
                </tbody>
            </table>
        </div>
    </div>
        
</div>
