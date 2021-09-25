<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('user_id')->unsigned();
                $table->bigInteger('customer_id')->unsigned();
                $table->decimal('wages');//মজুরি
                $table->decimal('quantity');
                $table->decimal('subtotal');
                $table->decimal('discount')->default(0);
                $table->decimal('delivery_charge')->nullable();
                $table->string('delivery_system')->nullable();
                $table->decimal('total');
                $table->boolean('status');
                $table->date('delivered_date')->nullable();
                $table->timestamps();
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
