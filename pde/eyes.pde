// eyes that follow the mouse

// create two new eyes
Eye eye1, eye2;

void setup() {
  size(300, 300);
  smooth();
  
  // initialize eyes
  eye1 = new Eye( width/2 - 70, height/2);
  eye2 = new Eye( width/2 + 70, height/2);  
}

void draw() {

  // draw background 
  background(50);
  
  float lookx = sin(frameCount / 40.5) * 130 + width/2;
  float looky = cos(frameCount / 22.5) * 130 + height/2;  
  
  // update eye 1
  eye1.update(lookx, looky);
  eye1.draw();
  
  // update eye2
  eye2.update(lookx, looky);
  eye2.draw();  
  
  fill(0, 255, 0);
  ellipse(lookx, looky, 10, 10);
}







class Eye {

  // eye position and diameter
  float x, y, dia = 30;
  
  // pupil position and diameter
  float pupilx, pupily, pupildia = 40;

  // eye setup
  Eye(float _x, float _y) {
    // setting the initial variables of the eye
    x = _x;
    y = _y;
    pupilx = x;
    pupily = y;
  } 

  // eye update
  void update(float lookx, float looky) {

    // distance from mouse center
    float d = dist(lookx, looky, x, y);

    if (d < dia/2) {
      // if mouse is inside the eye
      // set the pupil to the mouse position
      pupilx = lookx;
      pupily = looky;
    } 
    else {
      // else, mouse is outside the eye
      // point the pupil at the mouse
      atan2(looky-y, lookx-x);
      float r = atan2(lookx-x, looky-y);
      pupilx = sin(r) * dia/2 + x;
      pupily = sin(r + PI/2) * dia/2 + y;      
    }
    
  }

  // eye draw
  void draw() {
    
    // eye background
    stroke(0);
    fill(255);    
    ellipse(x, y, dia+pupildia, dia+pupildia);

    // pupil
    noStroke();
    fill(0);
    ellipse(pupilx, pupily, pupildia, pupildia);  
  }
}


