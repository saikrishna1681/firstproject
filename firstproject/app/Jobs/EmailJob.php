<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Mail\MyTestMail;
use App\Mail\TaskAssignedMail;
//use Mail;

class EmailJob implements ShouldQueue
{
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($email,$assignor,$username,$title,$description,$duedate)
    {
        $this->assignor=$assignor;
        $this->title=$title;
        $this->description=$description;
        $this->duedate=$duedate;
        $this->username=$username;
        $this->email=$email;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        Mail::to($this->email)->send(new TaskAssignedMail($this->assignor,$this->username,$this->title,$this->description,$this->duedate));
    }
}
