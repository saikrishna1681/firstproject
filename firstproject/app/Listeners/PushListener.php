<?php

namespace App\Listeners;

use App\Events\PusherEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Pusher;

class PushListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ExampleEvent  $event
     * @return void
     */
    public function handle(PusherEvent $event)
    {
        $pusher = new Pusher\Pusher('721c2eac7f93e2d4c45c', 'd0b143b8018a9a9317b7', '1251464',
                     array('cluster' => 'ap2', 'useTLS' => true ));

        $pusher->trigger($event->message->channel,$event->message->event,$event->message);
    }
}