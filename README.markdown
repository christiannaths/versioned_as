# Javascript Redirection for Mobile Devices

The purpose of this script is to act as a learning tool for students discovering how to set up a website with both mobile and desktop versions.

The detection methods are based solely on device width (browser width is used for testing purposes).

## Javascript Dependencies

This script uses the following prerequisite javascripts, and they must be loaded *before* this script:

- [jquery.js](https://github.com/jquery/jquery)
- [jquery.cookie.js](https://github.com/carhartl/jquery-cookie)

## Installation

Download the two prerequisite scripts and versioned_as.js and include them in the <tt><head></tt> of your document.


    <script type="text/javascript" src="javascripts/jquery.js"></script>
    <script type="text/javascript" src="javascripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="javascripts/versioned_as.js"></script>


Next, call the <tt>versioned_as();</tt> function, passing in two parameters, both strings. The first parameter is the name of the alternate version of the page, either <tt>"mobile"</tt> or <tt>"desktop"</tt>. The second parameter is the path (either relative or absolute) to the html file for that version. For example, in the head of the desktop version of your index page, you might use:


    <script type="text/javascript" src="javascripts/jquery.js"></script>
    <script type="text/javascript" src="javascripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="javascripts/versioned_as.js"></script>
    <script type="text/javascript">
        versioned_as("mobile", "m/index.html")
    </script>


This way your visitors, when browsing from a mobile device, will be redirected to <tt>your-domain.com/m/index.html</tt>. Now just build your mobile version there and you're good to go!
