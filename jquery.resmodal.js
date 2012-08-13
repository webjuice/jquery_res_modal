/*  
 * jquery_res_modal
 * jQuery Responisve Modal Window
 * Version: v1.0b
 * Git: https://github.com/webjuice/jquery.resmodal
 * Auhtor: Buddhi DeSilva, http://webjuice.co
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

function ResponsiveModalDialog(argsArray) {
  /* Arguments has to be passed as an array
   * ResponsiveModalDialog({moadal_window : '#dialog', destroy_modal : true}) */

  jQuery(function(){  
    //Get the arguments and set defaults if unset
    modal_window_id = typeof argsArray['modal_window'] !== 'undefined' ? argsArray['modal_window'] : '#dialog';
    modal_window = '#' + modal_window_id;
    container_id = typeof argsArray['container_id'] !== 'undefined' ? argsArray['container_id'] : 'body';
    destroy_modal = typeof argsArray['destroy_modal'] !== 'undefined' ? argsArray['destroy_modal'] : false;


    /* If there's no modal dialog, insert an empty modal dialog into the page */
    if (jQuery(modal_window).length == 0) {
      jQuery('body').append("<div id=" + modal_window_id + " />");
      destroy_modal = true;
    }

    /* Modal Window Object */
    var ModalWindowObject = jQuery(modal_window);

    /* Creates the close button. */
    if (jQuery(modal_window + ' p.dialog-close').length == 0) {
      ModalWindowObject.prepend('<p class="dialog-close"><a href="#">&#215;</a></p>')
    }


    /* Display the modal window */
    ModalWindowObject
        .css('opacity', '0')
        .css('visibility', 'visible')
        .css('z-index', 999999)
        .fadeTo(500, 1)
        .responsive_dialog_resizer()
        .responsive_dialog_resizer();
        /* For some reason it's not properly updating the dialog size first time when
           the screen size is smaller than content height. Just as a hack, apply the
           resizer another time and, it works.. It's dirty but it'll do till a proper
           fix comes along */


    /* Make the blind */
    jQuery(container_id)
        .append('<div id="blind" />')
        .find('#blind')
        .css('opacity', '0')
        .height(doc_height)
        .fadeTo(250, 0.8)
        .click(function(e){
            closeModal();
        });


    /* Bind with the window resize event and sure its
     * properly resized postioned in an event window size change */
    jQuery(window).resize(function() {
      jQuery(modal_window).responsive_dialog_resizer();
    });

    /* Close the dialog box upon close link (x) click */
    jQuery('p.dialog-close a').click(function(e){
      e.preventDefault();
      closeModal();
    });

    /* Respond to escape (27) and close the dialog */
    jQuery('body').keyup(function(e) {
      if(e.which===27){ closeModal }
    });


    function closeModal(){
      ModalWindowObject.fadeOut(250, function(){ jQuery(this).css('top', '-1000px').css('left', '-1000px'); });
      jQuery('#blind').fadeOut(250,  function(){ jQuery(this).remove(); });
      if (destroy_modal) {
        ModalWindowObject.remove();
      }
    }

  });
}



jQuery.fn.responsive_dialog_resizer = function(){
  /* Read CSS properties from the dialog window */
  MaxWidth = parseInt(jQuery(this).css('max-width'), 10);
  MinWidth = parseInt(jQuery(this).css('min-width'), 10);
  MinHeight = parseInt(jQuery(this).css('min-height'), 10);
  PaddingHorizontal = parseInt(jQuery(this).css('padding-left'), 10) * 2;
  PaddingVertical = parseInt(jQuery(this).css('padding-top'), 10) * 2;

  //Get the screen width & height
  screen_width = jQuery(window).width();
  screen_height = jQuery(window).height();

  //Calculate the margin based on screen size and set a 1% margin
  margin_horizontal = screen_width * 0.01;
  margin_vertical = screen_height * 0.01;


  if ( screen_width > (MaxWidth + margin_horizontal + PaddingHorizontal) ) {
    calc_dialog_width = MaxWidth;
  }
  else if (screen_width < (MinWidth + margin_horizontal + PaddingHorizontal) ) {
    calc_dialog_width = MinWidth;
  }
  else {
    calc_dialog_width = screen_width - (margin_horizontal + PaddingHorizontal);
  }

  calc_left_margin = (calc_dialog_width / 2 );

  calc_dialog_height = jQuery(this).height();
  calc_top_margin = (calc_dialog_height / 2 );


  MaxHeight = screen_height - (margin_vertical + PaddingVertical);
  if (MaxHeight < MinHeight) {
    MinHeight = MaxHeight; // Ensures the modal window won't span out of screen size
  }


  return this
    .width(calc_dialog_width)
    .css('height', 'auto')
    .css('min-height', MinHeight)
    .css('left', (screen_width/2 - (calc_left_margin + PaddingHorizontal/2)) + 'px')
    .ModalWindowPoistioning()
};

/* Position the modal window based on the screen size.
 * If the screen is shorter than the modal window the window
 * will be created with absolute positioning, top of the
 * window and the browser will be scrolled top */
jQuery.fn.ModalWindowPoistioning = function () {
  if (calc_dialog_height < screen_height ) {
    return this
      .css('position', 'fixed')
      .css('top', (screen_height/2) - (calc_top_margin + PaddingVertical/2) + 'px');
  }
  else {
    window.scrollTo(0,0);
    return this
      .css('position', 'absolute')
      .css('top', '1em')
      window.scrollTop();
  }
}

/* Gets the webpage height (not the window height) */
var doc_height = function() {
  body = document.body,
  html = document.documentElement;
  return doc_height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
}