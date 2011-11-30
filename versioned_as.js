function versioned_as(alt_version, redirect_url){
  /*  Tests to determine what is a mobile/desktop device
          width_threshold:    Any device with a screen width
                              below this value will be considered
                              a "mobile" device.

          device_width:       This is the method used to measure
                              the device. For now, we will use
                              $(window).width(); so we can test
                              our script on a desktop browser by
                              simply resizing it. In production, you
                              may want to change this to screen.width;
                              to capture the width of the device
                              iteslf, rather than the width of the
                              browser.

          device_is_mobile:   Esentially we are just testing to see
                              if the device_width is less than or
                              equal to the width_threshold. If it is
                              then we are going to make the assumption
                              that the device is a mobile device.
                              Evaluates to either true or false.

          device_is_desktop:  Simply the opposite of the device_is_mobile
                              test. Evaluates to either true or false.
  */
  var width_threshold = 600;
  var device_width = $(window).width();
  var device_is_mobile = device_width <= width_threshold;
  var device_is_desktop = device_width > width_threshold;


  /*  Tests to determine which alternate version is available
          desktop_version_available:    We're simply checking to see if we
                                        have called the function using "desktop"
                                        as the first parameter. That means there
                                        is a desktop version of this page
                                        availabe. Evaluates to true or false.

          mobile_version_available:     Similar to the test above, but checking
                                        the first parameter for "mobile". Evaluates
                                        to true or false.

  */
  var desktop_version_available = alt_version == "desktop";
  var mobile_version_available = alt_version == "mobile";

  /*  Tests to determine if a specific version was requested
          user_did_not_request_mobile_version:    Here we're just checking if there is
                                                  a browser cookie named 'version' set
                                                  with a value of 'mobile'. Later, we will
                                                  give the visitor a link to the alternate
                                                  version of a page. When they click that
                                                  link it will set the cookie with the
                                                  appropriate value. This evaluates to either
                                                  true or false.

                                                  The reason it uses negative wording is
                                                  because the only time we want to automatically
                                                  redirect the visitor is if they DID NOT specifically
                                                  request the mobile version (by clicking the
                                                  link and thus setting the cookie value to "mobile"),
                                                  which would make this test evaluate to true.

          user_did_not_request_desktop_version:   Similar to the test above, only looking for
                                                  the cookie value of "desktop" instead. Evaluates
                                                  to either true or false.
  */
  var user_did_not_request_mobile_version = $.cookie('version') != 'mobile';
  var user_did_not_request_desktop_version = $.cookie('version') != 'desktop';

  /*  Tests to determine if redirection is neccessary
          should_redirect_for_mobile:   Here we are chaining together 3 of the
                                        previous tests in order to determine if
                                        we should redirect to the mobile version.
                                        If all 3 tests evaluate to true, then this
                                        test will equal true. If even one test
                                        evaluates to false, then this test will
                                        equal false.

          should_redirect_for_desktop:  Simialr to the above test, only for the
                                        desktop version. Evaluates to either true
                                        or false.
  */
  var should_redirect_for_mobile = device_is_mobile && mobile_version_available && user_did_not_request_desktop_version;
  var should_redirect_for_desktop = device_is_desktop && desktop_version_available && user_did_not_request_mobile_version;

  /*  The redirection, if necessary
          Here we are saying "if either the 'should_redirect_to_mobile' test OR the
          'should_redirect_to_desktop' test evaluate to true, then do a javascript
          redirect to the url provided"
  */
  if(should_redirect_for_mobile || should_redirect_for_desktop){
    window.location = redirect_url;
  };

  // Insert the navigation link, on mobile devices only
  if (device_is_mobile){
    $('body').append("<nav class='version'><a class='"+ alt_version +"' href='"+ redirect_url +"'>"+ alt_version +" version</a></nav>")
  };

  // Store the cookie when the version navigation link is clicked
  $('nav.version a').click(function(){
    $.cookie('version', alt_version, { expires: 99999, path: '/' });
  });
};
