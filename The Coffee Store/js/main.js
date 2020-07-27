var backgroundBlack = document.querySelector("#background2")
var title = document.querySelector("#title")
var viewPortHeight = window.innerHeight

window.addEventListener("scroll", parallax)

function parallax () {
    var scrolled = window.pageYOffset
    var rate = (1 / viewPortHeight) * scrolled
    backgroundBlack.style.opacity = rate
    title.style.transform = "translateY(" + scrolled / 2 + "px)"
    console.log(scrolled/2)
    console.log(viewPortHeight)
}
