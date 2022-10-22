/*  Funcionalidad ACCESIBILIDAD */

let lsAccesibleName = "accesibilityOPTS";
const options = [{
        name: "Aumentar texto",
        icon: "fas fa-search-plus",
        action: increaseText
    },
    {
        name: "Disminuir texto",
        icon: "fas fa-search-minus",
        action: decreaseText
    },
    {
        name: "Escala de grises",
        icon: "fas fa-adjust",
        dataName: "grayScale",
        action: grayScale
    },
    {
        name: "Alto contraste",
        icon: "fas fa-sun",
        dataName: "highContrast",
        action: highContrast
    },
    {
        name: "Contraste negativo",
        icon: "fas fa-moon",
        dataName: "negativeContrast",
        action: negativeContrast
    },
    {
        name: "Subrayar enlaces",
        icon: "fas fa-underline",
        dataName: "underlineLinks",
        action: underlineLinks
    },
    {
        name: "Fuente legible",
        icon: "fas fa-font",
        dataName: "readableFont",
        action: readableFont
    },
    {
        name: "Audio parlante",
        icon: "fas fa-volume-up",
        dataName: "talkingAudio",
        action: talkingAudio
    },
    /* {
        name: "Subrayar nombres de imagenes",
        icon: "",
        action: setNameImages
    }, */
    {
        name: "Restablecer",
        icon: "fas fa-undo-alt",
        action: restore
    },
]

let timeOutBar = null;

function activeAccesibilityMenu(ev) {
    document.querySelector(".accesibility-bar").classList.toggle("active-accesibility")
}

function openAccesibility() {
    if (timeOutBar) clearTimeout(timeOutBar);
    document.querySelector(".accesibility-bar").classList.add("active-accesibility")
}

function closeAccesibility() {
    if (timeOutBar) clearTimeout(timeOutBar);
    timeOutBar = setTimeout(() => {
        document.querySelector(".accesibility-bar").classList.remove("active-accesibility")
    }, 1200);
}

function renderAccesibilityList() {
    const UL = document.createElement("ul");
    UL.classList.add("accesibility-bar");
    UL.setAttribute("role", "list");
    const ACTIVATOR = document.createElement("button");
    ACTIVATOR.setAttribute("role", "button");
    ACTIVATOR.setAttribute("aria-label", "Herramientas de accesibilidad");
    ACTIVATOR.setAttribute("aria-pressed", "false");
    ACTIVATOR.classList.add("accesibility-activator");
    if (isMobile()) {
        ACTIVATOR.addEventListener("click", activeAccesibilityMenu);
        //ACTIVATOR.addEventListener("touchstart", activeAccesibilityMenu);
    } else {
        UL.addEventListener("mouseover", () => openAccesibility())
        UL.addEventListener("mouseleave", () => closeAccesibility())
        ACTIVATOR.addEventListener("mouseover", () => openAccesibility())
        ACTIVATOR.addEventListener("mouseleave", () => closeAccesibility())
    }
    const ICON = document.createElement("i");
    ICON.setAttribute("class", "fab fa-accessible-icon");
    ACTIVATOR.appendChild(ICON);
    ACTIVATOR.addEventListener("click", activeAccesibilityMenu);
    UL.appendChild(ACTIVATOR);
    options.forEach(opt => {
        const LI = document.createElement("li");
        const I = document.createElement("i");
        const SPAN = document.createElement("span");
        LI.setAttribute("data-name", opt.dataName || opt.name)
        I.setAttribute("class", opt.icon);
        SPAN.innerText = opt.name;
        LI.appendChild(I);
        LI.appendChild(SPAN);
        LI.setAttribute("role", "listitem");
        LI.setAttribute("aria-label", `${opt.name}`);
        if (opt.dataName == "talkingAudio") {
            const SELECT_LANG = document.createElement("select");
            SELECT_LANG.setAttribute("id", "voices-select");
            SELECT_LANG.setAttribute("style", "display: block; width: 100%;");
            SELECT_LANG.addEventListener("change", handleVoiceChange)
            LI.appendChild(SELECT_LANG)
        }
        UL.appendChild(LI);
    })
    return UL;
}



function validateClass(className, el) {

    const BODY = document.querySelector("body." + className);
    if (!BODY) {
        return el.classList.remove("active-item");
    }
    return el.classList.add("active-item");
}

let zoom = 0;

function increaseText(ev) {
    if (zoom < 2) {
        zoom += 1;
    }

    switch (zoom) {
        case 1:
            document.body.classList.add("zoom-1");
            document.body.classList.remove("zoom-2");
            break;
        case 2:
            document.body.classList.remove("zoom-1");
            document.body.classList.add("zoom-2");
            break;
    }
    saveAccesibility(localStorage.getItem(lsAccesibleName), "zoom", zoom);
}

