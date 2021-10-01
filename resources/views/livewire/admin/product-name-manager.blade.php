<div>

    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!}">{!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}</div>
    @endif
    <style>.nav-link.active{background:linear-gradient(180deg ,#4e73df 10%,#8C00BF 100%) !important;color: #fff !important;font-weight: bold  !important;}</style>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link {!!$activatedTab=='newproduct' ? 'active': '' !!}" id="new_product" data-toggle="tab" href="#newproduct" role="tab" aria-controls="newproduct" aria-selected="true"><input name="tabactivate" value="newproduct" type="radio" wire:click.prevent="navTabsActivating('newproduct')"  {!!$activatedTab=='newproduct' ? 'checked': '' !!}> নতুন পণ্য <i class="fa fa-plus"></i></a>
        </li>

        <li class="nav-item">
          <a class="nav-link @if($activatedTab=='allproducts') active @elseif( $activatedTab ==null) active @endif"  id="productsroles" data-toggle="tab" href="#all_products" role="tab" aria-controls="all_products" aria-selected="false"><input name="tabactivate" value="allproducts" type="radio" wire:click.prevent="navTabsActivating('allproducts')" @if($activatedTab=='allproducts') checked @elseif( $activatedTab ==null) checked @endif>সকল পণ্য <i class="fas fa-border-all"></i></a>
        </li>
        {{-- <li class="nav-item">
          <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" checked aria-controls="contact" aria-selected="false">Contact</a>
        </li> --}}
      </ul>
      {{-- <h1>{{$activatedTab?$activatedTab:'no'}}</h1> --}}
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade {!!$activatedTab=='newproduct' ? 'show active': '' !!}" id="newproduct" role="tabpanel" aria-labelledby="new_new_productrole">
                <div class="row">
                    <style>.card-header{border-bottom: 0;}</style>
                    <div class="card col-lg-12">
                            <div class="card-body">
                                <form wire:submit.prevent="storeProduct" class="was-validated">
                                    <div class="modal-body">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Name</span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="Product Name" wire:model="name" @if(!$customSlug) wire:keyup="generateSlug" @endif  required>
                                            </div>
                                            @error('name')<div class="text-danger">{{$message}}</div>@enderror
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Slug</span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="Product Slug" {{$customSlug? '' :'readonly'}} wire:model="slug" required>
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1"><input type="checkbox" value="1" wire:model="customSlug" id="custom_slug">Custom Slug</span>
                                                </div>
                                            </div>
                                            @error('slug')<div class="text-danger">{{$message}}</div>@enderror

                                            <div class="input-group mb-3 d-flex">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Price</span>
                                                </div>
                                                <input type="number" class="form-control" max="99999" placeholder="0000" wire:model="price">
                                            </div>
                                            @error('price')<div class="text-danger">{{$message}}</div>@enderror

                                            {{--একছাটা, পাঞ্জাবী , শর্ট পাঞ্জাবী , পায়জামা,একছাটা জুব্বা, কাবলী, এরাবিয়ান, গোলজামা, ফতুয়া, শেরওয়ানী,কটি, সালোয়ার, চোষ পায়জামা, আলিগড় ধুতি --}}
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Status</span>
                                                </div>
                                                <select class="form-control" wire:model="status">
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>
                                            @error('status')<div class="text-danger">{{$message}}</div>@enderror

                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Optional</span>
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
        <div class="tab-pane fade  @if($activatedTab=='allproducts') show active @elseif( $activatedTab == null) show active @endif" id="all_products" role="tabpanel" aria-labelledby="all_products">
             <div class="product_role_container container-fluid">
                <!-- DataTales Example -->
                <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Slug</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    @foreach ($products as $product)
                                    <tr>
                                        <td>{{ $product->id }}</td>
                                        <td>{{ $product->name }}</td>
                                        <td>{{ $product->slug }}</td>
                                        <td>
                                            <a href="{{route('admin.editproduct', $product->id)}}" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                            <a href="#" wire:click.prevent="productDelete({{$product->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>
                                        </td>
                                    </tr>
                                    @endforeach
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{-- <div class="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div> --}}
      </div>

</div>

@push('scripts')
<script>
    $(function(){
        // $('.input-group-text').width();

    });
</script>
@endpush
