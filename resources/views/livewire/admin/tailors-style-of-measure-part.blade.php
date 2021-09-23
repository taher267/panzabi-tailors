<div>
    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!}">{!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}</div>
    @endif
    <style>.nav-link.active{background:linear-gradient(180deg ,#4e73df 10%,#8C00BF 100%) !important;color: #fff !important;font-weight: bold  !important;}
    
        @if( !$dependency ).form-control.is-valid, .was-validated #dependency_select .form-control:valid {border-color: #e74a3b; background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e74a3b' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23e74a3b' stroke='none'/%3e%3c/svg%3e");}.form-control.is-valid:focus, .was-validated #dependency_select .form-control:valid:focus { border-color:#e74a3b;box-shadow:0 0 0 .2rem rgba(148, 21, 9, 0.25) !important;}@endif
    </style>
    <div class="row">
        <div class="col-xl-12">
            <h3>কলার হাতা প্লেট পকেট সম্পর্কে তথ্য (Information about collar sleeve plate pockets)</h3>
        </div>
    </div>

   
    <div class="row">
        <div class="col-xl-12">        
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link {!!$activatedTab=='newstylemeasure' ? 'active': '' !!}" id="new_product" data-toggle="tab" href="#newstylemeasure" role="tab" aria-controls="newstylemeasure" aria-selected="true"><input name="tabactivate" value="newstylemeasure" type="radio" wire:click.prevent="navTabsActivating('newstylemeasure')"  {!!$activatedTab=='newstylemeasure' ? 'checked': '' !!}> নতুন ডিজাইন যোগ<i class="fa fa-plus"></i></a>
        </li>

        <li class="nav-item">
          <a class="nav-link @if($activatedTab=='allstylemeasures') active @elseif( $activatedTab ==null) active @endif"  id="productsroles" data-toggle="tab" href="#all_products" role="tab" aria-controls="all_products" aria-selected="false"><input name="tabactivate" value="allstylemeasures" type="radio" wire:click.prevent="navTabsActivating('allstylemeasures')" @if($activatedTab=='allstylemeasures') checked @elseif( $activatedTab ==null) checked @endif>সকল ডিজাইন <i class="fas fa-border-all"></i></a>
        </li>
      </ul>

      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade {!!$activatedTab=='newstylemeasure' ? 'show active': '' !!}" id="newstylemeasure" role="tabpanel" aria-labelledby="new_new_productrole">
                <div class="row">
                    <style>.card-header{border-bottom: 0;}</style>
                    <div class="card col-lg-12">
                            <div class="card-body">
                                <form wire:submit.prevent="storeStayle" class="was-validated">
                                    <div class="modal-body">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">নাম</span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="Product Name" wire:model="name" required>
                                            </div>
                                            @error('name')<div class="text-danger">{{$message}}</div>@enderror
                                            
                                            <div class="input-group mb-3 dependency_select" id="dependency_select">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">নির্ভরতা ফিল্ড </span>
                                                </div>
                                                <select class="form-control" wire:model="dependency" required>
                                                    <option value="0" >নির্বাচন করুন</option>
                                                    @if($designItems)
                                                        @foreach($designItems as $design)
                                                        <option value="{{$design->slug}}">{{$design->name}}</option>
                                                        @endforeach
                                                    @endif
                                                </select>
                                            </div>
                                            @error('dependency')<div class="text-danger">{{$message}}</div>@enderror

                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                  <span class="input-group-text">ছবি</span>
                                                </div>
                                                <div class="custom-file">
                                                  <input type="file" wire:model="image" class="custom-file-input" id="inputGroupFile01">
                                                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                                </div>
                                                <style>
                                                   .image_height_width span{position: relative;}
                                                   .image_height_width span::before, .image_height_width span::after{top:-19px; font-size: 14px; position: absolute;z-index: 123; color:red;}
                                                    .image_height_width span::before{ content:'@error('image_width'){{$message}}@enderror';left:0;}
                                                    .image_height_width span::after{content:'@error('image_height'){{$message}} @enderror';right: 0; }
                                                </style>
                                                
                                                <div class="input-group-prepend image_height_width">
                                                  <span class="input-group-text p-0">
                                                      <input type="number" wire:model="image_width" placeholder="চওড়া" max="1000" class="form-control img_width image">
                                                      X
                                                      <input type="number" wire:model="image_height" placeholder="লম্বা" max="1000" class="form-control img_height image"></span>
                                                </div>
                                            </div>
                                            @if($image) <img src="{{$image->temporaryUrl()}}" width="150" alt=""> @endif
                                            @error('image')<div class="text-danger">{{$message}}</div>@enderror


                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">অপশোনাল</span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="example, example"  wire:model="option">
                                            </div>
                                            @error('option')<div class="text-danger">{{$message}}</div>@enderror
                                    </div>
                                    <button type="$errors->any() || $errorOut=='err' ? 'button':'submit'" {{ $errors->any() || $errorOut=='err' ? 'disabled':''}} class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                 </div>
        </div>
        <div class="tab-pane fade  @if($activatedTab=='allstylemeasures') show active @elseif( $activatedTab == null) show active @endif" id="all_products" role="tabpanel" aria-labelledby="all_products">
             <div class="product_role_container container-fluid">
                <!-- DataTales Example -->
                <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>আইডি</th>
                                        <th>নাম</th>
                                        <th>কোন জায়গার ডিজাইন</th>
                                        <th>ডিজাইনের ছবি</th>
                                        <th>অতিরিক্ত</th>
                                        <th>ক্রিয়া</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if ($measeureallstyles)
                                    @foreach ($measeureallstyles as $style)
                                    <tr>
                                        <td>{{ $style->id }}</td>
                                        <td>{{ $style->name }}</td>
                                        <td>{{ $style->dependency }}</td>
                                        {{--asset('storage/assets/trainer/' . $trainer->trainer_image)--}}
                                        <td> @if($style->image)<img src="{{asset("storage/assets/styles/$style->image")  }}" alt="{{ $style->name }}">@endif</td>
                                        <td>{{ $style->option }}</td>
                                        <td>
                                            <a href="{{route('admin.editstylemeasure', $style->id)}}" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                            <a href="#" wire:click.prevent="productDelete({{$style->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>
                                        </td>
                                    </tr>
                                    @endforeach
                                    @endif                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</div>
</div>