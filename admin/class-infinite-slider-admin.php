<?php
/**
 * Admin panel for the Infinite Slider settings.
 *
 * @package   Infinite_Slider_Admin
 * @author    Kinsta WordPress Hosting <info@kinsta.com>
 * @license   GPL-3.0+
 * @link      http://www.kinsta.com/infinite-slider/
 * @copyright 2014 Kinsta WordPress Hosting
 */

/**
 * Infinite Slider Admin class.
 *
 * @package   Infinite_Slider_Admin
 * @author    Kinsta WordPress Hosting <info@kinsta.com>
 */
class Infinite_Slider_Admin {

	/**
	 * Instance of this class.
	 *
	 * @since    2.0.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Slug of the plugin screen.
	 *
	 * @since    2.0.0
	 *
	 * @var      string
	 */
	protected $plugin_screen_hook_suffix = null;

	/**
	 * Option key, and option page slug
	 *
	 * @var string
	 */
	protected static $key = 'infinite_slider_options';

	/**
	 * Array of metaboxes/fields
	 *
	 * @var array
	 */
	protected static $theme_options = array();

	/**
	 * Options table prefix
	 *
	 * @var string
	 */
	protected static $prefix = '_infinite_';

	/**
	 * Plugin slug
	 *
	 * @var string
	 */
	protected static $plugin_slug;

	/**
	 * Options Page title
	 *
	 * @var string
	 */
	protected $title = 'Infinite Slider by Kinsta';

	/**
	 * Initialize the plugin by loading admin scripts & styles and adding a
	 * settings page and menu.
	 *
	 * @since     2.0.0
	 */
	private function __construct() {

		/*
		 * Call $plugin_slug from public plugin class.
		 */
		$plugin = Infinite_Slider::get_instance();
		self::$plugin_slug = $plugin->get_plugin_slug();
		$this->title = __( 'Infinite Slider', self::$plugin_slug );

		// Load admin style sheet and JavaScript.
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );

		add_action( 'admin_init', array( $this, 'mninit' ) );
		add_action( 'admin_menu', array( $this, 'add_page' ) );

		// Add an action link pointing to the options page.
		$plugin_basename = plugin_basename( plugin_dir_path( __DIR__ ) . self::$plugin_slug . '.php' );
		add_filter( 'plugin_action_links_' . $plugin_basename, array( $this, 'add_action_links' ) );

		/*
		 * Define custom functionality.
		 *
		 * Read more about actions and filters:
		 * http://codex.wordpress.org/Plugin_API#Hooks.2C_Actions_and_Filters
		 */
		//add_action( '@TODO', array( $this, 'action_method_name' ) );
		//add_filter( '@TODO', array( $this, 'filter_method_name' ) );

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
	 * Register and enqueue admin-specific style sheet.
	 *
	 * @since     2.0.0
	 *
	 * @return    null    Return early if no settings page is registered.
	 */
	public function enqueue_admin_styles() {

		if ( ! isset( $this->plugin_screen_hook_suffix ) ) {
			return;
		}

		$screen = get_current_screen();
		if ( $this->plugin_screen_hook_suffix == $screen->id ) {
			wp_enqueue_style( self::$plugin_slug .'-admin-styles', plugins_url( 'assets/css/admin.css', __FILE__ ), array(), Infinite_Slider::VERSION );
		}

	}

	/**
	 * Register and enqueue admin-specific JavaScript.
	 *
	 * @since     2.0.0
	 *
	 * @return    null    Return early if no settings page is registered.
	 */
	public function enqueue_admin_scripts() {

		if ( ! isset( $this->plugin_screen_hook_suffix ) ) {
			return;
		}

		$screen = get_current_screen();
		if ( $this->plugin_screen_hook_suffix == $screen->id ) {
			wp_enqueue_script( self::$plugin_slug . '-admin-script', plugins_url( 'assets/js/admin.js', __FILE__ ), array( 'jquery' ), Infinite_Slider::VERSION );
		}

	}

