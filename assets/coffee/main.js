var delay;

delay = function(ms, func) {
  return setTimeout(func, ms);
};

$(document).ready(function() {
  var subscribe;
  $('.before-and-after .slider').glide({
    autoplay: false,
    circular: true,
    navigation: false
  });
  subscribe = function(e) {
    var fields, form, input, params;
    e.preventDefault();
    e.stopPropagation();
    form = $(this);
    fields = form.find('fieldset');
    input = form.find('input[type=email]');
    params = fields.find('input').serializeArray();
    fields.attr("class", "sending");
    input.blur();
    return $.ajax({
      type: "GET",
      url: form.attr('action') + '-json',
      jsonp: "c",
      dataType: "jsonp",
      contentType: "application/json; charset=utf-8",
      data: params,
      error: function() {
        console.log("ajax error");
        fields.attr("class", "error");
        return input.focus();
      },
      success: function(data) {
        console.log(data.msg);
        if (data.result === "success") {
          console.log("success");
          return fields.attr("class", "success");
        } else {
          if (data.msg.indexOf("already subscribed") !== -1) {
            console.log("already subscribed");
            return fields.attr("class", "success");
          } else {
            console.log("error");
            fields.attr("class", "error");
            return input.focus();
          }
        }
      }
    });
  };
  $('a.newsletter-subscribe').each(function(i, el) {
    return $(el).click(function(e) {
      var input, popup;
      e.preventDefault();
      e.stopPropagation();
      popup = $(e.target).closest('div').find('.newsletter');
      input = popup.find('input[type=email]');
      if (popup.is(':hidden')) {
        popup.show();
        return input.focus();
      } else {
        popup.hide();
        return input.blur();
      }
    });
  });
  $('.newsletter').each(function(i, el) {
    return $(el).find("form").submit(subscribe);
  });
  return $("a[href^=#]").click(function(e) {
    var dest, offset, scrollmem;
    if (this.hash === "#") {
      return;
    }
    if (this.hash === "#newsletter") {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    $(this).blur();
    scrollmem = $(document).scrollTop();
    window.location.hash = this.hash;
    $(document).scrollTop(scrollmem);
    dest = $(this.hash);
    if (dest.length === 1) {
      offset = dest.offset().top;
      return $("html,body").stop().animate({
        scrollTop: offset
      }, 500);
    }
  });
});
