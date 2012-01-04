/** BHD

    Browser-Hosted Download
*/
function BHD () {
  return new BHD.Button(opts, callback);
}

BHD.uid = function () {
  return 'x'+(+(''+Math.random()).substring(2)).toString(32)+(+new Date()).toString(32);
};

BHD.getScriptPath = function () {
  if (this.scriptPath) return this.scriptPath;
  var scripts = document.getElementsByTagName('script');
  for (var i=scripts.length, m; i--;) {
    if ((m=(''+scripts[i].src).match(/(.*\/?)bhd.js(\?|$)/))) {
      return this.scriptPath = m[1] || '';
    }
  }
  return this.scriptPath = '';
}

BHD.include = function (file, callback) {
  var uid = BHD.uid(), frame;
  frame = document.createElement('iframe');
  frame.src = file;
  frame.id = frame.name = uid;
  frame.onload = function () {
    var s = document.getElementsByTagName('script')[0]; 
    var d = frames[uid].document.documentElement;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = d.textContent||d.innerText;
    s.parentNode.insertBefore(script, s);
    callback();
    s.parentNode.removeChild(s);
    frame.parentNode.removeChild(frame);
  }
  document.documentElement.appendChild(frame);
}
  
/** BHD.Button
*/
BHD.Button = function (opts, callback) {

  this.opts = opts;
  
  if (!opts) return;

  this.setup(opts, callback);
  
}


/** setup

    Embed the SWF object.
    
    @param String opts
*/
BHD.Button.prototype.setup = function (opts, callback) {

  var button = this;
  var flashvars = opts;
  var params = { 
    quality: 'high', 
    wmode: 'transparent', 
    swLiveConnect: 'true',
    menu: 'false',
    scale: 'noScale',
    allowFullscreen: 'true',
    allowScriptAccess: 'always'
  };
  var attributes = { id: opts.id, name: opts.id };
  
  this.opts = opts;
  
  opts.callbackName = BHD.uid();

  window[opts.callbackName] = callback;
  
  window[opts.callbackName + '_resize'] = function(w, h){
    object = button.getElement();
    object.style.width = w + 'px';
    object.style.height = h + 'px';
  };

  var cb = function(){
    swfobject.embedSWF(BHD.getScriptPath() + 'bhd.swf', 
        opts.id, '1px', '1px', '10.0.0', 
        null, flashvars, params, attributes);
  }

  if (typeof swfobject == 'undefined') {
    BHD.include(BHD.getScriptPath() + 'swfobject.js', cb);
  } else {
    cb();
  }

};


/** getElement

    Get the embedded flash element, or element to be replaced
    if swfobject.embedSWF has not finished yet.
    
    @param String variable
    @param Mixed value 
*/
BHD.Button.prototype.getElement = function () {
  return document.getElementById(this.opts.id);
};

/** setFile

    Set the default filename to show in the save dialog.
    
    @param String value 
*/
BHD.Button.prototype.setFile = function (value) {
  return this.getElement().setFile(value);
};

/** setData

    Set the contents of the download file.
    
    @param Mixed value 
*/
BHD.Button.prototype.setData = function (value) {
  return this.getElement().setData(value);
};
    
