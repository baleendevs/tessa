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
  let cardDivs = document.querySelectorAll(".tessaCard");
  for (const key in cardDivs) {
    if (Object.hasOwnProperty.call(cardDivs, key)) {
      try {
        const cardDiv = cardDivs[key];
        const display = window.getComputedStyle(cardDiv).display;
        if (display !== "none") {
          if (cardDiv.classList.contains("ts")) {
            setCardSize("ts");
          } else if (cardDiv.classList.contains("cie")) {
            setCardSize("cie");
          }
        }
      } catch {}
    }
  }
};

const handleSharedCard = (card) => {
  try {
    const jsonString = atob(card);
    const parsedCard = JSON.parse(jsonString);
    parsedCard.t = parsedCard.t == null ? "ts" : parsedCard.t.toLowerCase();
    if (!isValid(parsedCard)) return false;
    setCardSize(parsedCard.t);
    console.log(parsedCard.cF);
    setCardFields(parsedCard);
    return true;
  } catch (e) {
    console.log("Invalid card", e);
    return false;
  }
};

const isValid = (card) => {
  switch (card.t) {
    case "ts":
      if (
        card.t !== null &&
        card.t !== undefined &&
        card.cF !== null &&
        card.cF !== undefined &&
        card.c !== null &&
        card.c !== undefined &&
        card.n !== null &&
        card.n !== undefined &&
        card.s !== null &&
        card.s !== undefined &&
        card.p !== null &&
        card.p !== undefined &&
        card.l !== null &&
        card.l !== undefined &&
        card.dN != null &&
        card.dN !== undefined
      )
        return true;
      break;
    case "cie":
      if (
        card.t !== null &&
        card.t !== undefined &&
        card.cF !== null &&
        card.cF !== undefined &&
        card.c !== null &&
        card.c !== undefined &&
        card.n !== null &&
        card.n !== undefined &&
        card.s !== null &&
        card.s !== undefined &&
        ((card.lN !== null &&
          card.lN !== undefined) ||
          (card.l !== null &&
          card.l !== undefined)) &&
        card.p !== null &&
        card.p !== undefined &&
        card.dN != null &&
        card.dN !== undefined
      )
        return true;
      break;
    default:
      break;
  }
  return false;
}

const getCardSize = (width, cardType) => {
  //console.log(width);
  let height = (width * BG_IMAGE_HEIGHT) / BG_IMAGE_WIDTH;
  let borderRadius = (width * 50) / BG_IMAGE_WIDTH;
  let fontSize = (90 * height) / BG_IMAGE_HEIGHT;
  if (cardType == "cie") {
    fontSize = (70 * height) / BG_IMAGE_HEIGHT;
  }
  let fontSizeNs = (94 * height) / BG_IMAGE_HEIGHT;
  let fontSizeCAN = (115 * height) / BG_IMAGE_HEIGHT;
  return {
    width: width,
    height: height,
    borderRadius: borderRadius,
    fontSize: fontSize,
    fontSizeNs: fontSizeNs,
    fontSizeCAN: fontSizeCAN
  };
};

const setCardSize = (cardType) => {
  let cardDiv = document.querySelector(`.${cardType}`);
  cardDiv.style.display = "block";
  let cardSize = getCardSize(cardDiv.offsetWidth, cardType);
  //console.log(cardSize);
  cardDiv.style.height = cardSize.height + "px";
  let cardImg = document.querySelector(`.${cardType} > img`);
  cardDiv.style.borderRadius = cardSize.borderRadius + "px";
  cardImg.style.borderRadius = cardSize.borderRadius + "px";
  let cardFields = document.querySelectorAll(`.${cardType} > span`);
  for (const key in cardFields) {
    if (cardFields.hasOwnProperty(key)) {
      const field = cardFields[key];
      field.style.fontSize = cardSize.fontSize + "px";
      if (cardType === "cie") {
        if (field.classList.contains("nS")) {
          field.style.fontSize = cardSize.fontSizeNs + "px";
        } else if (field.classList.contains("cAN")) {
          field.style.fontSize = cardSize.fontSizeCAN + "px";
        }
      }
    }
  }
  let cardMessage = document.querySelector(`.content-title #${cardType}Message`);
  cardMessage.style.display = "block";
}

const setCardFields = (card) => {
  if (card.t === "cie" && card.s != null && card.s.toUpperCase() === "F") {
    let cardBg = document.querySelector(`.${card.t} img`);
    cardBg.src = cardBg.src.replace("male", "female");
  }
  let cardFields = Object.entries(card);
  for (const i in cardFields) {
    if (Object.hasOwnProperty.call(cardFields, i)) {
      const key = cardFields[i][0];
      let value = cardFields[i][1];
      if (typeof value !== "string") {
        value = value.toString();
      }
      let cardFieldDiv = document.querySelector(`.${card.t} .${key}`);
      if (cardFieldDiv != null) {
        cardFieldDiv.innerText = value == null ? "" : value.toUpperCase();
      }
    }
  }
  let cardOwner = document.querySelector(`#${card.t}Owner`);
  if (cardOwner != null) {
    cardOwner.innerText = `${card.c} ${card.n}`;
  }
}