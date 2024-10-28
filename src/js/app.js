import * as PIXI from 'pixi.js';
import { draw } from './ui/mainScreenDrawer.js';

const app = new PIXI.Application();
await app.init({
    resizeTo: window
});

document.body.appendChild(app.canvas);

draw();

if (window.Telegram && window.Telegram.WebApp) {
    const user = window.Telegram.WebApp.initDataUnsafe.user;

    if (user) {
        console.log(user.id);
    }
}