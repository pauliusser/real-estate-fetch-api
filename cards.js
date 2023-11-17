const cardWrapper = document.getElementById("card-wrapper");
const vilniusBtn = document.getElementById("vilnius");
const kaunasBtn = document.getElementById("kaunas");
const klaipedaBtn = document.getElementById("klaipeda");

let ntObjectsArray = [];

firstDraw();
async function firstDraw() {
	const fetchedNtObjects = await fetchNtObjects();
	buildCards(fetchedNtObjects);
	ntObjectsArray = fetchedNtObjects;
}

let vilniusIsClicked = false;
vilniusBtn.addEventListener("click", () => {
	vilniusIsClicked = !vilniusIsClicked;
	if (vilniusIsClicked === true) {
		kaunasIsClicked = false;
		klaipedaIsClicked = false;
		vilniusBtn.setAttribute("class", "is-clicked");
		kaunasBtn.removeAttribute("class", "is-clicked");
		klaipedaBtn.removeAttribute("class", "is-clicked");
		filterByCity("Vilnius");
	} else {
		buildCards(ntObjectsArray);
		vilniusBtn.removeAttribute("class", "is-clicked");
	}
});
let kaunasIsClicked = false;
kaunasBtn.addEventListener("click", () => {
	kaunasIsClicked = !kaunasIsClicked;
	if (kaunasIsClicked === true) {
		vilniusIsClicked = false;
		klaipedaIsClicked = false;
		kaunasBtn.setAttribute("class", "is-clicked");
		vilniusBtn.removeAttribute("class", "is-clicked");
		klaipedaBtn.removeAttribute("class", "is-clicked");
		filterByCity("Kaunas");
	} else {
		buildCards(ntObjectsArray);
		kaunasBtn.removeAttribute("class", "is-clicked");
	}
});
let klaipedaIsClicked = false;
klaipedaBtn.addEventListener("click", () => {
	klaipedaIsClicked = !klaipedaIsClicked;
	if (klaipedaIsClicked === true) {
		kaunasIsClicked = false;
		vilniusIsClicked = false;
		klaipedaBtn.setAttribute("class", "is-clicked");
		kaunasBtn.removeAttribute("class", "is-clicked");
		vilniusBtn.removeAttribute("class", "is-clicked");
		filterByCity("Klaipeda");
	} else {
		buildCards(ntObjectsArray);
		klaipedaBtn.removeAttribute("class", "is-clicked");
	}
});

function filterByCity(c) {
	const filteredArr = ntObjectsArray.filter((object) => object.city === c);
	console.log(filteredArr);
	cardWrapper.innerHTML = "";
	buildCards(filteredArr);
}

async function fetchNtObjects() {
	try {
		const ntResponse = await fetch("https://robust-safe-crafter.glitch.me/");
		const ntObjects = await ntResponse.json();
		// console.log(ntObjects);
		return ntObjects;
	} catch (err) {
		console.log("error: " + err);
	}
}

function buildCards(ntObjects) {
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
