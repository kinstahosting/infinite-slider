<?php
/**
 * Infinite Slider by Kinsta
 *
 * @package   Infinite_Slider
 * @author    Kinsta WordPress Hosting <info@kinsta.com>
 * @license   GPL-3.0+
 * @link      http://www.kinsta.com/infinite-slider/
 * @copyright 2014 Kinsta WordPress Hosting
 */

/**
 * Plugin class.
 *
 * @package Infinite_Slider
 * @author  Kinsta WordPress Hosting <info@kinsta.com>
 */
class Infinite_Slider {

	/**
	 * Plugin version, used for cache-busting of style and script file references.
	 *
	 * @since   2.0.0
	 *
	 * @var     string
	 */
	const VERSION = '2.0.0';

	/**
	 * The variable name is used as the text domain when internationalizing strings
	 * of text. Its value should match the Text Domain file header in the main
	 * plugin file.
	 *
	 * @since   2.0.0
	 *
	 * @var      string
	 */
	protected $plugin_slug = 'infinite-slider';

	/**
	 * Instance of this class.
	 *
	 * @since   2.0.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the plugin by setting localization and loading public scripts
	 * and styles.
	 *
	 * @since     2.0.0
	 */
	private function __construct() {

		// Load plugin text domain
		add_action( 'init', array( $this, 'load_plugin_textdomain' ) );

		// Activate plugin when new blog is added
		add_action( 'wpmu_new_blog', array( $this, 'activate_new_site' ) );

		// Load public-facing style sheet and JavaScript.
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

		/* Define custom functionality.
		 * Refer To http://codex.wordpress.org/Plugin_API#Hooks.2C_Actions_and_Filters
		 */
		//add_action( '@TODO', array( $this, 'action_method_name' ) );
		//add_filter( '@TODO', array( $this, 'filter_method_name' ) );

		add_shortcode( 'infinite_slider', array( $this, 'infinite_slider' ) );
		add_action( 'init', array( $this, 'infinite_slider_image_sizes' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'infinite_scripts' ) );
		add_action( 'wp_head', array( $this, 'insert_header_styles' ) );


	}

