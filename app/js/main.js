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