<div>
    <style>.active-cyan-2 input.form-control[type=text]:focus:not([readonly]) {border-bottom: 1px solid #4dd0e1;box-shadow: 0 1px 0 0 #4dd0e1;}</style>
    <div class="row">
        <!-- Search form -->
        <div class="md-form active-cyan-2 mb-3">
            <input class="form-control" type="text" placeholder="Search" aria-label="Search">
        </div>
    </div>
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
                            @if ($customers)
                                @foreach ($customers as $product)
                                <tr>
                                    <td>{{ $product->id }}</td>
                                    <td>{{ $product->Full_Name }}</td>
                                    <td>{{ $product->mobile }}</td>
                                    <td>
                                        {{-- <a href="{{route('admin.editproduct', $product->id)}}" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                        <a href="#" wire:click.prevent="productDelete({{$product->id}})" onclick="confirm('Are you sure to delete role') || event.stopImmediatePropagation()" class="btn btn-danger"><i class="fa fa-trash"></i></a> --}}
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