	/**
	 * Return the plugin slug.
	 *
	 * @since   2.0.0
	 *
	 * @return    Plugin slug variable.
	 */
	public function get_plugin_slug() {
		return $this->plugin_slug;
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since     2.0.0
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	/**
	 * Fired when the plugin is activated.
	 *
	 * @since   2.0.0
	 *
	 * @param boolean $network_wide True if WPMU superadmin uses
	 *                                       "Network Activate" action, false if
	 *                                       WPMU is disabled or plugin is
	 *                                       activated on an individual blog.
	 */
	public static function activate( $network_wide ) {

		if ( function_exists( 'is_multisite' ) && is_multisite() ) {

			if ( $network_wide  ) {

				// Get all blog ids
				$blog_ids = self::get_blog_ids();

				foreach ( $blog_ids as $blog_id ) {

					switch_to_blog( $blog_id );
					self::single_activate();
				}

				restore_current_blog();

			} else {
				self::single_activate();
			}

		} else {
			self::single_activate();
		}

	}

	/**
	 * Fired when the plugin is deactivated.
	 *
	 * @since   2.0.0
	 *
	 * @param boolean $network_wide True if WPMU superadmin uses
	 *                                       "Network Deactivate" action, false if
	 *                                       WPMU is disabled or plugin is
	 *                                       deactivated on an individual blog.
	 */
	public static function deactivate( $network_wide ) {

		if ( function_exists( 'is_multisite' ) && is_multisite() ) {

			if ( $network_wide ) {

				// Get all blog ids
				$blog_ids = self::get_blog_ids();

				foreach ( $blog_ids as $blog_id ) {

					switch_to_blog( $blog_id );
					self::single_deactivate();

				}

				restore_current_blog();

			} else {
				self::single_deactivate();
			}

		} else {
			self::single_deactivate();
		}

	}

	/**
	 * Fired when a new site is activated with a WPMU environment.
	 *
	 * @since   2.0.0
	 *
	 * @param int     $blog_id ID of the new blog.
	 */
	public function activate_new_site( $blog_id ) {

		if ( 1 !== did_action( 'wpmu_new_blog' ) ) {
			return;
		}

		switch_to_blog( $blog_id );
		self::single_activate();
		restore_current_blog();

	}

	/**
	 * Get all blog ids of blogs in the current network that are:
	 * - not archived
	 * - not spam
	 * - not deleted
	 *
	 * @since   2.0.0
	 *
	 * @return   array|false    The blog ids, false if no matches.
	 */
	private static function get_blog_ids() {

		global $wpdb;

		// get an array of blog ids
		$sql = "SELECT blog_id FROM $wpdb->blogs
			WHERE archived = '0' AND spam = '0'
			AND deleted = '0'";

		return $wpdb->get_col( $sql );

	}

	/**
	 * Fired for each blog when the plugin is activated.
	 *
	 * @since   2.0.0
	 */
	private static function single_activate() {
		// @TODO: Define activation functionality here
	}

	/**
	 * Fired for each blog when the plugin is deactivated.
	 *
	 * @since   2.0.0
	 */
	private static function single_deactivate() {
		// @TODO: Define deactivation functionality here
	}

	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since   2.0.0
	 */
	public function load_plugin_textdomain() {

		$domain = $this->plugin_slug;
		$locale = apply_filters( 'plugin_locale', get_locale(), $domain );

		load_textdomain( $domain, trailingslashit( WP_LANG_DIR ) . $domain . '/' . $domain . '-' . $locale . '.mo' );
		load_plugin_textdomain( $domain, FALSE, basename( plugin_dir_path( dirname( __FILE__ ) ) ) . '/languages/' );

	}

	/**
	 * Register and enqueue public-facing style sheet.
	 *
	 * @since   2.0.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_slug . '-plugin-styles', plugins_url( 'assets/css/infinite.css', __FILE__ ), array(), self::VERSION );
	}

	/**
	 * Register and enqueues public-facing JavaScript files.
	 *
	 * @since   2.0.0
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'infinite_js', plugins_url( 'assets/js/infinite.js', __FILE__ ), array( 'jquery' ), self::VERSION );
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-ui-draggable' );
		wp_enqueue_script( 'jquery-ui-widget' );
		wp_enqueue_script( 'jquery-ui-mouse' );
		wp_enqueue_script( 'jquery-color' );
		wp_enqueue_script( 'jquery-touch-punch' );
	}

	/**
	 * NOTE:  Actions are points in the execution of a page or process
	 *        lifecycle that WordPress fires.
	 *
	 *        Actions:    http://codex.wordpress.org/Plugin_API#Actions
	 *        Reference:  http://codex.wordpress.org/Plugin_API/Action_Reference
	 *
	 * @since   2.0.0
	 */
	public function action_method_name() {
		// @TODO: Define your action hook callback here
	}

	/**
	 * NOTE:  Filters are points of execution in which WordPress modifies data
	 *        before saving it or sending it to the browser.
	 *
	 *        Filters: http://codex.wordpress.org/Plugin_API#Filters
	 *        Reference:  http://codex.wordpress.org/Plugin_API/Filter_Reference
	 *
	 * @since   2.0.0
	 */
	public function filter_method_name() {
		// @TODO: Define your filter hook callback here
	}

	public function infinite_slider( $atts ) {
		extract( shortcode_atts( array(
					'post_type' => 'post',
				), $atts, 'infinite_slider' )
		);

		echo '<div id="slideouterwrapper">
				<div id="slidewrapper">
					<div id="innerwrapper" class="dragh"></div>
					<div id="leftarrow"></div>
					<div id="rightarrow"></div>
				</div>
			</div>';

	}

	public function infinite_slider_image_sizes() {
		add_image_size( '360', 360, 360, true );
		add_image_size( '240', 240, 240, true );
		add_image_size( '120', 120, 120, true );
		add_image_size( '240-120', 240, 120, true );
		add_image_size( '120-240', 120, 240, true );
	}

	public function get_short_title( $after = '', $length ) {
		$mytitle = explode( ' ', get_the_title(), $length );
		if ( count( $mytitle ) >= $length ) {
			array_pop( $mytitle );
			$mytitle = implode( " ", $mytitle ) . $after;
		} else {
			$mytitle = implode( " ", $mytitle );
		}
		return $mytitle;
	}

	public function trim_excerpt( $limit ) {
		$excerpt = explode( ' ', get_the_excerpt(), $limit );
		if ( count( $excerpt ) >= $limit ) {
			array_pop( $excerpt );
			$excerpt = implode( " ", $excerpt ) . '...';
		} else {
			$excerpt = implode( " ", $excerpt );
		}
		$excerpt = preg_replace( '`\[[^\]]*\]`', '', $excerpt );
		return $excerpt;
	}

	public function infinite_scripts() {

		$infinite_custom = array(
			'plugin_dir_url' => plugin_dir_url( __FILE__ )
		);
		wp_localize_script( 'infinite_js', 'infinite_custom', $infinite_custom );
		$post_type = cmb_get_option( 'infinite_slider_options', '_infinite_post_type' );
		if ( !$post_type || $post_type == false ) {
			$post_type = "post";
		}
		$category_name = cmb_get_option( 'infinite_slider_options', '_infinite_category_name' );
		if ( !$category_name || $category_name == false ) {
			$category_name = "";
		}
		$wpquery_tag = cmb_get_option( 'infinite_slider_options', '_infinite_wpquery_tag' );
		if ( !$wpquery_tag || $wpquery_tag == false ) {
			$wpquery_tag = "";
		}
		$shorttitlelength = cmb_get_option( 'infinite_slider_options', '_infinite_shorttitlelength' );
		if ( !$shorttitlelength || $shorttitlelength == false ) {
			$shorttitlelength = 5;
		}
		$shortbodylength = cmb_get_option( 'infinite_slider_options', '_infinite_shortbodylength' );
		if ( !$shortbodylength || $shortbodylength == false ) {
			$shortbodylength = 20;
		}

		$infiniteslider_posts = new WP_Query( array(
				'post_type' => $post_type,
				'category_name' => $category_name,
				'tag' => $wpquery_tag,
				'posts_per_page' => -1,
				'meta_key' => '_thumbnail_id',
			)
		);
		while ( $infiniteslider_posts->have_posts() ):
			$infiniteslider_posts->the_post();
		$currentimgurl = wp_get_attachment_url( get_post_thumbnail_id( $infiniteslider_posts->post->ID, 'thumbnail' ) );
		$infinite_slides[] = array(
			'imgurl' => $currentimgurl,
			'postid' => $infiniteslider_posts->post->ID,
			'title' => $this->get_short_title( ' ...', $shorttitlelength + 1 ),
			'excerpt' => $this->trim_excerpt( $shortbodylength + 1 ),
			'permalink' => get_permalink()
		);
		$imgurls[] = $currentimgurl;
		endwhile;

		wp_localize_script( 'infinite_js', 'infinite_vars', array(
				'autoslideison' => cmb_get_option( 'infinite_slider_options', '_infinite_autoslideison' ),
				'fixwidthslideon' => cmb_get_option( 'infinite_slider_options', '_infinite_fixwidthslideon' ),
				'autoslidetime' => cmb_get_option( 'infinite_slider_options', '_infinite_autoslidetime' ),
				'fixwidth' => cmb_get_option( 'infinite_slider_options', '_infinite_fixwidth' ),
				'slideanimtime' => cmb_get_option( 'infinite_slider_options', '_infinite_slideanimtime' ),
				'hoverpanelon' => cmb_get_option( 'infinite_slider_options', '_infinite_hoverpanelon' ),
				'gridstyle' => cmb_get_option( 'infinite_slider_options', '_infinite_grid_style' ),
				'coverstyle' => cmb_get_option( 'infinite_slider_options', '_infinite_cover_style' ),
				'infinite_slides' => $infinite_slides,
				'imgurls' => $imgurls,
			)
		);

	}

	/* INSERT INFINITE_SLIDER STYLES INTO HEADER */

	public function insert_header_styles() {

		$font_family_code = cmb_get_option( 'infinite_slider_options', '_infinite_font_family_code' );

		$focustitleffamily = cmb_get_option( 'infinite_slider_options', '_infinite_focustitlefamily' );
		$focustitlefsize = cmb_get_option( 'infinite_slider_options', '_infinite_focustitlesize' );
		$focustitlefcolor = cmb_get_option( 'infinite_slider_options', '_infinite_focustitlecolor' );

		$focusbodyffamily = cmb_get_option( 'infinite_slider_options', '_infinite_focusbodyfamily' );
		$focusbodyfsize = cmb_get_option( 'infinite_slider_options', '_infinite_focusbodysize' );
		$focusbodyfcolor = cmb_get_option( 'infinite_slider_options', '_infinite_focusbodycolor' );

		$smalltitleffamily = cmb_get_option( 'infinite_slider_options', '_infinite_smalltitlefamily' );
		$smalltitlefsize = cmb_get_option( 'infinite_slider_options', '_infinite_smalltitlesize' );
		$smalltitlefcolor = cmb_get_option( 'infinite_slider_options', '_infinite_smalltitlecolor' );

		$smallbodyffamily = cmb_get_option( 'infinite_slider_options', '_infinite_smallbodyfamily' );
		$smallbodyfsize = cmb_get_option( 'infinite_slider_options', '_infinite_smallbodysize' );
		$smallbodyfcolor = cmb_get_option( 'infinite_slider_options', '_infinite_smallbodycolor' );

		echo $font_family_code . '
	    <style type="text/css">
	    .focusblockhtitle {';
		if ( $focustitleffamily ) {
			echo 'font-family: ' . $focustitleffamily . ';';
		}
		if ( $focustitlefsize ) {
			echo 'font-size: ' . $focustitlefsize . 'em;';
		}
		if ( $focustitlefcolor ) {
			echo 'color: ' . $focustitlefcolor . ';';
		}
		echo '}
	    .focusblockhbody {';
		if ( $focusbodyffamily ) {
			echo 'font-family: ' . $focusbodyffamily . ';';
		}
		if ( $focusbodyfsize ) {
			echo 'font-size: ' . $focusbodyfsize . 'em;';
		}
		if ( $focusbodyfcolor ) {
			echo 'color: ' . $focusbodyfcolor . ';';
		}
		echo '}
	    .smallblocklefthtitle {';
		if ( $smalltitleffamily ) {
			echo 'font-family: ' . $smalltitleffamily . ';';
		}
		if ( $smalltitlefsize ) {
			echo 'font-size: ' . $smalltitlefsize . 'em;';
		}
		if ( $smalltitlefcolor ) {
			echo 'color: ' . $smalltitlefcolor . ';';
		}
		echo '}
	    .standbricklefthtitle {';
		if ( $smalltitleffamily ) {
			echo 'font-family: ' . $smalltitleffamily . ';';
		}
		if ( $smalltitlefsize ) {
			echo 'font-size: ' . $smalltitlefsize . 'em;';
		}
		if ( $smalltitlefcolor ) {
			echo 'color: ' . $smalltitlefcolor . ';';
		}
		echo '}
	    .midblocklefthtitle {';
		if ( $smalltitleffamily ) {
			echo 'font-family: ' . $smalltitleffamily . ';';
		}
		if ( $smalltitlefsize ) {
			echo 'font-size: ' . $smalltitlefsize . 'em;';
		}
		if ( $smalltitlefcolor ) {
			echo 'color: ' . $smalltitlefcolor . ';';
		}
		echo '}
	    .bricklefthtitle {';
		if ( $smalltitleffamily ) {
			echo 'font-family: ' . $smalltitleffamily . ';';
		}
		if ( $smalltitlefsize ) {
			echo 'font-size: ' . $smalltitlefsize . 'em;';
		}
		if ( $smalltitlefcolor ) {
			echo 'color: ' . $smalltitlefcolor . ';';
		}
		echo '}
	    .smallblocklefthbody {';
		if ( $smallbodyffamily ) {
			echo 'font-family: ' . $smallbodyffamily . ';';
		}
		if ( $smallbodyfsize ) {
			echo 'font-size: ' . $smallbodyfsize . 'em;';
		}
		if ( $smallbodyfcolor ) {
			echo 'color: ' . $smallbodyfcolor . ';';
		}
		echo '}
	    .standbricklefthbody {';
		if ( $smallbodyffamily ) {
			echo 'font-family: ' . $smallbodyffamily . ';';
		}
		if ( $smallbodyfsize ) {
			echo 'font-size: ' . $smallbodyfsize . 'em;';
		}
		if ( $smallbodyfcolor ) {
			echo 'color: ' . $smallbodyfcolor . ';';
		}
		echo '}
	    .midblocklefthbody {';
		if ( $smallbodyffamily ) {
			echo 'font-family: ' . $smallbodyffamily . ';';
		}
		if ( $smallbodyfsize ) {
			echo 'font-size: ' . $smallbodyfsize . 'em;';
		}
		if ( $smallbodyfcolor ) {
			echo 'color: ' . $smallbodyfcolor . ';';
		}
		echo '}
	    .bricklefthbody {';
		if ( $smallbodyffamily ) {
			echo 'font-family: ' . $smallbodyffamily . ';';
		}
		if ( $smallbodyfsize ) {
			echo 'font-size: ' . $smallbodyfsize . 'em;';
		}
		if ( $smallbodyfcolor ) {
			echo 'color: ' . $smallbodyfcolor . ';';
		}
		echo '}
	    </style>';

	}

}
