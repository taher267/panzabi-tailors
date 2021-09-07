<div>
    <div class="row">
        <div class="alert alert-secondary">
            <input name='role' type="radio" value="1" wire:model="roleAddEdit"> New Role
            <input name='role' type="radio" value="2" wire:model="roleAddEdit"> Edit Role
        </div>
        <style>.card-header{border-bottom: 0;}</style>
        <div class="card col-lg-12">
            @if ($roleAddEdit ==1)
                <div class="row alert-secondary">
                    <div class="col-lg-4"><h5 class="card-header">New Role</h5></div>
                    <div class="col-lg-4"></div>
                </div>
                <div class="card-body">
                    <form wire:submit.prevent="storeRole">
                        <div class="modal-body">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Role Name</span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Role Name" wire:model="name" required>
                                </div>
                                @error('name')<div class="text-danger">{{$message}}</div>@enderror
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Role Short</span>
                                    </div>
                                    <input type="text" class="form-control text-uppercase" placeholder="ADM/MGR/AHR/EDT/CTB/USR"  wire:model="role_short" required>
                                </div>
                                @error('role_short')<div class="text-danger">{{$message}}</div>@enderror
                        
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            @elseif ($roleAddEdit ==2)
                {{-- <div class="row alert-secondary">
                    <div class="col-lg-4"><h5 class="card-header">Edit User</h5></div>
                    <div class="col-lg-4"></div>
                </div>
                <div class="card-body">
                    <form wire:submit.prevent="storeRole">
                        <div class="modal-body">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Role Name</span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Role Name" wire:model="newname" required>
                                </div>
                                @error('newname')<div class="text-danger">{{$message}}</div>@enderror
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Role Short</span>
                                    </div>
                                    <input type="text" class="form-control text-uppercase" placeholder="ADM/MGR/AHR/EDT/CTB/USR"  wire:model="newrole_short" required>
                                </div>
                                @error('newrole_short')<div class="text-danger">{{$message}}</div>@enderror
                        
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>             --}}
                <div class="card border-primary mb-3 role_edit_card" id="role_edit_card" style="height:{{--$windowHeight--}}">
                    <div class="card-header">Header</div>
                    <div class="card-body text-primary">
                      <h5 class="card-title">Primary card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
            @endif
        </div>
        {{-- <div class="row">
            <div class="col-lg-10 justify-content-center">
            </div>
            <div class="card  col-lg-12">
                <div class="card-body">
                    <form wire:submit.prevent="storeRole">
                        <div class="modal-body">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Role Name</span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Role Name" wire:model="name" required>
                                </div>
                                @error('name')<div class="alert-danger">{{$message}}</div>@enderror
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Role Short</span>
                                    </div>
                                    <input type="text" class="form-control text-uppercase" placeholder="ADM/MGR/AHR/EDT/CTB/USR"  wire:model="role_short" required>
                                </div>
                                @error('role_short')<div class="alert-danger">{{$message}}</div>@enderror
                          
                        </div>
                          <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>     --}}
        kfjdkfjkdfjkdjk
        <input type="hidden" value="" wire:model="windowHeight">
</div>

@push('scripts')
    <script>
        $(function(){
            // var high = $(window).height();
            $("input:hidden").val($(window).height());
        });
    </script>
@endpush