function decreaseText(ev) {
    if (zoom > 0) {
        zoom -= 1;
    }

    switch (zoom) {
        case 0:
            document.body.classList.remove("zoom-1");
            document.body.classList.remove("zoom-2");
            break;
        case 1:
            document.body.classList.add("zoom-1");
            document.body.classList.remove("zoom-2");
            break;
    }
    saveAccesibility(localStorage.getItem(lsAccesibleName), "zoom", zoom);
}

function grayScale(ev, el) {
    document.documentElement.classList.toggle("gray-scale");
    document.body.classList.toggle("gray-scale");
    validateClass("gray-scale", el || this);
    saveAccesibility(localStorage.getItem(lsAccesibleName), "grayScale", "gray-scale");
}

function highContrast(ev, el) {
    document.body.classList.remove("dark");
    document.body.classList.toggle("high-contrast");
    document.querySelectorAll(".accesibility-bar li")[4].classList.remove("active-item");
    validateClass("high-contrast", el || this);
    saveAccesibility(localStorage.getItem(lsAccesibleName), "highContrast", "high-contrast");
}

function negativeContrast(ev, el) {
    document.body.classList.remove("high-contrast");
    document.body.classList.toggle("dark");
    document.querySelectorAll(".accesibility-bar li")[3].classList.remove("active-item");
    validateClass("dark", el || this);
    saveAccesibility(localStorage.getItem(lsAccesibleName), "negativeContrast", "dark");
}

function lightStyle(ev, el) {
    document.body.classList.toggle("light-style");
    document.body.classList.remove("dark")
}

function underlineLinks(ev, el) {
    document.body.classList.toggle("underline-links");
    validateClass("underline-links", el || this);
    saveAccesibility(localStorage.getItem(lsAccesibleName), "underlineLinks", "underline-links");
}

function readableFont(ev, el) {
    document.body.classList.toggle("readable-font");
    validateClass("readable-font", el || this);
    saveAccesibility(localStorage.getItem(lsAccesibleName), "readableFont", "readable-font");
}

function setNameImages(ev, el) {
    document.body.classList.toggle("images-name");
}

/* SPEECH API */
let voices = [];
let voiceActive = false;

function talkingAudio(ev, el) {
    if (ev && ev.target.nodeName == "SELECT") return;
    document.body.classList.toggle("voice-active");
    validateClass("voice-active", el || this)
    if ([...document.body.classList].indexOf("voice-active") > -1) {
        voiceActive = true;
    } else {
        voiceActive = false;
    }


    /* let element = el || this;
    element.classList.toggle("active-item");
    validateClass("voice-active", element)
    if([...element.classList].indexOf("active-item") > -1) {
        document.body.classList.add("voice-active");
        voiceActive = true;
    }else {
        voiceActive = false;
        document.body.classList.remove("voice-active");
    } */

    saveAccesibility(localStorage.getItem(lsAccesibleName), "talkingAudio", "voice-active");
}

function readText(text) {

    /* if (typeof speechSynthesis === 'undefined') {
        return console.log("Su navegador no soporta speech simphony!")
    }

    const voice = voices.find(v => v.lang === "es-MX"); // find spanish voice

    if(!voice) return console.log("No se encontraron voces para leer!")

    const reader = new SpeechSynthesisUtterance(text);
    reader.voice = voice
    speechSynthesis.speak(reader); */

    speak(text)

}

function loadVoices() {
    voices = speechSynthesis.getVoices();

}

function handleMouseOver(el, ev) {
    el.classList.add("active");
    if (voiceActive) {
        const text = el.getAttribute("title") || el.getAttribute("aria-label") || el.getAttribute("alt") || el.innerText;
        readText(text);
        return;
    }
}

function handleLinkClick(el, event) {
    el.classList.remove("active");
    el.removeEventListener("mouseover", (ev) => handleMouseOver(el, ev));
    el.removeEventListener("focus", (ev) => handleMouseOver(el, ev));
    el.removeEventListener("touchstart", (ev) => handleMouseOver(el, ev));
    el.removeEventListener("mouseleave", (ev) => handleMouseLeave(el));
    el.removeEventListener("touchend", (ev) => handleMouseLeave(el));
    el.removeEventListener("blur", (ev) => handleMouseLeave(el));
    if (voiceActive) {
        const text = el.getAttribute("title") || el.getAttribute("aria-label") || el.getAttribute("alt") || el.innerText;
        readText(`Dirigiendonos a: ${text}`);
        return;
    }
}

