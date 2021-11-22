<div>
    <div class="col-md-12 step-3">
        <h5 class="d-block">কাপড়/পোষাক/অ্যাপ্রন <b class="text-info">ডিজাইন</b> সমূহের নাম ও পরিমাপ</h5>
        @if ($styleGroup && $designItems)
        @foreach ($designItems as $design)
        <div class="row py-1">
            <div class="col-xl-12 py-3">
                <h4 class="">{{$design->name .'/'. $design->slug}}</h4>
            </div>
            <div class="col-xl-12">
                <div class="row">
                    @foreach ( $styleGroup->where( 'dependency', $design->slug ) as $style )
                    <div class="col-lg-2 col-sm-6 design_bg sarwani" style="background:url({{asset('assets/img/')}})"> 
                        <div class="custom-control custom-checkbox mb-1 d-inline-block">
                            <input type="checkbox" wire:model="designs_check.{{ $style->id }}" wire:change="fillEmptyStyleField({{$style->id}})" value="{{ $style->id }}" class="custom-control-input " id="style_{{$style->id}}" @if( in_array( $style->id, array_keys($design_fields) , true) && $design_fields[$style->id] != '')required @endif>
                            <label class="custom-control-label" for="style_{{$style->id}}">{{$style->name}} </label>
                            <div class="invalid-feedback"> <i class="fa fa-check " style="color:#34E3A4"></i> টিক দিন!</div>
                            @error("designs_check.$style->id") <div class="text-danger"> {!!$message!!}</div> {{--@else <div class="invalid-feedback text-warning">যেকোনো একটি নির্বাচন করুন </div>--}}  @enderror
                            <textarea rows="1" wire:model="design_fields.{{ $style->id }}" rows="1" class="form-control" value="{{$style->id}}"></textarea>                                                
                        </div>
                    </div>
                    @endforeach                                    
                </div>  
            </div>
        </div>
        @endforeach
    @endif

    <div class="col-xl-12 mt-3">
        <div class="row">
            <div class="col-xl-6 col-12"><button class="btn btn-danger nextBtn btn-lg col-12 col-mb-2" type="button" wire:click="back({{$currentStep-1}})"><i class="fa fa-arrow-left"></i> পেছনের ধাপ</button></div>
            {{-- $cloothDesignOutpurResult==0 &&  --}}
            @if ($errors->isEmpty())
                <div class="col-xl-6 col-12">
                <button class="btn btn-primary btn-lg w-100" type="button" wire:click="designStepSubmit">পরবর্তী ধাপ <i class="fa fa-arrow-right"></i></button> </div> 

            @else  <div class="col-xl-6 col-12 text-center"><h6 class="col-xl-12 text-danger"><marquee direction="right">বাধ্যতামূলক ঘরগুলো পূরণ করুন!</marquee></h6></div>
            @endif
            
        </div>
    </div>
    </div>
</div>