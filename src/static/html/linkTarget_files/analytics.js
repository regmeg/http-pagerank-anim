function qsrequest( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var promo=encodeURIComponent(qsrequest('promo'));
var url=encodeURIComponent(document.location.href);
var title=encodeURIComponent(document.title);
var refurl=encodeURIComponent(document.referrer);
var gclid=encodeURIComponent(qsrequest('gclid'));
var fcid=encodeURIComponent(qsrequest('fcid'));

//lets see if this is an affiliate
var str_ref = url.indexOf('/ref/');
if (str_ref > 0 )
	{
	//this is an affiliate let's set the promocode
	var ary_ref = url.split('/');
	promo = ary_ref(4);
	alert ('promo' + promo);
	
	}




   if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      //alert(hash);
     var str_fcid  = hash;
     var ary_fcid = str_fcid.split('fcid=');
     fcid = ary_fcid[1];
     //alert ('fcid=|' + fcid);
    }



document.write('<iframe src="http://data.fineartstudioonline.com/admin/analytics/?ref=' + refurl + '&url=' + url +'&promo=' + promo + '&gclid=' + gclid + '&fcid=' + fcid + '" width="0px" height="0px"></iframe>');