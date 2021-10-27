<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollarStylePartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collar_style_parts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('customer_id')->unsigned;
            $table->bigInteger('order_id')->unsigned;
            $table->bigInteger('item_id')->unsigned;
            $table->bigInteger('style_id')->unsigned;
            $table->text('style_details')->nullable();
            // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('collar_style_parts');
    }
}
