<?php
/**
 * Innovative slider plugin for WordPress based sites.
 *
 * @package   Infinite_Slider
 * @author    Kinsta WordPress Hosting <info@kinsta.com>
 * @license   GPL-3.0+
 * @link      http://www.kinsta.com/infinite-slider/
 * @copyright 2014 Kinsta WordPress Hosting
 *
 * @wordpress-plugin
 * Plugin Name:       Infinite Slider
 * Plugin URI:        http://www.kinsta.com/infinite-slider/
 * Description:       Innovative slider plugin for WordPress based sites.
 * Version:           2.0.0
 * Author:            Kinsta WordPress Hosting
 * Author URI:        http://www.kinsta.com
 * Text Domain:       infinite-slider-locale
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl.txt
 * Domain Path:       /languages
 * GitHub Plugin URI: https://github.com/kinstahosting/infinite-slider
 */

/*
Copyright (C) 2014 Kinsta Hosting <info@kinsta.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/*----------------------------------------------------------------------------*
 * Public-Facing Functionality
 *----------------------------------------------------------------------------*/

if ( ! class_exists( 'cmb_Meta_Box' ) ) require_once plugin_dir_path( __FILE__ ) . 'public/includes/cmb/init.php';
require_once plugin_dir_path( __FILE__ ) . 'public/class-infinite-slider.php';

/*
 * Register hooks that are fired when the plugin is activated or deactivated.
 * When the plugin is deleted, the uninstall.php file is loaded.
 */

register_activation_hook( __FILE__, array( 'Infinite_Slider', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'Infinite_Slider', 'deactivate' ) );

add_action( 'plugins_loaded', array( 'Infinite_Slider', 'get_instance' ) );

/*----------------------------------------------------------------------------*
 * Dashboard and Administrative Functionality
 *----------------------------------------------------------------------------*/

if ( is_admin() && ( ! defined( 'DOING_AJAX' ) || ! DOING_AJAX ) ) {

	if ( ! class_exists( 'TGM_Plugin_Activation' ) ) require_once plugin_dir_path( __FILE__ ) . 'admin/includes/class-tgm-plugin-activation.php';
	require_once plugin_dir_path( __FILE__ ) . 'admin/class-infinite-slider-admin.php';
	add_action( 'plugins_loaded', array( 'Infinite_Slider_Admin', 'get_instance' ) );

	add_action( 'tgmpa_register', 'infinite_slider_register_required_plugins' );

	/**
	 * Register the required plugins for Infinite Slider.
	 *
	 * The variable passed to tgmpa_register_plugins() should be an array of plugin
	 * arrays.
	 *
	 * This function is hooked into tgmpa_init, which is fired within the
	 * TGM_Plugin_Activation class constructor.
	 */
	function infinite_slider_register_required_plugins() {

		/**
		 * Array of plugin arrays.
		 */
		$plugins = array(

			array(
				'name'               => 'GitHub Updater',
				'slug'               => 'github-updater-2.6.1',
				'source'             => 'https://github.com/afragen/github-updater/archive/2.6.1.zip',
				'required'           => false,
				'external_url'       => 'https://github.com/afragen/github-updater', // If set, overrides default API URL and points to an external URL.
			),
			array(
				'name'      => 'Regenerate Thumbnails',
				'slug'      => 'regenerate-thumbnails',
				'required'  => false,
			),

		);

		/**
		 * Array of configuration settings.
		 */
		$config = array(
			'default_path' => '',
			'menu'         => 'tgmpa-install-plugins',
			'has_notices'  => true,
			'dismissable'  => true,
			'dismiss_msg'  => '',
			'is_automatic' => true,
			'message'      => 'Please run Regenerate Thumbnails at least once after activating Infinite Slider!',
			'strings'      => array(
				'page_title'                      => __( 'Install Required Plugins', 'infinite-slider' ),
				'menu_title'                      => __( 'Install Plugins', 'infinite-slider' ),
				'installing'                      => __( 'Installing Plugin: %s', 'infinite-slider' ), // %s = plugin name.
				'oops'                            => __( 'Something went wrong with the plugin API.', 'infinite-slider' ),
				'notice_can_install_required'     => _n_noop( 'This plugin requires the following plugin: %1$s.', 'This plugin requires the following plugins: %1$s.', 'infinite-slider' ), // %1$s = plugin name(s).
				'notice_can_install_recommended'  => _n_noop( 'Infinite Slider strongly recommends the following plugin: %1$s.', 'Infinite Slider strongly recommends the following plugins: %1$s.', 'infinite-slider' ), // %1$s = plugin name(s).
				'notice_cannot_install'           => _n_noop( 'Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'infinite-slider' ), // %1$s = plugin name(s).
				'notice_can_activate_required'    => _n_noop( 'The following required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.', 'infinite-slider' ), // %1$s = plugin name(s).
				'notice_can_activate_recommended' => _n_noop( 'The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'infinite-slider' ), // %1$s = plugin name(s).
				'notice_cannot_activate'          => _n_noop( 'Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'infinite-slider' ), // %1$s = plugin name(s).
				'notice_ask_to_update'            => _n_noop( 'The following plugin needs to be updated to its latest version to ensure maximum compatibility with this plugin: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this plugin: %1$s.', 'infinite-slider' ), // %1$s = plugin name(s).
				'notice_cannot_update'            => _n_noop( 'Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'infinite-slider' ), // %1$s = plugin name(s).
				'install_link'                    => _n_noop( 'Begin installing plugin', 'Begin installing plugins', 'infinite-slider' ),
				'activate_link'                   => _n_noop( 'Begin activating plugin', 'Begin activating plugins', 'infinite-slider' ),
				'return'                          => __( 'Return to Required Plugins Installer', 'infinite-slider' ),
				'plugin_activated'                => __( 'Plugin activated successfully.', 'infinite-slider' ),
				'complete'                        => __( 'All plugins installed and activated successfully. %s', 'infinite-slider' ), // %s = dashboard link.
				'nag_type'                        => 'updated' // Determines admin notice type - can only be 'updated', 'update-nag' or 'error'.
			)
		);

		tgmpa( $plugins, $config );

	}

}
