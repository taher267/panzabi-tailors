<?php

namespace App\Http\Controllers;
use App\Models\Gallery;
use App\Models\CourseClass;
use Carbon\Carbon;
use Intervention\Image\Facades\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->data['pageHead'] = "All Gallery Photos";
        if ( $this->permission(4) ) {
            $this->data['asUsualData'] = $this->asUsualData();
            $this->data['dashboardData'] = $this->dashboardData();
            $this->data['classes'] = CourseClass::arrOfClassName();
            $this->data['permission'] = $this->permission(4);
            return view('admin.gallery.gallery', $this->data);
        }else{
            return view('admin.gallery.gallery', $this->data);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
         $this->data['pageHead'] = "Add New Photo";
        if ( $this->permission(4) ) {
            $this->data['authUser'] = $this->asUsualData()['authUser'];
            $this->data['asUsualData'] = $this->asUsualData();
            $this->data['dashboardData'] = $this->dashboardData();
            $this->data['classes'] = CourseClass::arrOfClassName();
            return view('admin.gallery.gallery_create', $this->data);
        }else{
            return view('admin.gallery.gallery_create', $this->data);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ( $this->permission(4) ) {
            $this->validate($request, [
                'course_id' => 'required|numeric',
                'image' => 'image|mimes:jpg,jpeg,png',
                'cat_id' => 'required|numeric',
                'status' => 'numeric',
            ]);


            $image = $request->file('image');
            if (isset($image)) {
                //Make unique name of image
                $imageName = 'gallery-' . Carbon::now()->toDateString() . uniqid() . '.' . $image->getClientOriginalExtension();

                //Make dir, not exist
                if (!Storage::disk('public')->exists('assets/gallery')) {
                    Storage::disk('public')->makeDirectory('assets/gallery');
                }

                //Resize image for Category and upload
                $resizeImage = Image::make($image)->resize(262,262)->save(90);
                Storage::disk('public')->put('assets/gallery/'.$imageName, $resizeImage);
            }else{
                $imageName = 'gallery.png';
            }

            if ($this->dashboardData()['authUser']->role <=2 ) {
                $status = $request->status;
            }else{
                $status = 0;
            }

            //Data insert
            $add_photo = new Gallery;
            $add_photo->course_id      = $request->course_id;
            $add_photo->image      = $imageName;
            $add_photo->status      = $status;
            $add_photo->cat_id      = $request->cat_id;
            $add_photo->added_by      = $this->dashboardData()['authUser']->id;
            // return $add_photo; exit();
            if ($add_photo->save()) {
                return back()->with('msg', "Gallery Photo Has been Added!");
            }else{
                return back()->with('msg', "Gallery Photo Has not been Added!");
            }
        }else{
            return back()->with('msg', "Your user role is too short!");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($this->permission() || $galery_photo->added_by == $this->dashboardData()['authUser']->id ){
            $this->validate($request, [
                'course_id' => 'required|numeric',
                'image' => 'image|mimes:jpg,jpeg,png',
                'cat_id' => 'required|numeric',
                'status' => 'required|numeric',
            ]);

            $up_gallery = Gallery::findOrFail($id);
            // return $up_gallery->image;

            $image = $request->file('image');
            if (isset($image)) {
                //Make unique name of image
                $imageName = 'gallery-' . Carbon::now()->toDateString() . uniqid() . '.' . $image->getClientOriginalExtension();

                //Old image check and delete
                if (Storage::disk('public')->exists('assets/gallery/' . $up_gallery->image ) && $up_gallery->image != 'gallery.png') {
                    Storage::disk('public')->delete('assets/gallery/' . $up_gallery->image);
                }

                //Make dir, not exist
                if (!Storage::disk('public')->exists('assets/gallery')) {
                    Storage::disk('public')->makeDirectory('assets/gallery');
                }

                //Resize image for Category and upload
                $resizeImage = Image::make($image)->resize(262,262)->save(90);
                Storage::disk('public')->put('assets/gallery/'.$imageName, $resizeImage);
            }else{
                $imageName = $up_gallery->image;
            }


            $up_gallery->course_id      = $request->course_id;
            $up_gallery->image      = $imageName;
            $up_gallery->status      = $request->status;
            $up_gallery->cat_id      = $request->cat_id;
            if ($up_gallery->save()) {
                return back()->with('msg', "Gallery Photo Has been updated!");
            }else{
                return back()->with('msg', "Gallery Photo Has not been updated!");
            }
        }else{
            return back()->with('msg', "Your user role is too short!");
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $galery_photo = Gallery::findOrFail($id);
        

        if ( $this->permission(1) || $galery_photo->added_by == $this->dashboardData()['authUser']->id) {
             return 'Can del'; exit();
           //Delete Image
                if (Storage::disk('public')->exists('assets/galery_photo/'.$galery_photo->image) && 'avater.png' != $galery_photo->image) {
                    Storage::disk('public')->delete('assets/galery_photo/'.$galery_photo->image);
                }
                if ($galery_photo->delete()) {
                    return back()->with('msg', 'User has been deleted!');   
                } 
            
        }

        else{
            return back()->with('msg', 'You can\'t delete the post!');
        }
        
    }

}
