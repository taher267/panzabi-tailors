<div>
    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!}">{!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}</div>
    @endif
    <style>
        @media (max-width: 575px){.col-mb-2{margin-bottom:.5rem!important}}
        .display-none { display: none;} .multi-wizard-step p { margin-top: 12px; }

.stepwizard-row {display: table-row;}
.stepwizard {display: table; position: relative;width: 100%;}
.multi-wizard-step button[disabled] {filter: alpha(opacity=100) !important; opacity: 1 !important;}
.stepwizard-row:before {top: 14px;bottom: 0;content: " ";width: 100%;height: 1px;z-index: 0;position: absolute;background-color: #fefefe;}
.multi-wizard-step {text-align: center;position: relative;display: table-cell;}
#step-1 button[type='button'],#step-2 button[type='button'],#step-3 button[type='button'],#step-4 button[type='submit'],.animated{ -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
         -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;
}

</style>
    
    <div class="row">
        <div class="col-xl-12">
        <div class="col-xl-12 text-warning">{{$Full_Name}} এর অরডারসমুহ</div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Order No/Iteams</th>
                        <th>Order No</th>
                        <th>Wages <b>({{$allOrders->sum('wages')}})</b></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($allOrders as $order)
                    <tr>
                        <td scope="row">{{$order->order_number}}/{{$order->orderitems->count()}}</td>
                        <td scope="row"></td>
                        <td>{{ $order->wages }}</td>
                        <td></td>
                        <td>
                            <a href="{{--route('customer.orders', $todaysCustomer->id)--}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i>Orders</a>
                            <a href="{{--route('customer.details', $todaysCustomer->id)--}}" target="_blank" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                            <a href="{{--route('customer.editinfo', $todaysCustomer->id)--}}" target="_blank" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                            @if(session('utype')==='ADM')<a href="#" wire-:click.prevent="producpelete({{--$todaysCustomer->id--}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>@endif
                        </td>
                    </tr>  
                    @endforeach
                    
                </tbody>
            </table>
        </div>
    </div>

    <div class="row">

        <div class="col-xl-12"><h3>Customer Orders</h3></div>
        
        {{-- @if($col_0==0) col-xl-0 @else col-xl-3 @endif --}}
        {{-- @if($col_0==0) col-xl-12 @else col-xl-9 @endif --}}
        <div class="col-xl-12 "  style="transition:0.6s all ease; ">
            @if(!empty($successMsg))
                <div class="alert alert-success">
                    {{ $successMsg }}
                </div>
                @endif
            <div>
                
                <div class="stepwizard">
                    <div class="stepwizard-row setup-panel">
                        <div class="multi-wizard-step">
                            <a href="#step-1" type="button"
                                class="btn {{ $currentStep != 1 ? 'btn-default' : 'btn-primary' }}">১</a>
                            <p>ধাপ ১/ </p>
                            {{-- অর্ডারের তথ্য ও অর্ডারকারীর তথ্য  --}}
                        </div>
                        <div class="multi-wizard-step">
                            <a href="#step-2" type="button"
                                class="btn {{ $currentStep != 2 ? 'btn-default' : 'btn-primary' }}">২</a>
                            <p>ধাপ ২</p>
                        </div>
                        <div class="multi-wizard-step">
                            <a href="#step-3" type="button"
                                class="btn {{ $currentStep != 3 ? 'btn-default' : 'btn-primary' }}" disabled="disabled">৩</a>
                            <p>ধাপ ৩</p>
                        </div>
                        <div class="multi-wizard-step">
                            <a href="#step-4" type="button"
                                class="btn {{ $currentStep != 4 ? 'btn-default' : 'btn-primary' }}"
                                disabled="disabled">৪</a>
                            <p>ধাপ ৪</p>
                        </div>
                    </div>
                </div>
                <form class="was-validated">                    
                    <div class="row">
                        {{-- Step 1 --}}
                        <div class="col-xl-12 {{ $currentStep != 1 ? 'display-none' : '' }}" id="step-1">
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
                                        <div class="col-xl-12 text-center text-warning"><h4 class="heading pb-3 mb-4">ব্যক্তিগত/পরিচয় সংক্রান্ত তথ্য </h4></div>
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
                                                    @error('photo') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">সঠিক ছবি যুক্ত করুন! ছবির ধরন (jpg, jpeg, png)!</div>@enderror
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
                                            </div>
                                    </div>
            
                                </div>
                                    
                                @if ( $formErrorOne==0 && $errors->isEmpty())
                                        <button style="transition-delay: 500ms; transition:0.4s all ease; " class="mt-2 btn btn-primary nextBtn btn-lg pull-right"  wire:click="firstStepSubmit" type="button">পরবর্তী ধাপ </button> 

                                @else <h6 class="text-warning">বাধ্যতামূলক ঘরগুলো পূরণ করুন!</h6>
                                @endif
                        </div>
                    {{-- Step 2 --}}
                    <div class="col-xl-12 {{ $currentStep != 2 ? 'display-none' : '' }}" id="step-2">
                        <div class="cloth_part_style">
                            <div class="row">
                                <div class="col-lg-12 bg-primary py-5">
                                    <h5 class="d-block text-light">কাপড়/পোষাক/অ্যাপ্রন নাম ও পরিমাপ</h5>
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
                                            <input wire:model="hand_long" type="number" class="form-control" id="handlong" placeholder="Hleeve হাতা" required>
                                            @error('hand_long')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">হাতা লম্বা দিন?</div> @enderror
                                            </div>
                                            <div>
                                            <label for="sleeveenclosure">হাতার মুহুরী</label>
                                            <input  wire:model="sleeve_enclosure" type="number" class="form-control" id="sleeveenclosure" placeholder="Sleeve enclosure হাতার মুহুরী" required>
                                            @error('sleeve_enclosure')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">হাতার মুহুরী দিন?</div> @enderror
                                            </div>
                                            <div class="">
                                                <label for="clothmora">মোরা</label>
                                                <input wire:model="cloth_mora" type="number" class="form-control" id="clothmora" placeholder="মোরা">
                                                <div class="invalid-feedback">@error('cloth_mora') {!!$message!!} @else Mora code required. @enderror</div>
                                            </div>
                                            <div>
                                            <label for="SleevePasting">হাতায় পেস্টিং</label>
                                            <input wire:model="sleeve_pasting" type="text" class="form-control" id="SleevePasting" placeholder="Sleeve Pasting/হাতায় পেস্টিং">
                                            @error('sleeve_pasting')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">হাতা লম্বা হবে?</div> @enderror
                                            </div>
                                        </div>
                                        {{-- Heeeve Area End --}}
    
                                        <div class="col-lg-2 col-md-6 mb-3">
                                            <div>
                                            <label for="cloththroat">গলা</label>
                                            <input wire:model="cloth_throat" type="number" class="form-control" id="cloththroat" max="30" placeholder="গলা/Throat" @if ($cloth_collar==null) required @endif >
                                            @error('cloth_throat') <div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">গলার পরিমাপ দিন?</div> @enderror 
                                            </div>
                                            <div>
                                                <label for="clothcollar">কলার</label>
                                                <input wire:model="cloth_collar" type="number" class="form-control" id="clothcollar" max="30" placeholder="কলার" @if ($cloth_throat==null) required @endif>
                                                @if ($cloth_collar) <select class="form-control" wire:model="collar_measure_type"><option selected value="0">সাধারণ</option><option value="1">মোট</option></select> @endif
                                                @error('cloth_collar') <div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback"> কলার পরিমাপ দিন? </div> @enderror 
                                            </div>
                                            
                                        </div>
                                        <div class="col-lg-2 col-md-6 mb-3">
                                            <div class="mb-3">
                                                <label for="clothshoulder">পুট</label>
                                                <input wire:model="cloth_shoulder" type="number" class="form-control" id="clothshoulder" max="40" placeholder="পুট.." required>
                                                @error('cloth_shoulder') <div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback"> পুটের পরিমাপ দিন?</div> @enderror
                                            </div>
                                            
                                            <div class="mb-3">
                                                <label for="nokeshoho">নক সহ</label>
                                                <input wire:model="noke_shoho" type="text" class="form-control" id="nokeshoho" placeholder="নক সহ">
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
                                <div class="col-xl-12 mt-3">
                                    <div class="row">
                                        <div class="col-xl-6 col-sm-5"><button class="btn btn-danger w-50 nextBtn btn-lg col-12 col-mb-2 " type="button" wire:click="back(1)"><i class="fa fa-arrow-left"></i> পেছনের ধাপ</button></div>
                                        @if ($formErrorTwo==0 && $errors->isEmpty())
                                            <div class="col-xl-6 col-sm-4 order-2 col-12 text-right">
                                            <button class="btn btn-primary btn-lg push-right w-50 " type="button" wire:click="secondStepSubmit">পরবর্তী ধাপ</button> </div> 
                        
                                        @else  <div class="col-xl-6 col-sm-4 order-2 col-12 text-center"><h6 class="col-xl-12 text-danger"><marquee direction="right">বাধ্যতামূলক ঘরগুলো পূরণ করুন!</marquee></h6></div>
                                        @endif
                                        
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                    </div>
                    <div class="col-xl-12 {{ $currentStep != 3 ? 'display-none' : '' }}" id="step-3">
                        <div class="col-md-12 step-3">
                            <h5 class="d-block text-light">কাপড়/পোষাক/অ্যাপ্রন ডিজাইন সমূহের নাম ও পরিমাপ</h5>
                            @if ($styleGroup && $designItems)
                            @foreach ($designItems as $design)
                            <div class="row py-3">
                                <div class="col-xl-12 py-3">
                                    <h4 class="">{{$design->name .'/'. $design->slug}}</h4>
                                </div>
                                <div class="col-xl-12">
                                    <div class="row">
                                        @foreach ( $styleGroup->where('dependency', $design->slug) as $style )
                                        <div class="col-lg-2 col-sm-6 design_bg sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})"> 
                                            <div class="custom-control custom-checkbox mb-1 d-inline-block">
                                                <input type="checkbox" wire:model="designs_check.{{ $style->id }}" wire:change="fillEmptyStyleField({{$style->id}})" value="{{ $style->id }}" class="custom-control-input" id="style_{{$style->id}}" @if( in_array( $style->id, array_keys($design_fields) , true) && $design_fields[$style->id] != '')required @endif>
                                                <label class="custom-control-label" for="style_{{$style->id}}">{{$style->name}} <img src="{{asset('assets/img/undraw_profile.svg')}}" class="img-thumbnail-" width="30" alt=""></label>
                                                <div class="invalid-feedback"> <i class="fa fa-check " style="color: #34E3A4"></i> টিক দিন!</div>
                                                @error('designs_check') <div class="text-danger"> {!!$message!!}</div> {{--@else <div class="invalid-feedback text-warning">যেকোনো একটি নির্বাচন করুন </div>--}}  @enderror
                                                <textarea wire:model="design_fields.{{ $style->id }}" rows="1" class="form-control" value="{{$style->id}}"></textarea>
                                                
                                            </div>
                                        </div>
                                        @endforeach                                    
                                    </div>  
                                </div>
                            </div>
                            @endforeach
                        @endif
                            <button class="btn btn-primary nextBtn btn-lg pull-right" type="button"
                                wire:click="thirdStepSubmit">Next</button>
                            <button class="btn btn-danger nextBtn btn-lg pull-right" type="button" wire:click="back(2)">Back</button>
                        </div>
                    </div>
                    <div class="col-xl-12 {{ $currentStep != 4 ? 'display-none' : '' }}" id="step-4">
                        <div class="col-md-12 step-4">
                            <h3> Step 4</h3>
                            <table class="table">
                                <tr>
                                    <td>Team Name:</td>
                                    <td><strong>
                                        {{-- {{print_r($products)}} --}}
                                    {{-- @if (count($products)>0)
                                        @foreach ($products as $product)
                                        @foreach ($allproducts as $currentProduct)
                                            @if ($product==$currentProduct->id)
                                            <p>{{$currentProduct->name}}</p>
                                            @endif                                            
                                            @endforeach
                                        @endforeach
                                    @endif --}}
                                </strong></td>
                                </tr>
                                <tr>
                                    <td>Team Price:</td>
                                    <td><strong>{{$delivery_date}}</strong></td>
                                </tr>
                                <tr>
                                    <td>Team status:</td>
                                    <td><strong>{{$cloth_body}}</strong></td>
                                </tr>
                                <tr>
                                    <td>Team Detail:</td>
                                    <td><strong>{{$address}}</strong></td>
                                </tr>
                            </table>
                            <button class="btn btn-success btn-lg pull-right" wire:submit.prevent="PlaceOrder" type="submit">Finish!</button>
                            <button class="btn btn-danger nextBtn btn-lg pull-right" type="button" wire:click="back(3)">Back</button>
                        </div>
                    
                </div>
                </form>
        </div>
    
    </div>
    
    </div> <!--Persinal information End-->
    
    <style>
        @keyframes fadein {from { opacity: 0; }to{ opacity: 1; }} @-moz-keyframes fadein {from { opacity: 0; }to{ opacity: 1; }}@-webkit-keyframes fadein {from { opacity: 0; }to{ opacity: 1; }}@-ms-keyframes fadein {from { opacity: 0; }to{ opacity: 1; }}@-o-keyframes fadein {from { opacity: 0; }to{ opacity: 1; }}​
        .cloth_part_style .design_bg::after {
    position: absolute;content: '';width: 100%; height: 100%;
    /*3e3e3e */  background: radial-gradient(#8C00BF, transparent);
}
.design_bg {padding: 25px 7px;background-size: cover !important;background-position: center !important;position: relative;margin: 0 0 2 px 0 !important;
}
.design_bg label{ color:#fff !important;}
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
