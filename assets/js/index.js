import ScrollReveal from 'scrollreveal'
var Instafeed = require("instafeed.js")

window.sr = ScrollReveal()
sr.reveal('p')
sr.reveal('h1')
sr.reveal('h3')
sr.reveal('#penjelasan li', 200)
sr.reveal('#header-container > *', 500)
sr.reveal('#about img', 500)
sr.reveal('.event-box', 200)
sr.reveal('fieldset > *', 150)
sr.reveal('#contacts-list div', 200)

var feed = new Instafeed({
    clientId: 'b1ff84b8ef0346b594386c8908a77e3a'
})
feed.run()