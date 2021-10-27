<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('customer_id')->unsigned();
            $table->foreignId('product_id');
            $table->bigInteger('order_id')->unsigned();
            $table->foreignId('order_number');
            $table->string('cloth_long');
            $table->string('cloth_body');
            $table->string('cloth_belly')->nullable();
            $table->string('belly_loose')->nullable();
            $table->string('body_loose')->nullable();
            $table->string('cloth_enclosure')->nullable();
            $table->string('hand_long')->nullable();
            $table->string('sleeve_less')->nullable();
            $table->string('sleeve_pasting')->nullable();
            $table->string('cloth_throat');
            $table->string('cloth_collar')->nullable();
            $table->string('cloth_put');
            $table->string('cloth_mora');
            $table->string('noke_shoho')->nullable();
            $table->string('cloth_additional')->nullable();
            $table->timestamps();
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');

            // $table->bigInteger('collar_id')->unsigned()->nullable();
            // $table->bigInteger('sleeve_id')->unsigned()->nullable();
            // $table->bigInteger('handcuff_id')->unsigned()->nullable();
            // $table->bigInteger('plat_id')->unsigned()->nullable();
            // $table->bigInteger('pocket_with_zip_id')->unsigned()->nullable();
            // $table->bigInteger('embroidery_id')->unsigned()->nullable();
            // $table->bigInteger('pipeing_id')->unsigned()->nullable();
            // $table->bigInteger('pipeing_id')->unsigned()->nullable();
            // $table->bigInteger('karchupi_id')->unsigned()->nullable();
            // $table->bigInteger('sewing_id')->unsigned()->nullable();

            // $table->foreign('collar_id')->references('id')->on('collars')->onDelete('cascade');
            // $table->foreign('sleeve_id')->references('id')->on('sleeves')->onDelete('cascade');
            // $table->foreign('handcuff_id')->references('id')->on('handcuffs')->onDelete('cascade');
            // $table->foreign('plat_id')->references('id')->on('plats')->onDelete('cascade');
            // $table->foreign('pocket_with_zip_id')->references('id')->on('pocket_with_zips')->onDelete('cascade');
            // $table->foreign('embroidery_id')->references('id')->on('embroiderys')->onDelete('cascade');
            // $table->foreign('pipeing_id')->references('id')->on('pipeings')->onDelete('cascade');
            // $table->foreign('karchupi_id')->references('id')->on('karchupis')->onDelete('cascade');
            // $table->foreign('sewing_id')->references('id')->on('sewings')->onDelete('cascade');
            // $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_items');
    }
}
