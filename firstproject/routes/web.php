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
$router->post('/logout','UserController@logout');
$router->post('/loginuser','UserController@login');
Route::get('sendmail', function () {
   
    
   
    //dd("Email is Sent.");
});
$router->get('/verify/{token}','UserController@verify');