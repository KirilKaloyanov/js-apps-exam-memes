import { logout } from './api/users.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { profileView } from './views/profileView.js';
import { registerView } from './views/registerView.js';

updateNav();

page(decorateContext);
page('/', homeView);
page('/memes', catalogView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/create', createView);
page('/memes/details/:id', detailsView);
page('/edit/:id', editView);
page('/profile', profileView);
page.start();

function renderMain (resultTemplate) {
    render(resultTemplate, document.querySelector('main'));
}

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    ctx.notify = notify;
    next();
}

function updateNav() {
    const user = getUserData();
    if (user) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome, ${user.email}`;
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

function notify(message) {
    const label = document.getElementById('errorBox');
    if (message != undefined) {
        label.style.display = 'block';
        label.querySelector('span').textContent = message;
        setTimeout(() => label.style.display = 'none', 3000);
    }
}