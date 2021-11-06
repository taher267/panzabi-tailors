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
        <div class="col-xl-3 bg-light pt-3 pb-2" style="border:1px solid #cfcfcf;@if($col_0==1) display:none; @else @endif ">
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
        <div class=" @if($col_0==1) col-xl-12 @else col-xl-9 @endif" wire:click="sidebar()" style="transition:0.6s all ease; @if($col_0==1) background:#009dea; @endif">
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
                    <div class="row">
                    <div class="col-xl-12 {{ $currentStep != 1 ? 'display-none' : '' }}" id="step-1">
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
                    <div class="col-xl-12 {{ $currentStep != 2 ? 'display-none' : '' }}" id="step-2">
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
                    <div class="col-xl-12 {{ $currentStep != 3 ? 'display-none' : '' }}" id="step-3">
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
                    <div class="col-xl-12 {{ $currentStep != 4 ? 'display-none' : '' }}" id="step-4">
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
                </div>
                </form>
        </div>
    
    </div>
    
    </div> <!--Persinal information End-->
    <form class="was-validated">
        <div class="cloth_part_style">
            <div class="row">
                
             
            </div>
            


            
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
