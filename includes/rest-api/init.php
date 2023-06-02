<?php

    function up_rest_api_init() {
        register_rest_route('up/v1', '/signup', [
            'methods' => 'POST',
            'callback' => 'up_rest_api_signup_handler',
            'permission_callback' => '__return_true'
        ]);
    }