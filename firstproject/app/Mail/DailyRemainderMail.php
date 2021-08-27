<?php
  
namespace App\Mail;
   
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
  
class DailyRemainderMail extends Mailable 
{
    use Queueable, SerializesModels;
  
    public $details;
   
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($list)
    {
        $this->list=$list;
    }
   
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        //return $this->view('mail')->with(['token'=>$this->details['token']]);
        return $this->view('dailyremaindermail')->with(['list'=>$this->list]);
    }
}

