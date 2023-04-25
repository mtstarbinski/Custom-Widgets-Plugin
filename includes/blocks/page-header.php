<?php

function wp_page_header_render_cb($attributes) {
    $heading = esc_html($attributes['content']);
    if($attributes['showCategory']) {
        $heading = get_the_archive_title();
    }

    ob_start();
    ?>
    <div class="wp-block-wordpress-plus-page-header">
            <div class="inner-page-header">
              <h1><?php echo $heading; ?></h1>
            </div>
        </div> 
    <?php
    $output = ob_get_contents();
    ob_end_clean();

    return $output;
}