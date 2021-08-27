<?php
namespace App\Http\Controllers;
use App\Product;
use Illuminate\Support\Facades\Mail;
//use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
//use Illuminate\Http\Response;
use App\Http\Controllers\Illuminate\Http\Response;
use App\Models\User;
use App\Models\Tasktable;
use Symfony\Component\HttpFoundation\Cookie;
//use Cookie;
//use Response;
use App\Mail\MyTestMail;
use App\Mail\TaskAssignedMail;
use App\Mail\DailyRemainderMail;
use Carbon\Carbon;
use App\Jobs\EmailJob;
use App\Jobs\RemainderDailyJob;
use App\Jobs\VerifyEmailJob;
use App\Models\PusherModel;
use App\Events\PusherEvent;
use Illuminate\Support\Facades\DB;
//use Illuminate\Support\Facades\Mail;
class UserController extends Controller
{
	public function __construct()
	{
		//$this->middleware('user' );
		//$this->middleware('user',['except'=>['create','login',''.'logout'] ]);
	}
	public function create(Request $request)
	{
		//dd('ssss');
		$x=User::where('username','LIKE',$request->username)->first();
		try{
			$x->username;
			//return $request->username;
			return 'user already exists plesae try another';
		}
		catch(\Exception $e){}
			try{
		$user = new User;
		$user->username = $request->username;
		$user->password = $request->password;
		$user->email= $request->email;
		$user->is_admin=false;
		$token=Self::generatetoken();
		//return $token;
		$user->token=$token;
		$uname=$user->username;

		$user->save();
		//$details = [
      //  'token' => $token,
       // 'name' => $user->username
       //   ];
    $emailJob = (new VerifyEmailJob($token,$uname,$user->email));
    dispatch($emailJob);
   		//Mail::to($user->email)->send(new MyTestMail($token,$uname));
    	//return 'email is sent';
  //    $html="<p><a href = 'http://localhost:8000/verify/$token'>$token</a> to verify</p>";
  //   	$templateData = ['details' => $html];
		// Mail::send(['html' => 'mail'], $templateData, function ($message) use ($user) {
  //   $message->from('xyzabc1681@gmail.com', 'name');
  //   $message->to($user->email, 'name');
  //   $message->subject('Subject');
    //}
//);
		return 'user succesfully created';
	}
		catch(\Exception $ee){ return $ee->getMessage(); }
		}
	public function test(Request $request)
	{
		$ans=['testisok', 'aaa'];
		// $user=Tasktable::where('assignee','LIKE',45)->get();
		// //Mail::to('skrishna@iitk.ac.in')->send(new DailyRemainderMail($user));
		// $emailJob = (new RemainderDailyJob('skrishna@iitk.ac.in',$user));
  //          dispatch($emailJob);
		return json_encode($ans);
	}
	public function signup(Request $request)
	{
		return view('signup');
	}
	public function login(Request $request)
	{
		//return request()->password;
		//return view('userhomepage');
		$user=User::where('username','LIKE',$request->username)->first();
		try{
			$user->username;
			$minutes=time()+60;
			//return request()->password;
			if($user->password==request()->password)
			{
				//return "aa";
				//$response=new Response("hello world");
				//$minutes = time() +200;
				//$response->withCookie(cookie('name',$user->username,$minutes));
				//return json_encode("response");
				//return response('loggedin')->withCookie(new cookie('name',$user->id,strtotime('now + 30 minutes'),'/',false,false,false,'lax'));
				//return response("logged in ")->withCookie(new cookie('name','value',1));
				//return response(view('userhomepage'))->withCookie(new cookie('name',$user->username,$minutes));
				//Cookie::queue('name', $user->username, $minutes);
				//return response(); strtotime('now + 3600 minutes')
				$ans=['loggedin',$user->id];
				return response($ans);
			}
			else
			{
				return 'invalid credentials';
			}
		}
		catch(\Exception $e)
		{
			//return $e->getMessage();
			return 'invalid credentials__';
		}
	}
	public function logout(Request $request)
	{
		return 'logout';
		try{
		$value = $request->cookie('name');
		\Cookie::forget('name');
		return 'succesfully logged out';
		 }
	catch(\Exception $e){
		return $e->getMessage();
	}
	}
	public function generatetoken()
	{
		$key=0;
		for($i=0;$i<5;$i++)
		{
			$key=10*$key+random_int(0,9);
		}
		$key=strval($key);
		return $key;
	}
	public function isadmin(Request $request)
	{
			$id = $request->id;
			$user = User::find($id);
			try
			{
				if($user->is_admin==1) {return 1;}
				else {return 0;}
			}
			catch(\Exception $e){
				return 0;
			}
	}
	public function getusernamefromid(Request $request)
	{
		$id = $request->id;
		$user = User::find($id);
		return $user->username;
	}
	public function getadminstatus(Request $request)
	{
		$id=$request->id;
		$user = User::find($id);
		return $user->is_admin;
	}
	public function verify(Request $request)
	{
		$username=$request->username;
		$token=$request->token;
		$user_=User::where('token',$token)->first();
		try{
			if($token==$user_->token)
			{
				$user=User::find($user_->id);
				$user->verified=1;
				$user->save();
				return 'user successfully verified';
			}
			else
			{
				return 'invalid token_';
			}
		}
		catch(\Exception $e)
		{
			//return $e->getMessage();
			return 'invalid token';
		}
	}
	public function setcookie(Request $request)
	{
		$response = new Illuminate\Http\Response('Hello World');
		$minutes=1;

		//Call the withCookie() method with the response method
		$response->withCookie(cookie('name', 'value', $minutes));

		//return the response
		return $response;
	}
		public function getCookie(Request $request) {
      $value = $request->cookie('name');
      //echo $value;
      return json($value);
   }
   public function userlist(Request $request)
   {
   		$user=User::all();
   		//$user=[{username:'saikrishna',email:'skrishna@iitk.ac.in'}];
   		return response()->json($user);
   		//return $user->toJson();
   }
   public function assigntask(Request $request)
   {	
   		//return response()->json($request);

   		$task = new Tasktable;
   		$task->assignee = request()->name;
   		$task->assignor = request()->assignor;
   		$task->title = request()->title;
   		$task->description = request()->description;
   		$task->due_date = request()->duedate;
   		//$task->due_time = request()->time;
   		//return response()->json($request);
   		$task->save();
   		$user=User::find($task->assignee);
   		$email=$user->email;
   		$emailJob = (new EmailJob($email,$task->assignor,$task->assignee,$task->title,$task->description,$task->due_date));
    	dispatch($emailJob);
    	$message = new PusherModel;
    	$message->data="pusher message";
    	$message->user=$task->assignee;
    	$message->channel="my-channel";
    	$message->event="createtask";
    	event(new PusherEvent($message));
   		return "task assigned sucesfully";

   	
   	// catch(Exception $e)
   	// {
   	// 	return response()->json($e);
   	// }

   }
   public function getusertask(Request $request)  // gets all tasks of a user 
   {
   		$list=Tasktable::where('assignee','LIKE',$request->name)->get();
   		return response()->json($list);

   }
   public function tasklistall(Request $request) // LISTS ALL TASKS 
   {
   		$tasks = Tasktable::all();
   		return response()->json($tasks);
   }
   public function deleteuser(Request $request)
   {
   		$id = request()->id;
   		try{
   			$prod= User::find($id);
   			$prod->delete();
   		}
   		catch(Exception $e)
   		{
   				return "user not deleted";
   		}
   		return "user deleted succesfully";
   }
   public function updatetaskstatus(Request $request)
   {
   	 $task = Tasktable::find($request->id);
   	 $task->task_status = $request->status;
   	 $date_ = Carbon::now();
   	 $date= $date_->toRfc850String();
   	 $task->save();
   	 return response()->json("success");
   }
   public function checkcookie(Request $request)
   {
   		//return "yes";
   		$ans_ = $request->cookies;
   		$ans = $ans_->get("name");
   		//$ans=Cookie::has("name");
   		//return $ans;
   		//return response()->json($ans);
   		//$ans = Cookie::get("name");
   		if($ans!=null)
   		{
   			//$key = $ans_->get("name");
   			return response()->json($ans);
   		}
   		else 
   		{
   			return "no";
   		}
   }
   public function changepassword(Request $request)
   {

   			$username = request()->user;
   			$old=request()->old;
   			$new = request()->new;
   			try
   			{
   				//$user= User::where('username',"LIKE",$username)->first();
   				$user=User::find($username);
   				//return $user->password;
   				if($user->password==$old)
   				{
   						$user->password=$new;
   						$user->save();
   						return "yes";
   				}
   				else
   				{
   					return "no";
   				}
   			}
   			catch(\Exception $e)
   			{
   				return $e;
   			}
   }
   public function updatedatabase(Request $request)
   {
   		$tasklist= Tasktable::all();
   		$date_ = Carbon::now();
   	  //$date = $date_->toRfc850String();
   	  $date=$date_->toDateString();
   		$i=0;
   		for($i=0;$i<count($tasklist);$i++)
			{
				$task= $tasklist[$i];
				if($task->task_status==0)
				{
					if($task->due_date<$date)
					{
						//return response()->json($task->due_date);
						$task->pending_status=1;
						$task->save();
					}
				}
			}
			return "success";
   }
   public function tasklistallstats(Request $request)
   {
   		$tasks=Tasktable::all();
   		$date_ = Carbon::now();
   	  //$date = $date_->toRfc850String();
   	  $date=$date_->toDateString();
   		$i=0;
   		$intime_c=0;
   		$late_c=0;
   		$late_p=0;
   		$intime_p=0;
   		$intime_na=0;
   		$late_na=0;
   		for($i=0;$i<count($tasks);$i++)
   		{
   			$task=$tasks[$i];
   			if($task->task_status==1)
   			{
   					if($task->due_date<$date)
   					{
   						$late_p=$late_p+1;
   					}
   					else
   					{
   						$intime_p = $intime_p+1;
   					}
   			}
   			elseif($task->task_status==0)
   			{
   					if($task->due_date<$date)
   					{
   						$late_na=$late_na+1;
   					}
   					else
   					{
   						$intime_na = $intime_na+1;
   					}
   			}
   			else
   			{
   				  if($task->due_date<$task->updated_at->toDateString())
   					{
   						$late_c=$late_c+1;
   					}
   					else
   					{
   						$intime_c = $intime_c+1;
   					}
   			}
   		}
   		return [$intime_c,$late_c,$intime_p,$late_p,$intime_na,$late_na];
   		//$ans=0;
   		//$ans=[$intime_c,$late_c,$late_p,$intime_p];
   		//$ans = {intime_c : $intime_c, late_c : $late_c, late_p : $late_p , intime_p : $intime_p};
   		//return response()->json($ans);
   }
   public function tasklistuserstats(Request $request)
   {
   		$tasks=Tasktable::where('assignee',"like",$request->name)->get();
   		$date_ = Carbon::now();
   	  //$date = $date_->toRfc850String();
   	  $date=$date_->toDateString();
   		$i=0;
   		$intime_c=0;
   		$late_c=0;
   		$late_p=0;
   		$intime_p=0;
   		$intime_na=0;
   		$late_na=0;
   		for($i=0;$i<count($tasks);$i++)
   		{
   			$task=$tasks[$i];
   			if($task->task_status==1)
   			{
   					if($task->due_date<$date)
   					{
   						$late_p=$late_p+1;
   					}
   					else
   					{
   						$intime_p = $intime_p+1;
   					}
   			}
   			elseif($task->task_status==0)
   			{
   					if($task->due_date<$date)
   					{
   						$late_na=$late_na+1;
   					}
   					else
   					{
   						$intime_na = $intime_na+1;
   					}
   			}
   			else
   			{
   				  if($task->due_date<$task->updated_at->toDateString())
   					{
   						$late_c=$late_c+1;
   					}
   					else
   					{
   						$intime_c = $intime_c+1;
   					}
   			}   			
   		}
   		return [$intime_c,$late_c,$intime_p,$late_p,$intime_na,$late_na];
   		//$ans=0;
   		//$ans=[$intime_c,$late_c,$late_p,$intime_p];
   		//$ans = {intime_c : $intime_c, late_c : $late_c, late_p : $late_p , intime_p : $intime_p};
   		//return response()->json($ans);
   }
   public function changeadminstatus(Request $request)
   {
   		$id=$request->id;
   		$user = User::find($id);
   		if($user->is_admin==0) $user->is_admin=1;
   		else $user->is_admin=0;
   		$user->save();
   		return [$id,$user->is_admin];
   }
}