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
            $table->string('cloth_long')->nullable();
            $table->string('cloth_body')->nullable();
            $table->string('cloth_belly')->nullable();
            $table->string('belly_loose')->nullable();
            $table->string('body_loose')->nullable();
            $table->string('cloth_enclosure')->nullable();
            $table->string('hand_long')->nullable();
            $table->string('sleeve_enclosure')->nullable();
            $table->string('sleeve_pasting')->nullable();
            $table->string('cloth_throat')->nullable();
            $table->string('cloth_collar')->nullable();
            $table->string('cloth_shoulder')->nullable();
            $table->string('cloth_mora')->nullable();
            $table->string('noke_shoho')->nullable();
            $table->string('cloth_additional')->nullable();
            $table->timestamps();
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
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