function handleMouseLeave(el) {
    el.classList.remove("active");
    speechSynthesis.cancel();
}

function restore(ev) {
    document.body.classList.remove("zoom-1");
    document.body.classList.remove("zoom-2");
    document.body.classList.remove("images-name");
    document.body.classList.remove("readable-font");
    document.body.classList.remove("underline-links");
    document.body.classList.remove("light-style");
    document.body.classList.remove("negative-contrast");
    document.body.classList.remove("high-contrast");
    document.body.classList.remove("gray-scale");
    document.body.classList.remove("dark");
    document.body.classList.remove("voice-active");
    document.querySelectorAll(".accesibility-bar li").forEach(li => li.classList.remove("active-item"));
    voiceActive = false;
    setDefaultAccesibilityOPTS();
}

function execute() {
    if (document.querySelector(".wancho .g1_title a")) {
        document.querySelector(".wancho .g1_title a").classList.add("hashtag")
    }
    document.body.appendChild(renderAccesibilityList());
    const elements = document.querySelectorAll(".accesibility-bar > li");

    elements.forEach((li, i) => {
        li.addEventListener("click", options[i].action);
    })
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    // on document ready
    loadVoicesWhenAvailable(function() {})
    loadAccesibilityHistory();

}

const SELECTOR_FAKE_IMG = `[style^="background-image"]`;

function loadALTImages() {
    const SELECTOR_ALT = `IMG`;
    document.querySelectorAll(SELECTOR_ALT).forEach((IMG, idx) => {
        if (!IMG.getAttribute("alt") || IMG.getAttribute("alt") == "") {
            const ARR_SRC = IMG.getAttribute("src").split("/");
            const SRC = ARR_SRC[ARR_SRC.length - 1].replace(/[^a-zA-Z ]/g, " ");
            IMG.setAttribute("alt", SRC);
        } else {
            IMG.setAttribute("title", IMG.getAttribute("alt"))
        }
    })
}

function loadAriaLabelly() {
    const SELECTOR_LINKS = `a, button`;
    let instaIMGS = 1;
    document.querySelectorAll(SELECTOR_LINKS).forEach((LINK, idx) => {
        if (!LINK.getAttribute("aria-label")) {
            let text = LINK.getAttribute("aria-label") || LINK.getAttribute("title") || LINK.innerText || `Enlace de Emilima ${idx}`;
            LINK.setAttribute("aria-label", text);
        }
    })
}

function loadNoLists() {
    const SELECTOR_LI = `DIV > li`;
    document.querySelectorAll(SELECTOR_LI).forEach((LI, idx) => {
        LI.setAttribute("role", "presentation")
    })
}

function loadImages() {
    document.querySelectorAll(SELECTOR_FAKE_IMG).forEach((fakeD, idx) => replaceIMG(fakeD, idx));
}

function removeLongDescription() {
    const SELECTOR_LONG_DESC = `[data-full-res] > [alt], [data-full-res], [data-img-src-set]`;
    document.querySelectorAll(SELECTOR_LONG_DESC).forEach(el => {
        handleLongDesc(el)
    })
}

function handleLongDesc(el) {
    const instaDesc = el.getAttribute("data-full-res");
    const srcSet = el.getAttribute("data-img-src-set");
    const imgDesc = el.getAttribute("alt");
    if ([...el.classList].indexOf("img-accesibility") > -1) {
        el.remove();
    }
    if ([...el.classList].indexOf("img-accesibility") == -1 && el.nodeName == "IMG") {
        el.classList.add("img-accesibility");
    }
    if (el.nodeName == "A") {
        el.classList.add("no-p-bottom")
        el.classList.add("insta-img")
        const svg = el.querySelector("svg")
        if (svg) {
            svg.remove();
            const icon = document.createElement("I");
            icon.setAttribute("class", "fas fa-play insta-icon-play")
            el.appendChild(icon);
        }
    }
    if (instaDesc && instaDesc.toString().length > 150) {
        el.removeAttribute("data-full-res");
    }
    if (srcSet && srcSet.toString().length > 150) {
        el.removeAttribute("data-img-src-set");
    }
    if (imgDesc && imgDesc.toString().length > 150) {
        el.setAttribute("alt", imgDesc.substring(0, 149));
    }
}

