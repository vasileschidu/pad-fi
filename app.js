var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;
    this.cursorBlinkInterval = 500; // Adjust the blinking interval as needed
    this.tick();
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Set the cursor styles for rectangle shape with padding
    var cursorWidth = '3px'; // Adjust the width as needed
    var cursorHeight = '80px'; // Adjust the height as needed
    var cursorColor = '#fff'; // Adjust the color as needed
    var cursorPaddingTop = '8px'; // Adjust the top padding as needed

    this.el.innerHTML = '<span class="text">' + this.txt + '</span>' +
                        '<div class="cursor" style="width: ' + cursorWidth + '; height: ' + cursorHeight + '; background-color: ' + cursorColor + '; padding-top: ' + cursorPaddingTop + ';"></div>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".text { background: linear-gradient(to right, #81ABEC, #774FC9, #FFCB92); -webkit-background-clip: text; color: transparent; animation: type-animation 1s ease-out; } @keyframes type-animation { from { width: 0; } to { width: 100%; } } .cursor { animation: blink-animation 1s infinite; display: inline-block; vertical-align: middle; } @keyframes blink-animation { 0%, 100% { opacity: 0; } 50% { opacity: 1; } } body { animation: gradient-animation 5s linear infinite; } @keyframes gradient-animation { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }";
    document.body.appendChild(css);
};
