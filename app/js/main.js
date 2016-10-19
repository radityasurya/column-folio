$(function() {
    $(".panels").mousewheel(function(event, delta) {
        this.scrollLeft -= (delta * 30);
        event.preventDefault();
    });
});

$('.tooltip').tooltipster({
    side: 'right',
    theme: 'tooltipster-shadow'
});

var nanobar = new Nanobar();
//move bar
nanobar.go(80);
setTimeout(function() {
    nanobar.go(100);
    $('.fade').removeClass('out');
}, 1000);

$('a.nav__link[href^="#"]').click(function(e) {
    // Prevent the jump and the #hash from appearing on the address bar
    e.preventDefault();
    // Scroll the window, stop any previous animation, stop on user manual scroll
    // Check https://github.com/flesler/jquery.scrollTo for more customizability
    $('.panels').stop(true).scrollTo(this.hash, 700, { offset: { left: -20 } });
});