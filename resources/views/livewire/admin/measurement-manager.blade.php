<div>
    @if (Session::has('msg'))
        <div class="d-inline alert fixed-top-right alert-{!! implode(",", array_slice( explode(",", Session::get('msg')), -1,1)) !!}">{!!implode(",", array_slice( explode(",", Session::get('msg')), 0, -1)) !!}</div>
    @endif
    <style>.nav-link.active{background:linear-gradient(180deg ,#4e73df 10%,#8C00BF 100%) !important;color: #fff !important;font-weight: bold  !important;}</style>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link {!! $activatedTab=='newmeasure' ? 'active': '' !!}" id="new_measure" data-toggle="tab" href="#newmuasure" role="tab" aria-controls="newmuasure" aria-selected="true"><input name="tabactivate" value="newmeasure" type="radio" wire:click.prevent="navTabsActivating('newmeasure')"  {!!$activatedTab=='newmeasure' ? 'checked': '' !!}> New Measurement field</a>
        </li>

        <li class="nav-item">
          <a class="nav-link @if($activatedTab=='allmeasures') active @elseif( $activatedTab ==null) active @endif"  id="all_roles" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><input name="tabactivate" value="allmeasures" type="radio" wire:click.prevent="navTabsActivating('allmeasures')" @if($activatedTab=='allmeasures') checked @elseif( $activatedTab ==null) checked @endif>All Measures</a>
        </li>
        {{-- <li class="nav-item">
          <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" checked aria-controls="contact" aria-selected="false">Contact</a>
        </li> --}}
      </ul>
      {{-- <h1>{{$activatedTab?$activatedTab:'no'}}</h1> --}}
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade {!!$activatedTab=='newmeasure' ? 'show active': '' !!}" id="newmuasure" role="tabpanel" aria-labelledby="new_measure">
                <div class="row">
                    <style>.card-header{border-bottom: 0;}</style>
                    <div class="card col-lg-12">
                            <div class="card-body">
                                <form wire:submit.prevent="productStore" class="was-validated">
                                    <div class="modal-body">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Name</span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="Measurement Name" wire:model="name" required>
                                            </div>
                                            @error('name')<div class="text-danger">{{$message}}</div>@enderror

                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Slug</span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="Measurement Slug" wire:model="slug" required>
                                            </div>
                                            @error('slug')<div class="text-danger">{{$message}}</div>@enderror

                                            <div class="input-group mb-3">
                                                {{-- <input type="text" class="form-control" placeholder="Measurement Slug" wire:model="slug" required> --}}
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Position</span>
                                                </div>
                                                <select class="form-control" wire:model="position">
                                                    <option value="top">Top</option>
                                                    <option value="Bottom">Bottom</option>
                                                </select>
                                            </div>
                                            @error('status')<div class="text-danger">{{$message}}</div>@enderror

                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Option1</span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="example, example"  wire:model="option">
                                            </div>
                                            @error('option')<div class="text-danger">{{$message}}</div>@enderror

                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Option2</span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="example, example"  wire:model="option2">
                                            </div>
                                            @error('option2')<div class="text-danger">{{$message}}</div>@enderror
                                    </div>
                                    <button type="{{--$errors->any() || $errorOut=='err' ? 'button':'submit'--}}" {{-- $errors->any() || $errorOut=='err' ? 'disabled':''--}} class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                 </div>
        </div>
        <div class="tab-pane fade @if($activatedTab=='allmeasures') show active @elseif( $activatedTab ==null) show active @endif" id="profile" role="tabpanel" aria-labelledby="all_roles">
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
                                    {{--
                                    @foreach ($users as $user)
                                    <tr>
                                        <td>{{ $user->name }}</td>
                                        <td>{{ $user->role_id }}</td>
                                        <td>
                                            <a href="{{route('admin.edituser', $user->id)}}" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                            <a href="#" wire:click.prevent="userDelete({{$user->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a>
                                        </td>
                                    </tr>
                                    @endforeach
                                    --}}
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
           var wid = $( ".input-group-prepend" ).width();
        //    alert(wid);
        });
    </script>
@endpush
