import { deactivateById, reactivateById, setValueById } from "./domHelper.js";

const navigateToScreenById = (selectedScreen, isAdmin) => {
  const screens = [
    "main-screen",
    "add-screen",
    "update-screen",
    "login-screen",
  ];

  screens
    .filter((screen) => screen != selectedScreen)
    .forEach((id) => deactivateById(id));

  reactivateById(selectedScreen);
};

const navigateOnClick = (id, destination) => {
  document.getElementById(id).onclick = (e) =>
    navigateToScreenById(destination);
};

const navigateToPrefilledDetails = (element, location) => {
  element.onclick = (e) => {
    e?.preventDefault();
    const { id, title, description, street, zipCode, lat, lon, score } =
      location;
    setValueById("modify-title", title);
    setValueById("modify-description", description);
    setValueById("modify-street", street);
    setValueById("modify-zipcode", zipCode);
    setValueById("modify-city", "Berlin");
    setValueById("modify-latitude", lat);
    setValueById("modify-longitude", lon);
    setValueById("modify-pollution", score);
    document.getElementById("hidden-id-field").innerText = id;

    navigateToScreenById("update-screen");
  };
};

export { navigateToScreenById, navigateOnClick, navigateToPrefilledDetails };
