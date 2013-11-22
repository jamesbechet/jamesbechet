$(document).ready(function()
{
  var bannerIdx =
  {
    Me:0,
    Skills:1,
    Github:2,
    Contact:3
  }

  var currentCategory = bannerIdx.Me;
  var banners = ["#me", "#skills", "#github", "#contact"];
  var topPos = 111;
  var inCategory = new Boolean(false);
  var inAnimation = new Boolean(false);
  var xmlhttp = null;
  var xmlDoc = null;
  var categories = null;
  var contentHeight = 0;
  var contentElem = null;
  function initXML()
  {
    if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("GET","text-content.xml", false);
  xmlhttp.send();
  xmlDoc = xmlhttp.responseXML;

  categories = xmlDoc.getElementsByTagName("content");
}

function displayContent()
{
  contentHeight = $("#category-content").css("height");
  $("#category-content").css("height", 0);
  $("#category-content").css("background-color", $(banners[currentCategory]).css("background-color"));
  $("#category-content").css("border-top", "3px solid #000");
  $("#category-content").css("z-index", 2);
  $("#category-content").animate({height:contentHeight}, {duration:1000, complete: function() {
    if (contentElem == null)
      contentElem = $("#category-content").find("p");
    contentElem.html(categories[currentCategory].childNodes[0].nodeValue);


  }});
}

function launchOpacity(bannerIdx)
{
  var j = 0;
  for (var i = 0; i < banners.length; ++i)
  {
    if (i != bannerIdx)
    {
      ++j;
      if (j == 3)
       $(banners[i]).animate({opacity:0}, {duration:1000, complete: function() {
        inAnimation = false;
        displayContent();
      }})
     else
      $(banners[i]).animate({opacity:0}, {duration:1000});
  }
}
}

function animation(bannerIdx)
{
  if (inCategory == false)
  {
    var finalPos = (bannerIdx * -topPos);
    currentCategory = bannerIdx;
    inCategory = true;
    inAnimation = true;
    $(banners[bannerIdx]).css("z-index", 2);
    $(banners[bannerIdx]).animate({top:finalPos}, {duration:1000,
      complete: function() {
        launchOpacity(bannerIdx);
      }});
  }
}

function speedTransitionEffect(category, contentTrigg)
{
  if (category < 4)
  {
    if (category != currentCategory)
    {
      ++contentTrigg;
      $(banners[category]).css("opacity", 100);
      $(banners[category]).css("left", -200);
      $(banners[category]).animate({left: 50}, {duration:300, complete: function(){
        $(banners[category]).animate({left:0}, {duration:100, complete: function(){
          if (contentTrigg == 3)
          {
            $("#category-content").css("background-color", "rgba(0, 0, 0, 0)");
            $("#category-content").css("height", contentHeight)
          }
        }});
        speedTransitionEffect(++category, contentTrigg);
      }});
    }
    else
      speedTransitionEffect(++category, contentTrigg);
  }
  else
    inCategory = false;
}

function animationHome()
{
  if (inCategory == true && inAnimation == false)
  {
    $("#category-content").css("z-index", 0);
    $("#category-content").css("border-top", "none");
    $("#category-content").find("p").html("");
    $(banners[currentCategory]).css("z-index", 1);
    $(banners[currentCategory]).animate({top:0}, {duration:1000, complete: function() {
      speedTransitionEffect(bannerIdx.Me, 0);
    }});
    $("#category-content").animate({height:0}, {duration:400});
  }
}

$('#me').click(function(){
  animation(bannerIdx.Me);
});

$('#skills').click(function(){
  animation(bannerIdx.Skills);
});

$('#github').click(function(){
  animation(bannerIdx.Github);
});

$('#contact').click(function(){
  animation(bannerIdx.Contact);
});

$("#iphone-button").click(function(){
  animationHome();
});

initXML();

});
