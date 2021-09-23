<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->string('custoemrname');
            $table->string('photo');
            $table->string('mobile')->unique();
            $table->string('email')->unique()->nullable();
            $table->string('address')->nullable();
            $table->string('line1')->nullable();
            $table->string('line2')->nullable();
            $table->string('country');
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('zipcode')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
