const addBtn = document.getElementById("add-property");
const message = document.getElementById("message");
message.style.display = "none";

addBtn.addEventListener("click", () => {
	// console.log("click");
	const res = ntObjectMaker();
	if (typeof res != "object") {
		message.style.display = "flex";
		message.style.backgroundColor = "red";
		message.textContent = res;
	} else {
		uploadNtObject(res);

		message.style.display = "flex";
		message.style.backgroundColor = "green";
		message.textContent = "success!";

		// console.log("upload successfull");
		setTimeout(() => {
			window.location.replace("./index.html");
		}, 3000);
	}
});

function ntObjectMaker() {
	const imgInput = document.getElementById("img").value;
	const priceInput = document.getElementById("price").value;
	const descriptionInput = document.getElementById("description").value;
	const cityInput = document.getElementById("city").value;

	if (imgInput === "") {
		return "Image url is missing";
	}
	if (priceInput === "") {
		return "price is missing";
	}
	if (descriptionInput === "") {
		return "description is missing";
	}
	if (cityInput === "") {
		return "city is missing";
	}
	if (priceInput <= 0) {
		return "invalid price";
	}
	const ntObject = {
		image: imgInput,
		city: cityInput,
		price: priceInput,
		description: descriptionInput,
	};

	return ntObject;
}
async function uploadNtObject(ntObject) {
	// console.log(ntObject);
	try {
		await fetch("https://robust-safe-crafter.glitch.me/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(ntObject),
		});
	} catch (err) {
		console.log("error", err);
	}
}