function replaceIMG(el, idx) {
    const url = el.style.backgroundImage.split('"')[1];
    const title = el.getAttribute("data-name") || `Imagen ${idx}`;
    const description = el.getAttribute("data-longdesc") || title;
    const IMG = document.createElement("IMG");
    IMG.setAttribute("src", url);
    IMG.setAttribute("alt", title);
    IMG.setAttribute("longdesc", description);
    IMG.setAttribute("class", "img-accesibility")
    el.style.backgroundImage = "";
    el.classList.add("wrapper-img-accesibility");
    const oldImage = el.querySelector(`img[src='${url}']`);
    if (oldImage) {
        oldImage.remove();
    }
    el.appendChild(IMG);
}

function createFirstH1() {
    if (!document.querySelector("h1")) {
        let FIRST_TITLE = document.querySelector("h2")
        if(!FIRST_TITLE) return;
        const CONTENT = FIRST_TITLE.innerHTML;
        const CONTENT_CLASS = FIRST_TITLE.getAttribute("class") || "";
        const H1 = `<h1 class="title-slide ${CONTENT_CLASS}">${CONTENT}</h1>`;
        const PARENT = FIRST_TITLE.parentElement;
        FIRST_TITLE.remove();
        PARENT.innerHTML = H1 + PARENT.innerHTML;
    }
}

function selectedAllLinks() {
    document.querySelectorAll("a, a.headerSubMenuTab, h1, h2, h3, h4, h5, h6, p, .g1_title, div > span a>span, .accesibility-bar li, .accesibility-activator, .wancho a, .b24Parrafo, .readable, .headerBtn, img, label").forEach(el => {
        if (el.innerHTML == "" && el.nodeName != "IMG") {
            el.remove();
            return;
        }
        //el.removeEventListener("mouseover", () => {});
        //el.removeEventListener("mouseleave", () => {});
        el.addEventListener("mouseover", (ev) => handleMouseOver(el, ev));
        el.addEventListener("focus", (ev) => handleMouseOver(el, ev));
        el.addEventListener("touchstart", (ev) => handleMouseOver(el, ev), { passive: true });
        el.addEventListener("mouseleave", (ev) => handleMouseLeave(el, ev));
        el.addEventListener("blur", (ev) => handleMouseLeave(el, ev));
        el.addEventListener("touchend", (ev) => handleMouseLeave(el, ev), { passive: true });
    })
}

function saveAccesibility(obj, opt, value) {
    try {
        if (!obj) return setDefaultAccesibilityOPTS();
        obj = JSON.parse(obj);
        if (typeof obj != 'object') return;
        let newOBJ = {...obj };
        if (opt != "zoom" && opt != "vLangSelected") {
            if ([...document.body.classList].indexOf(value) > -1) {
                newOBJ[opt] = true;
                if (opt == "negativeContrast") {
                    newOBJ['highContrast'] = false;
                }
                if (opt == "highContrast") {
                    newOBJ['negativeContrast'] = false;
                }
            } else {
                newOBJ[opt] = false;
            }
        } else {
            newOBJ[opt] = value;
        }
        console.log(newOBJ)

        localStorage.setItem(lsAccesibleName, JSON.stringify(newOBJ));
    } catch (error) {
        setDefaultAccesibilityOPTS();
    }
}

function loadAccesibilityHistory() {
    try {
        let accesibilityOPTS = localStorage.getItem(lsAccesibleName);
        if (!accesibilityOPTS) return setDefaultAccesibilityOPTS();
        accesibilityOPTS = JSON.parse(accesibilityOPTS);
        if (typeof accesibilityOPTS != 'object') return setDefaultAccesibilityOPTS();
        zoom = accesibilityOPTS.zoom;
        if (zoom > 0) increaseText();
        if (accesibilityOPTS.grayScale) {
            grayScale(null, document.querySelector("[data-name='grayScale']"));
        }
        if (accesibilityOPTS.highContrast) {
            highContrast(null, document.querySelector("[data-name='highContrast']"));
        }
        if (accesibilityOPTS.negativeContrast) {
            negativeContrast(null, document.querySelector("[data-name='negativeContrast']"));
        }
        if (accesibilityOPTS.underlineLinks) {
            underlineLinks(null, document.querySelector("[data-name='underlineLinks']"));
        }
        if (accesibilityOPTS.readableFont) {
            readableFont(null, document.querySelector("[data-name='readableFont']"));
        }
        if (accesibilityOPTS.talkingAudio) {
            talkingAudio(null, document.querySelector("[data-name='talkingAudio']"));
        }
    } catch (error) {
        setDefaultAccesibilityOPTS();
    }
}

function setDefaultAccesibilityOPTS() {
    const DEFAULT_OPTS = {
        zoom: 0,
        graysCale: false,
        highContrast: false,
        negativeContrast: false,
        underlineLinks: false,
        readableFont: false,
        talkingAudio: false,
    }
    localStorage.setItem(lsAccesibleName, JSON.stringify(DEFAULT_OPTS));
}



