<div>
    <style>
            .tailors-modal-form {
          --gap: 15px;

          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: var(--gap);
          background: rgba(197, 21, 21, 0.1);
          font-family: sans-serif;
          overflow: scroll;
        }

      
    </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
    <!-- Button trigger modal -->
{{-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#jfkdjfkdjfdkj">
    Launch demo modal
  </button> --}}
  
  <!-- Modal -->
  {{-- <div class="modal fade" id="jfkdjfkdjfdkj" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog">
        <form autocomplete="off" wire:submit.prevent="createTest">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    @if ($errors->any())
                        @foreach ($errors->all() as $item)
                            <div class="text-danger">{{$item}}</div>
                        @endforeach
                    @endif
                        <div class="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input type="email" wire:model.defer="email" class="form-control @error('email') is-invalid @enderror"  id="exampleInputEmail1" aria-describedby="emailHelp" >
                          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input type="password" wire:model.defer="password" class="form-control" id="exampleInputPassword1" >
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </form>
    </div>
  </div> --}}
{{-- @if ()
    
@endif --}}
@if ($formId==0)
    <button type="button" class="btn btn-success" wire:click="formController(1)">Create User</button>
    @endif
    @if ($formId==1)
    <div class="tailors-modal-form" id="modalWraper" style="display: block;padding-top:100px;">
        <div class="row d-block">
        <div class="modal__inner bg-info py-5">
        
            <div class="col-xl-12 w-100 text-right"><button wire:click="formController(0)" type="button" class="btn btn-primary"><i class="fa fa-clock"></i>* Close</button></div>
            <div class="col-xl-10 mx-auto ">
                <form autocomplete="off" wire:submit.prevent="createTest">
                    <div class="row ">
                        <div class="col-xl-6">
                            
                                @if ($errors->any())
                                @foreach ($errors->all() as $item)
                                    <div class="text-danger">{{$item}}</div>
                                @endforeach
                            @endif
                                <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" wire:model="email" class="form-control @error('email') is-invalid @enderror"  id="exampleInputEmail1" aria-describedby="emailHelp" >
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" wire:model="password" class="form-control" id="exampleInputPassword1" >
                                </div>
                                
                        </div>
                        <div class="col-xl-6">
                            
                            @if ($errors->any())
                            @foreach ($errors->all() as $item)
                                <div class="text-danger">{{$item}}</div>
                            @endforeach
                        @endif
                            <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" wire:model="email" class="form-control @error('email') is-invalid @enderror"  id="exampleInputEmail1" aria-describedby="emailHelp" >
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" wire:model="password" class="form-control" id="exampleInputPassword1" >
                            </div>
                            
                    </div>  <div class="col-xl-6">
                            
                            @if ($errors->any())
                            @foreach ($errors->all() as $item)
                                <div class="text-danger">{{$item}}</div>
                            @endforeach
                        @endif
                            <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" wire:model="email" class="form-control @error('email') is-invalid @enderror"  id="exampleInputEmail1" aria-describedby="emailHelp" >
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" wire:model="password" class="form-control" id="exampleInputPassword1" >
                            </div>
                            
                    </div>
                        <div class="col-xl-12">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
  @endif
  

  {{-- <div class="container">
    <div class="row">
        <div class="col-xl-8 mx-auto">
          <div id="formWrapper">
              <form autocomplete="off" wire:submit.prevent="createTest">
                  <div class="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input type="email" wire:model.defer="email" class="form-control @error('email') is-invalid @enderror"  id="exampleInputEmail1" aria-describedby="emailHelp" >
                          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                          <div class="text-danger">@error('email') {{$message}} @enderror</div>
                      </div>
                      <div class="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input type="password" wire:model.defer="password" class="form-control" id="exampleInputPassword1" >
                      </div>
                      <div class="text-danger">@error('password') {{$message}} @enderror</div>
                  
                      <button type="submit" class="btn btn-primary">Save changes</button>
                      </div>
                  </div>
              </form>
          </div>
        </div>
    </div>
</div> --}}
    
</div>

@push('scripts')
<script>
$(document).ready(function(){
                window.addEventListener('alert', event => { 
        toastr[event.detail.type](event.detail.message, 
        event.detail.title ?? ''), toastr.options = {
                 "closeButton": true,
                 "debug": false,
                 "newestOnTop": false,
                 "progressBar": true,
                 "positionClass": "toast-center-center",
                 }
    });
    
        </script>
@endpush
