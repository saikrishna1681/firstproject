<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
//use Illuminate\Http\Response;
use App\Models\User;
use Symfony\Component\HttpFoundation\Cookie;
//use Cookie;
use Symfony\Component\HttpFoundation\Response;
//use Response;
use App\Mail\MyTestMail;
//use Illuminate\Support\Facades\Mail;
class UserController extends Controller
{
	public function create(Request $request)
	{
		//dd('ssss');
		$x=User::where('username','LIKE',$request->username)->first();
		try{
			$x->username;
			return 'user already exists plesae try another';
		}
		catch(\Exception $e){}
			//try{
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
		$details = [
        'token' => $token,
        'name' => $user->username
          ];
         
   		//Mail::to($user->email)->send(new MyTestMail($details));
    	//return 'email is sent';
     $html="<p><a href = 'http://localhost:8000/verify/$token'>$token</a> to verify</p>";
    	$templateData = ['details' => $html];
		Mail::send(['html' => 'mail'], $templateData, function ($message) use ($user) {
    $message->from('xyzabc1681@gmail.com', 'name');
    $message->to($user->email, 'name');
    $message->subject('Subject');
});
		return 'user succesfully created';
		//catch(\Exception $ee){ return $ee->getMessage();
		 //}
		}
	public function test(Request $request)
	{
		return 'test is ok';
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
			$minutes=1;
			if($user->password==request()->password)
			{
				//return 'valid credentials';
				$response= new \Illuminate\Http\Response('k');
				//return response(view('userhomepage'))->withCookie(new cookie('name',$user->username,$minutes));
				//return $response->view('userhomepage');
				return view('userhomepage');
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
			return $e->getMessage();
		}
	}
}