<div>
    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!}">{!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}</div>
    @endif
    <div class="row">
        <div class="col-xl-12"><h3>Customer Orders</h3></div>
        <div class="col-xl-4 bg-light pt-3 pb-2" style="border:1px solid #cfcfcf;">
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
        <div class="col-xl-8">
            Lorem ipsum dolor sit amet.1
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
</div>
