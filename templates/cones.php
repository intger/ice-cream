<section class="section cones">
    <div class="container">
        <div class="row ice-cream-row">
            <?php if ( have_rows('ice_cream_cones') ): while ( have_rows('ice_cream_cones') ): the_row(); ?>
                <div class="col-md-2 cone">
                    <div class="img-container">
                        <?php echo wp_get_attachment_image(get_sub_field('cone'), 'full'); ?>
                    </div>
                </div>
            <?php endwhile; endif; ?>
        </div>
    </div>
</section>