// speech api
let _speechSynth
let _voices
const _cache = {}
let _voiceSelected = {}
let timeOut = null

/**
 * retries until there have been voices loaded. No stopper flag included in this example. 
 * Note that this function assumes, that there are voices installed on the host system.
 */

function renderVoicesList(voices) {
    const LANG_SELECT = document.getElementById("voices-select");
    voices.forEach((voi, idx) => {
        const voiKey = voi.lang.split("-")[0].toLowerCase();
        if (voiKey && voiKey.indexOf("es") > -1) {
            const OPT = document.createElement("option");
            OPT.innerText = voi.name.toString().toUpperCase();
            OPT.setAttribute("value", voi.lang + (idx + 1));
            OPT.setAttribute("style", "max-width:100%; overflow: hidden;");
            LANG_SELECT.appendChild(OPT);
        }
    })

}

function handleVoiceChange(ev) {
    document.getElementById("voices-select").value = ev.target.value;
    const val = ev.target.value;
    if (!val) return;
    const voiceFounded = _voices.find((vo, idx) => (vo.lang + (idx + 1)) == val);
    if (!voiceFounded) return setDefaultLang();
    _voiceSelected = voiceFounded;
    saveAccesibility(localStorage.getItem(lsAccesibleName), "vLangSelected", {
        default: voiceFounded.default,
        lang: voiceFounded.lang,
        localService: voiceFounded.localService,
        name: voiceFounded.name,
        voiceURI: voiceFounded.voiceURI,
    });
}

function loadLSVoiceSelected() {
    try {
        const obj = JSON.parse(localStorage.getItem(lsAccesibleName));
        if (!obj) return setDefaultLang();
        if (!obj.vLangSelected) return setDefaultLang();
        if (typeof obj.vLangSelected != "object") return setDefaultLang();
        const voiceLS = obj.vLangSelected;
        let indexF = -1;
        const voiceFounded = _voices.find((vo, idx) => {
            if (vo.lang == voiceLS.lang && vo.voiceURI == voiceLS.voiceURI) {
                indexF = idx;
                return true;
            }
        });
        if (!voiceFounded) return setDefaultLang();
        handleVoiceChange({ target: { value: (voiceFounded.lang + (indexF + 1)) } })
    } catch (error) {
        setDefaultLang();
    }

}

function setDefaultLang() {
    const LANG_SELECT = document.getElementById("voices-select");
    let opt = LANG_SELECT.querySelector("option[value^='es-MX']");
    if (!opt) {
        opt = LANG_SELECT.querySelector("option[value^='es-ES'], option[value^='es-US']");
    };
    //LANG_SELECT.setAttribute("value", FIRST_OPT.getAttribute("value"));
    handleVoiceChange({ target: { value: opt.getAttribute("value") } })
}

function loadVoicesWhenAvailable(onComplete = () => {}) {
    _speechSynth = window.speechSynthesis
    const voices = _speechSynth.getVoices()
    if (voices.length !== 0) {
        _voices = voices
        renderVoicesList(_voices)
        loadLSVoiceSelected();
        selectedAllLinks();
        onComplete()
    } else {
        return setTimeout(function() { loadVoicesWhenAvailable(onComplete) }, 100)
    }
}

/**
 * Returns the first found voice for a given language code.
 */

function getVoices(locale) {
    if (!_speechSynth) {
        throw new Error('Browser does not support speech synthesis')
    }
    if (_cache[locale]) return _cache[locale]

    _cache[locale] = _voices.filter(voice => voice.lang === locale)
    return _cache[locale]
}

/**
 * Speak a certain text 
 * @param locale the locale this voice requires
 * @param text the text to speak
 * @param onEnd callback if tts is finished
 */

function playByText(locale, text, onEnd) {
    const voices = [_voiceSelected]
        //getVoices(locale)

    // TODO load preference here, e.g. male / female etc.
    // TODO but for now we just use the first occurrence
    const utterance = new window.SpeechSynthesisUtterance()
    utterance.voice = voices[0]
    utterance.pitch = 1
    utterance.rate = 1
    utterance.voiceURI = 'native'
    utterance.volume = 1
    utterance.rate = 1
    utterance.pitch = 0.8
    utterance.text = text
    utterance.lang = locale

    if (onEnd) {
        utterance.onend = onEnd
    }

    _speechSynth.cancel() // cancel current speak, if any is running
    _speechSynth.speak(utterance)
}



function isMobile() {
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
}

