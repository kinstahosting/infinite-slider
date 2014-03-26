<?php
/**
 * Fired when the plugin is uninstalled.
 *
 * @package   Infinite_Slider_Admin
 * @author    Kinsta WordPress Hosting <info@kinsta.com>
 * @license   GPL-3.0+
 * @link      http://www.kinsta.com/infinite-slider/
 * @copyright 2014 Kinsta WordPress Hosting
 */

// If uninstall not called from WordPress, then exit
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

delete_option( 'infinite_slider_options' );
