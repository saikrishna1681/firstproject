<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->post('/createuser','UserController@create');
$router->get('/test','UserController@test');
$router->get('/signup',function() {
    return view('signup');
});
$router->get('/login',function(){
    return view('login');
});
$router->get('/logout',['middleware'=>'user','uses'=>'UserController@logout']);
$router->get('/userlist','UserController@userlist');
$router->post('/loginuser','UserController@login');
$router->get('/verify/{username}/{token}','UserController@verify');
$router->get('/setcookie','UserController@setcookie');
$router->get('/getcookie','UserController@getcookie');
$router->get('/tasklistall','UserController@tasklistall');
$router->post('getusertask','UserController@getusertask');
$router->post("/assigntask","UserController@assigntask");
$router->post("/deleteuser","UserController@deleteuser");
$router->post("updatetaskstatus","UserController@updatetaskstatus");
$router->get("/checkcookie","UserController@checkcookie");
$router->post("/changepassword","UserController@changepassword");
$router->get("updatedatabase","UserController@updatedatabase");
$router->get("tasklistallstats","UserController@tasklistallstats");
$router->post("tasklistuserstats","UserController@tasklistuserstats");
$router->post("getusernamefromid","UserController@getusernamefromid");
$router->post("getadminstatus","UserController@getadminstatus");
$router->post("changeadminstatus","UserController@changeadminstatus");