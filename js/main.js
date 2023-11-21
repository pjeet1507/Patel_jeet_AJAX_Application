(() => {
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const errorMessageElement = document.querySelector("#error-message");

  let spinner = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_rXNP{animation:spinner_YeBj .8s infinite}@keyframes spinner_YeBj{0%{animation-timing-function:cubic-bezier(0.33,0,.66,.33);cy:5px}46.875%{cy:20px;rx:4px;ry:4px}50%{animation-timing-function:cubic-bezier(0.33,.66,.66,1);cy:20.5px;rx:4.8px;ry:3px}53.125%{rx:4px;ry:4px}100%{cy:5px}}</style><ellipse class="spinner_rXNP" cx="12" cy="5" rx="4" ry="4" fill="white"/></svg>`;

  function modelLoaded() {
    hotspots.forEach((hotspot) => {
      hotspot.style.display = "block";
    });
  }

  function infobox() {
    const infoBoxApiUrl = "https://swiftpixel.com/earbud/api/infoboxes";
    fetch(infoBoxApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("api not found");
        }
        return response.json();
      })
      .then((infoBoxes) => {
        displayInfoBoxes(infoBoxes);
      })
      .catch((error) => {
        console.error("Failed to get info boxes:", error);
        displayErrorMessage("Failed to get info boxes:");
      });
  }

  function materials() {
    materialList.innerHTML = spinner;

    const materialListApiUrl = "https://swiftpixel.com/earbud/api/materials";
    fetch(materialListApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("api not found");
        }
        return response.json();
      })
      .then((materials) => {
        materialList.innerHTML = "";
        displayMaterials(materials);
      })
      .catch((error) => {
        console.error("Failed to get materials:", error);
        materialList.innerHTML = "";
        displayErrorMessage("Failed to get materials:");
      });
  }

  function displayInfoBoxes(infoBoxes) {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);
      const titleElement = document.createElement("h2");
      titleElement.textContent = infoBox.heading;
      const textElement = document.createElement("p");
      textElement.textContent = infoBox.description;
      const imageElement = new Image();
      imageElement.src = `images/${infoBox.thumbnail}`;
      imageElement.alt = infoBox.heading;
      selected.appendChild(titleElement);
      selected.appendChild(textElement);
      selected.appendChild(imageElement);
    });
  }

  function displayMaterials(materials) {
    materials.forEach((material) => {
      const clone = materialTemplate.content.cloneNode(true);
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading;
      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;
      materialList.appendChild(clone);
    });
  }

  function displayErrorMessage(message) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  model.addEventListener("load", modelLoaded);
  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  infobox();
  materials();
})();
