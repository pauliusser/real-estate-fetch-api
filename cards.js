const cardWrapper = document.getElementById("card-wrapper");
const vilniusBtnObj = document.getElementById("vilnius");
const kaunasBtnObj = document.getElementById("kaunas");
const klaipedaBtnObj = document.getElementById("klaipeda");

let storedNtObjects = [];

class Btn {
	isClicked = false;
	constructor(btnObject, cityFilterName) {
		this.btnObject = btnObject;
		this.cityFilterName = cityFilterName;
		this.btnObject.addEventListener("click", () => this.click());
	}
	click() {
		console.log("click");
		if (this.isClicked === false) {
			resetButtons();
			buildFilteredBy(this.cityFilterName);
			this.btnObject.setAttribute("class", "is-clicked");
			this.isClicked = true;
		} else {
			resetButtons();
			this.isClicked = false;
			buildCards(storedNtObjects);
		}
	}
	reset() {
		this.btnObject.removeAttribute("class", "is-clicked");
		this.isClicked = false;
	}
}

const vilniusBtn = new Btn(vilniusBtnObj, "Vilnius");
const kaunasBtn = new Btn(kaunasBtnObj, "Kaunas");
const klaipedaBtn = new Btn(klaipedaBtnObj, "Klaipeda");

function resetButtons() {
	vilniusBtn.reset();
	kaunasBtn.reset();
	klaipedaBtn.reset();
}

firstDraw();
async function firstDraw() {
	const fetchedNtObjects = await fetchNtObjects();
	buildCards(fetchedNtObjects);
	storedNtObjects = fetchedNtObjects;
}

function buildFilteredBy(c) {
	const filteredArr = storedNtObjects.filter((object) => object.city === c);
	cardWrapper.innerHTML = "";
	buildCards(filteredArr);
}

async function fetchNtObjects() {
	try {
		const ntResponse = await fetch("https://robust-safe-crafter.glitch.me/");
		const ntObjects = await ntResponse.json();
		return ntObjects;
	} catch (err) {
		console.log("error: " + err);
	}
}

function buildCards(ntObjects) {
	cardWrapper.innerHTML = "";
	if (typeof ntObjects != "object") {
		console.log("false object");
	} else {
		ntObjects.forEach((object) => {
			const card = document.createElement("div");
			card.setAttribute("class", "card");

			const img = document.createElement("img");
			img.src = object.image;

			const cardTxt = document.createElement("div");
			cardTxt.setAttribute("class", "card-text");

			const price = document.createElement("h2");
			price.textContent = "€" + object.price;

			const city = document.createElement("h4");
			city.textContent = object.city;

			const description = document.createElement("p");
			description.textContent = object.description;

			cardTxt.append(price, city, description);
			card.append(img, cardTxt);
			cardWrapper.append(card);
		});
	}
}
