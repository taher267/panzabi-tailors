<div>

    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!}">{!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}</div>
    @endif
    <style>.nav-link.active{background:linear-gradient(180deg ,#4e73df 10%,#8C00BF 100%) !important;color: #fff !important;font-weight: bold  !important;}</style>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link {!!$activatedTab=='newrole' ? 'active': '' !!}" id="new_role" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><input type="radio" wire:click.prevent="navTabsActivating('newrole')"  {!!$activatedTab=='newrole' ? 'checked': '' !!}> New Role</a>
        </li>

        <li class="nav-item">
          <a class="nav-link @if($activatedTab=='allroles') active @elseif( $activatedTab ==null) active @endif"  id="all_roles" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><input name="tabactivate" value="allroles" type="radio" wire:click.prevent="navTabsActivating('allroles')" @if($activatedTab=='allroles') checked @elseif( $activatedTab ==null) checked @endif>All Roles</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" checked aria-controls="contact" aria-selected="false">Contact</a>
        </li>
      </ul>
      {{-- <h1>{{$activatedTab?$activatedTab:'no'}}</h1> --}}
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade {!!$activatedTab=='newrole' ? 'show active': '' !!}" id="home" role="tabpanel" aria-labelledby="new_role">
                <div class="row">
                    <style>.card-header{border-bottom: 0;}</style>
                    <div class="card col-lg-12">
                            <div class="card-body">
                                <form wire:submit.prevent="storeRole">
                                    <div class="modal-body">
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Role Name" wire:model="name" required>
                                            </div>
                                            @error('name')<div class="text-danger">{{$message}}</div>@enderror
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Role Short</span>
                                                </div>
                                                <input type="text" class="form-control text-uppercase" placeholder="ADM/MGR/AHR/EDT/CTB/USR"  wire:model="short_role" required>
                                            </div>
                                            @error('short_role')<div class="text-danger">{{$message}}</div>@enderror

                                    </div>
                                    <button type="{{$errors->any() || $errorOut=='err' ? 'button':'submit'}}" {{ $errors->any() || $errorOut=='err' ? 'disabled':''}} class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                 </div>
        </div>
        <div class="tab-pane fade @if($activatedTab=='allroles') show active @elseif( $activatedTab ==null) show active @endif" id="profile" role="tabpanel" aria-labelledby="all_roles">
             <div class="user_role_container container-fluid">
                <!-- DataTales Example -->
                <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Short Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($roles as $role)
                                    <tr>
                                        <td>{{ $role->name }}</td>
                                        <td>{{ $role->short_role }}</td>
                                        <td>
                                            <a href="{{route('admin.editrole', $role->id)}}" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                            <a href="#" wire:click.prevent="roleDelete({{$role->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>
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
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
      </div>

</div>
