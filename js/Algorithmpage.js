import { renderHeader1 } from "./renderHeader.js";
import { PageAlContents } from "./AlgorithmexplanationpageContents.js";
function renderPageAnimation() {
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

  // init
  window.requestAnimationFrame(animator);
}
function renderMainHeader() {
  document.querySelector(".main-header").innerHTML = `<div class="clock"></div>
        <div class="newtonsCradle">
          <div class="frameCover"></div>
          <div class="frame">
            <div class="sphere-wrap left">
              <div class="string string-left"></div>
              <div class="sphere"></div>
            </div>
            <div class="sphere center"></div>
            <div class="sphere center"></div>
            <div class="sphere center"></div>
            <div class="sphere-wrap right">
              <div class="string string-right"></div>
              <div class="sphere"></div>
            </div>
          </div>
          <div class="base"></div>
        </div>
        <div class="title-header">
          <img src="images/Algorithmpage/logo.png" class="logo" />
          <a class="title">Algorithms</a>
          <img src="images/Algorithmpage/logo.png" class="logo" />
        </div>
        <div class="dinosaur">
          <div class="dino">
            <div class="dino__head">
              <div class="dino__head__back"></div>
              <div class="dino__head__topfront"></div>
              <div class="dino__head__mouth"></div>
              <div class="dino__head__throat"></div>
              <div class="dino__head__eye"></div>
            </div>

            <div class="dino__body">
              <div class="dino__body__mid"></div>
              <div class="dino__arm"></div>
            </div>

            <div class="dino__back-leg"></div>

            <div class="dino__tail"></div>

            <div class="dino__bottom"></div>
            <div class="dino__bottom__shadow"></div>

            <div class="dino__front-leg"></div>
          </div>
          <div class="floor"></div>
        </div>

        <div class="search-container">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            class="search-input js-search"
          />
          <a href="#" class="search-btn">
            <i class="fas fa-search js-search-btn"></i>
          </a>
        </div>`;
}
function renderContentsPage() {
  let contentsHTML = "";
  const url = new URL(window.location.href);
  let search = url.searchParams.get("search");
  let filteredContents = PageAlContents;
  if (search) {
    search = search.toLowerCase();
    filteredContents = PageAlContents.filter((content) => {
      return (
        content.title.toLowerCase().includes(search) ||
        content.tag.toLowerCase().includes(search)
      );
    });
  }
  filteredContents.forEach((content) => {
    contentsHTML += `<div class="problem-container">
          <div class="upperpart"><a href="${content.link1}" target="_blank"><img src="images/Algorithmpage/${content.type}" />
          </a></div>
          <div class="lowerpart">
            <a href="Algorithmexplanationpage.html?AlgorithmId=${content.id}">
            <div class="problem">
              <div class="problem-title">
                ${content.title}
              </div>
              <div class="problem-difficulty">
                <img src="images/Algorithmpage/difficulty/difficulty${content.difficulty}.png" />
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
function renderAlgorithmPage() {
  renderHeader1("algorithm");
  renderMainHeader();
  renderPageAnimation();
  renderContentsPage();
  document
    .querySelector(".js-search-btn")
    .addEventListener("click", (event) => {
      const search = document.querySelector(".js-search").value;
      window.location.href = `Algorithmpage.html?search=${search}`;
    });
  document.querySelector(".js-search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const search = document.querySelector(".js-search").value;
      window.location.href = `Algorithmpage.html?search=${search}`;
    }
  });
}
renderAlgorithmPage();
