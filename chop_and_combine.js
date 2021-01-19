var finput1, finput2,img1chop, img2shift, combination, extraction, can1, can2;
var img = null;
var img1 = null;

function clearBits(pixVal){
    var x = Math.floor(pixVal/16) * 16;
    return x;
}
function extractBits(pixVal){
    var x = pixVal / 16;
    return x;
}
function upload(inp){
  var res = new SimpleImage(document.getElementById(inp));
  return res;
}
function prev(inp,tar){
  inp.drawTo(document.getElementById(tar));
}

function upload1() {
  img = upload("img");
  prev(img,"can");
}
function upload2() {
  img1 = upload("img1");
  prev(img1,"can1");
}

function chop(inp) {
    for (var p of inp.values()){
        p.setRed(clearBits(p.getRed()));
        p.setGreen(clearBits(p.getGreen()));
        p.setBlue(clearBits(p.getBlue()));
    }
    var res = inp;
    return res;
}
function shift(inp) {
    for (var p of inp.values()){
      p.setRed(extractBits(p.getRed()));
      p.setGreen(extractBits(p.getGreen()));
      p.setBlue(extractBits(p.getBlue()));
    }
    var res = inp;
    return res;
}
function Chop2Hide(){
  check1();
  img1chop = chop(img);
  prev(img1chop,"can2")
}
function ShiftImage(){
  check2();
  img2shift = shift(img1);
  prev(img2shift,"can3")
}
function mix(show,hide){
    var w = show.getWidth();
    var h = show.getHeight();
    var res = new SimpleImage(w,h);
    for (var pixel of res.values()){
        var x = pixel.getX();
        var y = pixel.getY();
        var showpixel = show.getPixel(x,y);
        var hidepixel = hide.getPixel(x,y);
pixel.setRed((showpixel.getRed()+hidepixel.getRed()));
pixel.setGreen((showpixel.getGreen()+hidepixel.getGreen()));
pixel.setBlue((showpixel.getBlue()+hidepixel.getBlue()));     
    }
  return res;
}
function Combine(){ 
  check();
    combination = mix(img1chop,img2shift);
    prev(combination,"can4");
}
function decode(input){ 
    var w = input.getWidth();
    var h = input.getHeight();
    var res = new SimpleImage(w,h);
    for (var pixel of res.values()){
        var x = pixel.getX();
        var y = pixel.getY();
        var inputPixel = input.getPixel(x,y);
        pixel.setRed((inputPixel.getRed() % 16) * 16);
        pixel.setGreen((inputPixel.getGreen() % 16) * 16);
        pixel.setBlue((inputPixel.getBlue() % 16) * 16);
    }
    return res;
}
function extract(){
  extraction = decode(mix(img1chop,img2shift));
  prev(extraction,"can5");
}

 function check(){
     if((img.getHeight()!=img1.getHeight())||(img.getWidth()!=img1.getWidth())){
      alert("Please Upload The Images of Same Size");
      return;
    }
   if((img1 == null || !img1.complete())||(img == null || !img.complete())){
      alert("Please upload Images First");
      return;
   }
 }
function check1(){
    if(img == null || !img.complete()){
      alert("First Image Not Loaded");
      return;
    }
}
function check2(){
    if(img1 == null || !img1.complete()){
      alert("Second Image not loaded");
      return;
    }
  }
