window.fbAsyncInit = function() {
    FB.init({
      appId            : '483145982276069',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v9.0'
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/es_LA/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));