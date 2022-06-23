const BG_IMAGE_WIDTH = 2235;
const BG_IMAGE_HEIGHT = 1410;

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const card = urlParams.get("card");
  let redirect = true;
  if (card !== null && card !== undefined) {
    redirect = !handleSharedCard(card);
  }
  if (redirect === true) {
    window.location.replace("index.html");
  }
};

window.onresize = () => {
  let tsDiv = document.querySelector(".tesseraSanitaria");
  if (tsDiv.style.display !== "none") {
    setCardSize();
  }
};

const handleSharedCard = (card) => {
  try {
    const jsonString = atob(card);
    const cardJSON = JSON.parse(jsonString);
    const isTS = isValidTS(cardJSON);
    const isCIE = isValidCIE(cardJSON);
    if (!isTS && !isCIE) {
      return;
    }
    if(isTS) {
      setCardSizeTS();
      console.log(cardJSON.cF);
      setCardFieldsTS(cardJSON);
    } else if(isCIE) {
      setCardSizeCIE();
      console.log(cardJSON.cF);
      setCardFieldsCIE(cardJSON);
    }
    return true;
  } catch {
    //console.log("Invalid card");
    return false;
  }
};

const isValidTS = (tesseraSanitaria) => {
  if (
    tesseraSanitaria.t !== null &&
    tesseraSanitaria.t !== undefined &&
    tesseraSanitaria.t == "TS" &&    
    tesseraSanitaria.cF !== null &&
    tesseraSanitaria.cF !== undefined &&
    tesseraSanitaria.c !== null &&
    tesseraSanitaria.c !== undefined &&
    tesseraSanitaria.n !== null &&
    tesseraSanitaria.n !== undefined &&
    tesseraSanitaria.s !== null &&
    tesseraSanitaria.s !== undefined &&
    tesseraSanitaria.p !== null &&
    tesseraSanitaria.p !== undefined &&
    tesseraSanitaria.l !== null &&
    tesseraSanitaria.l !== undefined &&
    tesseraSanitaria.dN != null &&
    tesseraSanitaria.dN !== undefined
  )
    return true;
  return false;
};

const isValidCIE = (cie) => {
  if (
    cie.t !== null &&
    cie.t !== undefined &&
    cie.t == "CIE" &&        
    cie.cF !== null &&
    cie.cF !== undefined &&
    cie.c !== null &&
    cie.c !== undefined &&
    cie.n !== null &&
    cie.n !== undefined &&
    cie.s !== null &&
    cie.s !== undefined &&
    cie.l !== null &&
    cie.l !== undefined &&
    cie.dN != null &&
    cie.dN !== undefined
  )
    return true;
  return false;
};

const getCardSize = (width) => {
  console.log(width);
  let height = (width * BG_IMAGE_HEIGHT) / BG_IMAGE_WIDTH;
  let borderRadius = (width * 50) / BG_IMAGE_WIDTH;
  let fontSize = (90 * height) / BG_IMAGE_HEIGHT;
  return {
    width: width,
    height: height,
    borderRadius: borderRadius,
    fontSize: fontSize,
  };
};

const setCardSizeTS = () => {
  let tsDiv = document.querySelector(".tesseraSanitaria");
  tsDiv.style.display = "block";
  let cardSize = getCardSize(tsDiv.offsetWidth);
  console.log(cardSize);
  tsDiv.style.height = cardSize.height + "px";
  let tsImg = document.querySelector(".tesseraSanitaria > img");
  tsDiv.style.borderRadius = cardSize.borderRadius + "px";
  tsImg.style.borderRadius = cardSize.borderRadius + "px";
  let cardFields = document.querySelectorAll(".tesseraSanitaria > span");
  for (const key in cardFields) {
    if (cardFields.hasOwnProperty(key)) {
      const field = cardFields[key];
      field.style.fontSize = cardSize.fontSize + "px";
    }
  }
};

