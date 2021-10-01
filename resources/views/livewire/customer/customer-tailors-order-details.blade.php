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
            <table class="table">
                <thead>
                    <tr>
                        <th>items</th>
                        <th>Order No</th>
                        <th>Wages <b>({{$allOrders->sum('wages')}})</b></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($allOrders as $order)
                    <tr>
                        <td scope="row">{{$order->orderitems->count()}}</td>
                        <td scope="row">{{$order->order_number}}</td>
                        <td>{{print_r($order->wages)}}</td>
                        <td></td>
                        <td></td>
                    </tr>  
                    @endforeach
                    
                </tbody>
            </table>
        </div>
    </div>
    <div class="row">

        <div class="col-xl-12"><h3>Customer Orders</h3></div>
        <div class="@if($col_0==1) col-xl-0 @else col-xl-3 @endif bg-light pt-3 pb-2" style="border:1px solid #cfcfcf;">
            <div class="row">
                <div class="col-xl-12 text-center mb-4">
                    @if ($photo)
                        <img class="img-circle" style="border-radius: 50%" src="{{asset("storage/assets/customers/$photo")}}" alt="Profile Photo">
                    @endif
                    
                </div>
                <table class="table table-striped">
                    <tr class="col-xl-12">
                        <th class="col-xl-4"><i class="fa fa-user"></i> Name</th>
                        <td class="col-xl-8">{{$Full_Name}}</td>
                    </tr>
                    <tr class="col-xl-12">
                        <th class="col-xl-4"><i class="fa fa-phone"> Phone</i></th>
                        <td class="col-xl-8">{{$mobile}}</td>
                    </tr>
                    
                    <tr class="col-xl-12">
                        <th class="col-xl-4"><i class="fa fa-envelope" aria-hidden="true"></i> Email</th>
                        <td class="col-xl-8">{{$email}}</td>
                    </tr>
                    
                    <tr class="col-xl-12">
                        <th class="col-xl-4"><i class="fa fa-location-arrow" aria-hidden="true"></i> Address</th>
                        <td class="col-xl-8">{{$address}}</td>
                    </tr>
                    
                    <tr class="col-xl-12">
                        <th class="col-xl-4"><i class="fa fa-location-arrow" aria-hidden="true"></i> City</th>
                        <td class="col-xl-8">{{$city}}</td>
                    </tr>
                    
                    <tr class="col-xl-12">
                        <th class="col-xl-4"><i class="fa fa-location-arrow" aria-hidden="true"></i> Province</th>
                        <td class="col-xl-8">{{$province}}</td>
                    </tr>
                    
                    <tr class="col-xl-12">
                        <th class="col-xl-4"><i class="fa fa-location-arrow" aria-hidden="true"></i> Line1</th>
                        <td class="col-xl-8">{{$line1}}</td>
                    </tr>

                    <tr class="col-xl-12">
                        <th class="col-xl-4"><i class="fa fa-location-arrow" aria-hidden="true"></i> Line2</th>
                        <td class="col-xl-8">{{$line2}}</td>
                    </tr>
                </table>
            </div>
        </div>
        {{-- @if($col_0==0) col-xl-0 @else col-xl-3 @endif --}}
        {{-- @if($col_0==0) col-xl-12 @else col-xl-9 @endif --}}
        <div class=" @if($col_0==1) col-xl-12 @else col-xl-9 @endif" wire:click="sidebar()">
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
                            <p>ধাপ ১</p>
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
                    <div class="row setup-content {{ $currentStep != 1 ? 'display-none' : '' }}" id="step-1">
                        <div class="col-md-12">
                            <h4>ডেলিভারী তারিখ এবং পোশাকের নাম নির্বাচন </h4>
                            <div class="form-group">
                                <label for="title">ডেলিভারী তারিখ</label>
                                <input type="date" wire:model="delivery_date" class="form-control" id="taskTitle" required>
                                @error('delivery_date') <span class="text-danger animated">{!!$message!!}</span> @else @error('delivery_date')<span class="text-danger">দিন!</span> @else <span class="invalid-feedback animated">ডেলিভারী তারিখ দিন!</span>  @enderror @enderror
                            </div>
                                @if ( $allproducts->count()>0)
                                <h4>পোশাক নির্বাচন</h4>
                                <div class="col-sm-2 col-xs-6 col-xl-12 py-3 px-2 mb-3" style="border:1px solid #ddd;">
                                    <div class="input-group">
                                    @foreach ($allproducts as $product)
                                        <div class="form-check form-check-inline">
                                            <input wire:model="products" class="form-check-input" type="checkbox" id="product_{{$product->id}}" value="{{$product->id}}" {{sizeof($products)==0?'required':''}}>
                                            <label class="form-check-label" for="product_{{$product->id}}">{{$product->name}}</label>
                                            <img src="{{asset('assets/img/undraw_profile.svg')}}" class="img-thumbnail-" width="30" alt="">
                                        </div>
                                    @endforeach
                                     
                                </div>
                                    @error('products') <div class="text-danger my-3 animated">{!!$message!!}</div> @else @if ( count($products) == 0) <div style="font-size: 22px" class="text-danger my-3">কমপক্ষে একটি পোশাক নির্বাচন করুন!</div>  @endif @enderror
                                </div>
                               
                                @endif
                            <div class="row">
                                <div class="col-lg-12 col-md-12 mx-lg-auto mb-3">
                                    <label for="additional">সংযোজিত</label>
                                    <textarea type="text" class="form-control" wire:model="additional" placeholder="সংযোজিত/Additional" ></textarea>
                                    <div class="invalid-feedback">@error('additional') {!!$message!!} @else Hand long code required. @enderror</div>
                                </div>
                            </div>
                                {{-- {{print_r($errors->all())}} --}}
                            @if ($formErrorOne==0 && sizeof($products))
                            @error('delivery_date') @else
                                @error('additional') @else
                                <button style="transition-delay: 500ms; transition:0.4s all ease; " class="mt-2 btn btn-primary nextBtn btn-lg pull-right"  wire:click="firstStepSubmit" type="button">পরবর্তী ধাপ </button> 
                            @enderror
                            @enderror
                            @else <h6 class="text-warning">বাধ্যতামূলক ঘরগুলো পূরণ করুন!</h6>
                            @endif
                        </div>
                    </div>
                    <div class="row setup-content {{ $currentStep != 2 ? 'display-none' : '' }}" id="step-2">
                        <div class="col-md-12">
                            <h3>কাপরের পরিমাপ</h3>
                            <div class="row">
                                <div class="col-lg-2 mb-3">
                                    <label for="clothlong">লম্বা</label>
                                    <input wire:model="cloth_long" type="number" min="5" max="100" class="form-control" id="clothlong" placeholder="Long" required>
                                    @error('cloth_long') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                </div>
                                {{-- Body part Start --}}
                                <div class="col-lg-3 col-md-6 mb-3">
                                    <div>
                                        <label for="clothbody">বডি</label>
                                        <input wire:model="cloth_body" type="number" min="5" max="100" class="form-control" id="clothbody" placeholder="বডি" required>
                                        @error('cloth_body') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
        
                                    <div>
                                        <label for="bodyloose">বডির লুজ</label>
                                        <input wire:model="body_loose" type="number" min="5" max="100" class="form-control" id="bodyloose" placeholder="বডির লুজ">
                                        @error('body_loose') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
        
                                    <div>
                                        <label for="clothbelly">পেট</label>
                                        <input wire:model="cloth_belly" type="number" min="5" max="100" class="form-control" id="clothbelly"_ placeholder="পাট/Belly" required>
                                        @error('cloth_belly') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
        
                                    <div>
                                        <label for="bodyloose">পেটের লুজ</label>
                                        <input wire:model="belly_loose" type="number" min="5" max="100" class="form-control" id="bodyloose" placeholder="পাটের লুজ Belly Loose" required>
                                        @error('belly_loose') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
        
                                    <div>
                                        <label for="enclosure">ঘের</label>
                                        <input wire:model="cloth_enclosure" type="number" min="5" max="100" class="form-control" id="enclosure" placeholder="Enclosure/ঘের" required>
                                        @error('cloth_enclosure') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
                                </div>
                                {{-- Body Part End --}}
                                {{-- Heeeve Area Start --}}
                                <div class="col-lg-3 col-md-6 mb-3">
                                    <div class="">
                                    <label for="handlong">হাতা</label>
                                    <input wire:model="hand_long" type="number" min="5" max="100" class="form-control" id="handlong" placeholder="Hleeve হাতা" required>
                                    @error('hand_long') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
                                    <div>
                                    <label for="sleeveless">হাতার মুহুরী</label>
                                    <input  wire:model="sleeve_less" type="number" min="5" max="100" class="form-control" id="sleeveless" placeholder="Sleeveless হাতার মুহুরী" required>
                                    @error('sleeve_less') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
                                    <div>
                                    <label for="SleevePasting">হাতায় পেস্টিং</label>
                                    <input wire:model="sleeve_pasting" type="number" min="5" max="100" class="form-control" id="SleevePasting" placeholder="Sleeve Pasting/হাতায় পেস্টিং" required>
                                    @error('sleeve_pasting') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
                                </div>
                                {{-- Heeeve Area End --}}
        
                                <div class="col-lg-2 col-md-6 mb-3">
                                    <div>
                                    <label for="cloththroat">গলা</label>
                                    <input wire:model="cloth_throat" type="number" min="5" max="100" class="form-control" id="cloththroat" placeholder="গলা/Throat" required>
                                    @error('cloth_throat') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>

                                    <div>
                                        <label for="clothcollar">কলার</label>
                                        <input wire:model="cloth_collar" type="number" min="5" max="100" class="form-control" id="clothcollar" placeholder="কলার" required>
                                        @error('cloth_collar') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
                                </div>
                                
                                <div class="col-lg-2 col-md-6 mb-3">
                                    <div class="mb-3">
                                        <label for="clothput">পুট</label>
                                        <input wire:model="cloth_put" type="number" min="5" max="100" class="form-control" id="clothput" placeholder="Put" required>
                                        @error('cloth_put') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="clothmora">মোরা</label>
                                        <input wire:model="cloth_mora" type="number" min="5" max="100" class="form-control" id="clothmora" placeholder="মোরা" required>
                                        @error('cloth_mora') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="nokeshoho">নক সহ</label>
                                        <input wire:model="noke_shoho" type="text" min="5" max="100" class="form-control" id="q " placeholder="নক সহ">
                                        @error('noke_shoho') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback"> Throat field is required.</div> @enderror
                                    </div>
                                </div>
                            </div>
                            {{-- <h6>{{$cloth_long}}</h6> --}}
                            {{-- {{$formErrorTwo}} --}}
                            <div class="col-xl-12">
                                <div class="row">
                                    @if (!$formErrorTwo)
                                    @error('cloth_long') <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else
                                        @error('cloth_body')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('body_loose')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else
                                        @error('cloth_belly')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('belly_loose')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('cloth_enclosure')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('hand_long')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('sleeve_less')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('sleeve_pasting')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('cloth_throat')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('cloth_collar')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('cloth_put')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('cloth_mora')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        @error('noke_shoho')  <h6 class="text-danger col-xl-12">বাধ্যতামূলক ঘরগুলো সঠিকভাবে পূরণ করুন!</h6> @else 
                                        <div class="col-xl-3 col-sm-4 order-2 col-12">
                                        <button class="btn btn-primary btn-lg push-right w-100 " type="button" wire:click="secondStepSubmit">পরবর্তী ধাপ</button> </div> @enderror @enderror @enderror @enderror @enderror @enderror @enderror @enderror @enderror @enderror @enderror @enderror
                                        @enderror
                                    @enderror
                                    {{-- <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" wire:click="secondStepSubmit">পরবর্তী ধাপ</button> --}}
                                    @else <h6 class="col-xl-12 text-danger">বাধ্যতামূলক ঘরগুলো পূরণ করুন!</h6>
                                    @endif
                                    <div class="col-xl-3 col-sm-5 order-1"><button class="btn btn-danger nextBtn btn-lg col-12 col-mb-2" type="button" wire:click="back(1)"><i class="fa fa-arrow-left"></i> পেছনের ধাপ</button></div>
                                </div>
                            </div>
                            
                            
                        </div>
                        
                    </div>
                    <div class="row setup-content {{ $currentStep != 3 ? 'display-none' : '' }}" id="step-3">
                        <div class="col-md-12 step-3">
                            <h3> Step 3</h3>
                            <div class="form-group">
                                <label for="description">Team Status</label><br />
                                <label class="radio-inline"><input type="radio" name="status" wire:model="status" value="1"
                                        {{{ $stepstatus == '1' ? "checked" : "" }}}> Active</label>
                                <label class="radion-inline"><input type="radio" name="status" wire:model="status" value="0"
                                        {{{ $stepstatus == '0' ? "checked" : "" }}}> DeActive</label>
                                @error('status') <span class="error">{{ $message }}</span> @enderror
                            </div>
                            <button class="btn btn-primary nextBtn btn-lg pull-right" type="button"
                                wire:click="thirdStepSubmit">Next</button>
                            <button class="btn btn-danger nextBtn btn-lg pull-right" type="button" wire:click="back(2)">Back</button>
                        </div>
                    </div>
                    <div class="row setup-content {{ $currentStep != 4 ? 'display-none' : '' }}" id="step-4">
                        <div class="col-md-12 step-4">
                            <h3> Step 4</h3>
                            <table class="table">
                                <tr>
                                    <td>Team Name:</td>
                                    <td><strong>
                                        {{-- {{print_r($products)}} --}}
                                    @if (count($products)>0)
                                        @foreach ($products as $product)
                                        @foreach ($allproducts as $currentProduct)
                                            @if ($product==$currentProduct->id)
                                            <p>{{$currentProduct->name}}</p>
                                            @endif                                            
                                            @endforeach
                                        @endforeach
                                    @endif
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
    {{-- <div class="row">
        <div class="col-xl-12">
            <div class="personal_information">
                
                <div class="row">
                    <div class="col-lg-6">
                        <h2>Update Customer Informaion</h2>
                    </div>
                    <div class="col-lg-2">
                        <a href="{{route('customer.customers')}}" class="btn btn-outline-primary">All Customers</a>
                    </div>
                    <div class="col-lg-3">
                        <a href="{{route('customer.neworder')}}" class="btn btn-outline-success">Add New Customers</a>
                    </div>
                </div>
                <form wire:submit.prevent="updateCustomer" class="was-validated">
                <div class="row my-3" style="background: linear-gradient(34deg, #ddddd08, #f3f3f3">
                    <div class="col-xl-12 text-center text-warning"><h4 class="heading pb-3 mb-4">Personal/Identicaton Info </h4></div>
                        <div class="col-lg-6 mb-3">
                            <label for="fullname">Full Name</label>
                            <input wire:model="Full_Name" type="text" class="form-control" id="fullname" placeholder="Full Name" required>
                            @error('Full_Name') <div class="text-danger">{!!$message!!}</div>@else <div class="invalid-feedback"> Valid name is required.</div> @enderror
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="mobileNumber">Mobile No</label>
                            <input wire:model="mobile" type="number" class="form-control" id="mobileNumber" placeholder="Mobile Number.." required>
                            @error('mobile') <div class="text-danger">{!!$message!!}</div>@else <div class="invalid-feedback"> Valid mobile no is required.</div> @enderror
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="email" class="d-flex">Email <span class="text-muted">(Optional)</span>
                            </label>
                            <input wire:model="email" type="email" class="form-control" id="email" placeholder="you@example.com">
                            
                            @error('email') <div class="alert alert-danger">{!! $message!!}</div> @else <div class="invalid-feedback"> Valid email is requied!</div>@enderror
                        </div>
                        <div class="col-lg-6 mb-3 customer_photo">
                            <label for="customerPhoto">Photo (Optional)</label>
                            <div class="input-group input_customer_photo">
                                <input wire:model="new_photo" type="file" class="custom-file-input" id="customerPhoto">
                                <label class="custom-file-label" for="customerPhoto"></label>
                                <div class="invalid-feedback"></div>
                                <div class="invalid-feedback">@error('new_photo'){!! $message!!} @else Photo should be valid formated (jpg, jpeg, png)!@enderror</div>
                                
                                @if ( $new_photo )
                                <div class="temp_img_wrap" >
                                    <img src="{{$new_photo->temporaryUrl()}}" width="60" alt="">
                                </div>
                                  @else( $photo )
                                  <img src="{{asset("storage/assets/customers/".$photo)}}" width="60" alt="notfoifd">
                                @endif
                            </div>
                            
                        </div>
                        <div class="col-lg-12 mb-3">
                            <label for="cusaddress">Address <span class="text-muted">(Optional)</span></label>
                            <textarea wire:model="address" rows="3" class="form-control" id="cusaddress" placeholder="Your Address"></textarea>
                            <div class="invalid-feedback">@error('address'){!!$message!!} @else Please enter a valid address. @enderror</div>
                        </div>
                </div>
                
                    <div class="row py-3 test-class" id="dalivery_address" style="background: linear-gradient(355deg,#009cea00, rgb(128 0 128 / 5%) )">
                        <div class="col-lg-6 mb-3">
                            <label for="coun_try">Country</label>
                            <select wire:model="country" class="custom-select d-block w-100" id="coun_try" required>
                                <option>...</option>
                                <option value="bd">Bangladesh</option>
                            </select>
                            <div class="invalid-feedback">@error('country') $message!!} @else Select a country @enderror </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="ccity">City</label>
                            <input wire:model="city" type="text" class="form-control" id="ccity" placeholder="City">
                            @error('city') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">City is required.</div>@enderror
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="line1">Line1</label>
                            <input wire:model="line1" type="text" class="form-control" id="line1" placeholder="Line1...." >
                            @error('line1') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">Line1 is required.</div>@enderror
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="line2">Line2</label>
                            <input wire:model="line2" type="text" class="form-control" id="line2" placeholder="Line2.." >
                            @error('line2') <div class="text-danger">{!!$message!!}</div> @enderror
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="cprovince">Province</label>
                            <input wire:model="province" type="text" class="form-control" id="cprovince" placeholder="Province" >
                            @error('province') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">Province is required.</div>@enderror
                        </div>
                        <div class="col-lg-6 mb-3">
                        <label for="zip">Zip-code</label>
                        <input wire:model="zipcode" type="number" class="form-control" id="zip" placeholder="zipcode">
                        @error('zipcode') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">Zip code is required.</div>@enderror
                        </div>
                    </div>
                    <button type="{{$errors->any() || $errorOut=='err' ? 'button':'submit'}}" {{ $errors->any() || $errorOut=='err' ? 'disabled':''}} class="btn btn-primary btn-lg btn-block">Update Info <i class="fa fa-arrow-up"></i></button>
                </form>
            </div> <!--Persinal information End-->
        </div>
    </div> --}}

    </div> <!--Persinal information End-->
    <form class="was-validated">
        <div class="cloth_part_style">
            <div class="row">
                
                {{-- Measure ment area --}}
                {{-- <div class="col-lg-12 bg-warning pt-4">
                    <div class="row">
                        <div class="col-lg-2 mb-3">
                            <label for="clothlong">লম্বা</label>
                            <input wire:model="cloth_long" type="text" class="form-control" id="clothlong" placeholder="Long" required>
                            <div class="invalid-feedback">@error('cloth_long') {!!$message!!} @else Long code required. @enderror</div>
                        </div>
                        <!-- Body part Start -->
                        <div class="col-lg-3 col-md-6 mb-3">
                            <div>
                                <label for="clothbody">বডি</label>
                                <input wire:model="cloth_body" type="text" class="form-control" id="clothbody" placeholder="Cloth Body" required>
                                <div class="invalid-feedback">@error('cloth_body') {!!$message!!} @else Body code required. @enderror</div>
                            </div>

                            <div>
                                <label for="bodyloose">বডির লুজ</label>
                                <input wire:model="body_loose" type="text" class="form-control" id="bodyloose" placeholder="Body Loose">
                                <div class="invalid-feedback">@error('body_loose') {!!$message!!} @else Body Loose code required. @enderror</div>
                            </div>

                            <div>
                                <label for="clothbelly">পেট</label>
                                <input wire:model="cloth_belly" type="text" class="form-control" id="clothbelly"_ placeholder="পাট/Belly" required>
                                <div class="invalid-feedback">@error('cloth_belly') {!!$message!!} @else Belly code required. @enderror</div>
                            </div>

                            <div>
                                <label for="bodyloose">পেটের লুজ</label>
                                <input wire:model="belly_loose" type="text" class="form-control" id="bodyloose" placeholder="পাটের লুজ Belly Loose">
                                <div class="invalid-feedback">@error('belly_loose') {!!$message!!} @else Belly Loose code required. @enderror</div>
                            </div>

                            <div>
                                <label for="enclosure">ঘের</label>
                                <input wire:model="cloth_enclosure" type="text" class="form-control" id="enclosure" placeholder="Enclosure/ঘের">
                                <div class="invalid-feedback">@error('cloth_enclosure') {!!$message!!} @else Enclosure code required. @enderror</div>
                            </div>
                        </div>
                        <!-- Body Part End -->
                        <!-- Heeeve Area Start -->
                        <div class="col-lg-3 col-md-6 mb-3">
                            <div class="">
                            <label for="handlong">হাতা</label>
                            <input wire:model="hand_long" type="text" class="form-control" id="handlong" placeholder="Hleeve হাতা" required>
                            <div class="invalid-feedback">@error('hand_long') {!!$message!!} @else Hleeve code required. @enderror</div>
                            </div>
                            <div>
                            <label for="sleeveless">হাতার মুহুরী</label>
                            <input  wire:model="sleeve_less" type="text" class="form-control" id="sleeveless" placeholder="Sleeveless হাতার মুহুরী" required>
                            <div class="invalid-feedback">@error('sleeve_less') {!!$message!!} @else Hand long code required. @enderror</div>
                            </div>
                            <div>
                            <label for="SleevePasting">হাতায় পেস্টিং</label>
                            <input wire:model="sleeve_pasting" type="text" class="form-control" id="SleevePasting" placeholder="Sleeve Pasting/হাতায় পেস্টিং" required>
                            <div class="invalid-feedback">@error('sleeve_pasting') {!!$message!!} @else Sleeve Pasting code required. @enderror</div>
                            </div>
                        </div>
                        <!-- Heeeve Area End -->

                        <div class="col-lg-2 col-md-6 mb-3">
                            <div>
                            <label for="cloththroat">গলা</label>
                            <input wire:model="cloth_throat" type="text" class="form-control" id="cloththroat" placeholder="গলা/Throat" required>
                            <div class="invalid-feedback">@error('cloth_throat') {!!$message!!} @else Throat field is required. @enderror</div>
                            </div>
                            <div>
                                <label for="clothcollar">কলার</label>
                                <input wire:model="cloth_collar" type="text" class="form-control" id="clothcollar" placeholder="কলার" required>
                                <div class="invalid-feedback">@error('cloth_collar') $message!!} @else Collar required. @enderror </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 mb-3">
                            <div class="mb-3">
                                <label for="clothput">পুট</label>
                                <input wire:model="cloth_put" type="text" class="form-control" id="clothput" placeholder="Put" required>
                                <div class="invalid-feedback">@error('cloth_put') {!!$message!!} @else Put is required. @enderror</div>
                            </div>
                            <div class="mb-3">
                                <label for="clothmora">মোরা</label>
                                <input wire:model="cloth_mora" type="text" class="form-control" id="clothmora" placeholder="মোরা" required>
                                <div class="invalid-feedback">@error('cloth_mora') {!!$message!!} @else Mora code required. @enderror</div>
                            </div>
                            <div class="mb-3">
                                <label for="nokeshoho">নক সহ</label>
                                <input wire:model="noke_shoho" type="text" class="form-control" id="q " placeholder="নক সহ">
                                <div class="invalid-feedback">@error('noke_shoho') {!!$message!!} @else নক সহ required. @enderror</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-10 col-md-12 mx-lg-auto mb-3">
                            <label for="additional">সংযোজিত</label>
                            <textarea type="text" class="form-control" id="additional" placeholder="Additional/সংযোজিত"></textarea>
                            <div class="invalid-feedback">@error('additional') {!!$message!!} @else Hand long code required. @enderror</div>
                        </div>
                    </div>
                </div> --}}
                <!-- Measure area End -->
            </div>
            <h5>{{--print_r( $designs )--}}</h5>
            {{-- <h5>{{print_r( $design_values )}}</h5> --}}
            {{-- @if ($styles && $designItems)
                @foreach ($designItems as $design)
                <div class="row py-3">
                    <div class="col-xl-12 py-3">
                        <h4 class="">{{$design->name .'/'. $design->slug}}</h4>
                    </div>
                    <div class="col-xl-12">
                        <div class="row">
                            @foreach ( $styles->where('dependency', $design->slug) as $style )
                            <div class="col-lg-2 design_bg sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                                <label><input wire:model="designs" value="{{$style->id}}" type="checkbox"> {{$style->name}}</label>
                                <textarea wire:model="design_values" name="design_{{$design->id}}" rows="1" class="form-control" placeholder="শেরওয়ানী কলার ক্যাটালগ"></textarea>
                            </div>
                            @endforeach                                    
                        </div>  
                    </div>
                </div>
                @endforeach
            @endif --}}
            {{-- Type Start --}}
            {{-- Collar Start --}}
            <div class="row py-3">
                <div class="col-xl-12 py-3">
                    <h4 class="">কলার/Collar</h4>
                </div>
                <style>
                    .collar {padding: 25px 7px;background-size: cover !important;background-position: center !important; position: relative; margin:0 0 2px  0 !important;}
                    .collar .border-right{padding: 25px 10px; border-right: 2px solid red !important;}
                    .collar::after {position: absolute;content: '';width: 2px;height: 100%;background: #fff;right: 0;top: 0;}                          .collar label {color: #fff}
                </style>
                <div class="col-xl-12">
                    <div class="row">
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="sherwani_clr_catalog_in" value="1" type="checkbox"> শেরওয়ানী কলার ক্যাটালগ</label>
                            <textarea wire:model="sherwani_clr_catalog_fld" rows="1" class="form-control" placeholder="শেরওয়ানী কলার ক্যাটালগ"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                        
                            <label><input wire:model="sherwani_rnd_clr_catalog_in" value="2" type="checkbox"> শেরওয়ানী রাউন্ড কলার ক্যাটালগ</label>
                            <textarea wire:model="sherwani_rnd_clr_catalog_fld" rows="1" class="form-control" placeholder="শেরওয়ানী রাউন্ড কলার ক্যাটালগ"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="sherwani_colar_in" value="3" type="checkbox">শেরওয়ানী কলার</label>
                            <textarea wire:model="sherwani_colar_fld" rows="1" class="form-control" placeholder="শেরওয়ানী কলার"></textarea>
                        </div>

                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="sherwani_rnd_colar_in" value="4" type="checkbox">শেরওয়ানী রাউন্ড কলার</label>
                            <textarea wire:model="sherwani_rnd_colar_fld" rows="1" class="form-control" placeholder="শেরওয়ানী রাউন্ড কলার"></textarea>
                        </div>

                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="beld_colar_in" value="5" type="checkbox">বেল্ড কলার</label>
                            <textarea wire:model="beld_colar_fld" rows="1" class="form-control" placeholder="বেল্ড কলার"></textarea>
                        </div>
                        

                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="round_bald_throat_clr_in" value="6" type="checkbox">রাউন্ড বেল্ড গলা</label>
                            <textarea wire:model="round_bald_throat_clr_fld" rows="1" class="form-control" placeholder="রাউন্ড বেল্ড গলা"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="round_throat_clr_in" value="7" type="checkbox">গোল গলা</label>
                            <textarea wire:model="round_throat_clr_fld" rows="1" class="form-control" placeholder="গোল গলা"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="shart_collar_in" value="8" type="checkbox">শার্ট কলার</label>
                            <textarea wire:model="shart_collar_fld" rows="1" class="form-control" placeholder="শার্ট কলার"></textarea>
                        </div>

                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="tiny_shape_cor_in" value="9" type="checkbox">কলারে হালকা সেইভ হবে</label>
                            <textarea wire:model="tiny_shape_cor_fld" rows="1" class="form-control" placeholder="কলারে হালকা সেইভ হবে"></textarea>
                        </div>

                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="clr_plate_soft_pasting_in" value="10" type="checkbox">কলার প্লাটে নরম পেস্টিং হবে</label>
                            <textarea wire:model="clr_plate_soft_pasting_fld" rows="1" class="form-control" placeholder="কলার প্লাটে নরম পেস্টিং হবে"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="clr_plate_7_suta_in" value="11" type="checkbox">কলার প্লেটে সাত সুতা হবে</label>
                            <textarea wire:model="clr_plate_7_suta_fld" rows="1" class="form-control" placeholder="কলার প্লেটে সাত সুতা হবে"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="collar_plate_in" value="12" type="checkbox">কলার প্লেট</label>
                            <textarea wire:model="collar_plate_fld" rows="1" class="form-control" placeholder="কলার প্লেট"></textarea>
                        </div>
                    </div>  
                </div>
            </div>
            {{-- Collar End --}}

            {{-- Seelve Start--}}
            <div class="row py-3">
                <div class="col-xl-12 py-3">
                    <h4 class="">হাতা/Sleeve</h4>
                </div>
                <div class="col-xl-12">
                    <div class="row">
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="loose_sleeve_in" value="1" type="checkbox"> লুজ হাতা</label>
                            <textarea wire:model="loose_sleeve_fld" rows="1" class="form-control" placeholder="লুজ হাতা"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                        
                            <label><input wire:model="sleeve_under_3_suta_in" value="2" type="checkbox"> হাতার নিচ ৩ সুতা</label>
                            <textarea wire:model="sleeve_under_3_suta_fld" rows="1" class="form-control" placeholder="হাতার নিচ ৩ সুতা"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="sleeve_side_one_and_half_in" value="3" type="checkbox">সাইড ১.৫ সুতা</label>
                            <textarea wire:model="sleeve_side_one_and_half_fld" rows="1" class="form-control" placeholder="সাইড ১.৫ সুতা"></textarea>
                        </div>
                    </div>  
                </div>
            </div>
            {{-- Seelve End --}}

            {{-- Cuff Start--}}
            <div class="row py-3">
                <div class="col-xl-12 py-3">
                    <h4 class="">কাফ/Cuff</h4>
                </div>
                <div class="col-xl-12">
                    <div class="row">
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="state_cuf_in" value="1" type="checkbox"> স্ট্যাট কাফ</label>
                            <textarea wire:model="state_cuf_fld" rows="1" class="form-control" placeholder="স্ট্যাট কাফ"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="round_cuf_in" value="2" type="checkbox">রাউন্ড কাফ</label>
                            <textarea wire:model="round_cuf_fld" rows="1" class="form-control" placeholder="রাউন্ড কাফ"></textarea>
                        </div>
                    </div>  
                </div>
            </div>
            {{-- Cuff End --}}

            {{-- plate Start--}}
            <div class="row py-3">
                <div class="col-xl-12 py-3">
                    <h4 class="">প্লেট/Plate</h4>
                </div>
                <div class="col-xl-12">
                    <div class="row">
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="double_plate_in" value="1" type="checkbox"> ডাবল প্লেট</label>
                            <textarea wire:model="double_plate_fld" rows="1" class="form-control" placeholder="ডাবল প্লেট"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                        
                            <label><input wire:model="invarce_double_plate_in" value="2" type="checkbox"> ডাবল প্লেট উল্টা</label>
                            <textarea wire:model="invarce_double_plate_fld" rows="1" class="form-control" placeholder="ডাবল প্লেট উল্টা"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="normal_plate_in" value="3" type="checkbox">নরমাল প্লেট</label>
                            <textarea wire:model="normal_plate_fld" rows="1" class="form-control" placeholder="নরমাল প্লেট"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="plate_nok_shoho_in" value="4" type="checkbox"> নক সহ</label>
                            <textarea wire:model="plate_nok_shoho_fld" rows="1" class="form-control" placeholder="নক সহ"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                        
                            <label><input wire:model="angle_plate_in" value="5" type="checkbox"> চোক্কা প্লেট</label>
                            <textarea wire:model="angle_plate_fld" rows="1" class="form-control" placeholder="চোক্কা প্লেট"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="design_button_in" value="6" type="checkbox">ডিজাইন বুতাম</label>
                            <textarea wire:model="design_button_fld" rows="1" class="form-control" placeholder="ডিজাইন বুতাম"></textarea>
                        </div>
                    </div>  
                </div>
            </div>
            {{-- plate End --}}
            {{-- Pocket Start--}}
            <div class="row py-3">
                <div class="col-xl-12 py-3">
                    <h4 class="">পকেট/Pocket</h4>
                </div>
                <div class="col-xl-12">
                    <div class="row">
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="one_chest_pocket_in" value="1" type="checkbox"> বুকে এক পকেট</label>
                            <textarea wire:model="one_chest_pocket_fld" rows="1" class="form-control" placeholder="বুকে এক পকেট"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                        
                            <label><input wire:model="one_and_half_chest_pocket_in" value="2" type="checkbox"> বুকে ১ ১/২ পকেট</label>
                            <textarea wire:model="one_and_half_chest_pocket_fld" rows="1" class="form-control" placeholder="বুকে ১ ১/২ পকেট"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="meswak_pocket_in" value="3" type="checkbox">বুকে মেসওয়াক পকেট</label>
                            <textarea wire:model="meswak_pocket_fld" rows="1" class="form-control" placeholder="বুকে মেসওয়াক পকেট"></textarea>
                        </div>
                    </div>  
                </div>
            </div>
            {{-- pocket End --}}

            {{-- piping Start--}}
            <div class="row py-3">
                <div class="col-xl-12 py-3">
                    <h4 class="">পাইপিং/Piping</h4>
                </div>
                <div class="col-xl-12">
                    <div class="row">
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="collar_plate_and_sleeve_piping_in" value="1" type="checkbox"> কলার, প্লেট ও হাতায় পাইপিং</label>
                            <textarea wire:model="collar_plate_and_sleeve_piping_fld" rows="1" class="form-control" placeholder="কলার, প্লেট ও হাতায় পাইপিং"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                        
                            <label><input wire:model="collar_one_side_3_side_and_sleeve_piping_in" value="2" type="checkbox">কলারের ১ দিকে প্লাটের ৩ দিকে ও হাতার পাইপিং </label>
                            <textarea wire:model="collar_one_side_3_side_and_sleeve_piping_fld" rows="1" class="form-control" placeholder="কলারের ১ দিকে প্লাটের ৩ দিকে ও হাতার পাইপিং"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="collar_plate_sleeve_other_cloth_piping_in" value="3" type="checkbox">কলার প্লাট ও হাতার পট্টি অন্য কাপর দিয়ে পাইপিং</label>
                            <textarea wire:model="collar_plate_sleeve_other_cloth_piping_fld" rows="1" class="form-control" placeholder="কলার প্লাট ও হাতার পট্টি অন্য কাপর দিয়ে পাইপিং"></textarea>
                        </div>
                        <div class="col-lg-2 collar sarwani" style="background:url({{asset('assets/img/single_blog_2.png')}})">
                            <label><input wire:model="collar_cloth_by_other_cloth_piping_in" value="4" type="checkbox">কলার প্লেটে অন্য কাপর দিয়ে, শুধু হাতায় পাইপিং</label>
                            <textarea wire:model="collar_cloth_by_other_cloth_piping_fld" rows="1" class="form-control" placeholder="কলার প্লেটে অন্য কাপর দিয়ে, শুধু হাতায় পাইপিং"></textarea>
                        </div>
                    </div>  
                </div>
            </div>
            {{-- piping End --}}
            
        </div> <!--cloth_part_style End-->
    </form>
    <style>
        @keyframes fadein {from { opacity: 0; }to{ opacity: 1; }} @-moz-keyframes fadein {from { opacity: 0; }to{ opacity: 1; }}@-webkit-keyframes fadein {from { opacity: 0; }to{ opacity: 1; }}@-ms-keyframes fadein {from { opacity: 0; }to{ opacity: 1; }}@-o-keyframes fadein {from { opacity: 0; }to{ opacity: 1; }}​
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
