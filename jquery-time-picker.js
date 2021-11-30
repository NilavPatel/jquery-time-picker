(function ($) {
  $.fn.timepicker = function () {
    if (!$(this).is(":empty")) {
      return this;
    }

    var id = $(this).attr("id");
    var hours = "";
    var minutes = "";

    for (var h = 1; h < 13; h++) {
      var hour = h.toString().padStart(2, "0");
      hours = hours + "<option value='" + hour + "'>" + hour + "</option>";
    }

    for (var m = 0; m < 60; m++) {
      var min = m.toString().padStart(2, "0");
      minutes = minutes + "<option value='" + min + "'>" + min + "</option>";
    }

    $(this).addClass("d-flex align-items-center");
    $(this).append(
      "<select class='form-select me-2 hours-dropdown'>" + hours + "</select>"
    );
    $(this).append(":");
    $(this).append(
      "<select class='form-select ms-2 me-5 minutes-dropdown'>" +
        minutes +
        "</select>"
    );
    $(this).append(
      '<div class="btn-group" role="group" aria-label="Basic radio toggle button group">' +
        '   <input type="radio" class="btn-check" name="' +
        id +
        'Meridian" id="' +
        id +
        'MeridianAM" autocomplete="off" checked>' +
        '   <label class="btn btn-outline-primary" for="' +
        id +
        'MeridianAM">AM</label>' +
        '   <input type="radio" class="btn-check" name="' +
        id +
        'Meridian" id="' +
        id +
        'MeridianPM" autocomplete="off">' +
        '   <label class="btn btn-outline-primary" for="' +
        id +
        'MeridianPM">PM</label>' +
        "</div>"
    );

    return this;
  };

  $.fn.getValue = function () {
    var id = $(this).attr("id");

    var selectedHour = $(this).find(".hours-dropdown")[0].value;
    var selectedMinute = $(this).find(".minutes-dropdown")[0].value;
    var selectedMeridian = $(this).find("#" + id + "MeridianAM")[0].checked
      ? "AM"
      : "PM";
    if (!selectedHour || !selectedMinute) {
      return "";
    }
    return selectedHour + ":" + selectedMinute + " " + selectedMeridian;
  };

  $.fn.setValue = function (value) {
    var id = $(this).attr("id");

    if (!value || value.length == 0) {
      $(this).find(".hours-dropdown")[0].value = null;
      $(this).find(".minutes-dropdown")[0].value = null;
      $(this).find("#" + id + "MeridianAM")[0].checked = true;
      return;
    }
    var a = value.split(":");
    var hour = a[0];
    var b = a[1].split(" ");
    var minute = b[0];
    var meridian = b[1];
    $(this).find(".hours-dropdown")[0].value = hour;
    $(this).find(".minutes-dropdown")[0].value = minute;
    if (meridian == "AM") {
      $(this).find("#" + id + "MeridianAM")[0].checked = true;
    } else {
      $(this).find("#" + id + "MeridianPM")[0].checked = true;
    }
  };

  $.fn.setDisabled = function () {
    var id = $(this).attr("id");

    $(this).find(".hours-dropdown").prop("disabled", true);
    $(this).find(".minutes-dropdown").prop("disabled", true);
    $(this)
      .find("#" + id + "MeridianAM")
      .prop("disabled", true);
    $(this)
      .find("#" + id + "MeridianPM")
      .prop("disabled", true);
  };

  $.fn.setEnabled = function () {
    var id = $(this).attr("id");

    $(this).find(".hours-dropdown").prop("disabled", false);
    $(this).find(".minutes-dropdown").prop("disabled", false);
    $(this)
      .find("#" + id + "MeridianAM")
      .prop("disabled", false);
    $(this)
      .find("#" + id + "MeridianPM")
      .prop("disabled", false);
  };
})(jQuery);