const setCardFieldsTS = (tesseraSanitaria) => {
  let cf = document.querySelector(".tesseraSanitaria #cf");
  cf.innerText = tesseraSanitaria.cF.toUpperCase();
  let cognome = document.querySelector(".tesseraSanitaria #cognome");
  cognome.innerText = tesseraSanitaria.c.toUpperCase();
  let nome = document.querySelector(".tesseraSanitaria #nome");
  nome.innerText = tesseraSanitaria.n.toUpperCase();
  let sesso = document.querySelector(".tesseraSanitaria #sesso");
  sesso.innerText = tesseraSanitaria.s.toUpperCase();
  let provincia = document.querySelector(".tesseraSanitaria #provincia");
  provincia.innerText = tesseraSanitaria.p.toUpperCase();
  let luogoDiNascita = document.querySelector(
    ".tesseraSanitaria #luogoDiNascita"
  );
  luogoDiNascita.innerText = tesseraSanitaria.l.toUpperCase();
  let dataDiNascita = document.querySelector(
    ".tesseraSanitaria #dataDiNascita"
  );
  dataDiNascita.innerText = tesseraSanitaria.dN.toUpperCase();
  if (tesseraSanitaria.dS !== null && tesseraSanitaria.dS !== undefined) {
    let dataDiScadenza = document.querySelector(
      ".tesseraSanitaria #dataDiScadenza"
    );
    dataDiScadenza.innerText = tesseraSanitaria.dS.toUpperCase();
  }
  let tsOwner = document.querySelector("#tsOwner");
  tsOwner.innerText = tesseraSanitaria.c + " " + tesseraSanitaria.n;
};

const setCardSizeCIE = () => {
  let tsDiv = document.querySelector(".tesseraSanitaria");
  tsDiv.style.display = "none";  
  let cieDiv = document.querySelector(".cie");
  cieDiv.style.display = "block";
  let cardSize = getCardSize(cieDiv.offsetWidth);
  console.log(cardSize);
  cieDiv.style.height = cardSize.height + "px";
  let tsImg = document.querySelector(".cie > img");
  cieDiv.style.borderRadius = cardSize.borderRadius + "px";
  tsImg.style.borderRadius = cardSize.borderRadius + "px";
  let cardFields = document.querySelectorAll(".tesseraSanitaria > span");
  for (const key in cardFields) {
    if (cardFields.hasOwnProperty(key)) {
      const field = cardFields[key];
      field.style.fontSize = cardSize.fontSize + "px";
    }
  }
};

const setCardFieldsCIE = (tesseraSanitaria) => {
  let cf = document.querySelector(".tesseraSanitaria #cf");
  cf.innerText = tesseraSanitaria.cF.toUpperCase();
  let cognome = document.querySelector(".tesseraSanitaria #cognome");
  cognome.innerText = tesseraSanitaria.c.toUpperCase();
  let nome = document.querySelector(".tesseraSanitaria #nome");
  nome.innerText = tesseraSanitaria.n.toUpperCase();
  let sesso = document.querySelector(".tesseraSanitaria #sesso");
  sesso.innerText = tesseraSanitaria.s.toUpperCase();
  let provincia = document.querySelector(".tesseraSanitaria #provincia");
  provincia.innerText = tesseraSanitaria.p.toUpperCase();
  let luogoDiNascita = document.querySelector(
    ".tesseraSanitaria #luogoDiNascita"
  );
  luogoDiNascita.innerText = tesseraSanitaria.l.toUpperCase();
  let dataDiNascita = document.querySelector(
    ".tesseraSanitaria #dataDiNascita"
  );
  dataDiNascita.innerText = tesseraSanitaria.dN.toUpperCase();
  if (tesseraSanitaria.dS !== null && tesseraSanitaria.dS !== undefined) {
    let dataDiScadenza = document.querySelector(
      ".tesseraSanitaria #dataDiScadenza"
    );
    dataDiScadenza.innerText = tesseraSanitaria.dS.toUpperCase();
  }
  let tsOwner = document.querySelector("#tsOwner");
  tsOwner.innerText = tesseraSanitaria.c + " " + tesseraSanitaria.n;
};