import 'jquery';
import '../plugins/bootstrap/js/bootstrap.min';
import '../css/styles.css';
import '../plugins/bootstrap/css/bootstrap.css';
import '../plugins/font-awesome/css/font-awesome.css';

jQuery(document).ready(($) => {
	/*= ====== Skillset *======= */

	$('.level-bar-inner').css('width', '0');

	$(window).on('load', () => {
		$('.level-bar-inner').each(function () {
			const itemWidth = $(this).data('level');

			$(this).animate({
				width: itemWidth,
			}, 800);
		});
	});

	/* Bootstrap Tooltip for Skillset */
	$('.level-label').tooltip();

});
