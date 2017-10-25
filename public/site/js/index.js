import 'jquery';
import '../plugins/bootstrap/css/bootstrap.css';
import '../plugins/bootstrap/js/bootstrap.min';
import '../plugins/font-awesome/css/font-awesome.css';
import '../css/styles.css';


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
