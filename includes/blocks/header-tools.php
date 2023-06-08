<?php

function wp_header_tools_render_cb($attributes) {
    $user = wp_get_current_user();
    $name = $user->exists() ? $user->user_login : 'Sign in';
    $openClass = $user->exists() ? '' : 'open-modal';
    
    ob_start();
    ?>
    <div class="wp-block-wordpress-plus-header-tools">
        <?php
            if($attributes['showAuth']) {
            ?>
            <a class="signin-link <?php echo $openClass; ?>" href="#">
                <div class="signin-icon">
                    <i class="bi bi-person-circle"></i>
                </div>
                <div class="signin-text">
                    <small>Hello, <?php echo $name; ?></small>
                    My Account
                </div>
            </a>
          <?php
            }
        ?>
    </div>
    <?php
    $output = ob_get_contents();
    ob_end_clean();
    return $output;
}