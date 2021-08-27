<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TaskAssignedMail extends Mailable 
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($assignor,$username,$title,$description,$duedate)
    {
        $this->assignor=$assignor;
        $this->title=$title;
        $this->description=$description;
        $this->duedate=$duedate;
        $this->username=$username;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('taskassignedmail')->with(['assignor'=>$this->assignor,'title'=>$this->title,'description'=>$this->description,'duedate'=>$this->duedate,'username'=>$this->username]);
    }
}
