<div>
    <style>.active-cyan-2 input.form-control[type=text]:focus:not([readonly]) {border-bottom: 1px solid #4dd0e1;box-shadow: 0 1px 0 0 #4dd0e1;}</style>
    <div class="row">
        
    </div>
        <div class="container my-4">
            <div class="row">
                <div class="col-xl-3"><a class="btn btn-facebook" href="">Add New Order</a></div>
                <div class="col-xl-3"><a class="btn btn-facebook" href="#">Today's Orders</a></div>
                <div class="col-xl-3"><a class="btn btn-outline-primary" href="">Google</a></div>
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
</div>
