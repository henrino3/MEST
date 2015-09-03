/**
 * Main Javascript file
 * 
 * Use jQuery object to listen on document ready.
 * Using the dollar sign could conflict with other libraries
 * instead we pass the dollar as argument to the document ready function
 */
jQuery(document).ready(function($)
{

	// jQuery Code
	$(function(){
		
		/**
		 * Colorize Navigation and Header Links
		 */
		$('#left #navigation a, #header a, div.toggler').hover(
			function(event)
			{
				$(this).animate({color: '#000000'}, 85);
			},
			function(event)
			{
				$(this).animate({color: '#BFC4C6'}, 85);
			}
		);
		
		
		/**
		 * Accordions
		 * This converts any accordion markup generated by contao into a jquery ui accordion
		 */
		$('#main').accordion({
			header: 'div.toggler',
			active: false,
			autoheight: false
		});
		
		$('.autoopen .toggler').trigger( "click" ); 
		$('.toclick').trigger( "click" ); 
		
		/**
		 * Open Mail Dialog on Contact Click
		 */
		$('.nav-contact a').click(function(e)
		{
			e.preventDefault();
			window.location.href = 'mailto:support@itim.org';
		});
		
		
		/**
		 * Make Country form submittable
		 */
		$('#countrySelection select').change(function(){this.form.submit();});
	});
	
});
