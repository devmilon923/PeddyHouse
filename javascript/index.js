const categoriesDiv = document.getElementById("categoriesDiv");
const petDetails = document.getElementById("petDetails");
const modalContent = document.getElementById("modal-container");
const petImage = document.getElementById("pet-image");
const dataInfo = document.getElementById("data-info");
const countdown = document.getElementById("countdown");
const closemodal = document.getElementById("closemodal");

let count = 3;

function startcoundown(id) {
  count = 3;
  countdown.innerText = count;
  my_modal_5.showModal();
  setTimeout(() => {
    countdown.innerText = 3;
  }, 0);

  setTimeout(() => {
    countdown.innerText = 2;
  }, 1000);
  setTimeout(() => {
    countdown.innerText = 1;
  }, 2000);

  setTimeout(() => {
    countdown.innerText = 0;
    document.getElementById(id).disabled = true;
    document.getElementById(id).innerText = "Adopted";
    closemodal.click();
  }, 3000);
}

function changeBG(div) {
  div.style.backgroundColor = "#5d8d6f";
  div.style.color = "white";
}

function resetBG() {
  const allDiv = document.querySelectorAll("#categoriesDiv div");
  allDiv.forEach((div) => {
    div.style.backgroundColor = "";
    div.style.color = "black";
  });
}

function displayBody(data) {
  petDetails.innerHTML = "";
  data.forEach((pet) => {
    petDetails.innerHTML += `<div class="z-0 card bg-base-100 shadow-md">
    <figure>
      <img class="rounded-md h-52 object-cover"
        src=${pet.image}
        alt="Shoes" />
    </figure>
    <div class="card-body">
        <h1 class="text-xl font-bold">${
          pet.pet_name !== "" &&
          pet.pet_name !== null &&
          pet.pet_name !== undefined
            ? pet.pet_name
            : "Not Available"
        }</h1>
        <div class="text-gray-500 space-y-1">
            <p><i class="fa-solid fa-table-cells"></i> Breed:<span> ${
              pet.breed !== "" && pet.breed !== null && pet.breed !== undefined
                ? pet.breed
                : "Not Available"
            }</span></p>
            <p><i class="fa-regular fa-calendar"></i> Birth:<span> ${
              pet.date_of_birth !== "" &&
              pet.date_of_birth !== null &&
              pet.date_of_birth !== undefined
                ? pet.date_of_birth
                : "Not Available"
            }</span></p>
            <p><i class="fa-solid fa-venus"></i> Gender:<span> ${
              pet.gender !== "" &&
              pet.gender !== null &&
              pet.gender !== undefined
                ? pet.gender
                : "Not Available"
            }</span></p>
            <p class="pb-3"><i class="fa-solid fa-sack-dollar"></i> Price:<span> ${
              pet.price !== "" && pet.price !== null && pet.price !== undefined
                ? pet.price + "$"
                : "Not Available"
            }</span></p>
            <hr>
            <div class="grid pt-3 grid-cols-3 items-center justify-between gap-5">
            <button onclick="likedPet('${
              pet.petId
            }')" class="btn btn-sm  hover:bg-gray-200 text-md bg-white"><i class="fa-regular fa-thumbs-up text-green-900"></i></button>
            <button id='${pet.petId}' onclick="startcoundown('${
      pet.petId
    }')" class="btn btn-sm   bg-white hover:bg-gray-200 text-md text-green-900">Adopt</button>
            <button onclick="fetchByiD('${
              pet.petId
            }')" class="btn btn-sm  hover:bg-gray-200  bg-white text-md text-green-900">Details</button>
            </div>
        </div>
    </div>
    </div>`;
  });
}

function displayCategories(categories) {
  categories.forEach((data) => {
    categoriesDiv.innerHTML += `
        <div onclick="fetchByCategories('${data.category}')" id="${data.category}" class="px-5 py-10 bg-slate-50 border rounded-lg flex items-center justify-center gap-6 cursor-pointer">
        <img src="${data.category_icon}" />
        <p>${data.category}</p></div>
        `;
  });
}

function likedPet(id) {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => {
      petImage.innerHTML += `
        <img class="rounded-lg w-full object-cover" src="${data.petData.image}" />
        `;
    })
    .catch((error) => {
      dataInfo.innerText = "Somthing want worng...";
      console.log(error);
    });
}

function fetchCategories() {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => {
      dataInfo.innerText = "Somthing want worng...";
      console.log(error);
    });
}

