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

                                            <!--Step 2/designing Start-->
                                            <div class="col-xl-12 {{ $currentPage != 1 ? 'd-none' : '' }}">
                                                <h1>Step 1</h1>
                                            </div>
                                            <!--Step 2/designing End-->

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
