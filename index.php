<?php
/**
 * Plugin Name:       Wordpress Plus
 * Plugin URI:        https://starbinski.com
 * Description:       Extends the block functionality of WordPress by adding custom blocks to the theme.
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.2
 * Author:            Mark Starbinski
 * Author URI:        https://starbinski.com
 * Text Domain:       wordpress-plus
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path:       /languages
 */

// Make sure we don't expose any info if called directly
if ( !function_exists( 'add_action' ) ) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

// Setup
define('PLUGIN_DIR', dirname( __FILE__ ));

// Includes
$rootFiles = glob(PLUGIN_DIR . '/includes/*.php');
$subdirectoryFiles = glob(PLUGIN_DIR . '/includes/**/*.php');
$allFiles = array_merge($rootFiles, $subdirectoryFiles);

foreach($allFiles as $filename){
	include_once($filename);
}

// Hooks
add_action( 'init', "wp_register_blocks" );
add_action( 'rest_api_init', 'up_rest_api_init' );
add_action( 'wp_enqueue_scripts', 'up_enqueue_scripts' );