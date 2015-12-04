// Websites with the Amedia Am Style
var articleEntryArray = [
    "http://www.amta.no/",
    "http://www.retten.no/",
    "http://www.auraavis.no/",
    "http://www.austagderblad.no/",
    "http://www.nordhordland.no/",
    "http://www.an.no/",
    "http://www.bygdeposten.no/",
    "http://www.eikerbladet.no/",
    "http://www.enebakkavis.no/",
    "http://www.firda.no/",
    "http://www.firdaposten.no/",
    "http://www.fremover.no/",
    "http://www.hadeland.no/",
    "http://www.hardanger-folkeblad.no/",
    "http://www.helg.no/",
    "http://www.indre.no/",
    "http://www.kv.no/",
    "http://www.kvinnheringen.no/",
    "http://www.laagendalsposten.no/",
    "http://www.lierposten.no/",
    "http://www.lofotposten.no/",
    "http://www.lofot-tidende.no/",
    "http://www.oyene.no/",
    "http://www.noblad.no/",
    "http://www.pd.no/",
    "http://www.r-a.no/",
    "http://www.ranablad.no/",
    "http://www.ringblad.no/",
    "http://www.ringsaker-blad.no/",
    "http://www.rha.no/",
    "http://www.sandeavis.no/",
    "http://www.smaalenene.no/",
    "http://www.svelvikposten.no/",
    "http://www.telen.no/",
    "http://www.tk.no/",
    "http://www.tvedestrandsposten.no/",
    "http://www.vestbyavis.no/",
    "http://www.aasavis.no/",
];

// Websites with the Amedia DfskinpaywallStyle
var dfSkinPaywall = [
    "http://www.ba.no/",
    "http://www.dt.no/",
    "http://www.ifinnmark.no/",
    "http://www.f-b.no/",
    "http://www.gjengangeren.no/",
    "http://www.glomdalen.no/",
    "http://www.ha-halden.no/",
    "http://www.h-avis.no/",
    "http://www.jarlsbergavis.no/",
    "http://www.moss-avis.no/",
    "http://www.nordlys.no/",
    "http://www.oa.no/",
    "http://www.rb.no/",
    "http://www.sb.no/",
    "http://www.sa.no/",
    "http://www.ta.no/",
    "http://www.tb.no/",
    "http://www.oblad.no/",
    "http://www.op.no/",
    "http://www.ostlendingen.no/",
];
var url = document.URL;
hits = 0;
// Check if paused
chrome.storage.sync.get('paused', function(item) {
    if (item.paused === 'false') {
        if (isBt() || isAftenbladet() || isFvn()) {
            // Removes the 'For Abonnementer' section on BT. 
            if (isBt()) {
                var div = document.getElementsByClassName("df-skin-theme-Perks");
                addClassToArray(div);
            }
            var divs = document.getElementsByClassName("df-skin-paywall-closed");
            addClassToArray(divs);
        } else if (isVg()) {
            var divs = document.getElementsByClassName("article-extract");
            for (var i = 0; i < divs.length; i++) {
                if (divs[i].hasChildNodes()) {
                    var spans = divs[i].querySelectorAll("span");
                    for (var j = 0; j < spans.length; j++) {
                        if (spans[j].classList.contains("df-img-skin-pluss")) {
                            divs[i].classList.add("blocked");
                            hits++;
                        }
                    }
                }
            }
            var vgPlussTeaser = document.getElementById("pluss-teaser");
            vgPlussTeaser.classList.add("blocked");
            hits++;
        } else if (isDb()) {
            var articles = document.getElementsByClassName("preview");
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].hasChildNodes()) {
                    var child = articles[i].children[0];
                    var href = child.getAttribute("href");
                    if (href.indexOf("/pluss/") >= 0) {
                        articles[i].classList.add("blocked");
                        hits++;
                    }
                }
            }
            // Native ads
            var divs = document.getElementsByClassName("native-advertisement");
            addClassToArray(divs);
        } else if (isAp()) {
            var divs = document.getElementsByClassName("df-skin-art-Feat-Amagasinet");
            addClassToArray(divs);
        } else if (isDn()) {
            if (url.indexOf("/d2/")) {
                var articles = document.querySelectorAll("article");
                for (var i = 0; i < articles.length; i++) {
                    if (articles[i].hasChildNodes()) {
                        var child = articles[i].children[0].children[0].children[0];
                        if (hasClass(child, "paid-article")) {
                            articles[i].classList.add("blocked");
                            hits++;
                        }
                    }
                }
            }
            var divs = document.getElementsByClassName("df-skin-paid");
            addClassToArray(divs);
        } else if (isAdressa()) {
            var divs = document.getElementsByClassName("article payed");
            addClassToArray(divs);
        } else if (isPartOfArticleArray()) {
            var divs = document.getElementsByClassName("am-articleEntry");
            for (var i = 0; i < divs.length; i++) {
                if (divs[i].hasChildNodes()) {
                    var spans = divs[i].querySelectorAll("span");
                    for (var j = 0; j < spans.length; j++) {
                        if (spans[j].classList.contains("am-premium-logo")) {
                            divs[i].classList.add("blocked");
                            hits++;
                        }
                    }
                }
            }
        } else if (isPartOfDfSkinPaywallArray()) {
            var divs = document.getElementsByClassName("df-skin-paywall");
            addClassToArray(divs);
        } else if (isTek()) {
            var divs = document.getElementsByClassName("access-subscription");
            addClassToArray(divs);
        } else if (isDinSide()) {
            var divs = document.getElementsByClassName("native_ad")
            addClassToArray(divs);
        }
    }
});

// Checks if an element has a specific class
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

// Iterates over an array of divs and adds the blocked class
function addClassToArray(array) {
    for (var i = 0; i < array.length; i++) {
        array[i].classList.add("blocked");
        hits++;
    }
}

// Boolean functions to increase readability
function isVg() {
    return url.indexOf("vg.no") >= 0;
}

function isAdressa() {
    return url.indexOf("adressa.no") >= 0;
}

function isBt() {
    return url.indexOf("bt.no") >= 0;
}

function isAp() {
    return url.indexOf("aftenposten.no") >= 0;
}

function isFvn() {
    return url.indexOf("fvn.no") >= 0;
}

function isAftenbladet() {
    return url.indexOf("aftenbladet.no") >= 0;
}

function isDb() {
    return url.indexOf("dagbladet.no") >= 0;
}

function isDn() {
    return url.indexOf("dn.no") >= 0;
}

function isPartOfArticleArray() {
    return articleEntryArray.indexOf(url) >= 0;
}

function isPartOfDfSkinPaywallArray() {
    return dfSkinPaywall.indexOf(url) >= 0;
}

function isTek() {
    return url.indexOf("tek.no") >= 0;
}

function isDinSide() {
    return url.indexOf("dinside.no") >= 0;
}

// Inform background page that this tab should have a
// page action (i.e. it is one of the websites we check) 
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    // First, validate the message's structure
    if ((msg.from === 'popup') && (msg.subject === 'HitsInfo')) {
        var res = {
            noHits: hits
        };
        // Send response to the popup
        response(res);
    }
});