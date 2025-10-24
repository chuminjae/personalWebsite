import { renderHeader2 } from "./renderHeader.js";
function renderProfilePage() {
  renderHeader2("profile");
  document.querySelector(
    ".main-element"
  ).innerHTML = `<canvas id="bgCanvas"></canvas>
      <div class="container">
        <div class="text"></div>
      </div>
      <div class="test"></div>
      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <div class="footer">© 2025 Minjae Chu. All rights reserved.</div>`;
  (function () {
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    window.requestAnimationFrame = requestAnimationFrame;
  })();

  // Terrain stuff.
  var background = document.getElementById("bgCanvas"),
    bgCtx = background.getContext("2d"),
    width = window.innerWidth,
    height = document.body.offsetHeight;

  height < 400 ? (height = 400) : height;

  background.width = width;
  background.height = height;

  function Terrain(options) {
    options = options || {};
    this.terrain = document.createElement("canvas");
    this.terCtx = this.terrain.getContext("2d");
    this.scrollDelay = options.scrollDelay || 90;
    this.lastScroll = new Date().getTime();

    this.terrain.width = width;
    this.terrain.height = height;
    this.fillStyle = options.fillStyle || "#191D4C";
    this.mHeight = options.mHeight || height;

    // generate
    this.points = [];

    var displacement = options.displacement || 140,
      power = Math.pow(2, Math.ceil(Math.log(width) / Math.log(2)));

    // set the start height and end height for the terrain
    this.points[0] = this.mHeight; //(this.mHeight - (Math.random() * this.mHeight / 2)) - displacement;
    this.points[power] = this.points[0];

    // create the rest of the points
    for (var i = 1; i < power; i *= 2) {
      for (var j = power / i / 2; j < power; j += power / i) {
        this.points[j] =
          (this.points[j - power / i / 2] + this.points[j + power / i / 2]) /
            2 +
          Math.floor(Math.random() * -displacement + displacement);
      }
      displacement *= 0.6;
    }

    document.body.appendChild(this.terrain);
  }

  Terrain.prototype.update = function () {
    // draw the terrain
    this.terCtx.clearRect(0, 0, width, height);
    this.terCtx.fillStyle = this.fillStyle;

    if (new Date().getTime() > this.lastScroll + this.scrollDelay) {
      this.lastScroll = new Date().getTime();
      this.points.push(this.points.shift());
    }

    this.terCtx.beginPath();
    for (var i = 0; i <= width; i++) {
      if (i === 0) {
        this.terCtx.moveTo(0, this.points[0]);
      } else if (this.points[i] !== undefined) {
        this.terCtx.lineTo(i, this.points[i]);
      }
    }

    this.terCtx.lineTo(width, this.terrain.height);
    this.terCtx.lineTo(0, this.terrain.height);
    this.terCtx.lineTo(0, this.points[0]);
    this.terCtx.fill();
  };

  // Second canvas used for the stars
  bgCtx.fillStyle = "#05004c";
  bgCtx.fillRect(0, 0, width, height);

  // stars
  function Star(options) {
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.05;
    this.x = options.x;
    this.y = options.y;
  }

  Star.prototype.reset = function () {
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.05;
    this.x = width;
    this.y = Math.random() * height;
  };

  Star.prototype.update = function () {
    this.x -= this.speed;
    if (this.x < 0) {
      this.reset();
    } else {
      bgCtx.fillRect(this.x, this.y, this.size, this.size);
    }
  };

  function ShootingStar() {
    this.reset();
  }

  ShootingStar.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = 0;
    this.len = Math.random() * 80 + 10;
    this.speed = Math.random() * 10 + 6;
    this.size = Math.random() * 1 + 0.1;
    // this is used so the shooting stars arent constant
    this.waitTime = new Date().getTime() + Math.random() * 3000 + 500;
    this.active = false;
  };

  ShootingStar.prototype.update = function () {
    if (this.active) {
      this.x -= this.speed;
      this.y += this.speed;
      if (this.x < 0 || this.y >= height) {
        this.reset();
      } else {
        bgCtx.lineWidth = this.size;
        bgCtx.beginPath();
        bgCtx.moveTo(this.x, this.y);
        bgCtx.lineTo(this.x + this.len, this.y - this.len);
        bgCtx.stroke();
      }
    } else {
      if (this.waitTime < new Date().getTime()) {
        this.active = true;
      }
    }
  };

  var entities = [];

  // init the stars
  for (var i = 0; i < height; i++) {
    entities.push(
      new Star({
        x: Math.random() * width,
        y: Math.random() * height,
      })
    );
  }

  // Add 2 shooting stars that just cycle.
  entities.push(new ShootingStar());
  entities.push(new ShootingStar());
  entities.push(new Terrain({ mHeight: height / 2 - 120 }));
  entities.push(
    new Terrain({
      displacement: 120,
      scrollDelay: 50,
      fillStyle: "rgb(17,20,40)",
      mHeight: height / 2 - 60,
    })
  );
  entities.push(
    new Terrain({
      displacement: 100,
      scrollDelay: 20,
      fillStyle: "rgb(10,10,5)",
      mHeight: height / 2,
    })
  );

  //animate background
  function animate() {
    bgCtx.fillStyle = "#110E19";
    bgCtx.fillRect(0, 0, width, height);
    bgCtx.fillStyle = "#ffffff";
    bgCtx.strokeStyle = "#ffffff";

    var entLen = entities.length;

    while (entLen--) {
      entities[entLen].update();
    }
    requestAnimationFrame(animate);
  }
  animate();
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = "!<>-_\\/[]{}—=+*^?#________";
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = "";
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  const phrases = [
    "Hello",
    "My name is Minjae Chu",
    "I am a cs student in NUS",
    "I'm starting my military service soon.",
    "I'm so sad",
    " ",
  ];
  const el = document.querySelector(".text");
  const fx = new TextScramble(el);
  const body = document.querySelector(".body-element");
  let counter = 0;
  const next = () => {
    // 현재 텍스트 보여주기
    fx.setText(phrases[counter]).then(() => {
      counter++;
      if (counter < phrases.length) {
        // 아직 남은 문장이 있으면 다음 문장 호출
        setTimeout(next, 800);
      } else {
        document.querySelector(
          ".test"
        ).innerHTML = `<div class="card-container">
        <span class="pro">PRO</span>
        <img class="round" src="../images/Profilepage/profile.png" />
        <h3>Minjae Chu</h3>
        <h6>Kr Sg</h6>
        <p>
          Student at NUS  <br />
          
        </p>
        <div class="buttons">
        <a href="mailto:chuminjae@outlook.com"
              target="_blank"
              rel="noopener noreferrer"> 
            <button class="primary">Message</button>
            </a>
              <a href="https://www.youtube.com/watch?v=GsdnGqNeIZU&list=RDGsdnGqNeIZU&start_radio=1" target="_blank"
              rel="noopener noreferrer">
          <button class="primary ghost">Feel depressed?</button> </a>
        </div>
        <div class="skills">
          <h6>Skills</h6>
          <ul>
            <li>Sleeping</li>
            <li>Eating a lot</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Node</li>
            <li>C++</li>
            <li>Java</li>
          </ul>
        </div>
      </div>`;
      }
    });
  };

  next();
}
renderProfilePage();
