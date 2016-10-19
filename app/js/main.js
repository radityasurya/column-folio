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