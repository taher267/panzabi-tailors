<div>
    @section('title','Edit User')
    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{{implode(',', array_slice( explode(',', Session::get('msg')), -1,1))}}">{{implode(',', array_slice( explode(',', Session::get('msg')), 0, -1))}}</div>
    @endif
    <div class="row">
        {{-- <div class="alert alert-secondary"></div> --}}
        <style>.card-header{border-bottom: 0;}</style>
        <div class="card col-lg-12">
                <div class="row alert-secondary">
                    <div class="col-lg-4"><h5 class="card-header">Edit User</h5></div>
                    <div class="col-lg-4"></div>
                    <div class="col-lg-4 text-right"><a class="btn btn-info btn-lg" href="{{route('admin.users')}}"><i class="fa fa-arrow-left"> Back</i></a></div>
                </div>
                <div class="card-body">

                    <form wire:submit.prevent="storeRole">
                        <div class="modal-body">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Name" wire:model="name" required>
                                </div>
                                @error('name')<div class="text-danger">{{$message}}</div>@enderror

                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Email Address..." wire:model="email" required>
                                </div>
                                @error('email')<div class="text-danger">{{$message}}</div>@enderror

                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" value="taher267" placeholder="Username..." readonly wire:model="username" required>
                                </div>
                                @error('username')<div class="text-danger">{{$message}}</div>@enderror

                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Password..." wire:model="password" required>
                                </div>
                                @error('password')<div class="text-danger">{{$message}}</div>@enderror

                                <div class="input-group mb-3">
                                    {{-- <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Role</span>
                                    </div> --}}
                                    <select wire:model="short_role" class="form-control" required>
                                        <option>Select Role</option>
                                        @foreach ($roles as $role)
                                        <option value="{{$role->id}}">{{$role->name}}</option>
                                        @endforeach

                                    </select>
                                </div>
                                @error('role')<div class="text-danger">{{$message}}</div>@enderror

                                </div>
                                <button type="{{--$errors->any() || $errorOut=='err' ? 'button':'submit'--}}" {{-- $errors->any() || $errorOut=='err' ? 'disabled':''--}} class="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        {{-- <button type="{{$errors->any() || $errorOut=='err' ? 'button':'submit'}}" {{ $errors->any() || $errorOut=='err' ? 'disabled':''}} class="btn btn-primary">Submit</button> --}}

                </div>
     </div>
</div>

