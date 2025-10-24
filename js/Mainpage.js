import { renderHeader1 } from "./renderHeader.js";
function renderMainPage() {
  renderHeader1("main");
  document.querySelector(".main-element").innerHTML = `<div class="slider">
        <div class="list">
          <div class="item active">
            <img src="images/Mainpage/Profilepagebackground.jpg" />
            <a href="Profilepage.html" rel="noopener noreferrer">
              <div class="content">
                <p>page 1</p>
                <h2>Profile</h2>
                <p>Just about meeeee!</p>
              </div>
            </a>
          </div>
          <div class="item">
            <img
              src="images/Mainpage/teletubbies_wallpaper_1_by_gikesmanners1995_dk2c9yh-fullview.jpg"
            />
            <a href="Projectpage.html" rel="noopener noreferrer">
              <div class="content">
                <p>page 2</p>
                <h2>Projects</h2>
                <p>Interesting projects + Something I'm working on</p>
              </div>
            </a>
          </div>
          <div class="item">
            <img src="images/Mainpage/Algorithmpagebackground.jpg" />
            <a href="Algorithmpage.html" rel="noopener noreferrer">
              <div class="content">
                <p>page 3</p>
                <h2>Algorithms</h2>
                <p>Grinding leetcode and codeforces</p>
              </div>
            </a>
          </div>
          <div class="item">
            <img src="images/Mainpage/Gallerypagebackground.jpg" />
            <a href="Gallerypage.html" rel="noopener noreferrer">
              <div class="content">
                <p>page 4</p>
                <h2>Gallery</h2>
                <p>Pictures of me and my friends</p>
              </div>
            </a>
          </div>
        </div>
      </div>`;
  sliderAnimation();
}
function sliderAnimation() {
  let items = document.querySelectorAll(".slider .list .item");
  let countItem = items.length;
  let itemActive = 0;
  function next() {
    itemActive += 1;
    if (itemActive >= countItem) {
      itemActive = 0;
    }
    showSlider();
  }
  let refreshInterval = setInterval(() => {
    next();
  }, 3500);
  function showSlider() {
    let itemActiveOld = document.querySelector(".slider .list .item.active");
    itemActiveOld.classList.remove("active");
    items[itemActive].classList.add("active");
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      next();
    }, 3500);
  }
}

renderMainPage();
