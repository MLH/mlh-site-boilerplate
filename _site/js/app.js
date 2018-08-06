$(document).ready(function() {
  // Hamburger Menu & Anchor Jump
  // This exists on every page.

  $(".hamburger").click(function() {
    $(this).toggleClass("is-active");
    $(".hamburger-active-menu").fadeToggle();
  });

  $("a[href^='#']").anchorjump();
});

console.log(`I've been required by Webpack`);