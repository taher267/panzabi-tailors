<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSizeChartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('size_charts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('size');
            $table->string('cloth_long')->nullable();
            $table->string('body_loose')->nullable();
            $table->string('belly_loose')->nullable();
            $table->string('cloth_enclosure')->nullable();
            $table->string('hand_long')->nullable();
            $table->string('sleeve_enclosure')->nullable();
            $table->string('sleeve_pasting')->nullable();
            $table->string('cloth_collar')->nullable();
            $table->string('cloth_shoulder')->nullable();
            $table->string('cloth_mora')->nullable();
            $table->string('plate_fara')->nullable();
            $table->string('noke_shoho')->nullable();
            $table->string('cloth_additional')->nullable();
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
        Schema::dropIfExists('size_charts');
    }
}
