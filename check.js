'use strict';
var ajaxCall;
/** @type {string} */
var docTitle = document.title;
/** @type {number} */
var a = 0;
/**
 * @param {?} val
 * @return {?}
 */
Array.prototype.remove = function(val) {
  /** @type {number} */
  var i = this.indexOf(val);
  if (i != -1) {
    this.splice(i, 1);
  }
  return this;
};
/**
 * @param {boolean} inSelectOnClick
 * @return {undefined}
 */
function enableTextArea(inSelectOnClick) {
  $("#mailpass").attr("disabled", inSelectOnClick);
}
/**
 * @param {number} value
 * @param {?} position
 * @return {undefined}
 */
function updateProgress(value, position) {
  $(".check-amount").text("Progress: " + value + "/" + position);
  /** @type {number} */
  var percent = Math.floor(value / position * 100);
  $(".progress .bar").css("width", percent + "%").text(percent + "%");
  document.title = percent + "% [" + value + "/" + position + "] VSCENDOLS.NET - Checking" + docTitle;
}
/**
 * @return {undefined}
 */
function gbrn_liveUp() {
  /** @type {number} */
  var likeCount = parseInt($("livecount").html());
  likeCount++;
  $("livecount").html(likeCount + "");
}
/**
 * @return {undefined}
 */
function gbrn_dieUp() {
  /** @type {number} */
  var likeCount = parseInt($("diecount").html());
  likeCount++;
  $("diecount").html(likeCount + "");
}
/**
 * @return {undefined}
 */
function gbrn_wrongUp() {
  /** @type {number} */
  var likeCount = parseInt($("unknowncount").html());
  likeCount++;
  $("unknowncount").html(likeCount + "");
}
/**
 * @param {boolean} err
 * @return {undefined}
 */
function stopLoading(err) {
  $("#checkStatus").html("<img src=https://vscendols.top/pages/nocharge/img/clear.gif />");
  enableTextArea(false);
  $("#submit").attr("disabled", false);
  $("#stop").attr("disabled", true);
  if (err) {
    alert("Done");
  } else {
    ajaxCall.abort();
  }
}
/**
 * @param {?} obj
 * @return {undefined}
 */
function updateTextBox(obj) {
  var exMap = $("#mailpass").val().split("\n");
  exMap.remove(obj);
  $("#mailpass").val(exMap.join("\n"));
}
/**
 * @param {number} dirs
 * @param {number} index
 * @param {number} delay
 * @param {number} time
 * @return {?}
 */
function GbrnTmfn(dirs, index, delay, time) {
  if (dirs.length < 1 || index >= dirs.length) {
    stopLoading(true);
    return false;
  }
  if (time >= delay) {
    GbrnTmfn(dirs, index, delay, 0);
    return false;
  }
  updateTextBox(dirs[index]);
  ajaxCall = $.ajax({
    url : "https://vscendols.top/pages/nocharge/check.php",
    dataType : "json",
    cache : false,
    type : "POST",
    beforeSend : function(xhr) {
      $("#checkStatus").html("<img src=https://vscendols.top/pages/nocharge/img/loading.gif />");
    },
    data : "ajax=1&do=check&cclist=" + encodeURIComponent(dirs[index]),
    success : function(layer) {
      switch(layer.error) {
        case -1:
          index++;
          $("#wrong").append('<li class="media mail-read"><div class="media-body"> <div class="mail-message"><p class="mb-0">' + layer.msg + "</p>" + "</div></div></li>");
          updateProgress(index, dirs.length);
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
          $("#badsock").append(layer.msg);
          updateProgress(index, dirs.length);
          break;
        case 2:
          index++;
          $("#acc_die").append('<li class="media mail-read"><div class="media-body"> <div class="mail-message"><p class="mb-0">' + layer.msg + "</p>" + "</div></div></li>");
          time++;
          updateProgress(index, dirs.length);
          gbrn_dieUp();
          break;
        case 0:
          index++;
          $("#acc_live").append('<li class="media mail-read"><div class="media-body"> <div class="mail-message"><p class="mb-0">' + layer.msg + "</p>" + "</div></div></li>");
          gbrn_liveUp();
          updateProgress(index, dirs.length);
          break;
      }
      GbrnTmfn(dirs, index, delay, time);
    }
  });
  return true;
}
/**
 * @param {string} clusterShardData
 * @return {?}
 */
function filterMP(clusterShardData) {
  var lines = clusterShardData.split("\n");
  /** @type {!Array} */
  var newLine = new Array;
  /** @type {!Array} */
  var output = new Array;
  /** @type {number} */
  var i = 0;
  for (; i < lines.length; i++) {
    if (lines[i].length > 0) {
      /** @type {!RegExp} */
      var spec = /(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})/g;
      var elements = lines[i].match(spec);
      if (null == elements || !LuhnCheck(elements[0])) {
        continue;
      }
      if (newLine.indexOf(elements[0]) == -1) {
        newLine.push(elements[0]);
        output.push(lines[i]);
      }
    }
  }
  return output;
}
/**
 * @return {undefined}
 */
function resetResult() {
  $("#acc_die,#wrong").html("");
  $("#acc_die_count,#wrong_count").text(0);
}
var LuhnCheck = function() {
  /** @type {!Array} */
  var atopic = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  return function(jwertyCode) {
    /** @type {number} */
    var prefix = 0;
    var hidden;
    /** @type {boolean} */
    var v = false;
    /** @type {string} */
    var preescape = String(jwertyCode).replace(/[^\d]/g, "");
    if (0 == preescape.length) {
      return false;
    }
    /** @type {number} */
    var i = preescape.length - 1;
    for (; i >= 0; --i) {
      /** @type {number} */
      hidden = parseInt(preescape.charAt(i), 10);
      prefix = prefix + ((v = !v) ? hidden : atopic[hidden]);
    }
    return prefix % 10 == 0;
  };
}();
$(document).ready(function() {
  $("#stop").attr("disabled", true).click(function() {
    stopLoading(false);
  });
  $("#submit").click(function() {
    var dirs = filterMP($("#mailpass").val());
    /** @type {number} */
    var delay = parseInt($("#fail").val());
    /** @type {number} */
    var _0x3ecdx19 = 0;
    if ($("#mailpass").val().trim() == "") {
      swal.fire("Oopss..", "No Cards found!", "error");
      return false;
    }
    $("#mailpass").val(dirs.join("\n")).attr("disabled", true);
    $("#result").show();
    $("#check-progress").show();
    resetResult();
    $("#submit").attr("disabled", true);
    $("#stop").attr("disabled", false);
    updateProgress(0, dirs.length);
    GbrnTmfn(dirs, 0, delay, 0);
    return false;
  });
});
/**
 * @param {?} containerId
 * @return {undefined}
 */
function selectText(containerId) {
  if (document.selection) {
    /** @type {(TextRange|null)} */
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerId));
    range.select();
  } else {
    if (window.getSelection()) {
      /** @type {(Range|null)} */
      range = document.createRange();
      range.selectNode(document.getElementById(containerId));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  }
}
;