function speak(text) {
    if (isMobile()) {
        if (timeOut) {
            clearTimeout(timeOut);

        };
        timeOut = setTimeout(() => playByText(isMobile() ? "es-ES" : "es-MX", text), 300);
        return;
    }
    playByText(isMobile() ? "es-ES" : "es-MX", text)
}



// voice search
var recognition;
let tip;
let keywords = [];
const repeated = [
    "ir",
    "a",
    "ver",
    "al",
    "en",
    "o",
    "con",
    /* "de" */
]
let final_transcript = '';
let recognizing = false;
let cancel = false;


const BASE_TEMPLATE = `
        <div id="searcher-wrapper" class="searcher-wrapper">
            <button type="button" id="btn-close-search" class="close-btn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg></button>
            <div id="results">
                <span id="final_span" class="final"></span>
                <span id="interim_span" class="interim"></span>
                <div id="result-search-list"></div>
            </div>
            <div id="visualization"></div>
            <div id="viz1" class="visual"></div>
            <div id="viz2" class="visual"></div>
            <div id="viz3" class="visual"></div>
            <div id="viz4" class="visual"></div>
            <div id="tip">Mantén presionado al hablar</div>
        </div>
        <button title="Mantén presionado para hablar" id="button-search">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="microphone" data-container-transform="translate(3)" viewBox="0 0 16 20" x="0px" y="0px"><path d="M4.5 0c-1.4 0-2.5 1.1-2.5 2.5v5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5v-5c0-1.4-1.1-2.5-2.5-2.5zm-4.125 6.188a.5.5 0 0 0-.375.5v.813c0 2.302 1.763 4.184 4 4.438v3.063h-2c-.6 0-1 .4-1 1h7c0-.6-.4-1-1-1h-2v-3.063c2.237-.254 4-2.136 4-4.438v-.813a.5.5 0 1 0-1 0v.813c0 1.927-1.573 3.5-3.5 3.5s-3.5-1.573-3.5-3.5v-.813a.5.5 0 0 0-.563-.5.5.5 0 0 0-.063 0z" transform="translate(3)"/></svg>
            <div id="contents"></div>
        </button>
    `;





function loadKeywords() {
    keywords = [];
    document.querySelectorAll("a").forEach(el => {
        const href = el.getAttribute("href");
        if (!href || href == "#") return;
        const text = el.getAttribute("title") || el.getAttribute("aria-label") || el.innerText;
        if (!text.trim()) return;
        const idxFounded = findRepeatURL(href);
        if (idxFounded > -1) return;
        keywords.push({
            keyword: buildKeyword(text),
            fullText: text,
            url: href
        })
    })
}

function findRepeatURL(url) {
    return keywords.findIndex((k) => k.url == url);
}

function buildKeyword(str) {
    return [...str.toLowerCase().split(" ")].filter(keyword => repeated.indexOf(keyword) == -1);
}

function validateNoRepeated(str) {
    return repeated.indexOf(str.toLowerCase()) > -1 ? true : false;
}

function startButton(event) {
    final_transcript = '';
    //recognition.lang = select_dialect.value;
    recognition.start();
}

function unsupported() {
    console.log('Webkit speech api not supported in your browser');
}



function startRecog() {
    try {
        if (!recognizing) {
            recognition.start();
            final_transcript = '';
            $('#final_span').empty();
            $('#interim_span').empty();
            $(this).text('done');
            recognizing = true;
        }
    } catch (error) {
        reset()
    }
};



function endRecog() {
    if (recognizing) {
        recognizing = false;
        recognition.stop();

    }
}

function handleRecognitionError(e) {}

function handleRecognitionEnd() {
    var string = final_transcript.toLowerCase(); 
    if (string.trim() != '') {
        recognizing = false;
        cancel = true;
        var counter = {
                t: 0
            },
            border = '2px solid white',
            loading = $('<div class="element"><div class="loading"></div><div class="slice"></div></div>'),
            fill = $('<div class="loading ring">')
        $('#button-search #contents').append(loading).append(fill);
        $('#button-search').addClass('cancel');
        TweenMax.to(counter, 2, {
            t: 100,
            ease: Linear.easeNone,
            onUpdate: function() {
                TweenMax.set($('#button-search .element .loading'), {
                    rotation: (counter.t * 3.6) - 45
                });
                if (counter.t >= 25) {
                    $('#button-search > #contents > .loading.ring').css('border-top', border);
                };
                if (counter.t >= 50) {
                    $('#button-search > #contents > .loading.ring').css('border-right', border);
                    $('#button-search .element .slice').remove();
                }
                if (counter.t >= 75) {
                    $('#button-search > #contents > .loading.ring').css('border-bottom', border);
                }
            },
            onComplete: function() {
                process(string);
                //reset();
            }
        });
    } else {
        showTip();
    }
}



