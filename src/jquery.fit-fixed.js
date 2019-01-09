(function (jQuery) {

    jQuery.fn.fitFixed= function () {

        return this.each(function () {

            var $this = this;

            function windowResized() {

                var wrapperFitsWindow =
                    (jQuery($this).outerHeight() + parseInt(jQuery($this).css('bottom'))) <= jQuery(window).height();

                if (!wrapperFitsWindow) {

                    jQuery($this).css({
                        height: jQuery(window).height() - parseInt(jQuery($this).css('bottom')),
                        'overflow-y': 'scroll'
                    });

                } else {
                    jQuery($this).css({
                        height: 'auto',
                        'overflow-y': 'hidden'
                    });
                }
            }

            windowResized();


            new Clay(this, {resize: false}).on('resize', function (size) {

                var wrapperFitsWindow =
                    (jQuery($this).height() + parseInt(jQuery($this).css('bottom'))) <= jQuery(window).height();

                if (!wrapperFitsWindow) {
                    jQuery($this).css({
                        height: jQuery(window).height() - parseInt(jQuery($this).css('bottom')),
                        'overflow-y': 'scroll'
                    });
                }
            });

            new Clay(jQuery(this).children('div')[0], {resize: false}).on('resize', function (size) {

                var contentFitsWrapper = jQuery($this).children('div').height() <= jQuery($this).height();

                if (contentFitsWrapper) {
                    jQuery($this).css({
                        height: 'auto',
                        'overflow-y': 'hidden'
                    });
                }
            });

            jQuery(window).resize(function () {
                windowResized();
            });
        });
    };

}(jQuery));