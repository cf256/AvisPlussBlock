// Websites with the Amedia Am Style
var articleEntryArray = [
    "aasavis.no/",
    "amta.no/",
    "an.no/",
    "auraavis.no/",
    "austagderblad.no/",
    "bygdeposten.no/",
    "eikerbladet.no/",
    "enebakkavis.no/",
    "firda.no/",
    "firdaposten.no/",
    "fremover.no/",
    "hadeland.no/",
    "hardanger-folkeblad.no/",
    "helg.no/",
    "indre.no/",
    "kv.no/",
    "kvinnheringen.no/",
    "laagendalsposten.no/",
    "lierposten.no/",
    "lofot-tidende.no/",
    "lofotposten.no/",
    "noblad.no/",
    "nordhordland.no/",
    "nordlys.no/",
    "oyene.no/",
    "pd.no/",
    "r-a.no/",
    "ranablad.no/",
    "retten.no/",
    "rha.no/",
    "ringblad.no/",
    "ringsaker-blad.no/",
    "sandeavis.no/",
    "smaalenene.no/",
    "svelvikposten.no/",
    "telen.no/",
    "tk.no/",
    "tvedestrandsposten.no/",
    "vestbyavis.no/",
];

// Websites with the Amedia DfskinpaywallStyle
var dfSkinPaywall = [
    "ba.no/",
    "dt.no/",
    "f-b.no/",
    "gjengangeren.no/",
    "glomdalen.no/",
    "h-avis.no/",
    "ha-halden.no/",
    "ifinnmark.no/",
    "jarlsbergavis.no/",
    "moss-avis.no/",
    "oa.no/",
    "oblad.no/",
    "op.no/",
    "ostlendingen.no/",
    "rb.no/",
    "sa.no/",
    "sb.no/",
    "ta.no/",
    "tb.no/",
];
var url = document.URL;
hits = 0;
// Check if paused
chrome.storage.sync.get('paused', function (item) {
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
            ["df-skin-art-Amagasinet-for-abonnenter-nyhet",
                "df-skin-art-For-abonnenter",
                "df-skin-art-Sport-paywall-marking",
                "df-skin-art-Feat-Amagasinet",
                "non-subscriber-stripe"
            ].forEach(function (name) {
                var divs = document.getElementsByClassName(name);
                addClassToArray(divs);
            });
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
                    var premiumLogos = divs[i].getElementsByClassName("am-premium-logo");
                    if (premiumLogos.length) {
                        divs[i].classList.add("blocked");
                        hits++;
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
    return articleEntryArray.filter((site) => url.indexOf(site) >= 0).length;
}

function isPartOfDfSkinPaywallArray() {
    return dfSkinPaywall.filter((site) => url.indexOf(site) >= 0).length;
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
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    // First, validate the message's structure
    if ((msg.from === 'popup') && (msg.subject === 'HitsInfo')) {
        var res = {
            noHits: hits
        };
        // Send response to the popup
        response(res);
    }
});