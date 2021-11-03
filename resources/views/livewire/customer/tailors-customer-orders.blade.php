<div>
    <div class="row">
        <div class="col-xl-12">
        <div class="col-xl-12 text-warning">{{$Full_Name}} এর অরডারসমুহ</div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Order No/Iteams</th>
                        <th>Order No</th>
                        <th>Wages <b>({{$allOrders->sum('wages')-$allOrders->sum('discount')}})</b></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($allOrders as $order)
                    <tr>
                        <td scope="row">{{$order->order_number}}/{{$order->orderitems->count()}}</td>
                        <td scope="row">{{$order->order_number}}</td>
                        <td>{{ $order->wages-$order->discount  }}</td>
                        <td></td>
                        {{-- route('customer.orderiteams',  --}}
                        <td>
                            <a href="{{route('customer.orderiteams', [$customer_id, $order->id])}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                            <a href="{{--route('customer.editinfo', $todaysCustomer->id)--}}" target="_blank" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                            @if(session('utype')==='ADM')<a href="#" wire-:click.prevent="producpelete($todaysCustomer->id)" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>@endif
                        </td>
                    </tr>  
                    @endforeach
                    
                </tbody>
            </table>
        </div>
    </div>
</div>
