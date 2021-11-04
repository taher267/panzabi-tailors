<div class="container-fluid">↓
    <style>
        table.dataTable>thead .sorting:before, table.dataTable>thead .sorting_asc:before, table.dataTable>thead .sorting_desc:before, table.dataTable>thead .sorting_asc_disabled:before, table.dataTable>thead .sorting_desc_disabled:before{right: unset;content: unset;display: none;}table.dataTable>thead .sorting:before, table.dataTable>thead .sorting:after, table.dataTable>thead .sorting_asc:before, table.dataTable>thead .sorting_asc:after, table.dataTable>thead .sorting_desc:before, table.dataTable>thead .sorting_desc:after, table.dataTable>thead .sorting_asc_disabled:before, table.dataTable>thead .sorting_asc_disabled:after, table.dataTable>thead .sorting_desc_disabled:before, table.dataTable>thead .sorting_desc_disabled:after {
    position: unset;
    bottom: 0em;
    display: none;
    opacity: 0;
}
.cloth_part_style .design_bg::after {
    position: absolute;content: '';width: 100%; height: 100%;
    /*3e3e3e */  background: radial-gradient(#8C00BF, transparent);
}
.custom-control-input.is-valid~.custom-control-label, .was-validated .cloth_part_style .custom-control-input:valid~.custom-control-label {
    color: #ffffff;
}
    </style>
    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!}">{!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}</div>
    @endif
 
