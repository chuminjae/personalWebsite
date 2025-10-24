import { renderHeader1 } from "./renderHeader.js";
import { PagePContents } from "./ProjectexplanationpageContents.js";
function etcetra() {
  const btn = document.querySelector(".particleButton");
  const FADE_DURATION = 1000;
  btn.addEventListener("click", () => {
    btn.classList.toggle("liked");

    const isLiked = btn.classList.contains("liked");
    if (!isLiked) {
      return;
    }

    const particles = [];
    range(5).forEach(() => {
      const particle = document.createElement("span");
      particle.classList.add("particle");

      const angle = random(0, 360);
      const distance = random(32, 40);

      // NOTE: Be sure to specify the angle as degrees, not pixels:
      particle.style.setProperty("--angle", angle + "deg");
      particle.style.setProperty("--distance", distance + "px");

      particle.style.setProperty("--fade-duration", FADE_DURATION + "ms");

      btn.appendChild(particle);
      particles.push(particle);
    });

    window.setTimeout(() => {
      particles.forEach((particle) => {
        particle.remove();
      });
    }, FADE_DURATION + 200);
  });

  /**
   * Produces a random number between the inclusive lower and upper bounds.
   * If only one argument is provided, a number between 0 and that number is returned.
   * If `floating` is true, or either bound is a float, a floating-point number is returned.
   *
   * @param {number} [lower=0] - The lower bound.
   * @param {number} [upper=1] - The upper bound.
   * @param {boolean} [floating] - Specify returning a floating-point number.
   * @returns {number} Returns the random number.
   */
  function random(lower = 0, upper = 1, floating) {
    // If only one argument is passed, shift params
    if (upper === undefined) {
      upper = lower;
      lower = 0;
    }

    // Determine if result should be floating
    if (
      floating === true ||
      !Number.isInteger(lower) ||
      !Number.isInteger(upper)
    ) {
      return Math.random() * (upper - lower) + lower;
    }

    // Inclusive integer
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }

  /**
   * Creates an array of numbers progressing from `start` up to, but not including, `end`.
   *
   * If `end` is not specified, it's set to `start` with `start` then set to 0.
   * A `step` of -1 is used if `start` is greater than `end`.
   *
   * @param {number} [start=0] - The start of the range.
   * @param {number} [end] - The end of the range (not included).
   * @param {number} [step=1] - The value to increment or decrement by.
   * @returns {number[]} Returns the range of numbers.
   */
  function range(start = 0, end, step) {
    // Handle case where only one argument is provided
    if (end === undefined) {
      end = start;
      start = 0;
    }

    // Default step depending on direction
    if (step === undefined) {
      step = start < end ? 1 : -1;
    }

    const result = [];
    const ascending = step > 0;

    if (ascending) {
      for (let i = start; i < end; i += step) {
        result.push(i);
      }
    } else {
      for (let i = start; i > end; i += step) {
        result.push(i);
      }
    }

    return result;
  }
  const numbers = [
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], // 0
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1], // 1
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1], // 2
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 3
    [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1], // 4
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1], // 5
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1], // 6
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0], // 7
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 9
  ];
  const clock = document.querySelector(".clock");
  for (let i = 0; i < 60; i++) {
    const block = document.createElement("div");
    block.className = "block";
    block.dataset.num = i;
    clock.appendChild(block);
  }
  const blocks = [];
  const digits = Array.from(document.querySelectorAll(".block"));

  for (let i = 0; i < 4; i++) {
    blocks.push(digits.slice(i * 15, i * 15 + 15));
  }

  const setNum = (block, num) => {
    let n = numbers[num];
    for (let i = 0; i < block.length; i++) {
      block[i].classList[n[i] === 1 ? "add" : "remove"]("active");
    }
  };

  const time = {
    s: "",
    m: "",
    h: "",
    p: null,
  };

  // time loop
  const animator = () => {
    let d = new Date(),
      h = d.getHours().toString(),
      m = d.getMinutes().toString(),
      s = d.getSeconds().toString();

    s = s.length === 1 ? "0" + s : s;
    m = m.length === 1 ? "0" + m : m;
    h = h.length === 1 ? "0" + h : h;

    if (s !== time.s) {
      for (let i = 0; i < digits.length; i++) {
        let d = digits[i];
        if (i === +s) {
          d.classList.add("second");
          if (time.p !== null) digits[time.p].classList.remove("second");
          time.p = i;
          time.s = s;
        }
      }
    }

    if (m !== time.m) {
      setNum(blocks[2], m[0]);
      setNum(blocks[3], m[1]);
      time.m = m;
    }

    if (h !== time.h) {
      setNum(blocks[0], h[0]);
      setNum(blocks[1], h[1]);
      time.h = h;
    }
    window.requestAnimationFrame(animator);
  };

  window.requestAnimationFrame(animator);
}
function renderMainHeader() {
  document.querySelector(
    ".js-main-header"
  ).innerHTML = `<div class="clock"></div>
        <div class="main-container">
          <div class="container">
            <div class="center">
              <div class="wrap">
                <div class="box-1 box">
                  <i class="fas fa-file-code"></i>
                  <i class="fas fa-file-code"></i>
                </div>
                <div class="box-2 box">
                  <i class="fas fa-file-code"></i>
                  <i class="fas fa-file-code"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="title-header">
          <img src="../images/Projectpage/game.png" class="logo" />
          <a class="title">Projects</a>
          <img src="../images/Projectpage/game.png" class="logo" />
        </div>
        <div class="heart">
          <button class="particleButton">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3.68546 5.43796C8.61936 1.29159 11.8685 7.4309 12.0406 7.4309C12.2126 7.43091 15.4617 1.29159 20.3956 5.43796C26.8941 10.8991 13.5 21.8215 12.0406 21.8215C10.5811 21.8215 -2.81297 10.8991 3.68546 5.43796Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
          <div class="search-box">
    <button class="btn-search"><i class="fas fa-search js-search-btn"></i></button>
    <input type="text" class="input-search js-search" placeholder="Type to Search...">
  </div>`;
  etcetra();
}
function renderProjectPage() {
  renderHeader1("project");
  renderMainHeader();
  renderContentsPage();
  document
    .querySelector(".js-search-btn")
    .addEventListener("click", (event) => {
      const search = document.querySelector(".js-search").value;
      window.location.href = `Projectpage.html?search=${search}`;
    });
  document.querySelector(".js-search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const search = document.querySelector(".js-search").value;
      window.location.href = `Projectpage.html?search=${search}`;
    }
  });
}

function renderContentsPage() {
  let contentsHTML = "";
  const url = new URL(window.location.href);
  let search = url.searchParams.get("search");
  let filteredContents = PagePContents;
  if (search) {
    search = search.toLowerCase();
    filteredContents = PagePContents.filter((content) => {
      return (
        content.title.toLowerCase().includes(search) ||
        content.tag.toLowerCase().includes(search)
      );
    });
  }
  filteredContents.forEach((content) => {
    contentsHTML += `<div class="problem-container">
             <div class="upperpart"><a href="${content.link1}" target="_blank"><img src="../images/Projectpage/${content.type}" />
             </a></div>
             <div class="lowerpart">
               <a href="Projectexplanationpage.html?ProjectId=${content.id}">
               <div class="problem">
                 <div class="problem-title">
                   ${content.title}
                 </div>
                 <div class="problem-difficulty">
                   <img src="../images/Projectpage/difficulty/difficulty${content.difficulty}.png" />
                 </div>
               </div>
               <div class="problem-tag">
                 ${content.tag}
               </div>
               <div class="problem-date">${content.date}</div>
               </a>
             </div>
           </div>`;
  });
  document.querySelector(".js-contents").innerHTML = contentsHTML;
}
renderProjectPage();
