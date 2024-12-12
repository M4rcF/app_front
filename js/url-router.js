const urlPageTitle = "Single Page Application Project";
const iframe = document.getElementById("content");
const navLogin = document.querySelector('.nav-login');
const navUsers = document.getElementById('nav-users');

const logoutButton = document.getElementById('logout-button');

if (token) {
  navLogin.style.display='none'
} else {
  navUsers.style.display='none'
}


logoutButton.addEventListener('click', async (event) => {
  event.preventDefault();

  try {
    await authentication.postLogout(token);
    alert('Usuário deslogado com sucesso!');

    sessionStorage.removeItem('token');
    window.location.reload();
  } catch (error) {
    alert('Erro ao deslogar. Por favor, tente novamente.');
    console.error(error.message);
  }
});

const urlRoutes = {
  "#/": {
    template: "pages/polls.html",
    title: "Home | " + urlPageTitle,
  },
  "#/createPoll": {
    template: "pages/create.html",
    title: "Create poll | " + urlPageTitle,
  },
  "#/login": {
    template: "pages/login.html",
    title: "Login | " + urlPageTitle,
  },
  "#/signup": {
    template: "pages/signup.html",
    title: "Sign-up | " + urlPageTitle,
  },
  "#/users": {
    template: "pages/users.html",
    title: "Users | " + urlPageTitle,
  },
  "#/votes": {
    template: "pages/votes.html",
    title: "Votes | " + urlPageTitle,
  },
};

const changeLinkColor = (path) => {
  const link = document.querySelector(`a[href="${path}"]`);

  if (path != "#/create" && link) {
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
  if (['reload', 'register', 'login'].includes(event.data)) {
    let routePath = "#/"
    if (event.data === 'register') {
      routePath = "#/login"
    }

    window.location.hash = routePath

    const route = urlRoutes[routePath]
    iframe.src = route.template;
    changeLinkColor(routePath)

    document.title = route.title;

    if ('login' == event.data) {
      this.window.location.reload();
    }
  }
});
