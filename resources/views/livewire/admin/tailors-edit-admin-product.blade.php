<div>

    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!}">{!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}</div>
    @endif
    <style>.nav-link.active{background:linear-gradient(180deg ,#4e73df 10%,#8C00BF 100%) !important;color: #fff !important;font-weight: bold  !important;}</style>
      {{-- <h1>{{$activatedTab?$activatedTab:'no'}}</h1> --}}
      <div class="tab-content" id="myTabContent">
        <div class="row">
            <div class="col-lg-11 mx-auto">
                <div class="row my-3">
                    <div class="col-lg-6"><h3>Update Product</h3></div>
                    <div class="col-lg-6 text-right"><a href="{{route('admin.productmanager')}}" class="btn btn-primary"><i class="fa fa-arrow"></i> All Product</a> </div>
                </div>
            </div>
            <style>.card-header{border-bottom: 0;}</style>
            <div class="card col-lg-12">
                    <div class="card-body">
                        <form wire:submit.prevent="updateProduct" class="was-validated">
                            <div class="modal-body">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Name</span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Product Name" wire:model="name"  @if(!$customSlug) wire:keyup="generateSlug" @endif  required>
                                    </div>
                                    @error('name')<div class="text-danger">{{$message}}</div>@enderror

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Slug</span>
                                            </div>
                                        <input type="text" class="form-control" {{$customSlug? '' :'readonly'}} placeholder="Product Slug" wire:model="slug" required>
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
                            <button type="{{$errors->any() || $errorOut=='err' ? 'button':'submit'}}" {{ $errors->any() || $errorOut=='err' ? 'disabled':''}} class="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
        </div>
        {{-- <div class="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div> --}}
      </div>

</div>

@push('scripts')
<script>
  
</script>
@endpush
