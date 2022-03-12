<div>
    <style>div#dataTable_wrapper .row:first-child, div#dataTable_wrapper .row:last-child {display: none;}nav.flex.items-center.justify-between svg {width: 15px;}.active-cyan-2 input.form-control[type=text]:focus:not([readonly]) {border-bottom: 1px solid #4dd0e1;box-shadow: 0 1px 0 0 #4dd0e1;}span.relative.z-0.inline-flex.rounded-md.shadow-sm {display: none;}
    </style>
    @if ($formId)<style>.input-group-append{z-index: 0;}</style>@endif
    <style>.active-cyan-2 input.form-control[type=text]:focus:not([readonly]) {border-bottom: 1px solid #4dd0e1;box-shadow: 0 1px 0 0 #4dd0e1;}</style>
    @if ($errors->any())
       @foreach ($errors->all() as $err)
           <p class="text-danger">{{$err}}</p>
           
    <script> toastr["error"]("{!!$err!!}",'')</script>
        @endforeach
   @endif

   @if (Session::has('msg'))
    <div id="success-msg-dismiss" class="alert d-inline alert-{!! Session::get('msg')['alert'] !!} toast-top-right position-fixed alert-dismissible fade show" style=" z-index:8888;"  role="alert">
        <strong> {!!Session::get('msg')['icon'] !!}</strong> {!!Session::get('msg')['message'] !!}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <script>window.setTimeout(function() {$("#success-msg-dismiss").fadeTo(500, 0).slideUp(500, function(){$(this).remove();});}, 3000);</script>
    <script>
        // jQuery("#main-form").reset();
    </script>
    @endif
    <div class="row">
    </div>
        <div class="container my-4">
            <div class="row">
                <div class="col-xl-3"><a class="btn btn-facebook" href="">Add New Order Item</a></div>
                <div class="col-xl-2"><a class="btn btn-facebook" href="#">Today's Orders</a></div>
                <div class="col-xl-2"><a class="btn btn-primary" href="#" wire:click="formController(1)">নতুন আইটেম <i class="fa fa-plus" aria-hidden="true"></i></a></div>
                <div class="col-xl-2"><a class="btn btn-outline-primary" href="">Google</a></div>
                <div class="col-xl-3 md-form active-cyan-2">
                    <form class="was-validated">
                        <input class="form-control" type="search" placeholder="Customer search..." wire-:model="searchBy" aria-label="Search" required>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
        <div class="col-xl-12 custom-table-effect">
            {{-- where('created_at', 'like', '2015-08-20%')->get()User::whereDate('created_at', '=', Carbon::today()->toDateString()); --}}
            {{-- <h1>Todays new Customer({{Carbon\Carbon::today()->format('Y-m-d')}})</h1> --}}
            
                    @foreach ($orderItems as $key=> $orderItem)
                    <div class="row single-item-wrapper">

                        <div class="col-lg-2 col-sm-4">লম্বা- <span class="text-info">{{$orderItem->cloth_long}}</span></div>
                        <div class="col-lg-2 col-sm-4">
                            <div class="row">
                                <div class="col-lg-12">বডি- <span class="text-info">{{$orderItem->cloth_body}}</span></div>
                                <div class="col-lg-12">বডির লুজ- <span class="text-info">{{$orderItem->body_loose}}</span></div>
                                <div class="col-lg-12">পেট- <span class="text-info">{{$orderItem->cloth_belly}}</span></div>
                                <div class="col-lg-12">পেটের লুজ- <span class="text-info">{{$orderItem->belly_loose}}</span></div>
                                <div class="col-lg-12">ঘের- <span class="text-info">{{$orderItem->cloth_enclosure}}</span></div>
                                <div class="col-lg-12"></div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-sm-4">
                            <div class="row">
                                <div class="col-lg-12">হাতা- <span class="text-info">{{$orderItem->hand_long}}</span></div>
                                <div class="col-lg-12">হাতার মুহুরী- <span class="text-info">{{$orderItem->sleeve_enclosure}}</span></div>
                                <div class="col-lg-12">মোরা- <span class="text-info">{{$orderItem->cloth_mora}}</span></div>
                                <div class="col-lg-12">হাতায় পেস্টিং- <span class="text-info">{{$orderItem->sleeve_pasting}}</span></div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-sm-4">
                            <div class="row">
                                <div class="col-lg-12 col-sm-4">গলা- <span class="text-info">{{$orderItem->cloth_throat}}</span></div>
                                <div class="col-lg-12 col-sm-4">কলার- <span class="text-info">{{$orderItem->cloth_collar}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-sm-4">পুট- <span class="text-info">{{$orderItem->cloth_shoulder}}</span></div>
                        <div class="col-lg-2 col-sm-4">নক সহ- <span class="text-info">{{$orderItem->noke_shoho}}</span></div>
                        <div class="col-lg-12">সংযোজিত- <span class="text-info">{{$orderItem->cloth_additional}}</span></div>
                        <div class="col-lg-12 border-top border-secondary my-3"></div>
                    </div>
                    @endforeach
                    <div class="col-xl-12">{{$orderItems->links()}}</div>
            </div>
        </div>
        
    @if ($formId==1)
    <div class="tailors-modal-form" id="modalWraper" style="display: block;padding-top:100px;">
        <div class="row d-block mx-auto" style="width: 95%">
        <div class="modal__inner bg-light py-5">
        
            <div class="col-xl-12 w-100 text-right"><button wire:click="formController(0)" type="button" class="btn btn-primary"><i class="fa fa-times"></i> Close</button></div>
            <div class="col-xl-10 mx-auto ">

                    <div class="row">
                        <div class="col-xl-12 mb-2 py-3 shadow-sm">
                            <div class="row">
                                <div class="col-xl-2 pl-4 pt-3">
                                    <p>নামঃ- <b class="text-success">{!! $Full_Name !!}</b></p>
                                    <p>অর্ডার নং- <b class="text-success">{!! $order_number !!}</b></p>
                                </div>
                                <div class="col-xl-10 top-status d-table">
                                    <div class="row d-table-row text-center">
                                        <!--step 1 Start-->
                                        <div class="step-status-content d-table-cell">
                                            <a href="#" class="btn {{ $currentPage != 1 ? 'btn-light' : 'btn-primary' }}">1</a>
                                            <p class="my-3 {{ $currentPage != 1 ? '' : 'text-primary' }}">নাম ও পরিমাপ</p>
                                        </div>
                                        <!--step 1 Stop-->
                        
                                        <!--step 2 Start-->
                                        <div class="step-status-content d-table-cell">
                                            <a href="#" class="btn {{ $currentPage != 2 ? 'btn-light' : 'btn-primary' }}">2</a>
                                            <p class="my-3 {{ $currentPage != 2 ? '' : 'text-primary' }}">Step-1</p>
                                        </div>
                                        <!--step 2 Stop-->
                                        
                                        <!--step 3 Start-->
                                        <div class="step-status-content d-table-cell">
                                            <a href="#" class="btn {{ $currentPage != 3 ? 'btn-light' : 'btn-primary' }}">3</a>
                                            <p class="my-3 {{ $currentPage != 3 ? '' : 'text-primary' }}">Step-1</p>
                                        </div>
                                        <!--step 3 Stop-->
                                        
                                        <!--step 4 Start-->
                                        <div class="step-status-content d-table-cell">
                                            <a href="#" class="btn {{ $currentPage != 4 ? 'btn-light' : 'btn-primary' }}">4</a>
                                            <p class="my-3 {{ $currentPage != 4 ? '' : 'text-primary' }}">Step-1</p>
                                        </div>
                                        <!--step 4 Stop-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12">
                            <!--step form Wrap Start -->
                            <div class="row">
                                <div class="col-xl-12">
                                    @if ($errors->any())
                                        @foreach ($errors->all() as $item)
                                           <p class="text-danger">{{$item}}</p> 
                                        @endforeach
                                    @endif
                                </div>
                                <div class="col-xl-12">
                                    <form autocomplete="off" wire:submit.prevent="placeIteam" id="main-form" class="was-validated">
                                        <div class="row">

                                            <!--Step 1/Measurement Start-->
                                            <div class="col-xl-12 {{ $currentPage != 1 ? 'd-none' : '' }}">
                                                <div class="row">
                                                    @if ( DB::table('products')->count() > 0 )
                                                        <div class="col-xl-6 mb-3">
                                                            <label for="deliverysystem" class="@if($products=='') text-danger @endif">পণ্য নির্বাচন করুন</label>
                                                            <select wire:model="products" class="custom-select d-block w-100 @if($products==0)form-control is-invalid @endif @error('products')form-control is-invalid @enderror" id="deliverysystem" required>
                                                                <option value="0">নির্বাচন করুন</option>
                                                                @foreach (DB::table('products')->get() as $product)
                                                                <option value="{{$product->id}}">{{$product->name}}</option>
                                                                @endforeach
                                                            </select>
                                                            <div class="invalid-feedback"> @error('products'){!!$message!!} @else পণ্য নির্বাচন করুন @enderror </div> 
                                                        </div>
                                                    @endif
                                                    @if (DB::table('size_charts')->count()>0)
                                                        <div class="col-xl-6 mb-3">
                                                            <label for="deliverysystem"> নির্ধারিত সাইজ </label>
                                                            <select wire:model="fixed_size" class="custom-select d-block w-100" id="deliverysystem" required>
                                                                <option value="0">Select Size</option>
                                                                @foreach (DB::table('size_charts')->get() as $item)
                                                                <option value="{{$item->id}}">{{$item->name}}</option>
                                                                @endforeach
                                                                
                                                            </select>
                                                            <div class="invalid-feedback">@error('fixed_size') {!!$message!!}@enderror </div>
                                                        </div>
                                                    @endif                                   
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-12"><h5 class="d-block mb-4 text-center">কাপড়/পোষাক/অ্যাপ্রন নাম ও পরিমাপ</h5></div>
                                                        <div class="col-xl-12">
                                                            <!-- Measure Input field Start-->
                                                            <div class="row">
                                                                <div class="col-lg-2 mb-3">
                                                                    <label for="clothlong">লম্বা</label>
                                                                    <input wire:model="cloth_long" type="text" class="form-control @error('cloth_long')is-invalid @enderror" id="clothlong" placeholder="লম্বা" required>
                                                                    <div class="invalid-feedback"> @error('cloth_long'){!!$message!!} @else পোশাকের লম্বা দিন? @enderror</div>
                                                                </div>
                                                                {{-- Body part Start --}}
                                                                <div class="col-lg-3 col-md-6 mb-3">
                                                                    <div>
                                                                        <label for="clothbody">বডি</label>
                                                                        <input wire:model="cloth_body" type="text" class="form-control @error('cloth_body')is-invalid @enderror" id="clothbody" placeholder="বডি">
                                                                        <div class="invalid-feedback"> @error('cloth_body'){!!$message!!} @else পোশাকের বডি দিন? @enderror</div>
                                                                    </div>

                                                                    <div>
                                                                        <label for="bodyloose">বডির লুজ</label>
                                                                        <input wire:model="body_loose" type="text" class="form-control @error('body_loose')is-invalid @enderror" id="bodyloose" placeholder="বডির লুজ">
                                                                        <div class="invalid-feedback"> @error('body_loose'){!!$message!!} @else পোশাকের বডি লুজ দিন? @enderror</div>
                                                                    </div>

                                                                    <div>
                                                                        <label for="clothbelly">পেট</label>
                                                                        <input wire:model="cloth_belly" type="text" class="form-control @error('cloth_belly')is-invalid @enderror" id="clothbelly"_ placeholder="পাট">
                                                                        <div class="invalid-feedback"> @error('cloth_belly'){!!$message!!} @else পোশাকের পেট পরিমাপ দিন? @enderror</div>
                                                                    </div>

                                                                    <div>
                                                                        <label for="bodyloose">পেটের লুজ</label>
                                                                        <input wire:model="belly_loose" type="text" class="form-control @error('belly_loose')is-invalid @enderror" id="bodyloose" placeholder="পাটের লুজ">
                                                                        <div class="invalid-feedback"> @error('belly_loose') {!!$message!!} @else পোশাকের বডি পেট লুজের পরিমাপ দিন? @enderror </div>
                                                                    </div>

                                                                    <div>
                                                                        <label for="enclosure">ঘের</label>
                                                                        <input wire:model="cloth_enclosure" type="text" class="form-control @error('cloth_enclosure')is-invalid @enderror" id="enclosure" placeholder="ঘের" required>
                                                                        <div class="invalid-feedback"> @error('cloth_enclosure'){!!$message!!} @else পোশাকের ঘের দিন? @enderror</div>
                                                                    </div>
                                                                </div>
                                                                {{-- Body Part End --}}
                                                                {{-- Heeeve Area Start --}}
                                                                <div class="col-lg-3 col-md-6 mb-3">
                                                                    <div class="">
                                                                    <label for="handlong">হাতা</label>
                                                                    <input wire:model="hand_long" type="text" class="form-control @error('hand_long')is-invalid @enderror" id="handlong" placeholder="হাতা" required>
                                                                    <div class="invalid-feedback">@error('hand_long'){!!$message!!} @else হাতা লম্বা দিন? @enderror</div>
                                                                    </div>
                                                                    <div>
                                                                    <label for="sleeveenclosure">হাতার মুহুরী</label>
                                                                    <input  wire:model="sleeve_enclosure" type="text" class="form-control @error('sleeve_enclosure')is-invalid @enderror" id="sleeveenclosure" placeholder=" হাতার মুহুরী">
                                                                    <div class="invalid-feedback">@error('sleeve_enclosure'){!!$message!!} @else হাতার মুহুরী দিন? @enderror</div>
                                                                    </div>
                                                                    <div class="">
                                                                        <label for="clothmora">মোরা</label>
                                                                        <input wire:model="cloth_mora" type="text" class="form-control @error('cloth_mora')is-invalid @enderror" id="clothmora" placeholder="মোরা">
                                                                        <div class="invalid-feedback">@error('cloth_mora') {!!$message!!} @else Mora code required. @enderror</div>
                                                                    </div>
                                                                    <div>
                                                                    <label for="SleevePasting">হাতায় পেস্টিং</label>
                                                                    <input wire:model="sleeve_pasting" type="text" class="form-control @error('sleeve_pasting')is-invalid @enderror" id="SleevePasting" placeholder="হাতায় পেস্টিং">
                                                                    <div class="invalid-feedback">@error('sleeve_pasting'){!!$message!!} @else হাতা লম্বা হবে? @enderror</div>
                                                                    </div>
                                                                </div>
                                                                {{-- Heeeve Area End --}}

                                                                <div class="col-lg-2 col-md-6 mb-3">
                                                                    <div>
                                                                    <label for="cloththroat">গলা</label>
                                                                    <input wire:model="cloth_throat" type="text" class="form-control" id="cloththroat" max="30" placeholder="গলা" @if ($cloth_collar==null) required @endif >
                                                                    <div class="invalid-feedback">@error('cloth_throat') {!!$message!!} @else গলার পরিমাপ দিন?@enderror </div> 
                                                                    </div>
                                                                    <div>
                                                                        <label for="clothcollar">কলার</label>
                                                                        <input wire:model="cloth_collar" type="text" class="form-control" id="clothcollar" max="30" placeholder="কলার" @if ($cloth_throat==null) required @endif>
                                                                        @if ($cloth_collar) <select class="form-control" wire:model="collar_measure_type"><option selected value="0">সাধারণ</option><option value="1">মোট</option></select> @endif
                                                                        <div class="invalid-feedback">@error('cloth_collar') {!!$message!!} @else কলার পরিমাপ দিন?@enderror </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div class="col-lg-2 col-md-6 mb-3">
                                                                    <div class="mb-3">
                                                                        <label for="clothshoulder">পুট</label>
                                                                        <input wire:model="cloth_shoulder" type="text" class="form-control" id="clothshoulder" max="40" placeholder="পুট.." required>
                                                                        <div class="invalid-feedback">@error('cloth_shoulder') {!!$message!!} @else  পুটের পরিমাপ দিন? @enderror</div>
                                                                    </div>
                                                                    
                                                                    <div class="mb-3">
                                                                        <label for="nokeshoho">নক সহ</label>
                                                                        <input wire:model="noke_shoho" type="text" class="form-control" id="nokeshoho" placeholder="নক সহ">
                                                                        <div class="invalid-feedback">@error('noke_shoho') {!!$message!!} @else  নক সহ দিন? @enderror</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- Measure Input field ends-->
                                                        </div>
                                                        <div class="col-xl-12">
                                                            <div class="row ">
                                                                <div class="col-lg-6 col-sm-12 mx-lg-auto mb-3">
                                                                    <label for="additional">অতিরিক্ত বিষয়গুলো এখানে লিখুন!</label>
                                                                    <textarea type="text" wire:model="cloth_additional" class="form-control" placeholder="সংযোজিত"></textarea>
                                                                    <div class="invalid-feedback"> @error('cloth_additional') {!!$message!!} @enderror </div>
                                                                </div>
                                                                <div class="col-lg-6 col-sm-12 mx-lg-auto mb-3">
                                                                        <h6>অর্ডারের নমুনা ছবিঃ</h6>
                                                                        <div class="custom-file my-1">
                                                                            <input wire:model="order_sample_images" type="file" class="custom-file-input" id="orderSampleImage" multiple>
                                                                            <label class="custom-file-label" for="orderSampleImage">অর্ডারের নমুনা ছবিঃ</label>
                                                                            <div class="invalid-feedback">@error('order_sample_images') {!!$message!!} @else সঠিক ছবি যুক্ত করুন! ছবির ধরন (jpg, jpeg, png)!@enderror </div>
                                                                        </div>
                                                                        @if ( $order_sample_images)
                                                                            <span class="temp_img_wrap">@foreach ($order_sample_images as $sample)<img src="{{$sample->temporaryUrl()}}" width="60"> @endforeach</span>
                                                                        @endif
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                            </div><!--Step 1/Measurement End-->

                                            <!--Step 2/designing Start-->
                                            <div class="col-xl-12 {{ $currentPage != 2 ? 'd-none' : '' }}">
                                                <h5 class="d-block">কাপড়/পোষাক/অ্যাপ্রন <b class="text-info">ডিজাইন</b> সমূহের নাম ও পরিমাপ</h5>
                                                @if (DB::table('style_measure_parts')->count()>0 && DB::table('design_items')->count()>0)
                                                {{-- @if ($styleGroup && $designItems) --}}
                                                @foreach (DB::table('design_items')->get() as $design)
                                                <div class="row py-1">
                                                    <div class="col-xl-12 py-3">
                                                        <h4 class="">{{$design->name}}</h4>
                                                    </div>
                                                    <div class="col-xl-12">
                                                        <div class="row">
                                                            @foreach ( DB::table('style_measure_parts')->where('dependency', $design->slug)->get() as $style )
                                                            {{-- @foreach ( $styleGroup->where('dependency', $design->slug) as $style ) --}}
                                                            <div class="col-lg-2 col-sm-6 design_bg sarwani" style="background:url({{asset('assets/img/')}})"> 
                                                                <div class="custom-control custom-checkbox mb-1 d-inline-block">
                                                                    <input type="checkbox" wire:model="designs_check.{{ $style->id }}" wire:change="fillEmptyStyleField({{$style->id}})" value="{{ $style->id }}" class="custom-control-input " id="style_{{$style->id}}" @if( in_array( $style->id, array_keys($design_fields) , true) && $design_fields[$style->id] != '')required @endif>
                                                                    <label class="custom-control-label" for="style_{{$style->id}}">{{$style->name}} </label>
                                                                    <div class="invalid-feedback"> <i class="fa fa-check " style="color:#34E3A4"></i> টিক দিন!</div>
                                                                    @error("designs_check.$style->id") <div class="text-danger"> {!!$message!!}</div> {{--@else <div class="invalid-feedback text-warning">যেকোনো একটি নির্বাচন করুন </div>--}}  @enderror
                                                                    <textarea rows="1" wire:model="design_fields.{{ $style->id }}" rows="1" class="form-control" value="{{$style->id}}"></textarea>                                            
                                                                    
                                                                </div>
                                                            </div>
                                                            @endforeach                                    
                                                        </div>  
                                                    </div>
                                                </div>
                                                @endforeach
                                            @endif
                                            </div>
                                            <!--Step 2/designing End-->
                                            
                                            <!--Step 3/designing Start-->
                                            <div class="col-xl-12 {{ $currentPage != 3 ? 'd-none' : '' }}">
                                                    <div class="row">
                                                        <!-- Order Delivery Start-->
                                                        <div class="col-xl-12">
                                                            <div class="col-xl-12 d-flex form-group ">
                                                                <div class="form-check custom-radio d-flex">
                                                                    <input value="1" wire:model='order_delivery' type="checkbox" class="custom-control-input" id="otherDelivery" name="daliveryPolicy">
                                                                    <label class="custom-control-label" style="color: #848487 !important;" for="otherDelivery">অন্য কোনো মাধ্যমে আপনার পণ্য ডেলিভারি হবে?</label>
                                                                </div>
                                                            </div>
                                                            
                                                            @if ( $order_delivery == 1 )
                                                                <div class="row py-3 test-class mb-4" id="dalivery_address" style="background: linear-gradient(355deg,#009cea00, rgb(128 0 128 / 5%) )">
                                                                    <div class="col-xl-12 "><h6 class="text-primary">কুরিয়ার বা কোন মাধ্যমে আপনার পণ্য সমূহ ডেলিভারি হবে তার বিস্তারিত--</h6></div>
                                                                    <div class="col-xl-6 mb-3">
                                                                        <label for="deliverysystem" @error('delivery_system') class="text-danger" @enderror>কিভাবে অর্ডার ডেলিভারি নিতেচান?</label>
                                                                        <select wire:model="delivery_system" class="custom-select d-block w-100" id="deliverysystem" required>
                                                                            <option value="0">নির্বাচন করুন</option>
                                                                            <option value="1">কুরিয়ার</option>
                                                                            <option value="2">নিজে নিবেন</option>
                                                                        </select>
                                                                        @error('delivery_system')<div class="text-danger"> {!!$message!!}</div> @else<div class="invalid-feedback"> Select a delivery system name</div> @enderror 
                                                                    </div>
                                                                    <div class="col-xl-6 mb-3">
                                                                        <label for="deliverycharge">কুরিয়ার চার্জ</label>
                                                                        <input wire:model="delivery_charge" type="number" class="form-control" id="deliverycharge" placeholder="কুরিয়ার চার্জ..." required>
                                                                        @error('delivery_charge') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">কুরিয়ার চার্জ লিখুন!</div>@enderror
                                                                    </div>
                                                                    
                                                                    <div class="col-xl-12 mb-3">
                                                                        <label for="couriername">কুরিয়ার এর তথ্য</label>
                                                                        <input wire:model="courier_details" type="text" class="form-control" id="couriername" placeholder="কুরিয়ার এর নাম এবং শাখার বিস্তারিত..." required>
                                                                        @error('courier_details') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">Courier details is required.</div>@enderror
                                                                    </div>
                                                
                                                                    <div class="col-lg-6 mb-3">
                                                                        <label for="coun_try">দেশ</label>
                                                                        <select wire:model="country" class="custom-select d-block w-100" id="coun_try" required>
                                                                            <option>...</option>
                                                                            <option value="bd">Bangladesh</option>
                                                                        </select>
                                                                        @error('country') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">Select a country</div> @enderror 
                                                                    </div>
                                                                    <div class="col-lg-6 mb-3">
                                                                        <label for="ccity">শহর</label>
                                                                        <input wire:model="city" type="text" class="form-control" id="ccity" placeholder="City" required>
                                                                        @error('city') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">শহর দিন!</div>@enderror
                                                                    </div>
                                                
                                                                    <div class="col-lg-6 mb-3">
                                                                        <label for="line1">লাইন ১</label>
                                                                        <input wire:model="line1" type="text" class="form-control" id="line1" placeholder="বাড়ি নং,গ্রাম/মহল্লা সড়ক নং লিখুন...." required>
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
                                                        </div>
                                                    
                                                        <!-- Order Delivery Start-->
                                                        <div class="col-xl-12">
                                                            <div class="product_role_container container-fluid">
                                                                <!-- DataTales Example -->
                                                                <div class="card shadow mb-4">
                                                                    <div class="card-header">
                                                                        <h3>মজুরি(WAGES)</h3>
                                                                    </div>
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-lg-2 text-center">
                                                                                <h6 class=" border-bottom mb-2 pb-1">পোশাক</h6>
                                                                                <p>
                                                                                    {{-- @foreach ($allproducts as $product)
                                                                                            @if ($product->id == $products)
                                                                                                <p>{{$product->name}}</p>
                                                                                            @endif
                                                                                    @endforeach --}}
                                                                                    @if ($products> 0)
                                                                                        {{DB::table('products')->find($products)->name}}
                                                                                    @endif
                                                                                    
                                                                                </p>
                                                                            </div>
                                                                            <div class="col-lg-2">
                                                                                <h6 class="text-center border-bottom mb-2 pb-1">পরিমাণ @error('quantity')<span class="text-danger">{{--$message--}} দিন!</span> @enderror </h6>
                                                                                <p><input type="number" min="1" wire:model="quantity" class="form-control" placeholder="পরিমাণ" required></p>
                                                                            </div>

                                                                            <div class="col-lg-2">
                                                                                <h6 class="text-center border-bottom mb-2 pb-1">@error('wages')<span class="text-danger">{{$message}}</span> @else মজুরি @enderror </h6>
                                                                                <p>
                                                                                    <input type="number" wire:model="wages" class="form-control" placeholder="মজুরি" required>
                                                                                    <div class="invalid-feedback">আইটেম এর পরিমান দিন!</div>
                                                                                </p>
                                                                            </div>
                                                                            <div class="col-lg-2">
                                                                                <h6 class="text-center border-bottom mb-2 pb-1">ছাড় @error('discount')<span class="text-danger">{{$message}}</span> @enderror </h6>
                                                                                <p><input type="number" wire:model="discount" class="form-control" placeholder="ছাড়"></p>
                                                                            </div>
                                                                            <div class="col-lg-2">
                                                                                <h6 class="text-center border-bottom mb-2 pb-1">অগ্রিম @error('advance')<span class="text-danger">{{$message}}</span> @enderror </h6>
                                                                                <p><input type="number" wire:model="advance" class="form-control" placeholder="অগ্রিম.."></p>
                                                                            </div>
                                                                            <div class="col-lg-2">
                                                                                <h6 class="text-center border-bottom mb-2 pb-1">@error('total')<span class="text-danger">{!!$message!!}</span> @else মোট @enderror </h6>
                                                                                <p><input type="number" wire:model="total" class="form-control @error('total')is-invalid @enderror" placeholder="মোট" required></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            <!--Step 3/designing End-->

                                            <!--Step 4/designing Start-->
                                            <div class="col-xl-12 {{ $currentPage != 4 ? 'd-none' : '' }}">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        @if ($errors->any())
                                                            @foreach ($errors->all() as $item)
                                                                <p >{{$item}} </p>
                                                            @endforeach
                                                        @endif
                                                    </div>
                                                    <div class="col-lg-12"><h3 class="text-warning text-center mb-3 border-bottom pb-2">পুনরায় সকল তথ্য যাচাই করুন</h3></div>
                                                    <div class="col-lg-12">
                                                        <div class="row">
                                                            <div class="col-lg-4 col-sm-12">ডেলিভারি তারিখঃ- <span class="text-info"></span> </div>
                                                            <div class="col-lg-4 col-sm-12"> অর্ডার নং- <span class="text-info"></span></div>
                                                            <div class="col-lg-4 col-sm-12">অর্ডারঃ <span class="text-info">{{$products ? DB::table('products')->find($products)->name : ''}}</span></div>
                                                            <div class="col-lg-12 border-top border-secondary my-3"></div>
                        
                                                            <div class="col-lg-2 col-sm-4">লম্বা- <span class="text-info">{{$cloth_long}}</span></div>
                                                            <div class="col-lg-2 col-sm-4">
                                                                <div class="row">
                                                                    <div class="col-lg-12">বডি- <span class="text-info">{{$cloth_body}}</span></div>
                                                                    <div class="col-lg-12">বডির লুজ- <span class="text-info">{{$body_loose}}</span></div>
                                                                    <div class="col-lg-12">পেট- <span class="text-info">{{$cloth_belly}}</span></div>
                                                                    <div class="col-lg-12">পেটের লুজ- <span class="text-info">{{$belly_loose}}</span></div>
                                                                    <div class="col-lg-12">ঘের- <span class="text-info">{{$cloth_enclosure}}</span></div>
                                                                    <div class="col-lg-12"></div>
                                                                </div>
                                                            </div>
                        
                                                            <div class="col-lg-2 col-sm-4">
                                                                <div class="row">
                                                                    <div class="col-lg-12">হাতা- <span class="text-info">{{$hand_long}}</span></div>
                                                                    <div class="col-lg-12">হাতার মুহুরী- <span class="text-info">{{$sleeve_enclosure}}</span></div>
                                                                    <div class="col-lg-12">মোরা- <span class="text-info">{{$cloth_mora}}</span></div>
                                                                    <div class="col-lg-12">হাতায় পেস্টিং- <span class="text-info">{{$sleeve_pasting}}</span></div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-2 col-sm-4">
                                                                <div class="row">
                                                                    <div class="col-lg-12 col-sm-4">গলা- <span class="text-info">{{$cloth_throat}}</span></div>
                                                                    <div class="col-lg-12 col-sm-4">কলার- <span class="text-info">
                                                                        @if ($cloth_collar){{$cloth_collar}} {{$collar_measure_type==1 ? 'মোট':'সাধারণ'}}  @endif </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-2 col-sm-4">পুট- <span class="text-info">{{$cloth_shoulder}}</span></div>
                                                            <div class="col-lg-2 col-sm-4">নক সহ- <span class="text-info">{{$noke_shoho}}</span></div>
                                                            <div class="col-lg-12">সংযোজিত- <span class="text-info">{{$cloth_additional}}</span></div>
                                                            <div class="col-lg-12 border-top border-secondary my-3"></div>
                                                        </div>
                                                        <h4 class="text-secondary">ডিজাইনসমূহঃ</h4>
                                                        <div class="col-lg-12">
                                                            @if( count($designs_check)>0 )
                                                                <div class="row">
                                                                    <div class="col-lg-12 col-sm-12">
                                                                    @for( $i=0; $i < count($designs_check); $i++ )
                                                                        @if( 0 != array_values($designs_check)[$i] )
                                                                        <span class="text-secondary d-inline-block" style="max-width:100%"><b class="text-primary">{{$i+1}})</b> {{DB::table('style_measure_parts')->find(array_values($this->designs_check)[$i])->name}}-<span class="text-info">{{array_values($this->design_fields)[$i]}} @if($i < count($designs_check)-1 ), @endif</span></span>@endif  
                                                                    @endfor 
                                                                    </div>
                                                                </div>
                                                            @endif
                                                        </div>
                                                        <div class="col-lg-12 border-top border-secondary my-3"></div>
                                                        <h4 class="text-secondary">অর্ডার ডেলিভারিঃ</h4>
                                                        @if ($order_delivery==1)
                                                        <div class="col-lg-12 mb-3">
                                                            <div class="row">
                                                            <div class="col-lg-2">কুরিয়ার তথ্যঃ- <span class="text-info">{{$wages}}</span></div>
                                                            <div class="col-lg-2">কুরিয়ার চার্জঃ- <span class="text-info">{{$delivery_charge}}</span></div>
                                                            <div class="col-lg-8">কাস্টমারের তথ্যঃ- <span class="text-info">{{$line2? $line2.", ":''}}{{$line1}}-{{$zipcode}}, {{$city}},  {{$province}}, {{$country}}</span></div>
                                                            </div>
                                                        </div>  
                                                        @endif
                        
                                                        <div class="col-lg-12 border-top border-secondary my-3"></div>
                                                        <h4 class="text-secondary">মজুরিঃ</h4>
                                                        <div class="col-lg-12 mb-3">
                                                            <div class="row">
                                                            <div class="col-lg-2">অর্ডারের পরিমানঃ <span class="text-info">{{$quantity}}</span></div>
                                                            <div class="col-lg-2">একটির মজুরিঃ <span class="text-info">{{$wages}}</span></div>
                                                            <div class="col-lg-2">এডভান্সে <span class="text-info">{{$advance}}</span></div>
                                                            <div class="col-lg-2">ছাড়ঃ <span class="text-info">{{$discount}}</span></div>
                                                            <div class="col-lg-2">মোট: @if ($wages && $quantity)  <span class="text-info">{{(is_numeric($total)?$total:0)}}</span>@endif</div>
                                                            {{-- <div class="col-lg-2">বাকিঃ <span class="text-info">{{-4}}</span></div> --}}
                                                            <div class="col-lg-2">বাকিঃ <span class="text-info">{{(is_numeric($total)?$total:0)-(is_numeric($advance)?$advance:0)}}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--Step 4/designing End-->
                                            <!--Button Section Start-->
                                            <div class="col-xl-12">
                                                <div class="row">
                                                    <div class="col-xl-6 @if($currentPage != 1) d-none @endif"></div>
                                                    <div class="col-xl-6 @if( $currentPage == 1 ) d-none @endif"><button wire:click="goToPreviousPage" type="button" class="btn btn-warning w-100">Back</button></div>
                                                    <div class="col-xl-6 @if( $currentPage != $pages ) d-none @endif"> <button type="submit" class="btn btn-google w-100">Submit</button></div>
                                                    <div class="col-xl-6 @if( $currentPage == $pages ) d-none @endif"><button @if( $currentPage == $pages ) @else wire:click="goToNextPage" @endif type="button" class="btn btn-facebook w-100"> Next</button></div>
                                                </div> 
                                            <!--Button Section End-->
                                        </div>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!--step form Wrap End -->
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  @endif
{{-- 
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Header</th>
          <th>Header</th>
          <th>Header</th>
          <th>Header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1,001</td>
          <td>Lorem</td>
          <td>ipsum</td>
          <td>dolor</td>
          <td>sit</td>
        </tr>
        <tr>
          <td>1,002</td>
          <td>amet</td>
          <td>consectetur</td>
          <td>adipiscing</td>
          <td>elit</td>
        </tr>
        <tr>
          <td>1,003</td>
          <td>Integer</td>
          <td>nec</td>
          <td>odio</td>
          <td>Praesent</td>
        </tr>
        <tr>
          <td>1,003</td>
          <td>libero</td>
          <td>Sed</td>
          <td>cursus</td>
          <td>ante</td>
        </tr>
      </tbody>
    </table>
  </div>
  --}}
</div>
@push('scripts')
 <script>
  $(document).ready(function(){
    window.addEventListener('alert', event => { 
        toastr[event.detail.effect](event.detail.message,event.detail.custom),
        toastr.options = {
             "closeButton": true,
             "progressBar": true,
             "positionClass": "toast-center-center"//+event.detail.custom,
             }
    });
  });
</script>

@endpush
