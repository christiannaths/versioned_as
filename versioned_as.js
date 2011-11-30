function versioned_as(alt_version, redirect_url){
  // Tests to determine what is a mobile/desktop device
  var width_threshold = 600;
  var device_width = $(window).width();
  var device_is_mobile = device_width <= width_threshold;
  var device_is_desktop = device_width > width_threshold;

  // Tests to determine which alternate version is available
  var desktop_version_available = alt_version == "desktop";
  var mobile_version_available = alt_version == "mobile";

  // Tests to determine if a specific version was requested
  var user_did_not_request_mobile_version = $.cookie('version') != 'mobile';
  var user_did_not_request_desktop_version = $.cookie('version') != 'desktop';

  // Tests to determine if redirection is neccessary
  var should_redirect_for_mobile = device_is_mobile && mobile_version_available && user_did_not_request_desktop_version;
  var should_redirect_for_desktop = device_is_desktop && desktop_version_available && user_did_not_request_mobile_version;

  // The redirection, if necessary
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
