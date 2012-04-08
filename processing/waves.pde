Particle[] particles;
float speed = 0.01f;
float offset = 0f;

void setup() {
  size(500,200);
  smooth();
  particles = new Particle[21];
  for (int i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }
}

void draw() {
  background(138);
  stroke(100);

  for (int i = 0; i < particles.length; i++) {
    Particle p = particles[i];
    p.offset = lerp(p.offset, offset * i, 0.1);
    p.speed = lerp(p.speed, speed, 0.1);
    p.set( i * 25 + 30, height / 2);
    noFill();
    p.draw();
    fill(0);
    ellipse(p.px, p.py, 5, 5);
  }

  noFill();
  stroke(0);

  beginShape();
  for (int i = particles.length - 1; i >= 0; i--) {
    Particle p = particles[i];
    // first and last vertext
    if (i == 0 || i == particles.length - 1) {
      curveVertex(p.px, p.py);
    }
    curveVertex(p.px, p.py);
  }
  endShape();
}


void keyPressed() {

  switch(keyCode) {
  case UP    :
    speed  += 0.01f;
    break;
  case DOWN  :
    speed  -= 0.01f;
    break;
  case LEFT  :
    offset += 0.1f;
    break;
  case RIGHT :
    offset -= 0.1f;
    break;
  }
}


class Particle {

  int radius = 50;
  float offset = 0;
  float speed = 0.01f;
  float x = 0;
  float y = 0;
  float rot = 0;

  float rx=50, ry=50;
  float px, py;

  void set(int _x, int _y)
  {
    this.x = _x;
    this.y = _y;
  }

  void draw() {
    rot += speed;

    px = cos( rot + offset ) * rx/2 + x;
    py = sin( rot + offset ) * ry/2 + y;

    ellipse(x, y, radius, radius);
  }
}
