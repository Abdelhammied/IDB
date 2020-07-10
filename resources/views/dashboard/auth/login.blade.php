@extends('dashboard.layouts.master')

@section('page_title', 'Dashboard Login')

@section('content')
<div class="login-logo">
    <a href="{{ route('dashboard.login') }}"><b>Admin</b>LTE</a>
</div>

<div class="login-box-body">

    <p class="login-box-msg">Sign in to start your session</p>

    <div id="login-form"></div>

    <a href="#">I forgot my password</a><br>

    <a href="register.html" class="text-center">Register a new membership</a>

</div>

@endsection