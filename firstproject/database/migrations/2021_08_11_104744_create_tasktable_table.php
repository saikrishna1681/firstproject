<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasktableTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasktable', function (Blueprint $table) {
            $table->id();
            $table->integer('assignee');
            $table->integer('assignor');
            $table->string("title");
            $table->longText("description");
            $table->date("due_date");
            //$table->time("completed_time")->default();
            //$table->date("completed_date")->default();
            $table->integer("task_status")->default(0); //completed:2 progress:1 pending:0
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasktable');
    }
}
