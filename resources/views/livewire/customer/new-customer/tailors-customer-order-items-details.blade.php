<div>
    <style>.active-cyan-2 input.form-control[type=text]:focus:not([readonly]) {border-bottom: 1px solid #4dd0e1;box-shadow: 0 1px 0 0 #4dd0e1;}</style>
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
        <div class="product_role_container container-fluid">
            <!-- DataTales Example -->
            <div class="card shadow mb-4">
                <div class="card-header">
                    <h3 class="heading text-center"></h3>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                {{-- <tr><th>ID</th><th>Name</th><th>Mobile</th><th>Photo</th><th>Action</th></tr> --}}
                            </thead>
                            <tbody>
                                <style> td p{line-height: 10px}</style>
                               @if (count($orderItems)>0)
                                    @foreach ($orderItems as $measurement)
                                    <tr>
                                        <td><p>লম্বা</p><p>{{$measurement->cloth_long}}</p></td>
                                        <td>
                                            <p>বডি</p> <p>{{$measurement->cloth_body}}</p>
                                            <p>বডির লুজ</p> <p>{{$measurement->body_loose}}</p>
                                            <p>পেট</p> <p>{{$measurement->cloth_belly}}</p>
                                            <p>পেটের লুজ</p> <p>{{$measurement->belly_loose}}</p>
                                            <p>ঘের</p> <p>{{$measurement->cloth_enclosure}}</p>
                                        </td>
                                        <td>
                                            <p>হাতা</p> <p>{{$measurement->hand_long}}</p>
                                            <p>হাতার মুহুরী</p> <p>{{$measurement->sleeve_less}}</p>
                                            <p>হাতায় পেস্টিং</p> <p>{{$measurement->sleeve_pasting}}</p>
                                        </td>
                                        <td>
                                            <p>গলা</p> <p>{{$measurement->cloth_throat}}</p>
                                            <p>কলার</p> <p>{{$measurement->cloth_collar}}</p>
                                        </td>
                                        <td>
                                            <p>পুট</p> <p>{{$measurement->cloth_put}}</p>
                                            <p>মোরা</p> <p>{{$measurement->cloth_mora}}</p>
                                            <p>নক সহ</p> <p>{{$measurement->noke_shoho}}</p>
                                        </td>
                                        <p>{{$measurement->cloth_additional??"মার্কেটিং বিনামূল্যে না হলেও কনটেন্ট মার্কেটিংয়ের দীর্ঘমেয়াদি প্রভাব সেটিকে বিনামূল্যের সমতুল্য করে তোলে। কনটেন্ট মার্কেটিংই বিশ্বাস তৈরি করে। ঠিক যেমন আমাদের লেখা ফ্রি কনটেন্ট পড়ে আপনাদের আমার প্রতি বিশ্বাস তৈরি হচ্ছে।
                                            একটি ভালো কনটেন্ট কোনও সংস্থা বা ব্যবসার প্রতি মানুষকে বেশি আকর্ষণ করবে। তাই যত বেশি ভালো কনটেন্ট প্রকাশিত হবে তত ওই সংস্থা বা ব্যবসার প্রতি মানুষের আকর্ষণ বাড়বে।"}}</p>
                                        @foreach ($measurement->OrderItemStyles as $styleing)
                                            @foreach (DB::table('style_measure_parts')->get() as $styleName)
                                            @if ($styleing->style_id==$styleName->id)
                                                <p>{{$styleName->name}} <b>{{$styleing->style_details}}</b></p>
                                            @endif                                                
                                            @endforeach
                                        @endforeach
                                    </tr>
                                    @endforeach  
                               @endif
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
        <div class="col-xl-12">
            {{-- where('created_at', 'like', '2015-08-20%')->get()User::whereDate('created_at', '=', Carbon::today()->toDateString()); --}}
            <h1>Todays new Customer({{Carbon\Carbon::today()->format('Y-m-d')}})</h1>
            
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
                <form autocomplete="off" wire:submit.prevent="createTest">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="row">
                                <div class="col-xl-2">Aside</div>
                                <div class="col-xl-10 top-status d-table">
                                    <div class="row d-table-row">
                                        <!--step 1 Start-->
                                        <div class="step-status-content d-table-cell">
                                            Step-1
                                        </div>
                                        <!--step 1 Stop-->
                        
                                        <!--step 2 Start-->
                                        <div class="step-status-content d-table-cell">
                                            Step-2
                                        </div>
                                        <!--step 2 Stop-->
                                        
                                        <!--step 3 Start-->
                                        <div class="step-status-content d-table-cell">
                                            Step-3
                                        </div>
                                        <!--step 3 Stop-->
                                        
                                        <!--step 4 Start-->
                                        <div class="step-status-content d-table-cell">
                                            Step-4
                                        </div>
                                        <!--step 4 Stop-->
                                        
                                        <!--step 5 Start-->
                                        <div class="step-status-content d-table-cell">
                                            Step-5
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
                                    @if ($errors->isNotEmpty())
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
                                        @endif
                                </div>
                                <div class="col-xl-12">
                                    <form wire:submit.prevent="submit">
                                        <div class="row">
                                            @if ($currentPage === 1)
                                            <div class="col-xl-12">
                                                <div class="row">
                                                <div class="col-xl-12">
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur ab voluptatibus quod ipsa totam nemo architecto, doloribus quos quisquam numquam, similique aliquam? Fuga commodi possimus sapiente hic labore aliquid dolorem.
                                                </div>
                                                <div class="col-xl-12">
                                                    <div class="row">
                                                        @if ($currentPage === 1)
                                                            <div class="col-xl-6"></div>
                                                        @else
                                                        <div class="col-xl-6">
                                                            <button wire:click="goToPreviousPage" type="button" class="btn btn-warning w-100">
                                                                Back
                                                            </button>
                                                        </div>
                                                        @endif

                                                        @if ($currentPage === count($pages))
                                                        <div class="col-xl-6">
                                                            <button type="submit" class="btn btn-google">Submit</button>
                                                        </div>
                                                        
                                                            
                                                        @else
                                                        <div class="col-xl-6">
                                                            <button wire:click="goToNextPage" type="button" class="btn btn-facebook w-100"> Next</button>
                                                        </div>
                                                            
                                                        @endif
                                                    </div>
                                                </div>

                                                </div>
                                            </div>
                                            @endif 
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!--step form Wrap End -->
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
  @endif
 
</div>
