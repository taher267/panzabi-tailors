<?php

namespace App\Tailors;

use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\OrderItemStyle;
use App\Models\StyleMeasurePart;
use App\Models\TailorsPageSetting;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

/**
 * 
 */
trait TailorsTrait
{
    // Nav activation
/**
 * $Table DB table name
 * $TabColumn table column name
 * $tab column value
 * 
 */
    public function TraintNavActivation($TabColumn ,$TabValue)
    {
        $Table = 'tailors_page_settings';
        $nav = DB::table($Table)->where('name', $TabColumn)->first();
        if(!$nav){
            DB::table($Table)->insert([ 'name' => $TabColumn, 'value' => $TabValue]);
            session()->flash('msg', "<i class='fa fa-check text-success'></i> $TabValue is actived and add!,primary");
        }else{
            if( $nav->value == $TabValue ){
                session()->flash('msg', "<i class='fa fa-exclamation-triangle'></i> This tab allready sellected as primary!,danger");
            }else{
                DB::table( $Table )
                ->where( 'name', $TabColumn )
                ->update(['value' => $TabValue]);
                session()->flash('msg', "<i class='fa fa-check text-success'></i> $TabValue is actived!,primary");
            }
        }


    }

    public function TraitActivaredNavTab($TabColumn)
    {
        $nav = TailorsPageSetting::where('name', $TabColumn)->first();
        if($nav){
                $this->activatedTab = $nav->value;
            }
    }

    //add input from on error not submit

    public function TraitFormError($field, $field2=null, $field3=null, $field4=null, $field5=null, $field6=null, $field7=null, $field8=null, $field9=null, $field10=null, $field11=null, $field12 = null, $field13 = null, $field14 = null, $field15 = null, $field16 = null, $field17 = null, $field18 = null, $field19 = null, $field20 = null )
    {
        if( $field =='' || $field2 ==null  ){
            $this->errorOut = 'err';
        }else{
            $this->errorOut = '';
        }
    }

    /**
     * db image name
     */
    public function imageNameMake($slugby, $extension)
    {
       return Str::slug($slugby) . '-' . Carbon::now()->timestamp . '.'. $extension->extension();
    }
    /**image upload */
    public function uploadImage($whatImg, $uploadOn,  $slugby, $width= 250, $height=250, $disk='public')
    {
        //Resize image for Category and upload
        $resizeImage = Image::make($whatImg)->resize( $width, $height )->save();
        Storage::disk($disk)->put("$uploadOn/" .$slugby, $resizeImage);

    }
    // public function uploadImage($whatImg, $uploadOn,  $slugby, $width= 250, $height=250, $disk='public')
    // {
    //     //Resize image for Category and upload
    //     $resizeImage = Image::make($whatImg)->resize( $width, $height )->save();
    //     Storage::disk($disk)->put("$uploadOn/" . $this->imageNameMake($slugby, $whatImg), $resizeImage);

    // }

    /**image upload */
    // public function updateUploadImage($whatImg, $uploadOn,  $slugby, $width= 250, $height=250, $disk='public')
    // {
    //     //Resize image for Category and upload
    //     $resizeImage = Image::make($whatImg)->resize( $width, $height )->save();
    //     Storage::disk($disk)->put("$uploadOn/" .$slugby, $resizeImage);

    // }
        public function todayDate()
        {
            $this->todayDate= Carbon::now('Asia/Dhaka')->format('Y-m-d');
        }

        

    /**
     * item design
     */
    public function OrderItemDesign($customer_id,$order_id, $orderitem_id)
    {
        $loopCount = count($this->designs_check);
        for( $i=0; $i < $loopCount; $i++ ){
            if( 0 != array_values($this->designs_check)[$i] ){
                $OrderItemStyles = new OrderItemStyle();
                    $OrderItemStyles->customer_id    = $customer_id;
                    $OrderItemStyles->order_id       = $order_id;
                    $OrderItemStyles->order_number   = $this->order_number;
                    $OrderItemStyles->order_item_id  = $orderitem_id;
                
                    $OrderItemStyles->style_id       = array_values($this->designs_check)[$i];
                    $OrderItemStyles->style_details  = array_values($this->design_fields)[$i]??null;
                    $OrderItemStyles->item_style_type= StyleMeasurePart::find(array_values($this->designs_check)[$i])->dependency;
                    $OrderItemStyles->save();
                    }      
        }
    }

}



//|| $field2 ==null || $field3 ==null || $field4==null || $field5==null || $field6==null || $field7==null || $field8 ==null || $field9 ==null ||$field10 ==null ||$field11 ==null || $field12 ==null || $field13 ==null || $field14==null || $field15==null || $field16==null || $field17==null ||$field18 ==null|| $field19==null ||$field20 ==null