export function renderHeader1(currentTab) {
  document.querySelector(".header").innerHTML = ` 
    <div class="headerElements">
      <nav class="choosetab">
        <div class="tab main ${currentTab === "main" ? "active" : ""}">
          <a href="Mainpage.html" rel="noopener noreferrer">Home</a>
        </div>
        <div class="tab profile ${currentTab === "profile" ? "active" : ""}">
          <a href="Profilepage.html" rel="noopener noreferrer">Profile</a>
        </div>
        <div class="tab project ${currentTab === "project" ? "active" : ""}">
          <a href="Projectpage.html" rel="noopener noreferrer">Projects</a>
        </div>
        <div class="tab algorithm ${
          currentTab === "algorithm" ? "active" : ""
        }">
          <a href="Algorithmpage.html" rel="noopener noreferrer">Algorithms</a>
        </div>
        <div class="tab gallery ${currentTab === "gallery" ? "active" : ""}">
          <a href="Gallerypage.html" rel="noopener noreferrer">Gallery</a>
        </div>
      </nav>
      <div class="space"></div>
      <div class="contact">
        <div class="instagram contact-icon">
          <a
            href="https://www.instagram.com/c_vgvrthrg"
            target="_blank"
            rel="noopener noreferrer"
            ><img src="../images/icons/InstagramIcon.png" alt="Instagram"
          /></a>
        </div>
        <div class="mail contact-icon">
          <a
            href="mailto:chuminjae@outlook.com"
            target="_blank"
            rel="noopener noreferrer"
            ><img src="../images/icons/MailIcon.png" alt="Mail"
          /></a>
        </div>
        <div class="github contact-icon">
          <a
            href="https://github.com/chuminjae"
            target="_blank"
            rel="noopener noreferrer"
            ><img src="../images/icons/GithubIcon.png" alt="Github"
          /></a>
        </div>
        <div class="smile contact-icon">
          <a
            href="https://blog.naver.com/c_vgvrthrg"
            alt="Blog"
            target="_blank"
            rel="noopener noreferrer"
            ><img src="../images/icons/SmileIcon.png"
          /></a>
        </div>
      </div>
    </div>`;
}
export function renderHeader2(currentTab) {
  document.querySelector(".header").innerHTML = `<div class="headerElements">
        <nav class="choosetab">
        <div class="tab main ${currentTab === "main" ? "active" : ""}">
          <a href="Mainpage.html" rel="noopener noreferrer">Home</a>
        </div>
        <div class="tab profile ${currentTab === "profile" ? "active" : ""}">
          <a href="Profilepage.html" rel="noopener noreferrer">Profile</a>
        </div>
        <div class="tab project ${currentTab === "project" ? "active" : ""}">
          <a href="Projectpage.html" rel="noopener noreferrer">Projects</a>
        </div>
        <div class="tab algorithm ${
          currentTab === "algorithm" ? "active" : ""
        }">
          <a href="Algorithmpage.html" rel="noopener noreferrer">Algorithms</a>
        </div>
        <div class="tab gallery ${currentTab === "gallery" ? "active" : ""}">
          <a href="Gallerypage.html" rel="noopener noreferrer">Gallery</a>
        </div>
      </nav>
        <div class="space"></div>
        <div class="contact">
          <div class="instagram contact-icon">
            <a
              href="https://www.instagram.com/c_vgvrthrg"
              target="_blank"
              rel="noopener noreferrer"
              ><img src="../images/icons/instagram.png" alt="Instagram"
            /></a>
          </div>
          <div class="mail contact-icon">
            <a
              href="mailto:chuminjae@outlook.com"
              target="_blank"
              rel="noopener noreferrer"
              ><img src="../images/icons/mail.png" alt="Mail"
            /></a>
          </div>
          <div class="github contact-icon">
            <a
              href="https://github.com/chuminjae"
              target="_blank"
              rel="noopener noreferrer"
              ><img src="../images/icons/github.png" alt="Github"
            /></a>
          </div>
          <div class="smile contact-icon">
            <a
              href="https://blog.naver.com/c_vgvrthrg"
              alt="Blog"
              target="_blank"
              rel="noopener noreferrer"
              ><img src="../images/icons/smile.png"
            /></a>
          </div>
        </div>
      </div>`;
  document.querySelector(`.${currentTab}`).classList.add("active");
}
