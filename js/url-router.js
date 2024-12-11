const urlPageTitle = "JS Single Page Application Router";
const iframe = document.getElementById("content");

const urlRoutes = {
  "#/": {
    template: "pages/polls.html",
    title: "Home | " + urlPageTitle,
    description: "Bem-vindo à página inicial",
  },
  "#/createPoll": {
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
  "#/users": {
    template: "pages/users.html",
    title: "Users | " + urlPageTitle,
    description: "Gerenciamento de usuários",
  },
  "#/votes": {
    template: "pages/votes.html",
    title: "Votes | " + urlPageTitle,
    description: "Gerenciamento de usuários",
  },
};

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

  iframe.src = route.template;
  changeLinkColor(location || "#/")

  document.title = route.title;

  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
};

document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("nav a")) {
    return;
  }

  e.preventDefault();
  window.location.hash = target.getAttribute("href");
});

window.addEventListener("hashchange", urlLocationHandler);

urlLocationHandler();

window.addEventListener('message', function(event) {
  if (['reload', 'blocked', 'register'].includes(event.data)) {
    console.log('oi', event.data);

    let routePath = "#/"
    if (event.data === 'register') {
      routePath = "#/login"
    }

    window.location.hash = routePath

    const route = urlRoutes[routePath]
    iframe.src = route.template;
    changeLinkColor(routePath)

    document.title = route.title;
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", route.description);

    if (event.data == 'reload') {
      document.querySelector('.nav-login').style.display='none'
      document.getElementById('nav-users').style.display='flex'
    }

    window.location.reload();
  }
});
