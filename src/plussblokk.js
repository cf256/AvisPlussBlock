/*	Websites with the Amedia Am Style 	*/
var articleEntryArray= [
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

/*	Websites with the Amedia DfskinpaywallStyle*/
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
//TODO "for abbonnementer" df+skin published? fanaposten closed sunnhordaland special
var url = document.URL;

/*	BT/Aftenbladet/Fedrelandsvennen	*/
if(url.indexOf("bt.no") >= 0 || url.indexOf("aftenbladet.no") >= 0 || url.indexOf("fvn.no") >= 0){ 
	var divs = document.getElementsByClassName("df-skin-paywall-closed");
	for(var i = 0; i < divs.length; i++){
		divs[i].classList.add("blocked");
	}
	/*	VG 	*/
} else if(url.indexOf("vg.no") >= 0) {
	var divs = document.getElementsByClassName("article-extract");
	for(var i = 0; i < divs.length; i++) {
		if (divs[i].hasChildNodes()) {
			var spans = divs[i].querySelectorAll("span");
			for(var j = 0; j < spans.length; j++) {
				if(spans[j].classList.contains("df-img-skin-pluss")){
					divs[i].classList.add("blocked");
				}
			}
		}
	}
	var vgPlussTeaser = document.getElementById("pluss-teaser");
	vgPlussTeaser.classList.add("blocked");
	/*	Dagbladet 	*/
} else if (url.indexOf("dagbladet.no") >= 0) {
	var articles = document.getElementsByClassName("preview");
	for(var i = 0; i < articles.length; i++) {
		if (articles[i].hasChildNodes()) {
			var child = articles[i].children[0];
			var href = child.getAttribute("href");
			if (href.indexOf("/pluss/") >= 0) {
				articles[i].classList.add("blocked");
			}
		}
	}
	/*	Aftenposten 	*/
} else if (url.indexOf("aftenposten.no") >= 0) {
	var divs = document.getElementsByClassName("df-skin-art-Feat-Amagasinet");
	for(var i = 0; i < divs.length; i++){
		divs[i].classList.add("blocked");
	}
	/*	Dagens Naeringsliv	*/
} else if (url.indexOf("dn.no") >= 0) {
	if (url.indexOf("/d2/")) {
		var articles = document.querySelectorAll("article");
		if (undefined !== articles) {
			for (var i = 0; i < articles.length; i++) {
				if(articles[i].hasChildNodes()){
					var child = articles[i].children[0].children[0].children[0];
					if (hasClass(child, "paid-article")) {
						articles[i].classList.add("blocked");
					}
				}
			}
		}
	}
	var divs = document.getElementsByClassName("df-skin-paid");
	for(var i = 0; i < divs.length; i++){
		divs[i].classList.add("blocked");
	}
/*	Adressa 	*/	
} else if (url.indexOf("adressa.no") >= 0) {
	var divs = document.getElementsByClassName("article payed");
	for(var i = 0; i < divs.length; i++) {
		divs[i].classList.add("blocked");
	}
	/*	part of articleEntryArray	*/
} else if (articleEntryArray.indexOf(url) != -1){
	var divs = document.getElementsByClassName("am-articleEntry");
	for(var i = 0; i < divs.length; i++) {
		if (divs[i].hasChildNodes()) {
			var spans = divs[i].querySelectorAll("span");
			for(var j = 0; j < spans.length; j++) {
				if(spans[j].classList.contains("am-premium-logo")){
					divs[i].classList.add("blocked");	
				}
			}
		}
	}
	/*	Part of dfSkinPaywallArray	*/
} else if (dfSkinPaywall.indexOf(url) != -1){
	var divs = document.getElementsByClassName("df-skin-paywall");
	for(var i = 0; i < divs.length; i++){
		divs[i].classList.add("blocked");
	}
}

/*  Checks if an element has a specific class 	*/
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}