function process(string) {
    string = string.toLowerCase();
    success = false;
    let isCompleteText = false;
    let keywordComplete = null;
    const keystr = string.toLowerCase();
    const arrString = keystr.split(" ");
    const filtered = keywords.filter(({ keyword, url, fullText }) => {
        isCompleteText = keystr === fullText.toLowerCase() && [...string.toLowerCase().split(" ")].length > 2;

        if (!isCompleteText && !keywordComplete) {
            if (Array.isArray(keyword)) {
                let haveKey = false;
                arrString.forEach(elKey => {
                    const idx = keyword.findIndex(str => str == elKey || str.indexOf(elKey) > -1 && !validateNoRepeated(elKey));
                    if (idx > -1) {
                        success = true;
                        haveKey = true;
                    }
                })
                if (haveKey) {
                    return true;
                }
                return false;
            }
        }

        if (isCompleteText && !keywordComplete) {
            keywordComplete = { keyword, url, fullText };
        }
    }).map(key => {
        let obj = {
            keyword: key.keyword,
            url: key.url,
            fullText: ""
        }

        const fullTextUppercase = key.fullText.split(" ");
        const fullTextLowercase = key.fullText.toLowerCase().split(" ");

        fullTextLowercase.forEach((str, index) => {
            let text = "";
            const idx = arrString.findIndex(keyw => !validateNoRepeated(keyw) && !validateNoRepeated(str) && (str.indexOf(keyw) > -1 || str == keyw));
            if (idx > -1) {
                const textNormal = fullTextUppercase[index];
                const textFounded = arrString[idx];
                const textLenght = textFounded.toString().length;
                const startIndex = str.indexOf(textFounded);
                const endIndex = startIndex + textLenght;
                const innerText = textNormal.substring(startIndex, endIndex);
                text += textNormal.substring(0, startIndex) + `<strong>${innerText} </strong>` + textNormal.substring(endIndex, str.length);
            } else {
                text += fullTextUppercase[index] + " ";
            }
            obj.fullText += text;
        })
        return obj;
    })

    if (keywordComplete) {
        if (voiceActive) {
            readText(`Dirigiendonos a: ${keywordComplete.fullText}`)
        }
        redirectInSameTab(keywordComplete);
        return;
    }

    if (filtered.length == 1) {
        const keywordSelected = filtered[0];
        if (voiceActive) {
            readText(`Dirigiendonos a: ${keywordSelected.fullText}`)
        }
        redirectInSameTab(keywordSelected);
        //closeSearcher();
        return;
    }
    renderList(filtered);
}

function renderList(array) {
    const container = document.getElementById("result-search-list");
    container.innerHTML = "";
    const UL = document.createElement("ul");
    const cArray = [...array];
    const message = `${cArray.length} resultados encontrados`;
    if (voiceActive) {
        readText(message)
    }
    if (cArray.length === 0) {
        container.innerHTML += `<p class="text-center text-white"> ${message} <span></span> </p>`
        return
    };
    cArray.forEach(key => {
        const LI = document.createElement("li");
        const A = document.createElement("a");
        A.setAttribute("href", key.url);
        //A.setAttribute("target", "_blank");
        const SPAN = document.createElement("span");
        SPAN.innerText = key.url;
        A.innerHTML = (key.fullText || key.keyword[0]);
        A.addEventListener("click", (ev) => handleLinkClick(A, ev));
        A.addEventListener("mouseenter", (ev) => handleMouseOver(A, ev));
        A.addEventListener("focus", (ev) => handleMouseOver(A, ev));
        A.addEventListener("touchstart", (ev) => handleMouseOver(A, ev), { passive: true });
        A.addEventListener("mouseleave", (ev) => handleMouseLeave(A, ev));
        A.addEventListener("blur", (ev) => handleMouseLeave(A, ev));
        A.addEventListener("touchend", (ev) => handleMouseLeave(A, ev), { passive: true });
        A.appendChild(SPAN);
        LI.appendChild(A);
        UL.appendChild(LI);
    })
    container.appendChild(UL);
}

function redirectInSameTab(keyword) {
    // speech add
    window.location.href = keyword.url;
}

function reset() {
    TweenMax.set($("#button-search .loading"), {
        clearProps: "all"
    });
    $('#button-search').removeClass('cancel');
    $('#button-search #contents').empty();
    cancel = false;
    final_transcript = '';
    $('#final_span').text('');
    document.getElementById("result-search-list").innerHTML = "";
}

