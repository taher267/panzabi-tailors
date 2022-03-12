<div>
    @if ($showform)<style>.input-group-append{z-index: 0;}</style>@endif
    <div class="card">
        <div class="card-head py-3 text-center">
            <div class="row mb-3">
                <div class="col-xl-6">
                   
                </div>
                <div class="col-xl-5 md-form active-cyan-2">
                    <form class="was-validated">
                        <input class="form-control" type="search" placeholder="গ্রাহক অনুসন্ধান..." wire:model="searchBy" aria-label="Search" required>
                    </form>
                </div>
            </div>
            <h4 class="card-title">সকল ওয়ার্ড সমূহ</h4>
            <div class="row m-0 shadow-sm p-3 mb-5 bg-white rounded">
                <div class="col-xl-3 col-sm-6 col-12 text-center">
                    <a class="btn btn-outline-success" href="#"><i class="fas fa-user"></i> নতুন গ্রাহক</a>
                </div>
                <div class="col-xl-3 col-sm-6 col-12 text-center">
                    <a class="btn btn-outline-success" href="#"><i class="fas fa-user"></i> নতুন গ্রাহক</a>
                </div>
                <div class="col-xl-3 col-sm-6 col-12 text-center">
                    <a class="btn btn-outline-success" href="#"><i class="fas fa-user"></i> নতুন গ্রাহক</a>
                </div>
                
            </div>      
        </div>
        <div class="card-body">
            <div class="container-fluid">
                <h1>{{--print_r(sizeof())--}}</h1>
                @if ($allOrders->count()>0)
                    {{-- searched Data --}}
                    @if ($specificOrder->count()>0)
                        @foreach ( $specificOrder as $in=> $order )
                            <div class="row pt-2 {{(($in+1)%2) == 1?'bg-success text-light':''}}">
                                <div class="col-lg-1">{!!$order->order_number!!}</div>
                                <div class="col-lg-1">{!!$order->customer->Full_Name!!}</div>
                                <div class="col-lg-2">{!!$order->wages!!}</div>
                                <div class="col-lg-2">{!!$order->advance!!}</div>
                                <div class="col-lg-2">{!!$order->total!!}</div>
                                <div class="col-lg-2">{!!($order->total)-($order->advance)!!}</div>
                                <div class="col-lg-2">
                                    <a class="btn" href="#"><i class="fa fa-eye"></i></a>
                                    <a class="btn" href="#"><i class="fa fa-edit"></i></a>
                                    <a class="btn" href="#"><i class="fa fa-trash"></i></a>
                                </div>
                            </div>  
                        @endforeach
                    {{-- All order Data --}}
                    @else
                        @foreach ($allOrders as $in=> $order)
                            <div class="row pt-2 {{(($in+1)%2) == 0?'light-purple border-bottom border-top':''}}">
                                <div class="col-lg-2">{!!$order->order_number!!}</div>
                                <div class="col-lg-2">{!!$order->wages!!}</div>
                                <div class="col-lg-2">{!!$order->advance!!}</div>
                                <div class="col-lg-2">{!!$order->total!!}</div>
                                <div class="col-lg-2">{!!($order->total)-($order->advance)!!}</div>
                                <div class="col-lg-2">
                                    <a class="btn" href="#"><i class="fa fa-eye"></i></a>
                                    <a class="btn btn-primary" href="#" wire:click="editorder({{$order}})"><i class="fa fa-edit"></i></a>
                                    {{-- <a class="btn btn-primary" href="#" wire:click="formControl('{{$order->order_number}}')"><i class="fa fa-edit"></i></a> --}}
                                    <a class="btn" href="#"><i class="fa fa-trash"></i></a>
                                </div>
                            </div>  
                        @endforeach
                        <div class="py-3 pagination-wrapper">
                            {{$allOrders->links()}}
                        </div>
                    @endif
                @else
                    <div class="row">
                        <div class="col-xl-12 text-center"><h2>কোনো অর্ডার নেই!</h2></div>
                    </div>
                @endif
                
            </div> <!--card body end-->
        </div> <!--card body end-->
        {{--my modal Start --}}
        @if ($showform==1)
    <div class="tailors-modal-form" id="modalWraper" style="display: block;padding-top:100px;">
        <div class="row d-block mx-auto" style="width: 95%">
        <div class="modal__inner bg-light py-5">
        
            <div class="col-xl-12 w-100 text-right"><button wire:click="formClose()" type="button" class="btn btn-primary"><i class="fa fa-times"></i> Close</button></div>
            <div class="col-xl-10 mx-auto ">

                    <div class="row">
                        <div class="col-xl-12 mb-2 py-3 shadow-sm">
                            <div class="row">
                                <div class="col-xl-2 pl-4 pt-3">
                                    <p>নামঃ- <b class="text-success">{{$Full_Name}}</b></p>
                                    <p>অর্ডার নং- <b class="text-success">{{$editOrder->order_number}}</b></p>
                                </div>
                                <div class="col-xl-10 top-status d-table">
                                    <div class="row d-table-row text-center">
                                       
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
                                            <!--Step Customer Start-->
                                            <div class="col-xl-12 ">
                                                <div class="personal_information">
                                                    <div class="row my-3 " style="background: linear-gradient(34deg, #ddddd08, #f3f3f3">
                                                        <div class="col-xl-12 text-center text-warning"><h4 class="heading pb-3 mb-4">ব্যক্তিগত/পরিচয় সংক্রান্ত তথ্য </h4></div>
                                                            <div class="col-lg-6 mb-3">
                                                                <label for="fullname">অর্ডারকারীর পুরো নামঃ</label>
                                                                <input wire:model="Full_Name" type="text" class="form-control" id="fullname" placeholder="পুরো নাম" required>
                                                                @error('Full_Name') <div class="text-danger">{!!$message!!}</div>@else <div class="invalid-feedback"> সঠিকভাবে নাম পূরণ করুন</div> @enderror
                                                            </div>
                            
                                                            <div class="col-lg-6 mb-3">
                                                                <label for="mobileNumber">মোবাইল নম্বর</label>
                                                                <input wire:model="mobile" type="number" class="form-control @error('mobile') is-invalid @enderror" id="mobileNumber" placeholder="019xxxxxxxx/88019xxxxxxxx/88019xxxxxxxx" required>
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
                                                                        <img src="{{$photo->temporaryUrl()}}" width="60">
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
                                            </div>
                                            <!--Step Customer End-->
                                            <!--Button Section Start-->
                                            <div class="col-xl-12">
                                                <div class="row">
                                                    <div class="col-xl-6">Jeyadamal</div>
                                                    {{-- <div class="col-xl-6 @if($currentPage != 1) d-none @endif"></div>
                                                    <div class="col-xl-6 @if( $currentPage == 1 ) d-none @endif"><button wire:click="goToPreviousPage" type="button" class="btn btn-warning w-100">Back</button></div>
                                                    <div class="col-xl-6 @if( $currentPage != $pages ) d-none @endif"> <button type="submit" class="btn btn-google w-100">Submit</button></div>
                                                    <div class="col-xl-6 @if( $currentPage == $pages ) d-none @endif"><button @if( $currentPage == $pages ) @else wire:click="goToNextPage" @endif type="button" class="btn btn-facebook w-100"> Next</button></div> --}}
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
        {{--my modal End --}}
    </div>
    @if ($showeditform == true)
        <div class="tailors-modal-form" id="modalWraper" style="display: block;padding-top:100px;">
            <div class="row d-block mx-auto" style="width: 95%">
                <div class="modal__inner bg-light py-5">
                    <div class="col-xl-12 w-100 text-right"><button wire:click="formControl(0)" type="button" class="btn btn-primary"><i class="fa fa-times"></i> Close</button></div>
                    @livewire('edit-customer', ['all-orders' => $all_orders], key($order_number_for_edit))
                    {{-- ('component', ['user' => $user], key($user->id)) --}}
                </div>
            </div>
        </div>
    @endif
</div>