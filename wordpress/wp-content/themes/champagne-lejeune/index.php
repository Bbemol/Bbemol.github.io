<?php
/**
 * Page unique du site : les quatre rubriques sont dans la même page
 * et app.js passe de l'une à l'autre.
 */

defined( 'ABSPATH' ) || exit;

get_header();

get_template_part( 'template-parts/page-cuvees' );
get_template_part( 'template-parts/page-histoire' );
get_template_part( 'template-parts/page-actualites' );
get_template_part( 'template-parts/page-contact' );
get_template_part( 'template-parts/topbar' );
get_template_part( 'template-parts/navigation' );
get_template_part( 'template-parts/cuvee-detail' );

get_footer();
