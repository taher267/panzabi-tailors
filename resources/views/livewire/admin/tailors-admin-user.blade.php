<div>
    @section('title', 'All Users')
    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!}">{!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}</div>
    @endif
    <style>.nav-link.active{background:linear-gradient(180deg ,#4e73df 10%,#8C00BF 100%) !important;color: #fff !important;font-weight: bold  !important;}</style>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link {!!$activatedTab=='newuser' ? 'active': '' !!}" id="new_user" data-toggle="tab" href="#newuser" role="tab" aria-controls="newuser" aria-selected="true"><input name="tabactivate" value="newuser" type="radio" wire:click.prevent="navTabsActivating('newuser')"  {!!$activatedTab=='newuser' ? 'checked': '' !!}> New User</a>
        </li>

        <li class="nav-item">
          <a class="nav-link @if($activatedTab=='allusers') active @elseif( $activatedTab ==null) active @endif"  id="all_roles" data-toggle="tab" href="#allusers" role="tab" aria-controls="allusers" aria-selected="false"><input name="tabactivate" value="allusers" type="radio" wire:click.prevent="navTabsActivating('allusers')" @if($activatedTab=='allusers') checked @elseif( $activatedTab ==null) checked @endif>All Users</a>
        </li>
        {{-- <li class="nav-item">
          <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" checked aria-controls="contact" aria-selected="false">Contact</a>
        </li> --}}
      </ul>
      {{-- <h1>{{$activatedTab?$activatedTab:'no'}}</h1> --}}
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade {!!$activatedTab=='newuser' ? 'show active': '' !!}" id="newuser" role="tabpanel" aria-labelledby="new_user">
                <div class="row">
                    <style>.card-header{border-bottom: 0;}</style>
                    <div class="card col-lg-12">
                            <div class="card-body">
                                <form wire:submit.prevent="storeRole" class="was-validated">
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
                                                <input type="text" class="form-control" placeholder="Username..." wire:model="username" required>
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
                            </div>
                 </div>
        </div>
        <div class="tab-pane fade @if($activatedTab=='allusers') show active @elseif( $activatedTab ==null) show active @endif" id="allusers" role="tabpanel" aria-labelledby="all_roles">
             <div class="user_role_container container-fluid">
                <!-- DataTales Example -->
                <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($users as $user)
                                    <tr>
                                        <td>{{ $user->name }}</td>
                                        <td>{{ $user->role ? $user->role->name:'' }}</td>
                                        <td>
                                            <a href="{{route('admin.edituser', $user->id)}}" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                            <a href="#" wire:click.prevent="userDelete({{$user->id}})" {{--onclick="confirm('Are you sure to delete role')--}} || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>
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
        {{-- <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div> --}}
      </div>

</div>
