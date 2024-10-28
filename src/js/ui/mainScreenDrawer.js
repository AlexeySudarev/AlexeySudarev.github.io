import * as PIXI from 'pixi.js';

const app = new PIXI.Application();
await app.init({
    resizeTo: window
});

document.body.appendChild(app.canvas);

async function loadBackground() {
    PIXI.Assets.load('./src/assets/background.jpg').then((texture) => {
        const background = new PIXI.Sprite(texture);
        
        background.width = app.screen.width;
        background.height = app.screen.height;
        background.zIndex = 0;

        app.stage.addChild(background);
    
        window.addEventListener('resize', () => {
            background.width = app.screen.width;
            background.height = app.screen.height;
        });
    });
}

async function loadHero() {
    PIXI.Assets.load('./src/assets/hero.png').then((texture) => {
        const image = new PIXI.Sprite(texture);
        image.zIndex = 1;
    
        app.stage.addChild(image);
    });
}

function createButton(text, x, y) {
    const button = new PIXI.Container();

    // Рисуем прямоугольник кнопки
    const buttonGraphic = new PIXI.Graphics();
    buttonGraphic.fill(0x3498db);
    buttonGraphic.roundRect(-75, -25, 500, 100, 10);
    buttonGraphic.fill();

    // Создаем текст для кнопки
    const buttonText = new PIXI.Text( 
    {
        text: text,
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff
    });

    buttonText.anchor.set(0.5); // Центрируем текст в кнопке

    // Добавляем графику и текст в контейнер кнопки
    button.addChild(buttonGraphic);
    button.addChild(buttonText);

    // Устанавливаем позицию кнопки
    button.x = x;
    button.y = y;
    button.zIndex = 2;

    // Включаем интерактивность
    button.interactive = true;
    button.buttonMode = true;

    // Добавляем обработчик клика
    button.on('pointerdown', () => {
        console.log('Кнопка нажата!');
        // Добавь здесь любую логику для обработки клика по кнопке
    });

    return button;
}

const tasks = [
    loadBackground,
    loadHero
];

async function runTasksInSequence(tasks) {
    for (const task of tasks) {
        try {
            await task();
        } catch (error) {
            console.error('Ошибка при выполнении задачи:', error);
        }
    }
}

export function draw() {
    runTasksInSequence(tasks);

    // Создаем кнопку и добавляем её по центру экрана
    const button = createButton('Нажми меня', app.screen.width / 2, app.screen.height / 2);
    app.stage.addChild(button);
}