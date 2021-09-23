<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStyleMeasurePartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('style_measure_parts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('dependency');
            $table->string('image')->nullable();
            $table->string('option')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('style_measure_parts');
    }
}
