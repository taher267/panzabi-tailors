<?php

namespace App\Tailors;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

trait TailorsErrorMsgTrait
{
    public function newCustomerErrMsgs()
    {
        return [
            'delivery_system.required_with' => 'কিভাবে পণ্য ডেলিভারি করতে চান?',
            'delivery_charge.required_with' => 'ডেলিভারি চার্জ দিন!',
            'country.required_with' => 'দেশের নাম নির্বাচন করুণ!',
            'province.required_with' => 'প্রদেশ/বিভাগের নাম দিন!',
            'city.required_with' => 'জেলার নাম নির্বাচন করুণ!',
            'line1.required_with' => ':attribute দিন!',
            'zipcode.required_with' => 'জিপ-কোড দিন!',

            'email.email' =>"<i class='fa fa-envelope'></i> সঠিক ইমেইল অ্যাড্রেস দিন!",
            'email.required' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস দিন!",
            'email.unique' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস পূর্ব নিবন্ধিত!",
            'cloth_throat.required_without'          => 'গলার অথবা কলার সাইজ লিখুন','cloth_collar.required_without'          => 'গলার অথবা কলার সাইজ লিখুন',
            'delivery_system.required'=> 'সন্দেহজনক, আপনি কি করতে চাচ্ছেন???','delivery_system.min'=> 'সন্দেহজনক, আপনি কি করতে চাচ্ছেন???',
            'courier_details.required'=> 'কুরিয়ার সম্পর্কে বিস্তারিত লিখুন','delivery_charge.required'=> 'ডেলিভারি চার্জ লিখুন',
            'delivery_charge.numeric'=> 'সন্দেহজনক! ডেলিভারি চার্জ নম্বর হবে','country.required'=> 'দেশের নাম সিলেক্ট করুন',
            'city.required'=> 'শহরের নাম লিখুন','province.required'=> 'প্রদেশের নাম লিখুন','zipcode.required'=> 'জিপ কোড লিখুন','line1.required'=> 'বাড়ি নং,গ্রাম/মহল্লা সড়ক নং লিখুন',
            'products.required'=>'পণ্য নির্বাচন করুণ!','cloth_enclosure.required' => 'ঘেরের পরিমাপ দিন','hand_long.required' =>'হাতার লম্বার পরিমাপ দিন!','cloth_shoulder.required' => 'পুটের পরিমাপ দিন',
            'order_sample_images.image'=>'ছবি যুক্ত করুন','cloth_long.required' => 'লম্বার পরিমাপ দিন','order_sample_images.mimes'=>'jpg অথবা jpeg অথবা png এর ছবি যুক্ত করুন',
            'wages.required'=> "মজুরি লিখুন!",'wages.numeric'=> "মজুরি শুধুমাত্র নম্বর !",'discount.numeric'=> "ডিসকাউন্ট নম্বর হবে!",'advance.numeric'=> "অ্যাডভান্স নম্বর হবে!",'total.required'=> "মোট মজুরি দিন!",'total.numeric'=> "মোট মজুরি নম্বর হবে!",
    ];
    }
}