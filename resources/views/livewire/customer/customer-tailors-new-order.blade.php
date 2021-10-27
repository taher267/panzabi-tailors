<div>
@php
    $arr1 = [1=>1, 2=>2, 5=>5, 9=>9, 10=>10];
    $arr2 = [2=>'five', 5=>'nine', 9=>'eleven'];
    // print_r($arr2);
    $arr3 = [];
    $arr4 = [];
    
   
        foreach ($arr1 as $key1 => $val1) {
            foreach ($arr2 as $key2 => $val2) {
        // if($key1 = $key2){
        //     $arr3[$key1]= $val2;
        // }
        if($val1 != $key2) {
            $arr4[$key1]= '';
        }
        }
    }
     print_r($arr4);
@endphp
</div>