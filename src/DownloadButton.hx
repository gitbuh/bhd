import flash.net.URLRequest;
import flash.net.FileReference;
import flash.events.Event;
import flash.events.MouseEvent;
import flash.geom.Rectangle;
import flash.display.Loader;
import flash.display.MovieClip;
import flash.display.StageScaleMode;
import flash.external.ExternalInterface;

class DownloadButton {
  
  public var filename:String;
  public var data:Dynamic;
  public var sprite:Loader;
  public var button:MovieClip;
  
  public static function main () {
    new DownloadButton();
  }
  
  public static function getParam (param:String) : String {
    return Reflect.field(flash.Lib.current.loaderInfo.parameters, param);
  }
  
  public function new () {
    this.draw();
	  ExternalInterface.addCallback("setFile", this.setFile);
	  ExternalInterface.addCallback("setData", this.setData);
  }
  
  public function setFile (filename:String) {
    this.filename = filename;
  }
  
  public function setData (data:Dynamic) {
    this.data = data;
  }
  
  private function draw () {
  
    var mc:MovieClip = flash.Lib.current;
    
    this.button = new MovieClip();
    
    mc.stage.scaleMode = StageScaleMode.NO_SCALE;
    
    // ldr.mask = button; 
    this.sprite = new Loader();
    
    this.sprite.contentLoaderInfo.addEventListener(Event.COMPLETE, this.handleSpriteLoad);
    
    this.sprite.addEventListener(MouseEvent.MOUSE_UP, this.handleMouseUp);
    this.sprite.addEventListener(MouseEvent.MOUSE_OVER, this.handleMouseOver);
    this.sprite.addEventListener(MouseEvent.MOUSE_OUT, this.handleMouseOut);
    this.sprite.addEventListener(MouseEvent.MOUSE_DOWN, this.handleMouseDown);
    
    this.sprite.load(new URLRequest(getParam("sprite")));
    
    this.button.addChild(this.sprite);
    
    mc.addChild(this.button);
    
    // trace(img.url);
      
  }
  
  private function handleMouseUp (event:MouseEvent) {
    var file = new FileReference();
    ExternalInterface.call(getParam("callbackName"));
    file.save(this.data, this.filename);
  }
  
  private function handleMouseOut (event:MouseEvent) {
    this.sprite.y = 0;
  }
  
  private function handleMouseOver (event:MouseEvent) {
    this.sprite.y = this.sprite.height / -3;
  }
  
  private function handleMouseDown (event:MouseEvent) {
    this.sprite.y = this.sprite.height * 2 / -3;
  }
  
  private function handleSpriteLoad (event:Event) {
    // crop our button
    this.button.scrollRect = new Rectangle(0, 0, this.sprite.width, this.sprite.height / 3); 
    ExternalInterface.call(getParam("callbackName")+'_resize', this.sprite.width, this.sprite.height / 3);
    
  }
  
  
  
  
  
  
}