	/**
	 * Add settings action link to the plugins page.
	 *
	 * @since    2.0.0
	 */
	public function add_action_links( $links ) {

		return array_merge(
			array(
				'settings' => '<a href="' . admin_url( 'options-general.php?page=' . self::$plugin_slug ) . '">' . __( 'Settings', self::$plugin_slug ) . '</a>'
			),
			$links
		);

	}

	/**
	 * NOTE:     Actions are points in the execution of a page or process
	 *           lifecycle that WordPress fires.
	 *
	 *           Actions:    http://codex.wordpress.org/Plugin_API#Actions
	 *           Reference:  http://codex.wordpress.org/Plugin_API/Action_Reference
	 *
	 * @since    2.0.0
	 */
	public function action_method_name() {
		// @TODO: Define action hook callback here
	}

	/**
	 * NOTE:     Filters are points of execution in which WordPress modifies data
	 *           before saving it or sending it to the browser.
	 *
	 *           Filters: http://codex.wordpress.org/Plugin_API#Filters
	 *           Reference:  http://codex.wordpress.org/Plugin_API/Filter_Reference
	 *
	 * @since    2.0.0
	 */
	public function filter_method_name() {
		// @TODO: Define filter hook callback here
	}

	/**
	 * Register our setting to WP
	 *
	 * @since  2.0.0
	 */
	public function mninit() {
		register_setting( self::$key, self::$key );
	}

	/**
	 * Add menu options page
	 *
	 * @since 2.0.0
	 */
	public function add_page() {
		$this->plugin_screen_hook_suffix = add_menu_page( $this->title, $this->title, 'manage_options', self::$key, array( $this, 'admin_page_display' ), 'dashicons-images-alt2' );
		add_action( 'admin_head-' . $this->plugin_screen_hook_suffix, array( $this, 'admin_head' ) );
	}

	/**
	 * CSS, etc
	 *
	 * @since  2.0.0
	 */
	public function admin_head() {
		// CSS, etc
	}

	/**
	 * Admin page markup. Mostly handled by CMB
	 *
	 * @since  2.0.0
	 */
	public function admin_page_display() {
?>
		<div class="wrap">
			<?php echo '<div class="adminheader"><div class="adminheader_left"><div class="adminheaderbg"><div class="adminheader_left_logo"><div class="adminheader_left_logoimg"><a href="http://www.kinsta.com/?utm_source=infiniteslider&utm_medium=options&utm_content=logo&utm_campaign=freebies"><img src="' . plugins_url( '/assets/img/kinsta_logo.png', __FILE__ ) . '" alt="Kinsta WordPress Hosting"></a></div><div class="adminheader_left_social"><a href="https://twitter.com/kinstahosting"><img src="' . plugins_url( '/assets/img/kinsta_tw.png', __FILE__ ) . '" alt="Kinsta Twitter"></a> <a href="https://www.google.com/+KinstaHosting"><img src="' . plugins_url( '/assets/img/kinsta_gp.png', __FILE__ ) . '" alt="Kinsta Google+"></a> <a href="https://www.facebook.com/kinstahosting"><img src="' . plugins_url( '/assets/img/kinsta_fb.png', __FILE__ ) . '" alt="Kinsta Facebook"></a> <a href="https://github.com/kinstahosting"><img src="' . plugins_url( '/assets/img/kinsta_g.png', __FILE__ ) . '" alt="Kinsta Github"></a></div><div class="adminheader_left_slogan">Performance WordPress Hosting</div></div></div><div class="adminheader_left_content">Kinsta is a managed WordPress hosting provider with exclusive features like load balancing, SSD disks, <em>Dropbox</em> based managed backups, performance and real user monitoring by <em>New Relic</em>, Redis based caching and much more! <br />Increase your conversion rates, improve user experience and lower bounce rates with our lightning fast page load speeds and enjoy the benefits of a truly expert and friendly support team.<br />Give us a try, we offer <strong>free site migration</strong> and have data centers all around the world!<ul><li>Blazing Fast</li><li>Global Locations</li><li>Performance Monitoring</li><li>Expert Support</li><li>Top Notch Security</li><li>Backups & Updates</li></ul><span><a href="http://www.kinsta.com/?utm_source=infiniteslider&utm_medium=options&utm_content=viewmorebutton&utm_campaign=freebies">Read more</a></span></div></div><div class="adminheader_right"><img src="' . plugins_url( '/assets/img/kinsta_banner.png', __FILE__ ) . '" alt="Kinsta WordPress Hosting"></div></div>'; ?>
			<h2><?php echo esc_html( get_admin_page_title() ); ?></h2>
			<?php cmb_metabox_form( $this->option_fields(), self::$key ); ?>
		</div>
		<?php
	}

