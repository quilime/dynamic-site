
float rand1, rand2, rand3;

void setup() {
  size(300, 300);
  smooth();
  
  //randomSeed(645);
  // i like these seeds:
  // 2, 645
  
  rand1 = random(1,100);
  rand2 = random(1,100);
  rand3 = random(1,100);
  
}


void draw() {

  fill(0,0,50,5.5);
  rect(0,0,width,height);

  float x = (sin(frameCount / rand1) * 100) + width/2;
  float y = (cos(frameCount / rand2) * 100) + height/2;
  float r = sin(frameCount  / rand3) * 50;
  
  float color_r = sin(frameCount / 30.0) * 255;
  float color_g = sin(frameCount / 60.0) * 255;
  float color_b = sin(frameCount / 10.0) * 255;  

  fill(color_r, color_g, color_b);
  ellipse(x, y, r, r);
}

