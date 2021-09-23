<div>
    @section('title', 'Edit Role')
    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{{implode(',', array_slice( explode(',', Session::get('msg')), -1,1))}}">{{implode(',', array_slice( explode(',', Session::get('msg')), 0, -1))}}</div>
    @endif
    <div class="row">
        {{-- <div class="alert alert-secondary"></div> --}}
        <style>.card-header{border-bottom: 0;}</style>
        <div class="card col-lg-12">
                <div class="row alert-secondary">
                    <div class="col-lg-4"><h5 class="card-header">Edit Role</h5></div>
                    <div class="col-lg-4"></div>
                    <div class="col-lg-4 text-right"><a class="btn btn-info btn-lg" href="{{route('admin.roles')}}"><i class="fa fa-arrow-left"> Back</i></a></div>
                </div>
                <div class="card-body">

                    <form wire:submit.prevent="updateRole">
                        <div class="modal-body">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Role Name</span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Role Name" wire:model="name" required>
                                </div>
                                @error('name')<div class="text-danger">{!!$message!!}</div>@enderror
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Role Short</span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="ADM/MGR/AHR/EDT/CTB/USR"  wire:model="short_role" required>
                                </div>
                                @error('short_role')<div class="text-danger">{!! $message !!}</div>@enderror

                        </div>
                        <button type="{{$errors->any() || $errorOut=='err' ? 'button':'submit'}}" {{ $errors->any() || $errorOut=='err' ? 'disabled':''}} class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
     </div>
</div>