	/**
	 * Defines the theme option metabox and field configuration
	 *
	 * @since  2.0.0
	 * @return array
	 */
	public static function option_fields() {

		// Only need to initiate the array once per page-load
		if ( ! empty( self::$theme_options ) )
			return self::$theme_options;

		self::$theme_options = array(
			'id'         => 'infinite_slider_options',
			'show_on'    => array( 'key' => 'options-page', 'value' => array( self::$key, ), ),
			'show_names' => true,
			'fields'     => array(
				array(
					'name' => __( 'Infinite Slider Shortcode:', self::$plugin_slug ),
					'desc' => "To use the slider in your theme you can use the following shortcode: [infinite_slider] or the PHP version: " . htmlspecialchars( "<?php echo do_shortcode('[infinite_slider]') ?>" ),
					'type' => 'title',
					'id' => self::$prefix . 'shortcode'
				),
				array(
					'name'    => __( 'Autoslide Switch', self::$plugin_slug ),
					'desc'    => __( 'Here you can switch on/off the auto slider functionality', self::$plugin_slug ),
					'id'      => self::$prefix . 'autoslideison',
					'type'    => 'radio_inline',
					'options' => array(
						'on'  => __( 'On', self::$plugin_slug ),
						'off' => __( 'Off', self::$plugin_slug ),
					),
					'default' => 'on',
				),
				array(
					'name' => __( 'Time Interval Between Slides', self::$plugin_slug ),
					'desc' => __( 'in milliseconds, i.e.:"5000" = 5 seconds', self::$plugin_slug ),
					'id'   => self::$prefix . 'autoslidetime',
					'type' => 'text',
				),
				array(
					'name' => __( 'Slide Animation Options', self::$plugin_slug ),
					'type' => 'title',
					'id' => self::$prefix . 'anim_options'
				),
				array(
					'name' => __( 'Sliding Animation Time', self::$plugin_slug ),
					'desc' => __( 'milliseconds, i.e.:"250" = 0.25 seconds', self::$plugin_slug ),
					'id'   => self::$prefix . 'slideanimtime',
					'type' => 'text',
				),
				array(
					'name' => __( 'Fix Width Slider Options', self::$plugin_slug ),
					'desc' => 'When you switch fix width on, we try to automatically detect the fix width of the parent div you put your infinite slider shortcode in. In case the result is not perfect, you can manually set a width below.',
					'type' => 'title',
					'id' => self::$prefix . 'fix_width_options'
				),
				array(
					'name'    => __( 'Fix Width Switch', self::$plugin_slug ),
					'id'      => self::$prefix . 'fixwidthslideon',
					'type'    => 'radio_inline',
					'options' => array(
						'on'  => __( 'On', self::$plugin_slug ),
						'off' => __( 'Off', self::$plugin_slug ),
					),
					'default' => 'off',
				),
				array(
					'name' => __( 'Fix Width Pixels', self::$plugin_slug ),
					'desc' => __( 'Manually set the fix width of the slider in pixels i.e.:"960" = 960 px', self::$plugin_slug ),
					'id'   => self::$prefix . 'fixwidth',
					'type' => 'text',
					'default' => 'auto',
				),
				array(
					'name' => __( 'WP_Query Options', self::$plugin_slug ),
					'type' => 'title',
					'id' => self::$prefix . 'wp_query_options'
				),
				array(
					'name' => __( 'Post Type', self::$plugin_slug ),
					'desc' => __( 'E.g. "custom-post-type" or "page" ', self::$plugin_slug ),
					'id'   => self::$prefix . 'post_type',
					'type' => 'text',
					'default' => 'post',
				),
				array(
					'name' => __( 'Category Name (slug)', self::$plugin_slug ),
					'desc' => __( 'E.g. "blue-office-chairs"', self::$plugin_slug ),
					'id'   => self::$prefix . 'category_name',
					'type' => 'text',
				),
				array(
					'name' => __( 'Tag Name (slug)', self::$plugin_slug ),
					'desc' => __( 'E.g. "blue-office-desks"', self::$plugin_slug ),
					'id'   => self::$prefix . 'wpquery_tag',
					'type' => 'text',
				),
				array(
					'name' => __( 'Hover Panel Options', self::$plugin_slug ),
					'type' => 'title',
					'id' => self::$prefix . 'hover_panel_options'
				),
				array(
					'name'    => __( 'Hover Panel Switch', self::$plugin_slug ),
					'desc'    => __( 'Here you can switch on/off the hover panel (titles and excerpts on slides)', self::$plugin_slug ),
					'id'      => self::$prefix . 'hoverpanelon',
					'type'    => 'radio_inline',
					'options' => array(
						'on'  => __( 'On', self::$plugin_slug ),
						'off' => __( 'Off', self::$plugin_slug ),
					),
					'default' => 'on',
				),
				array(
					'name' => __( 'Slider Style', self::$plugin_slug ),
					'type' => 'title',
					'id' => self::$prefix . 'slider_style'
				),
				array(
					'name'    => __( 'Grid Style', self::$plugin_slug ),
					'id'      => self::$prefix . 'grid_style',
					'type'    => 'select',
					'options' => array(
						'whitecurved' => __( 'White Curved', self::$plugin_slug ),
						'whitethin' => __( 'White Thin', self::$plugin_slug ),
						'blackcurved' => __( 'Black Curved', self::$plugin_slug ),
						'blackthin' => __( 'Black Thin', self::$plugin_slug ),
						'none' => __( 'Default', self::$plugin_slug ),
					)
				),
				array(
					'name'    => __( 'Cover Style', self::$plugin_slug ),
					'id'      => self::$prefix . 'cover_style',
					'type'    => 'select',
					'options' => array(
						'whitestripes' => __( 'White Stripes', self::$plugin_slug ),
						'whitetransp' => __( 'White Transparent', self::$plugin_slug ),
						'blackstripes' => __( 'Black Stripes', self::$plugin_slug ),
						'blacktransp' => __( 'Black Transparent', self::$plugin_slug ),
						'blackdots' => __( 'Black Dots', self::$plugin_slug ),
						'none' => __( 'None', self::$plugin_slug ),
					)
				),
				array(
					'name' => __( 'Text and Font Options', self::$plugin_slug ),
					'type' => 'title',
					'id' => self::$prefix . 'text_font_options'
				),
				array(
					'name' => __( 'Font Families', self::$plugin_slug ),
					'desc' => __( 'Enter code to be included in the header e.g.' . htmlspecialchars( "<link href='http://fonts.googleapis.com/css?family=Sofadi+One' rel='stylesheet' type='text/css'>" ), self::$plugin_slug ),
					'id'   => self::$prefix . 'font_family_code',
					'type' => 'textarea_code',
				),
				array(
					'name' => __( 'Display the First "x" Words of the Titles', self::$plugin_slug ),
					'desc' => __( '"5" = first 5 words of the titles are displayed', self::$plugin_slug ),
					'id'   => self::$prefix . 'shorttitlelength',
					'type' => 'text',
				),
				array(
					'name' => __( 'Display the First "X" Words of the Descriptions', self::$plugin_slug ),
					'desc' => __( '"20" = first 20 words of the descriptions are displayed', self::$plugin_slug ),
					'id'   => self::$prefix . 'shortbodylength',
					'type' => 'text',
				),
				array(
					'name' => __( 'Featured Image Title Font Options', self::$plugin_slug ),
					'type' => 'title',
					'id' => self::$prefix . 'featured_title_font_options'
				),
				array(
					'name' => __( 'Font Family', self::$plugin_slug ),
					'desc' => __( 'e.g. "Verdana" or "Sofadi One" or "Open Sans" etc.', self::$plugin_slug ),
					'id'   => self::$prefix . 'focustitlefamily',
					'type' => 'text',
				),
				array(
					'name' => __( 'Font Size', self::$plugin_slug ),
					'desc' => __( '1.1" or "2" -- 1 represents 1 em = 16 px', self::$plugin_slug ),
					'id'   => self::$prefix . 'focustitlesize',
					'type' => 'text',
				),
				array(
					'name'    => __( 'Font Color', self::$plugin_slug ),
					'id'      => self::$prefix . 'focustitlecolor',
					'type'    => 'colorpicker',
					'default' => '#ffffff'
				),
				array(
					'name' => __( 'Featured Image Description Font Options', self::$plugin_slug ),
					'type' => 'title',
					'id' => self::$prefix . 'featured_description_font_options'
				),
				array(
					'name' => __( 'Font Family', self::$plugin_slug ),
					'desc' => __( 'e.g. "Verdana" or "Sofadi One" or "Open Sans" etc.', self::$plugin_slug ),
					'id'   => self::$prefix . 'focusbodyfamily',
					'type' => 'text',
				),
				array(
					'name' => __( 'Font Size', self::$plugin_slug ),
					'desc' => __( '1.1" or "2" -- 1 represents 1 em = 16 px', self::$plugin_slug ),
					'id'   => self::$prefix . 'focusbodysize',
					'type' => 'text',
				),
				array(
					'name'    => __( 'Font Color', self::$plugin_slug ),
					'id'      => self::$prefix . 'focusbodycolor',
					'type'    => 'colorpicker',
					'default' => '#ffffff'
				),
				array(
					'name' => __( 'Small Images Title Font Options', self::$plugin_slug ),
					'type' => 'title',
					'id' => self::$prefix . 'small_title_font_options'
				),
				array(
					'name' => __( 'Font Family', self::$plugin_slug ),
					'desc' => __( 'e.g. "Verdana" or "Sofadi One" or "Open Sans" etc.', self::$plugin_slug ),
					'id'   => self::$prefix . 'smalltitlefamily',
					'type' => 'text',
				),
				array(
					'name' => __( 'Font Size', self::$plugin_slug ),
					'desc' => __( '1.1" or "2" -- 1 represents 1 em = 16 px', self::$plugin_slug ),
					'id'   => self::$prefix . 'smalltitlesize',
					'type' => 'text',
				),
				array(
					'name'    => __( 'Font Color', self::$plugin_slug ),
					'id'      => self::$prefix . 'smalltitlecolor',
					'type'    => 'colorpicker',
					'default' => '#ffffff'
				),
				array(
					'name' => __( 'Small Images Description Font Options', self::$plugin_slug ),
					'type' => 'title',
					'id' => self::$prefix . 'small_description_font_options'
				),
				array(
					'name' => __( 'Font Family', self::$plugin_slug ),
					'desc' => __( 'e.g. "Verdana" or "Sofadi One" or "Open Sans" etc.', self::$plugin_slug ),
					'id'   => self::$prefix . 'smallbodyfamily',
					'type' => 'text',
				),
				array(
					'name' => __( 'Font Size', self::$plugin_slug ),
					'desc' => __( '1.1" or "2" -- 1 represents 1 em = 16 px', self::$plugin_slug ),
					'id'   => self::$prefix . 'smallbodysize',
					'type' => 'text',
				),
				array(
					'name'    => __( 'Font Color', self::$plugin_slug ),
					'id'      => self::$prefix . 'smallbodycolor',
					'type'    => 'colorpicker',
					'default' => '#ffffff'
				),
			)
		);
		return self::$theme_options;
	}

	/**
	 * Make public the protected $key variable.
	 *
	 * @since  2.0.0
	 * @return string  Option key
	 */
	public static function key() {
		return self::$key;
	}

}
