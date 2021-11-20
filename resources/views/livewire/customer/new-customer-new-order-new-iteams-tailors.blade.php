@push('styles')
<link href="{{asset('assets/css/order.css')}}" rel="stylesheet">

@endpush
<div class="container-fluid" id="CustomContainer">↓
    <a><i wire:click="back(2)" class="fa fa-angle-left design_back_left_angle"></i></a>
    @if ($currentStep==3)
<style> i.fa.fa-angle-left.design_back_left_angle {position: fixed;top: 90%;left:16.5%;border: 2px solid purple;border-radius: 50%;font-size: 22px;padding: 6px 11px;display: flex;justify-content: center;align-items: center;color: purple;
    z-index: 777777;
}
</style> 
@endif
    @if (Session::has('msg'))    
    <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!} alert-dismissible fade show" style="position: absolute; z-index:8888; right:0; margin-top:px"  role="alert">
        <strong></strong> {!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    @endif
   
    {{-- @if ($errors->any())
        @foreach ($errors->all() as $item)
            <p class="text-danter">{{$item}}</p>
        @endforeach        
    @endif --}}
      {{-- @if ($errors->any())
    @foreach ($errors->all() as $key=> $err)
    <div class="alert alert-danger alert-dismissible fade show" style="position: absolute; z-index:8888; right:0; margin-top:{{$key>0?53*$key:''}}px"  role="alert">
        <strong></strong> {{$err}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    @endforeach
@endif  --}}
<script>function error_toastr($param){ toastr.error($param),toastr.options = {"closeButton": true,"progressBar": true,"positionClass": "toast-top-right"}}</script>
@if ($errors->any())
    @foreach ($errors->all() as $err)
    <p class="text-danger"></p>
    <script> error_toastr("{!! $err !!}")</script>
    @endforeach
@endif
{{-- @push('scripts') --}}
    
   {{-- @endpush --}}
    {{-- <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong><i class="fa fa-check-circle mr-1"></i> Message</strong>
        <button class="close" type="button" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    </div> --}}
    

  

<div class="row">
    <div style="transition: 1s all ease" class="col-xl-12 " id="right_sidebar">
        <div class="row btn-primary-invarce alert">
            <div class="col-xl-4 col-sm-6 col-12 text-center">
                <a class="btn btn-outline-success" href="{{route('new.customer')}}"><i class="fas fa-user"></i> নতুন গ্রাহক</a>
            </div>
            <div class="col-xl-4 col-sm-6 col-12 text-center">
                <a class="btn btn-outline-primary text-light" target="_blank" href="{{route('customer.customers')}}"><i class="fas fa-users"></i> সকল গ্রাহক</a>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xl-12"><h3>নতুন গ্রাহক, নতুন অর্ডার তৈরি করুন!</h3></div>
            
                @if(!empty($successMsg))
                <div class="col-xl-12 "  style="transition:0.6s all ease; ">
                    <div class="alert alert-success">
                        {{ $successMsg }}
                    </div> <div>
                @endif
           
            <div class="stepwizard my-3">
                <div class="stepwizard-row setup-panel">
                    <div class="multi-wizard-step">
                        <a href="#step-1" type="button"
                            class="btn {{ $currentStep != 1 ? 'btn-default' : 'btn-primary' }}">১</a>
                        <p style="color:#{{ $currentStep != 1 ? 'ddd' : '8a03c0' }}; line-height:18px;">অর্ডারের তথ্য</p>
                    </div>
                    <div class="multi-wizard-step">
                        <a href="#step-2" type="button"
                            class="btn {{ $currentStep != 2 ? 'btn-default' : 'btn-primary' }}">২</a>
                            <p style="color:#{{ $currentStep != 2 ? 'ddd' : '8a03c0' }}">অর্ডারের পরিমাপ</p>
                    </div>
                    <div class="multi-wizard-step">
                        <a href="#step-3" type="button"
                            class="btn {{ $currentStep != 3 ? 'btn-default' : 'btn-primary' }}" disabled="disabled">৩</a>
                            <p style="color:#{{ $currentStep != 3 ? 'ddd' : '8a03c0' }}; line-height:18px;">ডিজাইনসমূহ</p>
                    </div>
                    <div class="multi-wizard-step">
                        <a href="#step-4" type="button"
                            class="btn {{ $currentStep != 4 ? 'btn-default' : 'btn-primary' }}"
                            disabled="disabled">৪</a>
                            <p style="color:#{{ $currentStep != 4 ? 'ddd' : '8a03c0' }}; line-height:18px;">অর্ডারের মজুরি ও ডেলিভারি</p>
                    </div>
                    <div class="multi-wizard-step">
                        <a href="#step-4" type="button"
                            class="btn {{ $currentStep != 5 ? 'btn-default' : 'btn-primary' }}"
                            disabled="disabled">৫</a>
                            <p style="color:#{{ $currentStep != 5 ? 'ddd' : '8a03c0' }}; line-height:18px;">সকল তথ্য</p>
                    </div>
                </div>
            </div>
            <div class="form_wrappar" >
                
            <form class="was-validated" wire:submit.prevent="placeOrder" >                    
                <div class="row">
                    {{-- Step 1 --}}
                    <div class="col-xl-12 {{ $currentStep != 1 ? 'display-none' : '' }}" id="step-1">
                            <div class="row">
                            <div class="personal_information">
                                <h2>অর্ডারের তথ্য</h2>
                                <div class="row">
                                    <div class="col-lg-3">
                                        <label for="deliverydate">ডেলিভেরি তারিখঃ</label>
                                        <input type="date" class="form-control @error('delivery_date')is-invalid @enderror" wire:model="delivery_date" id="deliverydate"  required>
                                        
                                        @error('delivery_date') <div class="invalid-feedback">{!!$message!!}</div> @else
                                        @if ($delivery_date && $weekendholiday==Carbon\Carbon::now('Asia/Dhaka')->createFromFormat('Y-m-d', $delivery_date)->format('l'))
                                        <p class="mt-3" style="color: #2D88F3">
                                            {{--  --}}
                                        ({{$delivery_date}}),
                                        নির্বাচিত তারিখটি
                                        @if ($weekendholiday=='saturday') শনিবার @elseif ($weekendholiday=='sunday') রবিবার @elseif ($weekendholiday=='monday') সোমবার @elseif ($weekendholiday=='tuesday') মঙ্গলবার @elseif ($weekendholiday=='wednesday') বুধবার @elseif ($weekendholiday=='Thursday') বৃহস্পতিবার @elseif ($weekendholiday=='friday') শুক্রবার
                                        @endif
                                        প্রতিষ্ঠানের সাপ্তাহিক ছুটির দিন!
                                        </p>
                                        @else <div class="invalid-feedback">ডেলিভারি তারিখ দিন!</div>
                                        @endif
                                        
                                        
                                        @enderror 

                                    </div>
                                    <div class="col-lg-6 ">
                                        <div class="row">
                                            <div class="col-lg-9">                             
                                                <label for="order_number" style="letter-spacing:px" >অর্ডার নং- <span class="text-info">(সর্বশেষ অর্ডার নং-@if (DB::table('orders')->get()->count()>0){{DB::table('orders')->orderBy('id','DESC')->first()->order_number}} @else 0 @endif)</span></label>
                                                <input type="number" class="form-control @error('order_number') is-invalid @enderror" @if(!$force_id) min="{{!$force_id ? $maxOrderId: $order_number}}" max="{{$maxOrderId}}" @endif wire:model="order_number"  id="order_number" required>
                                                @error('order_number')<div class="invalid-feedback">{!!$message!!}</div>@enderror
                                                {{-- @error('order_number') <div class="text-danger">{!!$message!!}</div>@else @if(! $force_id)<div class="invalid-feedback">Order Number is required.</div>@endif @enderror --}}
                                            </div>
                                            <div class="col-lg-3">
                                                <input type="checkbox" value="1" wire:model="force_id" id="force_wish"> <label for="force_wish">পূর্ববর্তী অর্ডার নং যুক্ত করুন</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <label for="orderdate">অর্ডার তারিখঃ </label>
                                        <input type="date" class="form-control" wire:model="order_date" id="orderdate">
                                        @error('order_date') <div class="text-danger">{!!$message!!}</div>@enderror
                                        
                                    </div>

                                </div>
                                <div class="row my-3 " style="background: linear-gradient(34deg, #ddddd08, #f3f3f3">
                                    <div class="col-xl-12 text-center text-warning"><h4 class="heading pb-3 mb-4">ব্যক্তিগত/পরিচয় সংক্রান্ত তথ্য </h4></div>
                                        <div class="col-lg-6 mb-3">
                                            <label for="fullname">অর্ডারকারীর পুরো নামঃ</label>
                                            <input wire:model="Full_Name" type="text" class="form-control" id="fullname" placeholder="পুরো নাম" required>
                                            @error('Full_Name') <div class="text-danger">{!!$message!!}</div>@else <div class="invalid-feedback"> সঠিকভাবে নাম পূরণ করুন</div> @enderror
                                        </div>
        
                                        <div class="col-lg-6 mb-3">
                                            <label for="mobileNumber">মোবাইল নম্বর</label>
                                            <input wire:model="mobile" type="number" class="form-control @error('mobile') is-invalid @enderror" id="mobileNumber" placeholder="মোবাইল নম্বর.." required>
                                             <div class="invalid-feedback">@error('mobile'){!!$message!!}@else সঠিক মোবাইল নম্বর দিন!@enderror</div> 
                                        </div>
                                        
                                        <div class="col-lg-6 mb-3">
                                            <label for="email" class="d-flex">ইমেইল <span class="text-muted">(অপশনাল)</span>
                                                <div class="col-lg-12 d-inline-block d-flex">
                                                    <div class="custom-checkbox d-inline-block d-flex">
                                                        <input type="checkbox" class="custom-control-input" id="confirmmail" value="1" wire:model='confirm_mail'>
                                                        <label class="custom-control-label ml-3" style="color: @error('email') #e74a3b @else #a9a6a6 @enderror !important;" for="confirmmail">আপনি কাস্টমারকে ইমেইল পাঠাতে চাচ্ছেন?</label>
                                                    </div>
                                                </div>
                                            </label>
                                            <input wire:model="email" type="email" class="form-control" id="email" placeholder="you@example.com" {{ $confirm_mail ?'required':'' }} >
                                            
                                            <div class="invalid-feedback">@error('email') {!! $message!!} @else সঠিক ইমেইল যুক্ত করুন@enderror</div>
                                        </div>
                                        <div class="col-lg-6 mb-3 customer_photo">
                                            <label for="customerPhoto">কাস্টমারের ছবি (অপশনাল)</label>
                                            <div class="input-group input_customer_photo" style="positon:relative;">
                                                <input wire:model="photo" type="file" class="custom-file-input @error('photo') is-invalid @enderror" id="customerPhoto">
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
                            <div class="col-xl-12 mb-3 ">
                                <div class="row">
                                    <div class="col-xl-6">
                                        @if (!$errors->any() && $products !='' && $quantity !='' && $wages !='' && $total !='')
                                        <button type="{{$errors->isEmpty() ? 'submit':'button'}}" {{ $errors->isEmpty() ? '':'disabled'}} class="btn btn-primary btn-lg btn-block"><i class="fas fa-plus-cicle"></i> অর্ডার করুন</button>
                                        @else @if ( $formErrorOne==1 ) <h6 class="text-warning">বাধ্যতামূলক ঘরগুলো পূরণ করুন!</h6>  @endif
                                    @endif
                                        
                                    </div>
                                    <div class="col-xl-6 text-right">
                                        @if ($errors->isEmpty()  || $currentStep ==2 || $currentStep ==1 )
                                            <button style="transition-delay: 500ms; transition:0.4s all ease;" class="btn btn-primary btn-lg w-75"  wire:click="firstStepSubmit" type="button"><img style="max-width: 25px" src="{{asset('assets/img/preloader/loading.gif')}}" id="showtoast"> পরবর্তী ধাপ <i class="fa fa-arrow-right"></i> </button>
                                            @else 
                                                @if ($currentStep == 1)<img style="height: px" src="{{asset('assets/img/preloader/dot-preloader.gif')}}"> @endif
                                            
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{-- Step 1 Ebd --}}
                    {{-- Step 2 --}}
                    <div class="col-xl-12 {{ $currentStep != 2 ? 'display-none' : '' }} " id="step-2">
                        <div class="cloth_part_style">
                            <div class="row">
                                <div class="col-lg-12 py-5 @error('products')bg-warning @enderror product_name cloth_name" >
                                    <h5 class="d-block mb-4">কাপড়/পোষাক/অ্যাপ্রন নাম ও পরিমাপ</h5>
                                    <div class="row ">
                                        @if ( $allproducts)
                                            @foreach ($allproducts->where('status', 1) as $product)
                                                <div class="col-sm-2 col-xs-6" style="position: relative;">
                                                    <div class="custom-control custom-checkbox mb-1 d-inline-block">
                                                        <input type="radio" wire:model="products" name="dresses" value="{{$product->id}}" class="custom-control-input @error('products')form-control is-invalid @enderror" id="product_{{$product->id}}" {{--sizeof($products)==0?'required':''--}}>
                                                        <label class="custom-control-label" for="product_{{$product->id}}">{{$product->name}} <img src="{{asset('assets/img/undraw_profile.svg')}}" class="img-thumbnail-" width="30" alt=""></label>
                                                    </div>
                                                </div>
                                            @endforeach
                                        @endif
                                        
                                    </div> {{--dresh panzabi .row end--}}
                                    {{-- @endforeach --}}
                                    @error('products') <div class="invalid-feedback"> {!!$message!!} </div>  @enderror    
                                </div>
                                
                                {{-- Measure ment area --}}
                                <div class="col-lg-12 pt-4">
                                    <div class="row">
                                        <div class="col-lg-2 mb-3">
                                            <label for="clothlong">লম্বা</label>
                                            <input wire:model="cloth_long" type="text" class="form-control" id="clothlong" placeholder="Long" required>
                                            @error('cloth_long')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">পোশাকের লম্বা দিন?</div> @enderror
                                        </div>
                                        {{-- Body part Start --}}
                                        <div class="col-lg-3 col-md-6 mb-3">
                                            <div>
                                                <label for="clothbody">বডি</label>
                                                <input wire:model="cloth_body" type="text" class="form-control" id="clothbody" placeholder="বডি">
                                                @error('cloth_body')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">পোশাকের বডি দিন?</div> @enderror
                                            </div>

                                            <div>
                                                <label for="bodyloose">বডির লুজ</label>
                                                <input wire:model="body_loose" type="text" class="form-control" id="bodyloose" placeholder="বডির লুজ">
                                                @error('body_loose')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">পোশাকের বডি লুজ দিন?</div> @enderror
                                            </div>

                                            <div>
                                                <label for="clothbelly">পেট</label>
                                                <input wire:model="cloth_belly" type="text" class="form-control" id="clothbelly"_ placeholder="পাট">
                                                @error('cloth_belly')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">পোশাকের পেট পরিমাপ দিন?</div> @enderror
                                            </div>

                                            <div>
                                                <label for="bodyloose">পেটের লুজ</label>
                                                <input wire:model="belly_loose" type="text" class="form-control" id="bodyloose" placeholder="পাটের লুজ">
                                                @error('belly_loose') <div class="text-danger">{!!$message!!} </div> @else <div class="invalid-feedback">পোশাকের বডি পেট লুজের পরিমাপ দিন? </div> @enderror
                                            </div>

                                            <div>
                                                <label for="enclosure">ঘের</label>
                                                <input wire:model="cloth_enclosure" type="text" class="form-control" id="enclosure" placeholder="ঘের" required>
                                                @error('cloth_enclosure')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">পোশাকের ঘের দিন?</div> @enderror
                                            </div>
                                        </div>
                                        {{-- Body Part End --}}
                                        {{-- Heeeve Area Start --}}
                                        <div class="col-lg-3 col-md-6 mb-3">
                                            <div class="">
                                            <label for="handlong">হাতা</label>
                                            <input wire:model="hand_long" type="text" class="form-control" id="handlong" placeholder="হাতা" required>
                                            @error('hand_long')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">হাতা লম্বা দিন?</div> @enderror
                                            </div>
                                            <div>
                                            <label for="sleeveenclosure">হাতার মুহুরী</label>
                                            <input  wire:model="sleeve_enclosure" type="text" class="form-control" id="sleeveenclosure" placeholder=" হাতার মুহুরী">
                                            @error('sleeve_enclosure')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">হাতার মুহুরী দিন?</div> @enderror
                                            </div>
                                            <div class="">
                                                <label for="clothmora">মোরা</label>
                                                <input wire:model="cloth_mora" type="text" class="form-control" id="clothmora" placeholder="মোরা">
                                                <div class="invalid-feedback">@error('cloth_mora') {!!$message!!} @else Mora code required. @enderror</div>
                                            </div>
                                            <div>
                                            <label for="SleevePasting">হাতায় পেস্টিং</label>
                                            <input wire:model="sleeve_pasting" type="text" class="form-control" id="SleevePasting" placeholder="হাতায় পেস্টিং">
                                            @error('sleeve_pasting')<div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">হাতা লম্বা হবে?</div> @enderror
                                            </div>
                                        </div>
                                        {{-- Heeeve Area End --}}

                                        <div class="col-lg-2 col-md-6 mb-3">
                                            <div>
                                            <label for="cloththroat">গলা</label>
                                            <input wire:model="cloth_throat" type="text" class="form-control" id="cloththroat" max="30" placeholder="গলা" @if ($cloth_collar==null) required @endif >
                                            @error('cloth_throat') <div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">গলার পরিমাপ দিন?</div> @enderror 
                                            </div>
                                            <div>
                                                <label for="clothcollar">কলার</label>
                                                <input wire:model="cloth_collar" type="text" class="form-control" id="clothcollar" max="30" placeholder="কলার" @if ($cloth_throat==null) required @endif>
                                                @if ($cloth_collar) <select class="form-control" wire:model="collar_measure_type"><option selected value="0">সাধারণ</option><option value="1">মোট</option></select> @endif
                                                @error('cloth_collar') <div class="text-danger"> {!!$message!!}</div> @else <div class="invalid-feedback">কলার পরিমাপ দিন?</div> @enderror 
                                            </div>
                                            
                                        </div>
                                        <div class="col-lg-2 col-md-6 mb-3">
                                            <div class="mb-3">
                                                <label for="clothshoulder">পুট</label>
                                                <input wire:model="cloth_shoulder" type="text" class="form-control" id="clothshoulder" max="40" placeholder="পুট.." required>
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
                                        <div class="col-lg-6 col-sm-12 mx-lg-auto mb-3">
                                            <label for="additional">অতিরিক্ত বিষয়গুলো এখানে লিখুন!</label>
                                            <textarea type="text" wire:model="cloth_additional" class="form-control" placeholder="সংযোজিত"></textarea>
                                            @error('cloth_additional') <div class="text-danger">{!!$message!!} </div>@enderror
                                        </div>
                                        <div class="col-lg-6 col-sm-12 mx-lg-auto mb-3">
                                                <h6>অর্ডারের নমুনা ছবিঃ</h6>
                                            <div class="custom-file my-1">
                                                <input wire:model="order_sample_images" type="file" class="custom-file-input" id="orderSampleImage" multiple>
                                                <label class="custom-file-label" for="orderSampleImage">অর্ডারের নমুনা ছবিঃ</label>
                                                @error('order_sample_images') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">সঠিক ছবি যুক্ত করুন! ছবির ধরন (jpg, jpeg, png)!</div>@enderror
                                            </div>
                                            @if ( $order_sample_images )
                                                <span class="temp_img_wrap" >
                                                    @foreach ($order_sample_images as $sample)
                                                    <img src="{{$sample->temporaryUrl()}}" width="60" alt="">
                                                    @endforeach
                                                </span>
                                            @endif
                                        </div>

                                    </div>
                                </div>
                                {{-- Measure area End --}}
                                <div class="col-xl-12 mt-3">
                                    <div class="row">
                                        <div class="col-xl-6 col-12"><button class="btn btn-danger nextBtn btn-lg col-12 col-mb-2" type="button" wire:click="back(1)"><i class="fa fa-arrow-left"></i> পেছনের ধাপ</button></div>
                                        @if ($errors->isEmpty()  || $currentStep ==2)
                                            <div class="col-xl-6 col-12">
                                            <button class="btn btn-primary btn-lg w-100 " type="button" wire:click="measurementSubmit"><img style="max-width: 25px" src="{{asset('assets/img/preloader/loading.gif')}}"> পরবর্তী ধাপ <i class="fa fa-arrow-right"></i></button> </div> 
                        
                                        @else  <div class="col-xl-6 col-12 text-cente"><h6 class="col-xl-12 text-danger"><marquee direction="right">বাধ্যতামূলক ঘরগুলো পূরণ করুন!</marquee></h6></div>
                                        @endif
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {{-- Step 3 --}}
                    <div class="col-xl-12 {{ $currentStep != 3 ? 'display-none' : '' }} " id="step-3">
                        <div class="col-md-12 step-3">
                            <h5 class="d-block">কাপড়/পোষাক/অ্যাপ্রন ডিজাইন সমূহের নাম ও পরিমাপ</h5>
                            @if ($styleGroup && $designItems)
                            @foreach ($designItems as $design)
                            <div class="row py-1">
                                <div class="col-xl-12 py-3">
                                    <h4 class="">{{$design->name .'/'. $design->slug}}</h4>
                                </div>
                                <div class="col-xl-12">
                                    <div class="row">
                                        @foreach ( $styleGroup->where('dependency', $design->slug) as $style )
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

                        <div class="col-xl-12 mt-3">
                            <div class="row">
                                <div class="col-xl-6 col-12"><button class="btn btn-danger nextBtn btn-lg col-12 col-mb-2" type="button" wire:click="back({{$currentStep-1}})"><i class="fa fa-arrow-left"></i> পেছনের ধাপ</button></div>
                                {{-- $cloothDesignOutpurResult==0 &&  --}}
                                @if ($errors->isEmpty())
                                    <div class="col-xl-6 col-12">
                                    <button class="btn btn-primary btn-lg w-100" type="button" wire:click="designStepSubmit">পরবর্তী ধাপ <i class="fa fa-arrow-right"></i></button> </div> 
                
                                @else  <div class="col-xl-6 col-12 text-center"><h6 class="col-xl-12 text-danger"><marquee direction="right">বাধ্যতামূলক ঘরগুলো পূরণ করুন!</marquee></h6></div>
                                @endif
                                
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    {{-- Step 4 Start --}}
                    <div class="col-lg-12 {{ $currentStep != 4 ? 'display-none' : '' }} " id="step-4">
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
                                            <input wire:model="delivery_charge" type="text" class="form-control" id="deliverycharge" placeholder="কুরিয়ার চার্জ..." required>
                                            @error('delivery_charge') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">কুরিয়ার চার্জ লিখুন!</div>@enderror
                                        </div>
                                        
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
                                            @error('country') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">Select a country</div> @enderror 
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
                                                        @foreach ($allproducts as $product)
                                                                @if ($product->id == $products)
                                                                    <p>{{$product->name}}</p>
                                                                @endif
                                                        @endforeach
                                                    </p>
                                                </div>
                                                <div class="col-lg-2">
                                                    <h6 class="text-center border-bottom mb-2 pb-1">পরিমাণ @error('quantity')<span class="text-danger">{{--$message--}} দিন!</span> @enderror </h6>
                                                    <p><input type="number" min="1" wire:model="quantity" class="form-control" placeholder="পরিমাণ" required></p>
                                                </div>

                                                <div class="col-lg-2">
                                                    <h6 class="text-center border-bottom mb-2 pb-1">মজুরি  @error('wages')<span class="text-danger">{{$message}}</span> @enderror </h6>
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
                                                    <h6 class="text-center border-bottom mb-2 pb-1">মোট</h6>
                                                    <p><input type="number" wire:model="total" class="form-control" placeholder="মোট" required></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-12 mt-3">
                                <div class="row">
                                    <div class="col-xl-6 col-12"><button class="btn btn-danger nextBtn btn-lg col-12 col-mb-2 " type="button" wire:click="back({{$currentStep-1}})"><i class="fa fa-arrow-left"></i> পেছনের ধাপ</button></div>
                                    @if ( $wagesOutpurResult==0 && $errors->isEmpty() )
                                        <div class="col-xl-6 col-12">
                                        <button class="btn btn-primary btn-lg w-100" type="button" wire:click="wagesStepSubmit">পরবর্তী ধাপ <i class="fa fa-arrow-right"></i></button> </div> 
                                    @else  <div class="col-xl-6 col-12 text-center"><h6 class="col-xl-12 text-danger"><marquee direction="right">বাধ্যতামূলক ঘরগুলো পূরণ করুন!</marquee></h6></div>
                                    @endif
                                    
                                </div>
                            </div>
                        </div>
                    </div>  
                    {{-- Step 4 End --}}
                    {{-- Step 5 Start --}}
                    <div class="col-lg-12 {{ $currentStep != 5 ? 'display-none' : '' }} " id="step-5">
                        <div class="row">
                            <div class="col-lg-12">
                                @if ($errors->any())
                                    @foreach ($errors->all() as $item)
                                        <p >{{$item}} </p>
                                    @endforeach
                                @endif
                            </div>
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-lg-4 col-sm-12">ডেলিভারি তারিখঃ- <span class="text-info">{{$delivery_date}}</span>, <span class="text-info">@if ($weekendholiday=='saturday') শনিবার @elseif ($weekendholiday=='sunday') রবিবার @elseif ($weekendholiday=='monday') সোমবার @elseif ($weekendholiday=='tuesday') মঙ্গলবার @elseif ($weekendholiday=='wednesday') বুধবার @elseif ($weekendholiday=='Thursday') বৃহস্পতিবার @elseif ($weekendholiday=='friday') শুক্রবার @endif </div>
                                    <div class="col-lg-4 col-sm-12"> অর্ডার নং- <span class="text-info">{{$order_number}}</span></div>
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
                                            @for( $i=0; $i < count($designs_check); $i++ )
                                                @if( 0 != array_values($designs_check)[$i] )
                                                <div class="col-lg-3 col-sm-12">{{DB::table('style_measure_parts')->find(array_values($this->designs_check)[$i])->name}}-<span class="text-info">{{array_values($this->design_fields)[$i]}}</span></div>@endif  
                                            @endfor 
                                        </div>
                                    @endif
                                </div>
                                <div class="col-lg-12 border-top border-secondary my-3"></div>
                                <h4 class="text-secondary">মজুরিঃ</h4>
                                <div class="col-lg-12 mb-3">
                                    <div class="row">
                                    <div class="col-lg-2">অর্ডারের পরিমানঃ <span class="text-info">{{$quantity}}</span></div>
                                    <div class="col-lg-2">একটির মজুরিঃ <span class="text-info">{{$wages}}</span></div>
                                    
                                    <div class="col-lg-2">ছাড়ঃ <span class="text-info">{{$discount}}</span></div>
                                    <div class="col-lg-2">মোট: @if ($wages && $quantity)  <span class="text-info">{{$total}}</span>@endif</div>
                                    </div>
                                </div>
                                    
       
                            </div>
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-lg-4 col-sm-12"><button class="display-inline-block btn btn-success nextBtn btn-lg col-12 col-mb-2 " type="button" wire:click="back({{$currentStep-1}})"><i class="fa fa-arrow-left"></i> পেছনের ধাপ</button></div>
                                    <div class="col-lg-4 col-sm-12 mb-2"><a style="margin-top:1px;" class="btn btn-danger d-block btn-lg" href="{{route('new.customer')}}"><i class="fas fa-minus-circle"></i></i> সকল তথ মুছে ফেলুন</a></div>
                                    <div class="col-lg-4 col-sm-12">@if (!$errors->any())
                                        <button type="{{$errors->isEmpty() ? 'submit':'button'}}" {{ $errors->isEmpty() ? '':'disabled'}} class="btn btn-primary btn-lg btn-block"><i class="fas fa-plus-cicle"></i> অর্ডার করুন</button> {{--🐇🌶️--}}
                                    @endif </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    {{-- Step 5 Start --}}
                </div>
            </form>
        </div>
    </div>
    </div>
    </div>
    {{-- toastr["success"]("My name is Inigo Montoya. You killed my father. Prepare to die!") --}}
            {{-- toastr.options = {
             "closeButton": false,
             "debug": false,
             "newestOnTop": false,
             "progressBar": true,
             "positionClass": "toast-top-right",
             "preventDuplicates": false,
             "onclick": null,
             "showDuration": "300",
             "hideDuration": "1000",
             "timeOut": "5000",
             "extendedTimeOut": "1000",
             "showEasing": "swing",
             "hideEasing": "linear",
             "showMethod": "fadeIn",
             "hideMethod": "fadeOut"
             } --}}
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
