<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ice-cream
 */

	$copyright = get_field('copyright', 'option');
?>

	<footer id="colophon" class="section footer">
		<div class="container">
			<p><?php echo $copyright; ?> <span> <?php echo date('Y'); ?></span></p>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>