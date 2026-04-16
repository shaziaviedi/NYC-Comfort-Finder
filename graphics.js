(function () {
  if (typeof window.p5 === "undefined") return;

  var mount = document.getElementById("landing-p5-layer");
  var frame = document.querySelector(".landing__frame");
  var showP5Skyline = false;
  if (!mount || !frame) return;

  function relRect(childRect, parentRect) {
    return {
      x: childRect.left - parentRect.left,
      y: childRect.top - parentRect.top,
      w: childRect.width,
      h: childRect.height
    };
  }

  function drawFlowerCluster(p, x, y, scale, tint) {
    p.push();
    p.translate(x, y);
    p.scale(scale);
    p.stroke(95, 113, 84, 130);
    p.strokeWeight(1);
    p.noFill();
    p.bezier(-14, 10, -10, -8, 4, -22, 18, -26);
    p.noStroke();
    p.fill(196, 165, 116, 180 * tint);
    p.ellipse(12, -24, 14, 9);
    p.fill(139, 154, 122, 180 * tint);
    p.circle(-3, -4, 10);
    p.fill(166, 124, 82, 170 * tint);
    p.circle(20, -8, 8);
    p.pop();
  }

  function drawLandingGraphics(p) {
    var frameRect = frame.getBoundingClientRect();
    if (!frameRect.width || !frameRect.height) return;

    var ovalEl = frame.querySelector(".hero-oval");
    if (!ovalEl) return;

    var oval = relRect(ovalEl.getBoundingClientRect(), frameRect);

    p.clear();

    if (showP5Skyline) {
      var skyLeft = oval.x - oval.w * 0.1;
      var skyTop = oval.y - oval.h * 0.22;
      var skyW = oval.w * 1.2;
      var skyH = oval.h * 0.37;

      p.push();
      p.noStroke();
      p.fill(109, 138, 92, 220);
      p.beginShape();
      p.vertex(skyLeft, skyTop + skyH);
      p.vertex(skyLeft, skyTop + skyH * 0.52);
      for (var i = 0; i <= 12; i++) {
        var t = i / 12;
        var px = skyLeft + skyW * t;
        var py = skyTop + skyH * (0.52 - 0.16 * Math.sin(i * 1.2) - 0.04 * (i % 2));
        p.vertex(px, py);
      }
      p.vertex(skyLeft + skyW, skyTop + skyH);
      p.endShape(p.CLOSE);

      p.fill(79, 107, 71, 225);
      p.beginShape();
      p.vertex(skyLeft, skyTop + skyH);
      p.vertex(skyLeft, skyTop + skyH * 0.62);
      for (var j = 0; j <= 10; j++) {
        var tt = j / 10;
        var qx = skyLeft + skyW * tt;
        var qy = skyTop + skyH * (0.64 - 0.08 * Math.sin(j * 1.05) - 0.02 * (j % 2));
        p.vertex(qx, qy);
      }
      p.vertex(skyLeft + skyW, skyTop + skyH);
      p.endShape(p.CLOSE);

      var buildings = [
        [0.08, 0.3, 0.08, 0.7, 138],
        [0.19, 0.18, 0.07, 0.82, 124],
        [0.29, 0.24, 0.09, 0.76, 133],
        [0.42, 0.08, 0.12, 0.92, 110],
        [0.56, 0.12, 0.09, 0.88, 125],
        [0.67, 0.2, 0.08, 0.8, 141],
        [0.77, 0.14, 0.1, 0.86, 118],
        [0.9, 0.28, 0.07, 0.72, 132]
      ];
      for (var k = 0; k < buildings.length; k++) {
        var b = buildings[k];
        p.fill(b[4], b[4], b[4] - 8, 220);
        p.rect(skyLeft + skyW * b[0], skyTop + skyH * b[1], skyW * b[2], skyH * b[3]);
      }
      p.pop();
    }

    drawFlowerCluster(p, frameRect.width * 0.1, frameRect.height * 0.13, 1.05, 1);
    drawFlowerCluster(p, frameRect.width * 0.9, frameRect.height * 0.15, 0.95, 1);
    drawFlowerCluster(p, frameRect.width * 0.08, frameRect.height * 0.72, 0.9, 0.9);
    drawFlowerCluster(p, frameRect.width * 0.9, frameRect.height * 0.68, 0.95, 0.95);
    drawFlowerCluster(p, frameRect.width * 0.93, frameRect.height * 0.43, 0.8, 0.7);

  }

  var sketch = function (p) {
    p.setup = function () {
      p.createCanvas(mount.clientWidth, mount.clientHeight).parent(mount);
      p.noLoop();
      drawLandingGraphics(p);
    };

    p.windowResized = function () {
      if (!mount.clientWidth || !mount.clientHeight) return;
      p.resizeCanvas(mount.clientWidth, mount.clientHeight);
      drawLandingGraphics(p);
    };

    p.draw = function () {
      drawLandingGraphics(p);
    };
  };

  var instance = new window.p5(sketch);

  var ro = new ResizeObserver(function () {
    instance.windowResized();
  });
  ro.observe(mount);
  ro.observe(frame);

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) instance.redraw();
  });
})();
