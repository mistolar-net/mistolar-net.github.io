(function () {
  "use strict";

  window._slides = window._slides || [];

  window.Slide = function Slide(width, height, url, caption) {
    this.width = width;
    this.height = height;
    this.url = url;
    this.caption = caption || "";
  };

  var currentAlbum = [];
  var currentIndex = 0;
  var overlay;
  var image;
  var caption;
  var position;

  function showCurrentSlide() {
    var slide = currentAlbum[currentIndex];
    image.src = slide.url;
    image.alt = slide.caption;
    caption.textContent = slide.caption;
    position.textContent = currentIndex + 1 + " of " + currentAlbum.length;
  }

  function move(offset) {
    currentIndex = (currentIndex + offset + currentAlbum.length) % currentAlbum.length;
    showCurrentSlide();
  }

  function close() {
    if (overlay) {
      overlay.hidden = true;
      document.body.style.overflow = "";
    }
  }

  function button(label, className, handler) {
    var control = document.createElement("button");
    control.type = "button";
    control.className = className;
    control.setAttribute("aria-label", label);
    control.textContent = label;
    control.addEventListener("click", handler);
    return control;
  }

  function ensureOverlay() {
    if (overlay) return;

    var style = document.createElement("style");
    style.textContent =
      ".mistolar-slideshow{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.88);padding:24px}" +
      ".mistolar-slideshow[hidden]{display:none}" +
      ".mistolar-slideshow__figure{position:relative;max-width:100%;max-height:100%;margin:0;text-align:center;color:#fff;font:14px Arial,sans-serif}" +
      ".mistolar-slideshow__image{display:block;max-width:calc(100vw - 96px);max-height:calc(100vh - 120px);margin:auto;background:#000}" +
      ".mistolar-slideshow__caption{margin-top:10px}" +
      ".mistolar-slideshow__position{margin-top:4px;color:#ccc;font-size:12px}" +
      ".mistolar-slideshow__close,.mistolar-slideshow__previous,.mistolar-slideshow__next{position:fixed;border:0;background:rgba(0,0,0,.55);color:#fff;cursor:pointer;font:32px/1 Arial,sans-serif;padding:10px 14px}" +
      ".mistolar-slideshow__close{right:14px;top:12px}" +
      ".mistolar-slideshow__previous{left:12px;top:50%;transform:translateY(-50%)}" +
      ".mistolar-slideshow__next{right:12px;top:50%;transform:translateY(-50%)}";
    document.head.appendChild(style);

    overlay = document.createElement("div");
    overlay.className = "mistolar-slideshow";
    overlay.hidden = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Photo slideshow");

    var figure = document.createElement("figure");
    figure.className = "mistolar-slideshow__figure";
    image = document.createElement("img");
    image.className = "mistolar-slideshow__image";
    caption = document.createElement("figcaption");
    caption.className = "mistolar-slideshow__caption";
    position = document.createElement("div");
    position.className = "mistolar-slideshow__position";
    figure.appendChild(image);
    figure.appendChild(caption);
    figure.appendChild(position);

    overlay.appendChild(figure);
    overlay.appendChild(button("Close", "mistolar-slideshow__close", close));
    overlay.appendChild(button("Previous", "mistolar-slideshow__previous", function () { move(-1); }));
    overlay.appendChild(button("Next", "mistolar-slideshow__next", function () { move(1); }));
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) close();
    });
    document.body.appendChild(overlay);

    document.addEventListener("keydown", function (event) {
      if (overlay.hidden) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    });
  }

  window.openSlideShow = function openSlideShow(imageGroup, initialIndex) {
    currentAlbum = window._slides[imageGroup] || [];
    if (!currentAlbum.length) return;
    currentIndex = Number(initialIndex) || 0;
    ensureOverlay();
    showCurrentSlide();
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  };

  window.onLoadBodyAlbums = function onLoadBodyAlbums() {};
})();
