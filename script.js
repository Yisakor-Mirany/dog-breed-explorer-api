const loadBreedsBtn = document.getElementById("loadBreedsBtn");
const breedSelect = document.getElementById("breedSelect");
const statusMessage = document.getElementById("statusMessage");
const detailsContent = document.getElementById("detailsContent");

let breeds = [];

async function fetchBreeds() {

  statusMessage.textContent = "Loading breeds...";

  try {

    const response = await fetch("https://dogapi.dog/api/v2/breeds");

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    breeds = data.data;

    populateBreeds(breeds);

    statusMessage.textContent = "Breeds loaded successfully";

  } catch (error) {

    console.error(error);

    statusMessage.textContent = "Error loading breeds. Please try again.";

  }

}

function populateBreeds(breedList) {

  breedSelect.innerHTML = `<option value="">-- Select a breed --</option>`;

  breedList.forEach((breed) => {

    const option = document.createElement("option");

    option.value = breed.id;

    option.textContent = breed.attributes.name;

    breedSelect.appendChild(option);

  });

}

function displayBreedDetails(breedId) {

  if (!breedId) {

    detailsContent.innerHTML = "<p>No breed selected yet.</p>";

    return;

  }

  const breed = breeds.find(b => b.id === breedId);

  if (!breed) {

    detailsContent.innerHTML = "<p>Breed not found.</p>";

    return;

  }

  const attributes = breed.attributes;

  detailsContent.innerHTML = `
    <h3>${attributes.name}</h3>
    <p><strong>Description:</strong> ${attributes.description || "No description available"}</p>
    <p><strong>Life Span:</strong> ${attributes.life.min || "?"} - ${attributes.life.max || "?"} years</p>
    <p><strong>Male Weight:</strong> ${attributes.male_weight.min || "?"} - ${attributes.male_weight.max || "?"} lbs</p>
    <p><strong>Female Weight:</strong> ${attributes.female_weight.min || "?"} - ${attributes.female_weight.max || "?"} lbs</p>
    <p><strong>Hypoallergenic:</strong> ${attributes.hypoallergenic ? "Yes" : "No"}</p>
  `;

}

loadBreedsBtn.addEventListener("click", fetchBreeds);

breedSelect.addEventListener("change", (event) => {

  displayBreedDetails(event.target.value);

});