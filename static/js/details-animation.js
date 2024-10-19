var duration = 3000
var easing = "cubic-bezier(0.39, 0.575, 0.565, 1.0)"

class Accordion {
    constructor(el, duration, easing) {
        this.el = el;
        this.summary = el.querySelector("summary");
        this.content = el.querySelector(".body");
        this.animation = null;
        this.isClosing = false;
        this.isExpanding = false;
        this.summary.addEventListener("click", (e => this.onClick(e)))

        this.duration = duration;
        this.easing = easing;
    }
    onClick(e) {
        e.preventDefault();
        this.el.style.overflow = "hidden";
        if (this.isClosing || !this.el.open) {
            this.open()
        } else if (this.isExpanding || this.el.open) {
            this.shrink()
        }
    }
    shrink() {
        this.isClosing = true;
        const startHeight = `${this.el.offsetHeight}px`;
        const endHeight = `${this.summary.offsetHeight}px`;

        console.log("收缩",this.el.offsetHeight,this.summary.offsetHeight,this.content.offsetHeight)
        console.log("收缩",startHeight,endHeight)

        //parseFloat(window.getComputedStyle(this.el, null).getPropertyValue('padding-up'))
        if (this.animation) {
            this.animation.cancel()
        }
        this.animation = this.el.animate({
            height: [startHeight, endHeight]
        }, {
            duration: this.duration,
            easing: this.easing
        });
        this.animation.onfinish = () => this.onAnimationFinish(false);
        this.animation.oncancel = () => this.isClosing = false
    }
    open() {
        this.el.style.height = `${this.el.offsetHeight}px`;
        this.el.open = true;
        window.requestAnimationFrame((() => this.expand()))
    }
    expand() {
        this.isExpanding = true;
        const startHeight = `${(this.el.offsetHeight - this.summary.offsetHeight)/2}px`;
        const endHeight = `${610}px`;
        
        console.log("扩展",this.el.offsetHeight,this.summary.offsetHeight,this.content.offsetHeight)
        console.log("扩展",startHeight,endHeight)

        if (this.animation) {
            this.animation.cancel()
        }
        this.animation = this.el.animate({
            height: [startHeight, endHeight]
        }, {
            duration: this.duration,
            easing: this.easing
        });
        this.animation.onfinish = () => this.onAnimationFinish(true);
        this.animation.oncancel = () => this.isExpanding = false
    }
    onAnimationFinish(open) {
        this.el.open = open;
        this.animation = null;
        this.isClosing = false;
        this.isExpanding = false;
        this.el.style.height = this.el.style.overflow = ""
    }
}


    document.querySelectorAll("details").forEach((el => {
        // new Accordion(el, duration, easing)
    }));




// new Accordion(el, 300, "cubic-bezier(0.39, 0.575, 0.565, 1.0)")