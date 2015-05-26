window.esource = null;
var $ = function(id) { return document.getElementById(id); };
var log = function(msg) { $('log').innerText += msg + '-'; };

var sendPostMessage = function() {
  var webview = window.top.document.querySelector('webview');
  var value = $('ii').value;
  webview.contentWindow.postMessage(value, '*');
};

var sendPostMessageViaParent = function() {
  var value = $('ii').value;
  window.parent.sendPostMessageValue(value);
  //var webview = window.top.document.querySelector('webview');
  //webview.contentWindow.postMessage(value, '*');
};


var updateSourceStatus = function() {
  $('sstatus').innerText += window.esource ? 'Oh YES,' : 'Oh NO,';
};

var updateStatus = function(e) {
  var hasSource = !!e.source;
  var sourceHTML = hasSource ?
      '<span style="color:green">YES</span>' :
      '<span style="color:red">NO</span>';
  $('mstatus').innerHTML =
      ' [event.data]: ' + e.data +
      ', [event.origin]: ' + e.origin +
      ', [event.source]: ' + sourceHTML;
};

window.onmessage = function(e) {
  window.esource = e.source;
  updateStatus(e);
};

var init = function() {
  $('send-button').onclick = sendPostMessage;
  $('send-button2').onclick = sendPostMessageViaParent;
};

window.onload = function() {
  init();
};
