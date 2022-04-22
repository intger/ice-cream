<section class="section ice-cream-choices">
    <div class="container">
        <div class="row">
            <?php if ( have_rows('ice_cream_choices') ): while ( have_rows('ice_cream_choices') ): the_row(); ?>
                <div class="col-md-4 choice">
                    <?php echo wp_get_attachment_image(get_sub_field('choice_image'), 'full'); ?>
                    <?php the_sub_field('choice_content'); ?>
                </div>
            <?php endwhile; endif; ?>
        </div>
    </div>
</section>