/// ##### BASIC UTILS #####
function closeSearcher() {
    document.querySelector("#searcher-wrapper").classList.remove("active-search");
    document.documentElement.style.overflowY = "auto";
    reset();
}

function showTip() {
    reset();
    $('#tip').addClass('show');
    if (tip) {
        window.clearTimeout(tip);
    }
    tip = setTimeout(function() {
        $('#tip').removeClass('show');
    }, 3000);
}

/// ##### VISUALIZATION STUFF #####

var liveSource;
var analyser;
var frequencyData;
var scaling = 1.5;

function update() {
    requestAnimationFrame(update);

    if (recognizing) {
        analyser.getByteFrequencyData(frequencyData);
        TweenMax.set($('.visual'), {
            autoAlpha: 0.75
        })
        TweenMax.set($('#viz1'), {
            scale: (((frequencyData[8] + 1) / 100) / scaling)
        });
        TweenMax.set($('#viz2'), {
            scale: (((frequencyData[15] + 1) / 100) / scaling)
        });
        TweenMax.set($('#viz3'), {
            scale: (((frequencyData[21] + 1) / 100) / scaling)
        });
    } else {
        TweenMax.set($('.visual'), {
            autoAlpha: 0
        })
    }
}

var promisifiedOldGUM = function(constraints, successCallback, errorCallback) {

    // First get ahold of getUserMedia, if present
    var getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function(successCallback, errorCallback) {
        getUserMedia.call(navigator, constraints, successCallback, errorCallback);
    });

}

function activateMicrophone() {
    // creates an audiocontext and hooks up the audio input
    var context = new AudioContext();

    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
    }
    /* navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia); */
    /* , function(stream) {
        
    }, function() {
    } */
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        if (!analyser) {
            liveSource = context.createMediaStreamSource(stream);
            // Create the analyser
            analyser = context.createAnalyser();
            analyser.smoothingTimeConstant = 0.3;
            analyser.fftSize = 64;
            frequencyData = new Uint8Array(analyser.frequencyBinCount);
            liveSource.connect(analyser);
        };
        update();
    }).catch(err => {
        console.log('Error connecting to audio')
    })
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function linebreak(s) {
    var two_line = /\n\n/g;
    var one_line = /\n/g;
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

//ACCESIBILITY VOICE SEARCH

document.addEventListener('DOMContentLoaded', function() {
    try {
        createFirstH1();
        loadALTImages();
        loadImages();
        loadAriaLabelly();
        loadNoLists();
        removeLongDescription();



        // voice search
        /* if (!('webkitSpeechRecognition' in window)) {
            unsupported();
        } else {
            document.body.innerHTML += BASE_TEMPLATE;
            recognition = new webkitSpeechRecognition();
            recognition.interimResults = true;
            recognition.continuous = true;
            recognition.onstart = function() {}
            recognition.onresult = function(e) {
                var interim_transcript = '';

                for (var i = e.resultIndex; i < e.results.length; ++i) {
                    if (e.results[i].isFinal) {
                        final_transcript = final_transcript + e.results[i][0].transcript;
                    } else {
                        interim_transcript = interim_transcript + e.results[i][0].transcript;
                    }
                }
                final_transcript = capitalize(final_transcript);
                $('#final_span').empty().html(linebreak(final_transcript));
                $('#interim_span').empty().html(linebreak(interim_transcript));
            };
            recognition.onerror = handleRecognitionError;
            recognition.onend = handleRecognitionEnd;
        }

        // Main start event
        $('#button-search').on('mousedown touchstart', function() {
            if (!navigator.mediaDevices.getUserMedia || !navigator.mediaDevices.webkitGetUserMedia) activateMicrophone();
            if (cancel) {
                TweenMax.killAll();
                reset();
                document.querySelector("#searcher-wrapper").classList.remove("active-search");
                document.documentElement.style.overflowY = "auto";
            } else {
                document.querySelector("#searcher-wrapper").classList.add("active-search");
                document.documentElement.style.overflowY = "hidden";
                startRecog();
            }
        });

        $("#button-search").on('touchend mouseup mouseleave', function() {
            endRecog();
        })
        loadKeywords();
        document.querySelector("#btn-close-search").addEventListener("click", closeSearcher); */
        /* document.getElementById("button-search").addEventListener("mouseenter", (ev) => handleMouseOver(document.getElementById("button-search"), ev))
        document.getElementById("button-search").addEventListener("mouseleave", (ev) => handleMouseLeave(document.getElementById("button-search"), ev)) */




        execute();
        console.log("FIN CARGA");
    } catch (error) {
        console.log("error", error);
    }
})