function fetchByiD(id) {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => {
      modalContent.innerHTML = `
 <img class="mx-auto rounded-lg" src=${
   data.petData.image !== "" &&
   data.petData.image !== null &&
   data.petData.image !== undefined
     ? data.petData.image
     : "Not Available"
 } alt="" />
          <div>
            <h1 class="text-2xl mb-4 font-bold">${
              data.petData.pet_name !== "" &&
              data.petData.pet_name !== null &&
              data.petData.pet_name !== undefined
                ? data.petData.pet_name
                : "Not Available"
            }</h1>
            <div
              class="text-gray-500 grid md:grid-cols-2 items-center gap-4 md:gap-12"
            >
              <div>
                <p>
                  <i class="fa-solid fa-table-cells"></i>
                  <span>Breed: ${
                    data.petData.breed !== "" &&
                    data.petData.breed !== null &&
                    data.petData.breed !== undefined
                      ? data.petData.breed
                      : "Not Available"
                  }</span>
                </p>

                <p>
                  <i class="fa-solid fa-venus"></i> <span>Gender: ${
                    data.petData.gender !== "" &&
                    data.petData.gender !== null &&
                    data.petData.gender !== undefined
                      ? data.petData.gender
                      : "Not Available"
                  }</span>
                </p>
                <p>
                  <i class="fa-regular fa-calendar"></i>
                  <span>Vaccinated status: ${
                    data.petData.vaccinated_status !== "" &&
                    data.petData.vaccinated_status !== null &&
                    data.petData.vaccinated_status !== undefined
                      ? data.petData.vaccinated_status
                      : "Not Available"
                  }</span>
                </p>
              </div>
              <div>
                <p>
                  <i class="fa-regular fa-calendar"></i>
                  <span>Birth: ${
                    data.petData.date_of_birth !== "" &&
                    data.petData.date_of_birth !== null &&
                    data.petData.date_of_birth !== undefined
                      ? data.petData.date_of_birth
                      : "Not Available"
                  }</span>
                </p>
                <p class="pb-3">
                  <i class="fa-solid fa-sack-dollar"></i>
                  <span>Price: ${
                    data.petData.price !== "" &&
                    data.petData.price !== null &&
                    data.petData.price !== undefined
                      ? data.petData.price + "$"
                      : "Not Available"
                  }</span>
                </p>
              </div>
            </div>
            <div class="divider">More</div>
            <p class="font-bold">Details Information</p>
            <p class="text-gray-500">
            ${
              data.petData.pet_details !== "" &&
              data.petData.pet_details !== null &&
              data.petData.pet_details !== undefined
                ? data.petData.pet_details
                : "Not Available"
            }
            </p>
          </div>
`;

      my_modal_4.showModal();
    })
    .catch((error) => {
      dataInfo.innerText = "Somthing want worng...";
      console.log(error);
    });
}

function fetchAll() {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())

    .then((data) => {
      dataInfo.innerHTML = `<span class="loading loading-dots md:loading-md loading-sm "></span>`;
      setTimeout(() => {
        dataInfo.innerText = "All data has been loaded";
        // loader.style.display = "none";
        displayBody(data.pets);
      }, 2000);
    })
    .catch((error) => {
      dataInfo.innerText = "Somthing want worng...";
      console.log(error);
    });
}

function fetchByCategories(data) {
  resetBG();
  const currentDiv = document.getElementById(data);

  changeBG(currentDiv);
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${data}`)
    .then((res) => res.json())
    .then((data) => {
      petDetails.classList.add("opacity-35");

      dataInfo.innerHTML = `<span class="loading loading-dots loading-md"></span>`;
      setTimeout(() => {
        // petDetails.classList.remove = "opacity-35";
        petDetails.classList.remove("opacity-35");

        if (data.data.length > 0) {
          dataInfo.innerText = data.message;
          displayBody(data.data);
        } else {
          dataInfo.innerText = "No data found!";

          petDetails.innerHTML = `
          <div class='space-y-3 lg:mt-12 mt-7 mx-auto col-span-3'>
          <img class="mx-auto" src="./images/error.webp" />
          <h1 class="lg:text-2xl text-xl text-center font-bold">No data available here!</h1>
          </div>
          `;
        }
      }, 2000);
    });
}

function sortData() {
  resetBG();
  petDetails.classList.add("opacity-35");
  document.getElementById(
    "sortData"
  ).innerHTML = `<span class="loading loading-dots loading-md"></span>`;

  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        petDetails.classList.remove("opacity-35");
        document.getElementById("sortData").innerHTML = "Sort by Price";

        dataInfo.innerText = "successfully fetched all pets data using sort";
        dataInfo.classList.add("text-green-500");
        displayBody([...data.pets].sort((a, b) => b.price - a.price));
      }, 2000);
    })
    .catch((error) => {
      dataInfo.innerText = "Somthing want worng...";
      console.log(error);
    });
}

fetchCategories();
fetchAll();
