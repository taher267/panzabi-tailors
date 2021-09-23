<?php

namespace App\Tailors;

use App\Models\TailorsPageSetting;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
     * make slug
     */
    

}



//|| $field2 ==null || $field3 ==null || $field4==null || $field5==null || $field6==null || $field7==null || $field8 ==null || $field9 ==null ||$field10 ==null ||$field11 ==null || $field12 ==null || $field13 ==null || $field14==null || $field15==null || $field16==null || $field17==null ||$field18 ==null|| $field19==null ||$field20 ==null