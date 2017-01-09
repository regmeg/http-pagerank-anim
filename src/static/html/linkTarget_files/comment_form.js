function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function createGuid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

 
 function parseHTML(html, idStr) {
  var root = document.createElement("div");
  root.innerHTML = html;
  // Get all child nodes of root div
  var allChilds = root.childNodes;
  for (var i = 0; i < allChilds.length; i++) {
    if (allChilds[i].id && allChilds[i].id == idStr) {
      return allChilds[i];
    }
  }
  return false;
}

 
 $(function() {
	var name = $("input#Full_Name").val();
		if (name == "") {
			var myname = $.cookie('Blog_Comment_Full_Name');
			if (myname != null) {	
				myname=myname.replace(/\%20/g,' ');
				$('input#Full_Name').val(myname);
				$("input#Remember_Info").attr("checked", "checked");
				}
		}
		
		var email= $("input#Email_Address").val();
		if (email == "") {
			var myemail = $.cookie('Blog_Comment_Email_Address');
			if (myemail != null) {	
			$('input#Email_Address').val(myemail);
			$("input#Remember_Info").attr("checked", "checked");
			}				
		}
		
		var website= $("input#Website").val();
		if (website == "") {
			var mywebsite = $.cookie('Blog_Comment_Website');
			if (mywebsite != null ) {	
			$('input#Website').val(mywebsite);
			$("input#Remember_Info").attr("checked", "checked");
			}		
		}
		
	
  $('.normal').show();
  $('.error').hide();
  $('input.text-input').css({backgroundColor:"#FFFFFF"});
  $('input.text-input').focus(function(){
    $(this).css({backgroundColor:"#FFDDAA"});
	
	
  });
   
   
   $('textarea#Comments').focus(function() {
   $(this).css({backgroundColor:"#FFEDD2"});   
   $(this).css({color:"#000000"});
   
   
   if ($("textarea#Comments").val()=='Write another comment . . .') 
		{
		$("textarea#Comments").val('');
		$("textarea#Comments").attr('style','color:#000000;');
		}
   
   });
   
  
  $('input.text-input').blur(function(){
    $(this).css({backgroundColor:"#FFFFFF"});
  });
  
    $('textarea#Comments').blur(function(){
    $(this).css({backgroundColor:"#FFFFFF"});
  });

  $(".button").click(function() {
		// validate and process form
		// first hide any error messages
    $('.error').hide();
	
	$('#working_area').show();
	$('#contact_form').hide();
		
	  var name = $("input#Full_Name").val();
		if (name == "") {
		  $("label#name_normal").hide();
		  $("label#name_error").show();      
		   $('#working_area').hide();
		  $('#contact_form').fadeIn('slow');
		window.location.hash='POSTCOMMENT';	
			
		  $("input#Full_Name").focus();	  
		  return false;
		}
		else
		{
		$("label#name_normal").show();
		}
		
	var email = $("input#Email_Address").val();
	var comment_system = $("input#comment_system").val()+'';
	

	if (email == "") {
			if (comment_system == "facebook") {
				//do nothing we don't have to require email address for facebook comments
			}
			else {
				//force the user to provide an email address
			  $("label#email_error").show();
			  $("label#email_normal").hide();      
			  $('#working_area').hide();
			  $('#contact_form').fadeIn('slow');
			  window.location.hash='POSTCOMMENT';	
			  $("input#Email_Address").focus();
			  return false;
			 }
		}
		else
		{
		$("label#email_normal").show();
		}
	
		var website = $("input#Website").val() +'';
		
		var usecaptcha = $("input#usecaptcha").val() +'';
		var captcha = $("input#Captcha").val() + '';
		
		/*if (captcha == '') {usecaptcha = 'True';}*/
		
		var captchaid = $("input#captchaid").val() + '';
		if ($('input#Email_Replies').is(':checked') == true) {emailreplies="ON";} else {emailreplies="OFF";}
	
		
		var comments = $("textarea#Comments").val();
		if (comments == "") {
			$("label#comments_normal").hide();
			$("label#comments_error").show();
			$('#working_area').hide();
			$('#contact_form').fadeIn('slow');
			window.location.hash='POSTCOMMENT';	
			$("textarea#Comments").focus();
			return false;
		}
		else
		{
		$("label#comments_normal").show();
		}
		
		//comments=comments.html();
		comments = comments.replace(/\r?\n/g, "<br>\n");
		comments = comments.replace(/\&/g,"and");
		comments = comments.replace(/\%/g," percent");
		comments = comments.replace(/\s/g,"%20"); // "hxllx"
		comments = comments.replace(/\+/g,"~~PLUS~~"); // "hxllx"
		
		
		name = name.replace(/\s/g,"%20"); // "hxllx"
		
	var keyvalue = $("input#keyvalue").val() + '';
	var subkeyvalue = $("input#subkeyvalue").val() + '';
	
	var domain=$("input#domain").val()+'';
	
	var avatar = $("input#avatar").val()+'';
	avatar = escape(avatar+'');
	
	
	
	
	/*if ($('#captcha').is (':hidden')) { usecaptcha='False'; }*/
	
		var dataString = 'name='+ name + '&email=' + email  + '&comments=' 
		+ comments + '&website=' + website + '&usecaptcha=' 
		+ usecaptcha + '&captcha=' + captcha+ '&captchaid=' 
		+ captchaid + "&emailreplies=" + emailreplies
		+ '&keyvalue=' + keyvalue + '&subkeyvalue=' + subkeyvalue
		+ '&domain=' + domain
		+ '&ajax=y'
		+ '&avatar=' + avatar
		+ '&comment_system=' + comment_system;

		        //determin protocol http vs https
        var faso_protocol = "http://";
        if (window.location.protocol == "https:") {faso_protocol = "https://";}
		
		//alert(avatar);
		
		//alert (dataString); //return false;
		//alert (domain);
		
		$.ajax({
      type: "POST",
      url: faso_protocol + domain + "/blogcomments/post.asp",
      data: dataString,
	  cache: false,
	  timeout: (9000),
	    error: function(request,error){
		
		if (error == "timeout") {
		//alert('Oops! Something went wrong while saving your comment - click OK and you can retry.');
		 $('.success_message').html("Sorry - we were unable to save your comment, feel free to try again"); 
		  $('.success_message').fadeIn('slow'); 
        $('#working_area').hide();
		$('#contact_form').fadeIn('slow');
		}
		
		},
       success: function (html) {                
                 //if process.php returned 1/true (send mail success)  
				 var gotcha = parseHTML(html,'possible_spam');
				 //alert(gotcha);
                 if (html==0) {          
					$('#working_area').hide();
					//we failed, let's update the user
					 $('.success_message').html("Sorry - we were unable to save your comment."); 
                     //hide the form  
                     //$('.contact_form').fadeOut('slow');                
                     //show the success message  
                    $('.success_message').fadeIn('slow'); 
					$('#contact_form').fadeIn('slow');
					
                       
                 //if process.php returned 0/false (send mail failed) 
					}
				 else if (gotcha)
					 {
						$('#working_area').hide();
						
						$('input#usecaptcha').val('True');
						$('input#Captcha').val('');
						
						//reset the GUID on the Captcha
						var myguid = createGuid();
						myguid = myguid.replace(/-/g,'');
						$('#captchaimage').attr('src','http://data.fineartstudioonline.com/aspcaptcha.asp?id=' + myguid);
						$('input#captchaid').val(myguid);
						$('input#usecaptcha').attr('value','True');
						
						$('#contact_form').fadeIn('slow');
						
						$('.captcha').fadeIn('slow');
						window.location.hash='CAPTCHA';	
						 $("input#Captcha").select().focus();
						
						//$('.contact_form').html(html); 
						//$('.contact_form').fadeIn('slow'); 
					 }

                 else 
					{
						$('#working_area').hide();
						
						$('.captcha').hide();
						$('input#Captcha').val('');
						
						
						var timestamp = Number(new Date());
						timestamp = timestamp + "";
						
						$('#message_area').html($('#message_area').html() + '<div class="success_message" id="' + timestamp +'"><a href="#' + timestamp + '">Success</a></div>');
						
						
						//$('#success_message').attr('id', function() {  return this.id.replace('success_message', timestamp);} );
						
						$('#' + timestamp).hide(); 
						$('#' + timestamp).html(html); 	
						
						//$('#' + timestamp).attr('style','background-color:FFDDAA;');
						$('#' + timestamp).fadeIn('slow');
						
						//$('#message_area').html($('#message_area').html() + '<div class="success_message" id="success_message"  style="display:none;">Success</div>');
						
						
						$('textarea#Comments').val('');
						
						//$('.contact_form').fadeIn('slow');
						//$('.message_area').fadeIn('slow');
						
						if ($('input#Remember_Info').val() == 'ON')
							{
														
							$.cookie('Blog_Comment_Full_Name', name, { expires: 7, path: '/', domain: domain });
							$.cookie('Blog_Comment_Email_Address', email, { expires: 7, path: '/', domain: domain });
							$.cookie('Blog_Comment_Website', website, { expires: 7, path: '/', domain: domain });
							}
						

						//scroll the window here unless we are using facebook
						if (comment_system == 'facebook') {
							//do nothing
							}
						else
						{
						//do nothing yet
						}
						//scroll the window
						
						if (comment_system == 'facebook') {
						var myfooter = ' - my comment at http://' + domain + '/blog/' + subkeyvalue ;
						var mymessage = comments + myfooter;
						mymessage = unescape(mymessage);
						FB.Connect.streamPublish(mymessage);
						}
						else
						{
							scrollWin('#' + timestamp);
						}
						//redisplay the comment form
						$("textarea#Comments").val('Write another comment . . .');
						$('#contact_form').fadeIn('slow');
						$('textarea#Comments').attr('style','color:#555555;');
						
						
						
						
						
						if (comment_system == 'facebook') {
						//FB.Connect.streamPublish(mymessage);
						}
						
						//window.location.hash=timestamp;	
						
						
				
						
					}               
             }         
     });
	
    return false;
	});
});

