const BG_IMAGE_WIDTH = 2240;
const BG_IMAGE_HEIGHT = 1410;

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const card = urlParams.get("card");
  if (card !== null) {
    handleSharedCard(card);
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
    const tesseraSanitaria = JSON.parse(jsonString);
    if (!isValid(tesseraSanitaria)) {
      return;
    }
    tesseraSanitaria.dataDiScadenza = "01/12/2020"; //TODO REMOVE THIS
    setCardSize();
    console.log(tesseraSanitaria.codiceFiscale);
    setCardFields(tesseraSanitaria);
  } catch {
    //console.log("Invalid card");
  }
};

const isValid = (tesseraSanitaria) => {
  if (
    tesseraSanitaria.codiceFiscale !== null &&
    tesseraSanitaria.cognome !== null &&
    tesseraSanitaria.nome !== null &&
    tesseraSanitaria.sesso !== null &&
    tesseraSanitaria.provincia !== null &&
    tesseraSanitaria.luogoDiNascita !== null &&
    tesseraSanitaria.dataDiNascita != null
  )
    return true;
  return false;
};

const getCardSize = (width) => {
  console.log(width);
  let height = (width * BG_IMAGE_HEIGHT) / BG_IMAGE_WIDTH;
  let fontSize = (90 * height) / BG_IMAGE_HEIGHT;
  return { width: width, height: height, fontSize: fontSize };
};

const setCardSize = () => {
  let tsDiv = document.querySelector(".tesseraSanitaria");
  tsDiv.style.display = "block";
  let cardSize = getCardSize(tsDiv.offsetWidth);
  console.log(cardSize);
  tsDiv.style.height = cardSize.height + "px";
  let cardFields = document.querySelectorAll(".tesseraSanitaria > span");
  for (const key in cardFields) {
    if (cardFields.hasOwnProperty(key)) {
      const field = cardFields[key];
      field.style.fontSize = cardSize.fontSize + "px";
    }
  }
};

const setCardFields = (tesseraSanitaria) => {
  let cf = document.querySelector(".tesseraSanitaria #cf");
  cf.innerText = tesseraSanitaria.codiceFiscale;
  let cognome = document.querySelector(".tesseraSanitaria #cognome");
  cognome.innerText = tesseraSanitaria.cognome;
  let nome = document.querySelector(".tesseraSanitaria #nome");
  nome.innerText = tesseraSanitaria.nome;
  let sesso = document.querySelector(".tesseraSanitaria #sesso");
  sesso.innerText = tesseraSanitaria.sesso;
  let provincia = document.querySelector(".tesseraSanitaria #provincia");
  provincia.innerText = tesseraSanitaria.provincia;
  let luogoDiNascita = document.querySelector(
    ".tesseraSanitaria #luogoDiNascita"
  );
  luogoDiNascita.innerText = tesseraSanitaria.luogoDiNascita;
  let dataDiNascita = document.querySelector(
    ".tesseraSanitaria #dataDiNascita"
  );
  dataDiNascita.innerText = tesseraSanitaria.dataDiNascita;
  if (tesseraSanitaria.dataDiScadenza !== null) {
    let dataDiScadenza = document.querySelector(
      ".tesseraSanitaria #dataDiScadenza"
    );
    dataDiScadenza.innerText = tesseraSanitaria.dataDiScadenza;
  }
  let tsOwner = document.querySelector("#tsOwner");
  tsOwner.innerText = tesseraSanitaria.cognome + " " + tesseraSanitaria.nome;
};
