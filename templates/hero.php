<section class="section hero-area">
    <div class="container">
        <div class="row"> 
            <div class="col-md-6 signup-col">
                <h1><?php the_field('sign-up-title'); ?></h1>
                <div class="sign-up-form">
                    <input type="email" title="sign-up" id="signup-email" placeholder="E-mail"/>
                    <button type="submit"><?php echo __('Get your Ice Cream', 'ice-cream');?></button>
                </div>
            </div>
            <div class="col-md-6 img-col">
                <?php echo wp_get_attachment_image(get_field('banner_row_image'), 'full'); ?>
            </div>
        </div>
    </div>
</section>