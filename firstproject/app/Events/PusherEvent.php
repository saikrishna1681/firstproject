<?php

namespace App\Events;
use Illuminate\Queue\SerializesModels;
use App\Models\PusherModel;

class PusherEvent extends Event
{
    use SerializesModels;
    /**
     * 
     * Create a new event instance.
     *
     * @return void
     */
    public $message;

  public function __construct(PusherModel $message)
  {
      $this->message = $message;
  }
}
