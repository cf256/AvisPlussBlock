/*	Websites with the Amedia Am Style 	*/
var articleEntryArray= ["http://www.amta.no/"];
articleEntryArray.push("http://www.retten.no/");
articleEntryArray.push("http://www.auraavis.no/");
articleEntryArray.push("http://www.austagderblad.no/");
articleEntryArray.push("http://www.nordhordland.no/");
articleEntryArray.push("http://www.an.no/");
articleEntryArray.push("http://www.bygdeposten.no/");
articleEntryArray.push("http://www.eikerbladet.no/");
articleEntryArray.push("http://www.enebakkavis.no/");
articleEntryArray.push("http://www.firda.no/");
articleEntryArray.push("http://www.firdaposten.no/");
articleEntryArray.push("http://www.fremover.no/");
articleEntryArray.push("http://www.hadeland.no/");
articleEntryArray.push("http://www.hardanger-folkeblad.no/");
articleEntryArray.push("http://www.helg.no/");
articleEntryArray.push("http://www.indre.no/");
articleEntryArray.push("http://www.kv.no/");
articleEntryArray.push("http://www.kvinnheringen.no/");
articleEntryArray.push("http://www.laagendalsposten.no/");
articleEntryArray.push("http://www.lierposten.no/");
articleEntryArray.push("http://www.lofotposten.no/");
articleEntryArray.push("http://www.lofot-tidende.no/");
articleEntryArray.push("http://www.oyene.no/");
articleEntryArray.push("http://www.noblad.no/");
articleEntryArray.push("http://www.pd.no/");
articleEntryArray.push("http://www.r-a.no/");
articleEntryArray.push("http://www.ranablad.no/");
articleEntryArray.push("http://www.ringblad.no/");
articleEntryArray.push("http://www.ringsaker-blad.no/");
articleEntryArray.push("http://www.rha.no/");
articleEntryArray.push("http://www.sandeavis.no/");
articleEntryArray.push("http://www.smaalenene.no/");
articleEntryArray.push("http://www.svelvikposten.no/");
articleEntryArray.push("http://www.telen.no/");
articleEntryArray.push("http://www.tk.no/");
articleEntryArray.push("http://www.tvedestrandsposten.no/");
articleEntryArray.push("http://www.vestbyavis.no/");
articleEntryArray.push("http://www.aasavis.no/");

/*	Websites with the Amedia DfskinpaywallStyle*/
var dfSkinPaywall = ["http://www.ba.no/"];
dfSkinPaywall.push("http://www.dt.no/");
dfSkinPaywall.push("http://www.ifinnmark.no/");
dfSkinPaywall.push("http://www.f-b.no/");
dfSkinPaywall.push("http://www.gjengangeren.no/");
dfSkinPaywall.push("http://www.glomdalen.no/");
dfSkinPaywall.push("http://www.ha-halden.no/");
dfSkinPaywall.push("http://www.h-avis.no/");
dfSkinPaywall.push("http://www.jarlsbergavis.no/");
dfSkinPaywall.push("http://www.moss-avis.no/");
dfSkinPaywall.push("http://www.nordlys.no/");
dfSkinPaywall.push("http://www.oa.no/");
dfSkinPaywall.push("http://www.rb.no/");
dfSkinPaywall.push("http://www.sb.no/");
dfSkinPaywall.push("http://www.sa.no/");
dfSkinPaywall.push("http://www.ta.no/");
dfSkinPaywall.push("http://www.tb.no/");
dfSkinPaywall.push("http://www.oblad.no/");
dfSkinPaywall.push("http://www.op.no/");
dfSkinPaywall.push("http://www.ostlendingen.no/");
//TODO "for abbonnementer" df+skin published? fanaposten closed sunnhordaland special
var url = document.URL;
var hits = 0;

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