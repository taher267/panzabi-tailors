<div class="container-fluid">
    @if (Session::has('msg'))
    <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!}">{!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}</div>
@endif
 
<style type="text/css"> .nav-link.active{background:linear-gradient(180deg ,#4e73df 10%,#8C00BF 100%) !important;color: #fff !important;font-weight: bold  !important;} #dalivery_address{transition: 1s all ease;transform-origin: top; {{$order_delivery==1 ? 'transform:scaleY(1);height:100%;' :'transform:scaleY(0); display: none; height:0;'}} } .design_bg {padding: 25px 7px;background-size: cover !important;background-position: center !important; position: relative; margin:0 0 2px  0 !important;} .design_bg .border-right{padding: 25px 10px; border-right: 2px solid red !important;} .design_bg::after {position: absolute;content: '';width: 2px;height: 100%;background: #fff;right: 0;top: 0;} .design_bg label {color: #fff} </style>

<form class="was-validated" wire:submit.prevent="placeOrder">
    <div class="row">
        <div class="col-lg-12">
            <div style="transition: 1s all ease" class="col-xl-12" id="right_sidebar">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <p class="d-flex">
                  </p>
                <span class="badge badge-secondary badge-pill"></span>
                </h4>
                <div class="col-xl-12">
                    <div class="personal_information">
                        <h2>Order Informaion</h2>
                        <div class="row">
                            <div class="col-lg-6">
                                <label for="deliverydate">Delivery Date</label>
                                <input type="date" class="form-control" wire:model="delivery_date" id="deliverydate" required>
                                @error('delivery_date') <div class="text-danger">{!!$message!!}</div>@else <div class="invalid-feedback">Delivery date is required.</div> @enderror
                            </div>
                            <div class="col-lg-6">
                                <label for="orderdate">Order Date </label>
                                <input type="date" class="form-control" wire:model="order_date" id="orderdate">
                                @error('order_date') <div class="text-danger">{!!$message!!}</div>@enderror
                            </div>
                        </div>
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
                                        <div class="col-lg-12 d-inline-block d-flex">
                                            <div class="custom-checkbox d-inline-block d-flex">
                                                <input type="checkbox" class="custom-control-input" id="confirmmail" value="1" wire:model='confirm_mail'>
                                                <label class="custom-control-label ml-3" style="" for="confirmmail">Send confirm Mail.</label>
                                            </div>
                                        </div>
                                    </label>
                                    <input wire:model="email" type="email" class="form-control" id="email" placeholder="you@example.com" {{ $confirm_mail ?'required':'' }} >
                                    
                                    @error('email') <div class="alert alert-danger">{!! $message!!}</div> @else <div class="invalid-feedback"> Valid email is requied!</div>@enderror
                                </div>
                                <div class="col-lg-6 mb-3 customer_photo">
                                    <label for="customerPhoto">Photo (Optional)</label>
                                    <div class="input-group input_customer_photo" style="positon:relative;">
                                        <input wire:model="customer_image" type="file" class="custom-file-input" id="customerPhoto">
                                        <label class="custom-file-label" for="customerPhoto"></label>
                                        <div class="invalid-feedback"></div>
                                        <div class="invalid-feedback">@error('customer_image'){!! $message!!} @else Photo should be valid formated (jpg, jpeg, png)!@enderror</div>
                                        {{-- <img class="" src="{{$customer_image->temporaryUrl()}}" width="120"> --}}
                                        
                                        @if ( $customer_image )
                                        <span class="temp_img_wrap" style="position: absolute;z-index: 999;">
                                            <img src="{{$customer_image->temporaryUrl()}}" width="60" alt="">
                                        </span>
                                            
                                        @endif
                                    </div>
                                    
                                </div>
                                <div class="col-lg-12 mb-3">
                                    <label for="cusaddress">Address <span class="text-muted">(Optional)</span></label>
                                    <textarea wire:model="address" rows="3" class="form-control" id="cusaddress" placeholder="Your Address"></textarea>
                                    <div class="invalid-feedback">@error('address'){!!$message!!} @else Please enter a valid address. @enderror</div>
                                </div>
                        </div>


                        <div class="col-xl-12 d-flex form-group mb-4">
                            <div class="form-check custom-radio d-flex">
                                <input value="1" wire:model='order_delivery' type="checkbox" class="custom-control-input" id="otherDelivery" name="daliveryPolicy">
                                <label class="custom-control-label" for="otherDelivery">Other Delivery</label>
                            </div>
                        </div>
                        
                    @if ( $order_delivery == 1 )
                            <div class="row py-3 test-class" id="dalivery_address" style="background: linear-gradient(355deg,#009cea00, rgb(128 0 128 / 5%) )">
                                <div class="col-xl-12 "><h6>Online delivery required fields</h6></div>
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
                                    <input wire:model="city" type="text" class="form-control" id="ccity" placeholder="City" required>
                                    @error('city') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">City is required.</div>@enderror
                                </div>

                                <div class="col-lg-6 mb-3">
                                    <label for="line1">Line1</label>
                                    <input wire:model="line1" type="text" class="form-control" id="line1" placeholder="Line1...." required>
                                    @error('line1') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">Line1 is required.</div>@enderror
                                </div>

                                <div class="col-lg-6 mb-3">
                                    <label for="line2">Line2</label>
                                    <input wire:model="line2" type="text" class="form-control" id="line2" placeholder="Line2.." >
                                    @error('line2') <div class="text-danger">{!!$message!!}</div> @enderror
                                </div>

                                <div class="col-lg-6 mb-3">
                                    <label for="cprovince">Province</label>
                                    <input wire:model="province" type="text" class="form-control" id="cprovince" placeholder="Province" required>
                                    @error('province') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">Province is required.</div>@enderror
                                </div>
                                <div class="col-lg-6 mb-3">
                                <label for="zip">Zip-code</label>
                                <input wire:model="zipcode" type="number" class="form-control" id="zip" placeholder="zipcode" required>
                                @error('zipcode') <div class="text-danger">{!!$message!!}</div> @else <div class="invalid-feedback">Zip code is required.</div>@enderror
                                </div>
                            </div>
                        @endif
                    </div> <!--Persinal information End-->
                    <div class="cloth_part_style">
                        <div class="row">
                            <div class="col-lg-12 bg-primary py-5">
                                <h5 class="d-block text-light">Cloth/Dress/Apron Name কাপড়/পোষাক/অ্যাপ্রন নাম</h5>
                                <div class="row">
                                    @if ( $allproducts)
                                        @foreach ($allproducts as $product)
                                            <div class="col-sm-2 col-xs-6">
                                            <div class="form-check form-check-inline">
                                            <input wire:model="products" class="form-check-input" type="checkbox" id="product_{{$product->id}}" value="{{$product->id}}" {{sizeof($products)==0?'required':''}}>
                                            <label class="form-check-label" for="product_{{$product->id}}">{{$product->name}}</label>
                                            </div>
                                            <img src="{{asset('assets/img/undraw_profile.svg')}}" class="img-thumbnail-" width="30" alt="">
                                        </div>
                                        @endforeach
                                    @endif
                                    
                                        <div class="col-lg-6">
                                            <label for="coun_try"></label>
                                            <select wire:model="selected_product" class="custom-select d-block w-100" id="coun_try" required>
                                                @foreach ($allproducts as $product)
                                                    @foreach ($products as $selProduct)
                                                        @if ($product->id == $selProduct)
                                                            <option value="{{$selProduct}}">{{$product->name}}</option>
                                                        @endif
                                                    @endforeach
                                                @endforeach
                                                
                                            </select>
                                            <div class="invalid-feedback">@error('selected_product') $message!!} @else Select a @enderror </div>
                                        </div>

                                </div> {{--dresh panzabi .row end--}}
                                {{-- @endforeach --}}
                            </div>
                            {{-- Measure ment area --}}
                            <div class="col-lg-12 bg-warning pt-4">
                                <div class="row">
                                    <div class="col-lg-2 mb-3">
                                        <label for="clothlong">লম্বা</label>
                                        <input wire:model="cloth_long" type="text" class="form-control" id="clothlong" placeholder="Long" required>
                                        <div class="invalid-feedback">@error('cloth_long') {!!$message!!} @else Long code required. @enderror</div>
                                    </div>
                                    {{-- Body part Start --}}
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
                                    {{-- Body Part End --}}
                                    {{-- Heeeve Area Start --}}
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
                                    {{-- Heeeve Area End --}}

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
                            </div>
                            {{-- Measure area End --}}
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

                </div>
          </div>
        </div>
        {{-- <div class="col-lg-12"></div> --}}
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
