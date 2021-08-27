<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Tasktable;
use App\Jobs\RemainderDailyJob;

class DailyReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'remainder:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remaind daily tasks through email';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $users = User::all();
        foreach($users as $user){
           $list=Tasktable::where('assignee','LIKE',$user->id)->get();
           $email=$user->email;
           $emailJob = (new RemainderDailyJob($email,$list));
           dispatch($emailJob);
        }
        //return $users;
        $this->info("Daily Remainder Mails sent sucessfully to every one");
    }
}
