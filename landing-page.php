<?php
/**
 * Template Name: Ice Cream
 *
 */

get_header();
?>

<div class="main">
	<?php get_template_part('templates/hero'); ?>
	<?php get_template_part('templates/choices'); ?>
	<?php get_template_part('templates/form-row'); ?>
	<?php get_template_part('templates/cones'); ?>
</div>

<?php

get_footer();
