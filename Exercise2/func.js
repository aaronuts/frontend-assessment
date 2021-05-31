
tabControl();
insertContent();

var resizeTimer;
$(window).on('resize', function(e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    tabControl();
  }, 250);
});

function tabControl() {
  var tabs = $('.tabbed-content').find('.tabs');
  if(tabs.is(':visible')) {
    tabs.find('a').on('click', function(event) {
      event.preventDefault();
      var target = $(this).attr('href'),
          tabs = $(this).parents('.tabs'),
          buttons = tabs.find('a'),
          item = tabs.parents('.tabbed-content').find('.item');
      buttons.removeClass('active');
      item.removeClass('active');
      $(this).addClass('active');
      $(target).addClass('active');
    });
  } else {
    $('.item').on('click', function() {
      var container = $(this).parents('.tabbed-content'),
          currId = $(this).attr('id'),
          items = container.find('.item');
      container.find('.tabs a').removeClass('active');
      items.removeClass('active');
      $(this).addClass('active');
      container.find('.tabs a[href$="#'+ currId +'"]').addClass('active');
    });
  };
};

function insertContent(){
  $.getJSON("https://raw.githubusercontent.com/mindarc/frontend-assessment/master/data.json",function(data){
  var $tabs = $(".tabs");
  var strHtml = "<ul>";
  $.each(data,function(infoIndex,info){
  if(infoIndex === 0){
    strHtml += "<li><a href=\"#tab" + infoIndex +"\" class=\"active\">"+info["title"]+"</a></li>";
    var tabContent = $("#tab"+infoIndex).find(".item-content");
    tabContent.append(info["content"]);
  } else{
      strHtml += "<li><a href=\"#tab" + infoIndex +"\">"+info["title"]+"</a></li>";
      var tabContent = $("#tab"+infoIndex).find(".item-content");
      tabContent.append(info["content"]);
    };
  });
  strHtml += "</ul>";
  $tabs.html(strHtml);
  $("#tab0").addClass('active');
  });
};

  