(() => {
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loadingSpinner = document.querySelector("#loading-spinner");
  const errorMessageElement = document.querySelector("#error-message");

  function modelLoaded() {
    hotspots.forEach((hotspot) => {
      hotspot.style.display = "block";
    });
  }

  function fetchAndDisplayInfoBoxes() {
    const infoBoxApiUrl = "https://swiftpixel.com/earbud/api/infoboxes";
    fetch(infoBoxApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((infoBoxes) => {
        displayInfoBoxes(infoBoxes);
      })
      .catch((error) => {
        console.error("Failed to fetch info boxes:", error);
        displayErrorMessage("Failed to load info boxes.");
      });
  }

  function fetchAndDisplayMaterials() {
    const materialListApiUrl = "https://swiftpixel.com/earbud/api/materials";
    fetch(materialListApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((materials) => {
        displayMaterials(materials);
      })
      .catch((error) => {
        console.error("Failed to fetch materials:", error);
        displayErrorMessage("Failed to load materials.");
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

  fetchAndDisplayInfoBoxes();
  fetchAndDisplayMaterials();
})();
