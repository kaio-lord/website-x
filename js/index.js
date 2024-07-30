// This function checks if a cookie with the given key exists.
function checkCookie(key) {
  var value = "; " + document.cookie; // get the cookie value
  var parts = value.split("; " + key + "="); // split the value by the key
  if (parts.length == 2) {
    return true; // the key exists
  } else {
    return false; // the key does not exist
  }
}

var crate;

// Checks if a CDN is blocked by testing the README.md file
async function isBlocked(url) {
  try {
    var README = await fetch(url + "/README.md");
    var content = await README.text();
    if (content.startsWith("# 3kh0 Assets")) {
      // The CDN is not blocked
      return false;
    } else {
      // The CDN is not returning a valid response or is blocked
      return true;
    }
  } catch {
    return true;
  }
}

async function getCDN(cdns) {
  for (let cdn of cdns) {
    var blocked = await isBlocked(cdn);
    if (!blocked) {
      return cdn;
    }
  }
  return cdns[0];
}

// Define some varibles for later
const path = location.pathname;
const origin = localStorage.getItem("instance");
const cdn = localStorage.getItem("cdn");
const queryString = window.location.search;
window.history.pushState({}, "", path);
const urlParams = new URLSearchParams(queryString);
const onLoadData = urlParams.get("onload");

const base = document.createElement("base");
base.href =
  location.origin + path.replace(path.split("\\").pop().split("/").pop(), "");
document.head.appendChild(base);

// If we do not have the origin var, we make it
if (!origin) {
  localStorage.setItem("instance", base.href);
  location.reload();
}

// If we do not have the cdn var, we make it
if (!cdn) {
  fetch("./assets/json/cdns.json")
    .then((res) => res.json())
    .then(async (cdns) => {
      localStorage.setItem("cdn", await getCDN(cdns));
      location.reload();
    });
}

const instance = encodeURIComponent(origin.replace(location.origin, ""));

// If we have onLoadData, we run it now

// If we have any errors, we will log it
window.addEventListener("error", (e) => {
  console.error(e);
});

// Add the main script in the <head> tags

// Collect Tab Cloak data from local storage
var tab = localStorage.getItem("tab");
if (tab) {
  try {
    // Parse the data, it is in JSON
    var tabData = JSON.parse(tab);
  } catch {
    var tabData = {};
  }
} else {
  var tabData = {};
}

// Set the Tab title if the Tab cloak data is there
if (tabData.title) {
  document.title = tabData.title;
}

// Set the Tab icon if the Tab cloak data is there
if (tabData.icon) {
  document.querySelector('link[rel="icon"]').href = tabData.icon;
}

// Set theme colors if the user has set it
function getContrastHex(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#1c1c1c" : "white";
}

// Set theme colors if the user has set it
function getColorHex(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "white" : "black";
}

// Set theme colors if the user has set it
var theme = localStorage.getItem("theme") || "default";
let themes;

// Fetching themes
fetch(origin + "assets/json/themes.json")
  .then((res) => res.json())
  .then((data_themes) => {
    themes = data_themes;

    if (theme !== "custom") {
      document.body.setAttribute("theme", theme);
      
    } else {
      // Get custom theme
      const theme = localStorage.getItem("theme_color");

      document.body.setAttribute("theme", "custom");
      document.body.style = `--theme: ${theme}; --background: ${getContrastHex(
        theme
      )}; --text: ${getColorHex(theme)}; --text-secondary: ${getColorHex(
        theme
      )};`;
      }
    })
  .catch((e) => {
    // Houston, we have a problem.
    console.error(e);
    throw new Error("Failed to load themes");
  });

