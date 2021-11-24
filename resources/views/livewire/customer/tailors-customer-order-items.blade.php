<div>
    @if ($formId)<style>.input-group-append{z-index: 0;}</style>@endif
    <style>.active-cyan-2 input.form-control[type=text]:focus:not([readonly]) {border-bottom: 1px solid #4dd0e1;box-shadow: 0 1px 0 0 #4dd0e1;}</style>
    @if ($errors->any())
       @foreach ($errors->all() as $err)
           <p class="text-danger">{{$err}}</p>
           
    <script> toastr["error"]("{!!$err!!}",'')</script>
        @endforeach
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
        <div class="col-xl-12">
            {{-- where('created_at', 'like', '2015-08-20%')->get()User::whereDate('created_at', '=', Carbon::today()->toDateString()); --}}
            {{-- <h1>Todays new Customer({{Carbon\Carbon::today()->format('Y-m-d')}})</h1> --}}
            @foreach ($orderItems as $orderItem)
                <p>{{print_r($orderItem)}}</p>
            @endforeach
            
        </div>
        </div>
        @if ($formId==0)
    <button type="button" class="btn btn-success" wire:click="formController(1)">Create User</button>
    @endif
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
                                        
                                        <!--step 5 Start-->
                                        <div class="step-status-content d-table-cell">
                                            <a href="#" class="btn {{ $currentPage != 5 ? 'btn-light' : 'btn-primary' }}">5</a>
                                            <p class="my-3 {{ $currentPage != 5 ? '' : 'text-primary' }}">Step-1</p>
                                        </div>
                                        <!--step 5 Stop-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12">
                            <!--step form Wrap Start -->
                            <div class="row">
                                <div class="col-xl-12">
                                    {{-- @if ($errors->isNotEmpty())
                                        <div class="text-sm bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                            <strong class="font-bold">Oops!</strong>
                                            <span class="block sm:inline">There are some errors with your submission.</span>
                                        </div>
                                    @endif
                                    @if ($success)
                                        <div class="text-sm bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                            <span class="block sm:inline">{{ $success }}</span>
                                            <span wire:click="resetSuccess" class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                                <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                            </span>
                                        </div>
                                    @endif --}}
                                    @if ($errors->any())
                                        @foreach ($errors->all() as $item)
                                           <p class="text-danger">{{$item}}</p> 
                                        @endforeach
                                    @endif
                                </div>
                                <div class="col-xl-12">currentPage {{$currentPage}} </div>
                                <div class="col-xl-12">
                                    <form autocomplete="off" wire:submit.prevent="placeIteam" class="was-validated">
                                        <div class="row">

                                            <!--Step 1/Measurement Start-->
                                            <div class="col-xl-12 {{ $currentPage != 1 ? 'd-none' : '' }}">
                                                <div class="row">
                                                    @if (DB::table('products')->count()>0)
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
                                                                    <input wire:model="cloth_long" type="text" class="form-control @error('cloth_long')is-invalid @enderror" id="clothlong" placeholder="Long" required>
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
                                                                        @if ( $order_sample_images )
                                                                            <span class="temp_img_wrap">@foreach ($order_sample_images as $sample)<img src="{{$sample->temporaryUrl()}}" width="60">@endforeach</span>
                                                                        @endif
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                            </div><!--Step 1/Measurement End-->

                                            <!--Step 2/designing Start-->
                                            <div class="col-xl-12 {{ $currentPage != 2 ? 'd-none' : '' }}">
                                                <h1>Step 2</h1>
                                            </div>
                                            <!--Step 2/designing End-->
                                            
                                            <!--Step 3/designing Start-->
                                            <div class="col-xl-12 {{ $currentPage != 3 ? 'd-none' : '' }}">
                                                <h1>Step 3</h1>
                                            </div>
                                            <!--Step 3/designing End-->

                                            <!--Step 4/designing Start-->
                                            <div class="col-xl-12 {{ $currentPage != 4 ? 'd-none' : '' }}">
                                                <h1>Step 4</h1>
                                            </div>
                                            <!--Step 4/designing End-->

                                            <!--Step 5/designing Start-->
                                            <div class="col-xl-12 {{ $currentPage != 5 ? 'd-none' : '' }}">
                                                <h1>Step 5</h1>
                                            </div>
                                            <!--Step 5/designing End-->

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
 
</div>
