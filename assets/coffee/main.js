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
    var fields, form, params;
    e.preventDefault();
    e.stopPropagation();
    form = $(this);
    fields = form.find('fieldset');
    params = fields.find('input').serializeArray();
    fields.attr("class", "sending");
    return $.ajax({
      type: "GET",
      url: form.attr('action') + '-json',
      jsonp: "c",
      dataType: "jsonp",
      contentType: "application/json; charset=utf-8",
      data: params,
      error: function() {
        console.log("ajax error");
        return fields.attr("class", "error");
      },
      success: function(data) {
        if (data.result === "success") {
          fields.attr("class", "success");
          return console.log(data.msg);
        } else {
          fields.attr("class", "error");
          return console.log(data.msg);
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
  return $('.newsletter').each(function(i, el) {
    return $(el).find("form").submit(subscribe);
  });
});