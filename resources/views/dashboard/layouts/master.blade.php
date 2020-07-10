<!DOCTYPE html>

<html>

<head>
    @include('dashboard.layouts.partials.head')
</head>

<body class="hold-transition @auth skin-blue sidebar-mini @else login-page @endauth">
    <div class="@auth wrapper @else login-box @endauth">

        @auth

        @include('dashboard.layouts.partials.header')

        @include('dashboard.layouts.partials.aside')
        
        <div class="content-wrapper">
            <section class="content container-fluid">
                @endauth
                
                @yield('content')
                
                @auth

            </section>
        </div>

        @include('dashboard.layouts.partials.footer')

        @endauth

    </div>

    @include('dashboard.layouts.partials.scripts')

</body>

</html>