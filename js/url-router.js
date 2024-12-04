const urlPageTitle = "JS Single Page Application Router";

const urlRoutes = {
  "#/": {
    template: "pages/index.html",
    title: "Home | " + urlPageTitle,
    description: "Bem-vindo à página inicial",
  },
  "#/create": {
    template: "pages/create.html",
    title: "Create poll | " + urlPageTitle,
    description: "Bem-vindo à página inicial",
  },
  "#/login": {
    template: "pages/login.html",
    title: "Login | " + urlPageTitle,
    description: "Página sobre nós",
  },
  "#/signup": {
    template: "pages/signup.html",
    title: "Sign-up | " + urlPageTitle,
    description: "Página sobre nós",
  },
};

document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("nav a")) {
    return;
  }
  e.preventDefault();
  window.location.hash = target.getAttribute("href");
});

const changeLinkColor = (path) => {
  const link = document.querySelector(`a[href="${path}"]`);

  if (path != "#/create") {
    link.style.background = '#6282a8'
  }

  const links = document.querySelectorAll(`a:not([href="${path}"])`);

  links.forEach((link) => {
    link.style.background = 'none';
  });

}

const urlLocationHandler = () => {
  const location = window.location.hash || "#/";

  const route = urlRoutes[location] || urlRoutes["#/"];

  const iframe = document.getElementById("content");
  iframe.src = route.template;
  changeLinkColor(location || "#/")

  document.title = route.title;

  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
};

window.addEventListener("hashchange", urlLocationHandler);

urlLocationHandler();
