<?php
/**
 * Champagne Lejeune : réglages du thème et chargement des fichiers.
 */

defined( 'ABSPATH' ) || exit;

const LEJEUNE_VERSION = '1.0.0';

/**
 * Affiche l'URL d'une image du dossier assets/ du thème.
 */
function lejeune_asset( string $file ): void {
	echo esc_url( get_theme_file_uri( 'assets/' . $file ) );
}

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array( 'style', 'script' ) );
} );

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style(
		'lejeune-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'lejeune', get_theme_file_uri( 'css/styles.css' ), array( 'lejeune-fonts' ), LEJEUNE_VERSION );

	wp_enqueue_script( 'lejeune', get_theme_file_uri( 'js/app.js' ), array(), LEJEUNE_VERSION, array( 'in_footer' => true, 'strategy' => 'defer' ) );
	// app.js construit les chemins des photos des cuvées à partir de ce dossier.
	wp_add_inline_script( 'lejeune', 'window.LEJEUNE_ASSETS = ' . wp_json_encode( get_theme_file_uri( 'assets/' ) ) . ';', 'before' );
} );

add_filter( 'wp_resource_hints', function ( array $urls, string $relation ): array {
	if ( 'preconnect' === $relation ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = array( 'href' => 'https://fonts.gstatic.com', 'crossorigin' );
	}
	return $urls;
}, 10, 2 );

// Le site occupe tout l'écran avec un en-tête fixe : la barre d'admin le recouvrirait.
add_filter( 'show_admin_bar', '__return_false' );