function scrollWin(myid){
$('html, body').animate({
scrollTop: $(myid).offset().top - 50
}, 1500);
}

function myLoaders()
	{
	loadFromCookies();
	}
	
function loadFromCookies() {
	//myname = myname + $.cookie("Blog_Comment_Full_Name");
	//$('input#Full_Name').val('on');
	//document.forms['comment_form'].elements['Full_Name'].value = 'mynewvalue';
	//document.getElementById('comment_form').Full_Name.value= 'mynewvalue';
	//$("input#Email_Address").select().focus();
	//alert('test');
	

}
	
runOnLoad(myLoaders());

	/*
runOnLoad(function(){
  $("input#Email_Address").select().focus();
  $('input#usecaptcha').val('False');
 
});
*/

 

 /*
 * runOnLoad.js: portable registration for onload event handlers.
 * 
 * This module defines a single runOnLoad() function for portably registering
 * functions that can be safely invoked only when the document is fully loaded
 * and the DOM is available.
 *
 * Functions registered with runOnLoad() will not be passed any arguments when
 * invoked. They will not be invoked as a method of any meaningful object, and
 * the this keyword should not be used.  Functions registered with runOnLoad()
 * will be invoked in the order in which they were registered.  There is no
 * way to deregister a function once it has been passed to runOnLoad().
 *
 * In old browsers that do not support addEventListener() or attachEvent(),
 * this function relies on the DOM Level 0 window.onload property and will not
 * work correctly when used in documents that set the onload attribute
 * of their <body> or <frameset> tags.
 */
 
 runOnLoad.funcs = []; // The array of functions to call when the document loads
runOnLoad.loaded = false; // The functions have not been run yet.
 
function runOnLoad(f) {
    if (runOnLoad.loaded) f();    // If already loaded, just invoke f() now.
   else runOnLoad.funcs.push(f); // Otherwise, store it for later
}



// Run all registered functions in the order in which they were registered.
// It is safe to call runOnLoad.run() more than once: invocations after the
// first do nothing. It is safe for an initialization function to call
// runOnLoad() to register another function.
runOnLoad.run = function() {
    if (runOnLoad.loaded) return;  // If we've already run, do nothing

    for(var i = 0; i < runOnLoad.funcs.length; i++) {
        try { runOnLoad.funcs[i](); }
        catch(e) { /* An exception in one function shouldn't stop the rest */ }
    }
    
    runOnLoad.loaded = true; // Remember that we've already run once.
    delete runOnLoad.funcs;  // But don't remember the functions themselves.
    delete runOnLoad.run;    // And forget about this function too!
};

// Register runOnLoad.run() as the onload event handler for the window
if (window.addEventListener)
    window.addEventListener("load", runOnLoad.run, false);
else if (window.attachEvent) window.attachEvent("onload", runOnLoad.run);
else window.onload = runOnLoad.run;