<style type="text/css"> .nav-link.active{background:linear-gradient(180deg ,#4e73df 10%,#8C00BF 100%) !important;color: #fff !important;font-weight: bold  !important;} #dalivery_address{transition: 1s all ease;transform-origin: top; {{$order_delivery==1 ? 'transform:scaleY(1);height:100%;' :'transform:scaleY(0); display: none; height:0;'}} } .design_bg {padding: 25px 7px;background-size: cover !important;background-position: center !important; position: relative; margin:0 0 2px  0 !important;} .design_bg .border-right{padding: 25px 10px; border-right: 2px solid red !important;} .design_bg::after {position: absolute;content: '';width: 2px;height: 100%;background: #fff;right: 0;top: 0;} .design_bg label {color: #fff}

div#dataTable_wrapper .row:first-child,div#dataTable_wrapper .row:last-child { display: none !important;}
</style>

@php
    // $arr1 = [2=>2, 4=>4,6=>6];
    // $arr2 = [2=>"two", 4,6=>'six'];
    // echo '<pre>';
    // print_r(array_merge($arr1,$arr2));
    // echo '</pre>';
    // echo '</br>';
    // echo '<pre>';
    //     print_r(array_merge_recursive($arr1,$arr2));
    // echo '</pre>';
    // echo '</br>';
    // echo '<pre>';
        
    //     // print_r(array_combine($arr1,$arr2));
    // echo '</pre>';
    // for ($i=0; $i < count($arr1); $i++) { 
    //     print_r(array_values($arr1));
    // }
@endphp
<br>
<br>
<br>
<br>
<br>

<form class="was-validated" wire:submit.prevent="placeOrder">
    <div class="row">
        <div class="col-lg-12">
            <div style="transition: 1s all ease" class="col-xl-12 " id="right_sidebar">
                <div class="row bg-secondary alert ">
                    <div class="col-xl-4">
                        <a class="btn btn-outline-primary text-light" href="{{route('customer.customers')}}">All Customers</a>
                    </div>

                    <div class="col-xl-4">
                        <a class="btn btn-outline-success" href="#{{--route('customer.neworder')--}}">New Order</a>
                    </div>
                </div>
                <span class="badge badge-secondary badge-pill"></span>
                <div class="col-xl-12">
                    <div class="personal_information">
                        <h2>অর্ডারের তথ্য</h2>
                        <div class="row">
                            <div class="col-lg-4">
                                <label for="deliverydate">ডেলিভেরি তারিখঃ</label>
                                <input type="date" class="form-control" wire:model="delivery_date" id="deliverydate" required>
                                @error('delivery_date') <div class="text-danger">{!!$message!!}</div>@else <div class="invalid-feedback">ডেলিভারি তারিখ দিন!</div> @enderror
                            </div>
                            <div class="col-lg-4">
                                <div class="row">
                                    <div class="col-lg-9">                             
                                        <label for="order_number">অর্ডার নং- <span class="text-danger">(সর্বশেষ অর্ডার নং-- @if (DB::table('orders')->get()->count()>0){{DB::table('orders')->orderBy('id','DESC')->first()->order_number}} @else 0 @endif)</span></label>
                                        <input type="number" class="form-control" @if(!$force_id) min="{{!$force_id ? $maxOrderId: $order_number}}" max="{{$maxOrderId}}" @endif wire:model="order_number" id="order_number" required>
                                        {{-- @if(DB::table('orders')->get()->count()>0){{DB::table('orders')->orderBy('id','DESC')->first()->order_number+1}} @endif --}}
                                        @error('order_number') <div class="text-danger">{!!$message!!}</div>@else @if(! $force_id)<div class="invalid-feedback">Order Number is required.</div>@endif @enderror
                                    </div>
                                    <div class="col-lg-3">
                                        <input type="checkbox" value="1" wire:model="force_id" id="force_wish"> <label for="force_wish">প্রয়োগ করুন</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <label for="orderdate">অর্ডার তারিখঃ </label>
                                <input type="date" class="form-control" wire:model="order_date" id="orderdate">
                                @error('order_date') <div class="text-danger">{!!$message!!}</div>@enderror
                            </div>
                        </div>
                        <div class="row my-3" style="background: linear-gradient(34deg, #ddddd08, #f3f3f3">
                            <div class="col-xl-12 text-center text-warning"><h4 class="heading pb-3 mb-4">Personal/Identicaton Info </h4></div>
                                <div class="col-lg-6 mb-3">
                                    <label for="fullname">অর্ডারকারীর পুরো নামঃ</label>
                                    <input wire:model="Full_Name" type="text" class="form-control" id="fullname" placeholder="পুরো নাম" required>
                                    @error('Full_Name') <div class="text-danger">{!!$message!!}</div>@else <div class="invalid-feedback"> সঠিকভাবে নাম পূরণ করুন</div> @enderror
                                </div>

                                <div class="col-lg-6 mb-3">
                                    <label for="mobileNumber">মোবাইল নম্বর</label>
                                    <input wire:model="mobile" type="number" class="form-control" id="mobileNumber" placeholder="মোবাইল নম্বর.." required>
                                    @error('mobile') <div class="text-danger">{!!$message!!}</div>@else <div class="invalid-feedback"> সঠিক মোবাইল নম্বর দিন!</div> @enderror
                                </div>
                                 
                                <div class="col-lg-6 mb-3">
                                    <label for="email" class="d-flex">ইমেইল <span class="text-muted">(অপশনাল)</span>
                                        <div class="col-lg-12 d-inline-block d-flex">
                                            <div class="custom-checkbox d-inline-block d-flex">
                                                <input type="checkbox" class="custom-control-input" id="confirmmail" value="1" wire:model='confirm_mail'>
                                                <label class="custom-control-label ml-3" style="" for="confirmmail">আপনি কাস্টমারকে ইমেইল পাঠাতে চাচ্ছেন?</label>
                                            </div>
                                        </div>
                                    </label>
                                    <input wire:model="email" type="email" class="form-control" id="email" placeholder="you@example.com" {{ $confirm_mail ?'required':'' }} >
                                    
                                    @error('email') <div class="alert alert-danger">{!! $message!!}</div> @else <div class="invalid-feedback">সঠিক ইমেইল যুক্ত করুন</div>@enderror
                                </div>
                                <div class="col-lg-6 mb-3 customer_photo">
                                    <label for="customerPhoto">কাস্টমারের ছবি (অপশনাল)</label>
                                    <div class="input-group input_customer_photo" style="positon:relative;">
                                        <input wire:model="photo" type="file" class="custom-file-input" id="customerPhoto">
                                        <label class="custom-file-label" for="customerPhoto"></label>
                                        <div class="invalid-feedback"></div>
                                        <div class="invalid-feedback">@error('photo'){!! $message!!} @else সঠিক ছবি যুক্ত করুন! ছবির ধরন (jpg, jpeg, png)!@enderror</div>
                                        {{-- <img class="" src="{{$photo->temporaryUrl()}}" width="120"> --}}
                                        
                                        @if ( $photo )
                                        <span class="temp_img_wrap" style="position: absolute;z-index: 999;">
                                            <img src="{{$photo->temporaryUrl()}}" width="60" alt="">
                                        </span>
                                            
                                        @endif
                                    </div>
                                    
                                </div>
                                <div class="col-lg-12 mb-3">
                                    <label for="cusaddress">ঠিকানা <span class="text-muted">(অপশনাল)</span></label>
                                    <textarea wire:model="address" rows="3" class="form-control" id="cusaddress" placeholder="ঠিকানা..."></textarea>
                                    {{-- <div class="invalid-feedback">@error('address'){!!$message!!} @else Please enter a valid address. @enderror</div> --}}
                                </div>
                        </div>


                        <div class="col-xl-12 d-flex form-group mb-4">
                            <div class="form-check custom-radio d-flex">
                                <input value="1" wire:model='order_delivery' type="checkbox" class="custom-control-input" id="otherDelivery" name="daliveryPolicy">
                                <label class="custom-control-label" for="otherDelivery">অন্য কোনো মাধ্যমে আপনার পণ্য ডেলিভারি হবে?</label>
                            </div>
                        </div>
                        
                    @if ( $order_delivery == 1 )
                            <div class="row py-3 test-class" id="dalivery_address" style="background: linear-gradient(355deg,#009cea00, rgb(128 0 128 / 5%) )">
                                <div class="col-xl-12 "><h6 class="text-primary">কুরিয়ার বা কোন মাধ্যমে আপনার পণ্য সমূহ ডেলিভারি হবে তার বিস্তারিত--</h6></div>
                                <div class="col-xl-12 ">
                                    <label for="couriername">কুরিয়ার এর তথ্য</label>
                                    <input wire:model="courier_details" type="text" class="form-control" id="couriername" placeholder="কুরিয়ার এর নাম এবং শাখার বিস্তারিত..." required>
                                    @error('courier_details') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">Courier details is required.</div>@enderror
                                </div>

                                <div class="col-lg-6 mb-3">
                                    <label for="coun_try">Country</label>
                                    <select wire:model="country" class="custom-select d-block w-100" id="coun_try" required>
                                        <option>...</option>
                                        <option value="bd">Bangladesh</option>
                                    </select>
                                    <div class="invalid-feedback">@error('country') $message!!} @else Select a country @enderror </div>
                                </div>
                                <div class="col-lg-6 mb-3">
                                    <label for="ccity">শহর</label>
                                    <input wire:model="city" type="text" class="form-control" id="ccity" placeholder="City" required>
                                    @error('city') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">শহর দিন!</div>@enderror
                                </div>

                                <div class="col-lg-6 mb-3">
                                    <label for="line1">লাইন ১</label>
                                    <input wire:model="line1" type="text" class="form-control" id="line1" placeholder="লাইন ১...." required>
                                    @error('line1') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">লাইন ১ দিন!</div>@enderror
                                </div>

                                <div class="col-lg-6 mb-3">
                                    <label for="line2">লাইন ২</label>
                                    <input wire:model="line2" type="text" class="form-control" id="line2" placeholder="লাইন ২.." >
                                    @error('line2') <div class="text-danger">{!!$message!!}</div> @enderror
                                </div>

                                <div class="col-lg-6 mb-3">
                                    <label for="cprovince">প্রদেশ</label>
                                    <input wire:model="province" type="text" class="form-control" id="cprovince" placeholder="প্রদেশ" required>
                                    @error('province') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">প্রদেশ দিন!</div>@enderror
                                </div>
                                <div class="col-lg-6 mb-3">
                                <label for="zip">জিপ-কোড</label>
                                <input wire:model="zipcode" type="number" class="form-control" id="zip" placeholder="জিপ-কোড" required>
                                @error('zipcode') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">সঠিক জিপ-কোড দিন!</div>@enderror
                                </div>
                            </div>
                        @endif
                    </div> <!--Persinal information End-->
                    <div class="cloth_part_style">
                        <div class="row">
                            <div class="col-lg-12 bg-primary py-5">
                                <h5 class="d-block text-light">কাপড়/পোষাক/অ্যাপ্রন নাম</h5>
                                <div class="row">
                                    @if ( $allproducts)
                                        @foreach ($allproducts->where('status', 1) as $product)
                                            <div class="col-sm-2 col-xs-6" style="position: relative;">
                                                <div class="custom-control custom-checkbox mb-1 d-inline-block">
                                                    <input type="radio" wire:model="products" name="dresses" value="{{$product->id}}" class="custom-control-input" id="product_{{$product->id}}" {{--sizeof($products)==0?'required':''--}}>
                                                    <label class="custom-control-label" for="product_{{$product->id}}">{{$product->name}} <img src="{{asset('assets/img/undraw_profile.svg')}}" class="img-thumbnail-" width="30" alt=""></label>
                                                    @error('products') <div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback text-warning">যেকোনো একটি নির্বাচন করুন </div>  @enderror
                                                </div>
                                            </div>
                                        @endforeach
                                    @endif
                                    
                                   
                                        
                                </div> {{--dresh panzabi .row end--}}
                                {{-- @endforeach --}}
                            </div>
                            {{-- Measure ment area --}}
                            <div class="col-lg-12 bg-warning pt-4">
                                <div class="row">
                                    <div class="col-lg-2 mb-3">
                                        <label for="clothlong">লম্বা</label>
                                        <input wire:model="cloth_long" type="number" class="form-control" id="clothlong" placeholder="Long" required>
                                        @error('cloth_long')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">পোশাকের লম্বা দিন?</div> @enderror
                                    </div>
                                    {{-- Body part Start --}}
                                    <div class="col-lg-3 col-md-6 mb-3">
                                        <div>
                                            <label for="clothbody">বডি</label>
                                            <input wire:model="cloth_body" type="number" class="form-control" id="clothbody" placeholder="Cloth Body" required>
                                            @error('cloth_body')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">পোশাকের বডি দিন?</div> @enderror
                                        </div>

                                        <div>
                                            <label for="bodyloose">বডির লুজ</label>
                                            <input wire:model="body_loose" type="number" class="form-control" id="bodyloose" placeholder="Body Loose" required>
                                            @error('body_loose')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">পোশাকের বডি লুজ দিন?</div> @enderror
                                        </div>

                                        <div>
                                            <label for="clothbelly">পেট</label>
                                            <input wire:model="cloth_belly" type="number" class="form-control" id="clothbelly"_ placeholder="পাট/Belly" required>
                                            @error('cloth_belly')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">পোশাকের পেট পরিমাপ দিন?</div> @enderror
                                        </div>

                                        <div>
                                            <label for="bodyloose">পেটের লুজ</label>
                                            <input wire:model="belly_loose" type="number" class="form-control" id="bodyloose" placeholder="পাটের লুজ Belly Loose">
                                            @error('belly_loose') <div class="text-danger">{!!$message!!} </div> @else <div class="invalid-feedback">পোশাকের বডি পেট লুজের পরিমাপ দিন? </div> @enderror
                                        </div>

                                        <div>
                                            <label for="enclosure">ঘের</label>
                                            <input wire:model="cloth_enclosure" type="number" class="form-control" id="enclosure" placeholder="Enclosure/ঘের" required>
                                            @error('cloth_enclosure')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">পোশাকের ঘের দিন?</div> @enderror
                                        </div>
                                    </div>
                                    {{-- Body Part End --}}
                                    {{-- Heeeve Area Start --}}
                                    <div class="col-lg-3 col-md-6 mb-3">
                                        <div class="">
                                        <label for="handlong">হাতা</label>
                                        <input wire:model="hand_long" type="text" class="form-control" id="handlong" placeholder="Hleeve হাতা" required>
                                        @error('hand_long')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">হাতা লম্বা দিন?</div> @enderror
                                        </div>
                                        <div>
                                        <label for="sleeveless">হাতার মুহুরী</label>
                                        <input  wire:model="sleeve_enclosure" type="text" class="form-control" id="sleeveless" placeholder="Sleeve enclosure হাতার মুহুরী" required>
                                        @error('sleeve_enclosure')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">হাতার মুহুরী দিন?</div> @enderror
                                        </div>
                                        <div class="">
                                            <label for="clothmora">মোরা</label>
                                            <input wire:model="cloth_mora" type="text" class="form-control" id="clothmora" placeholder="মোরা" required>
                                            <div class="invalid-feedback">@error('cloth_mora') {!!$message!!} @else Mora code required. @enderror</div>
                                        </div>
                                        <div>
                                        <label for="SleevePasting">হাতায় পেস্টিং</label>
                                        <input wire:model="sleeve_pasting" type="text" class="form-control" id="SleevePasting" placeholder="Sleeve Pasting/হাতায় পেস্টিং" required>
                                        @error('sleeve_pasting')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">হাতা লম্বা হবে?</div> @enderror
                                        </div>
                                    </div>
                                    {{-- Heeeve Area End --}}

                                    <div class="col-lg-2 col-md-6 mb-3">
                                        <div>
                                        <label for="cloththroat">গলা</label>
                                        <input wire:model="cloth_throat" type="text" class="form-control" id="cloththroat" placeholder="গলা/Throat" required>
                                        @error('cloth_throat') <div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">গলার পরিমাপ দিন?</div> @enderror 
                                        </div>
                                        <div>
                                            <label for="clothcollar">কলার</label>
                                            <input wire:model="cloth_collar" type="number" class="form-control" id="clothcollar" placeholder="কলার" required>
                                            @if ($cloth_collar) <select class="form-control" wire:model="collar_measure_type"><option selected value="0">সাধারণ</option><option value="1">মোট</option></select> @endif
                                            @error('cloth_collar') <div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback"> কলার পরিমাপ দিন? </div> @enderror 
                                        </div>
                                        
                                    </div>
                                    <div class="col-lg-2 col-md-6 mb-3">
                                        <div class="mb-3">
                                            <label for="clothshoulder">পুট</label>
                                            <input wire:model="cloth_shoulder" type="number" class="form-control" id="clothshoulder" placeholder="Shoulder" required>
                                            @error('cloth_shoulder') <div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback"> পুটের পরিমাপ দিন?</div> @enderror
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label for="nokeshoho">নক সহ</label>
                                            <input wire:model="noke_shoho" type="text" class="form-control" id="q " placeholder="নক সহ">
                                            @error('noke_shoho') <div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback"> নক সহ দিন?</div> @enderror
                                        </div>
                                    </div>
                                </div> 
                                <div class="row ">
                                    <div class="col-lg-10 col-md-12 mx-lg-auto mb-3">
                                        <label for="additional">অতিরিক্ত বিষয়গুলো এখানে লিখুন!</label>
                                        <textarea type="text" wire:model="cloth_additional" class="form-control" placeholder="Additional/সংযোজিত"></textarea>
                                        <div class="invalid-feedback">@error('cloth_additional') {!!$message!!} @else Hand long code required. @enderror</div>
                                    </div>
                                </div>
                            </div>
                            {{-- Measure area End --}}
                        </div>  
                        {{-- {{print_r($design_fields)}}                 --}}
                        @if ($styles && $designItems)
                            @foreach ($designItems as $design)
                            <div class="row py-3">
                                <div class="col-xl-12 py-3">
                                    <h4 class="">{{$design->name .'/'. $design->slug}}</h4>
                                </div>
                                <div class="col-xl-12">
                                    <div class="row">
                                        @foreach ( $styles->where('dependency', $design->slug) as $style )
                                        <div class="col-lg-2 col-sm-6 design_bg sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})"> 
                                            <div class="custom-control custom-checkbox mb-1 d-inline-block">
                                                <input type="checkbox" wire:model="designs_check.{{ $style->id }}" wire:change="fillEmptyStyleField({{$style->id}})" value="{{ $style->id }}" class="custom-control-input" id="style_{{$style->id}}" @if( in_array( $style->id, array_keys($design_fields) , true) && $design_fields[$style->id] != '') required {{--$design_fields--}} {{--@foreach ( $design_fields as $key => $item ) @if( $key == $style->id ) required @else no @endif @endforeach--}} @endif {{--@if(sizeof($designs_check)==0)required @endif--}}>
                                                <!-- designs_check -->
                                                {{-- @if( $design_fields ) @foreach ( $design_fields as $key => $item ) @if($key==$style->id) disabled  @else no @endif @endforeach @endif --}}
                                                <label class="custom-control-label" for="style_{{$style->id}}">{{$style->name}} <img src="{{asset('assets/img/undraw_profile.svg')}}" class="img-thumbnail-" width="30" alt=""></label>
                                                @error('designs_check') <div class="text-danger"> {!!$message!!}</div> {{--@else <div class="invalid-feedback text-warning">যেকোনো একটি নির্বাচন করুন </div>--}}  @enderror
                                                
                                                {{-- <textarea wire:model="design_fields.{{ $style->id }}" rows="1" class="form-control" value="{{$style->id}}" >
                                                    @if( in_array( $style->id, array_keys($designs_check) , true) && in_array( $style->id, array_keys($design_fields) , true) && $design_fields[$style->id] == '') 
                                                    Bismillah
                                                    @endif
                                                </textarea> --}}
                                                <textarea wire:model="design_fields.{{ $style->id }}" rows="1" class="form-control" value="{{$style->id}}" >
                                                    {{-- @if( in_array( $style->id, array_keys($designs_check) , true) && $designs_check[$style->id] != '')
                                                        @if (in_array( $style->id, array_keys($designs_check) , true) )
                                                        {{$design_fields[$style->id]= 'bismillah';}}
                                                        @endif
                                                    @endif --}}
                                                </textarea>
                                            </div>
                                        </div>
                                        @endforeach                                    
                                    </div>  
                                </div>
                            </div>
                            @endforeach
                        @endif
                        {{-- Type Start --}}
  
                        
                    </div> <!--cloth_part_style End-->

                </div>
          </div>
        </div>
        {{-- <div class="col-lg-12"></div> --}}
        <div class="col-xl-12">
            <div>
                <div class="row">
                    <div class="product_role_container container-fluid">
                        <!-- DataTales Example -->
                        <div class="card shadow mb-4">
                            <div class="card-header">
                                <h3>মজুরি(WAGES)</h3>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr class="text-center"><th>পোশাক</th>
                                                <th>পরিমাণ@error('quantity')<span class="text-danger">{{$message}}</span> @enderror </th>
                                                <th>মজুরি  @error('wages')<span class="text-danger">{{$message}}</span> @enderror </th>
                                                <th>ছাড় @error('discount')<span class="text-danger">{{$message}}</span> @enderror </th>
                                                <th>মোট</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="products">
                                                    {{-- @foreach ($allproducts as $product)
                                                        @foreach ($products as $selProduct)
                                                            @if ($product->id == $selProduct)
                                                                <p>{{$product->name}}</p>
                                                            @endif
                                                        @endforeach
                                                    @endforeach --}}

                                                    @foreach ($allproducts as $product)
                                                            @if ($product->id == $products)
                                                                <p>{{$product->name}}</p>
                                                            @endif
                                                    @endforeach
                                                </td>
                                                <td>
                                                    <input type="number" min="1" wire:model="quantity" class="form-control" placeholder="পরিমাণ">
                                                   
                                                </td>
                                                <td><input type="number" wire:model="wages" class="form-control" placeholder="মজুরি"></td>
                                                <td><input type="number" wire:model="discount" class="form-control" placeholder="ছাড়"></td>
                                                <td><input type="number" wire:model="total" class="form-control" placeholder="মোট"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @if ( $errors->any())
        @foreach ($errors->all() as $err)
            <p class="text-danger">{{$err}}</p>
        @endforeach
    @endif
    {{-- <h1>{{$errorOut}}--</h1> --}}
    {{-- <button class="btn btn-primary btn-lg btn-block" type="submit">Place Order</button> --}}
    <button type="{{$errors->any() || $errorOut=='err' ? 'button':'submit'}}" {{ $errors->any() || $errorOut=='err' ? 'disabled':''}} class="btn btn-primary btn-lg btn-block">Place Order</button>
</form>


<style>
   {{-- #dalivery_address{transition: 0.8s ease-in-out; transform-origin: top; transform:scaleY(0); height: 0; overflow: hidden; }
    @if ( $order_delivery == 1 ) #dalivery_address{transform:scaleY(1);height: 100%;}
    @endif--}}
</style>
</div>

@push('scripts')
    <script>
        jQuery(function(){
            jQuery('#page-top').addClass('sidebar-toggled');
            jQuery('.navbar-nav.bg-gradient-primary.sidebar.sidebar-dark.accordion').addClass('toggled');
            $(".custom-file-input").on("change", function() {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
            });
        });
    </script>
@endpush
