# jquery_res_modal #

### What is it? ###
* A jQuery based responsive, simple &amp; <b>barebones</b> modal window that works across devices.
* <b>Less features:</b> keeps the development faithful to it's primary function and it can be used as the modal-window provider for other projects/plugins
* Supports responsive layouts and work with CSS max-width and min-width properties and resizes to match the screen
* If the modal window isn't present it automatically creates the modal window and removes it upon closing.
* If the ```modal-window-height < screen-height``` the window will be centred on the screen (```position: fixed```), If the ```modal-window-height > screen-height```, it'll be placed on top of the screen (```position: absolute```) and the page will be scrolled top.

### What is it not? ###
* Bells, whistles & the kitchen sink: It doesn't have built in ajax thingies, galleries support, ... etc, etc. (yet you can easily integrate those) 


## Usage ##
* ```ResponsiveModalDialog({modal_window : 'modal_window_id'});``` invokes the modal window and can be bound to a function.

```
jQuery(document).ready(function() {

  jQuery('a.popup_link').click(function(){
    //Popping up the pop-up
    ResponsiveModalDialog({
      modal_window : 'modal_window_id'
    });
  });

});
```

* Please refer to the demo.html and source files and code comments for details
* Use CSS for styling.

## Contribution ##
Please feel free to fork, improve and send pull requests