const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

let parsedCollisions;
let collisionBlocks;
let background;
let doors;
let coins = [];
let myAudio = document.querySelector("#audio");
myAudio.volume = 0.5;
let coinSound = document.getElementById("coinSound");
coinSound.volume = 0.2;

document.addEventListener("click", function () {
    myAudio.play();
});

const player = new Player({
    imageSrc: "./img/king/idle.png",
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: "./img/king/idle.png",
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: "./img/king/idleLeft.png",
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./img/king/runRight.png",
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./img/king/runLeft.png",
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: "./img/king/enterDoor.png",
            onComplete: () => {
                console.log("completed animation");
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++;

                        if (level === 4) level = 1;
                        levels[level].init();
                        player.switchSprite("idleRight");
                        player.preventInput = false;
                        gsap.to(overlay, {
                            opacity: 0,
                        });
                    },
                });
                handleDoorCollision();
                const doorSound = document.getElementById("doorSound");
                doorSound.play();
            },
        },
    },
});

let level = 3;
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if (player.currentAnimation)
                player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/backgroundLevel1.png",
            });

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];

            coins = [
                new Coin({
                    position: { x: 221, y: 230 },
                    imageSrc: "./img/pic1.png",
                    frameRate: 1,
                    loop: true,
                    value: 10,
                }),
                new Coin({
                    position: { x: 341, y: 310 },
                    imageSrc: "./img/pic1.png",
                    frameRate: 1,
                    loop: true,
                    value: 10,
                }),
                new Coin({
                    position: { x: 475, y: 230 },
                    imageSrc: "./img/pic1.png",
                    frameRate: 1,
                    loop: true,
                    value: 10,
                }),
            ];
        },
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 96;
            player.position.y = 140;

            if (player.currentAnimation)
                player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/backgroundLevel2.png",
            });

            doors = [
                new Sprite({
                    position: {
                        x: 772.0,
                        y: 336,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
                new Sprite({
                    position: {
                        x: 150,
                        y: 77,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];

            coins = [
                new Coin({
                    position: { x: 170, y: 420 },
                    imageSrc: "./img/pic2.png",
                    frameRate: 1,
                    loop: true,
                    value: 10,
                }),
                new Coin({
                    position: { x: 480, y: 420 },
                    imageSrc: "./img/pic2.png",
                    frameRate: 1,
                    loop: true,
                    value: 10,
                }),
                new Coin({
                    position: { x: 295, y: 200 },
                    imageSrc: "./img/pic2.png",
                    frameRate: 1,
                    loop: true,
                    value: 10,
                }),
            ];
        },
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 750;
            player.position.y = 230;
            if (player.currentAnimation)
                player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/backgroundLevel3.png",
            });

            doors = [
                new Sprite({
                    position: {
                        x: 177,
                        y: 336,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
                new Sprite({
                    position: {
                        x: 780,
                        y: 145,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];

            coins = [
                new Coin({
                    position: { x: 478, y: 165 },
                    imageSrc: "./img/pic3.png",
                    frameRate: 1,
                    loop: true,
                    value: 10,
                }),
                new Coin({
                    position: { x: 341, y: 350 },
                    imageSrc: "./img/pic3.png",
                    frameRate: 1,
                    loop: true,
                    value: 10,
                }),
                new Coin({
                    position: { x: 700, y: 350 },
                    imageSrc: "./img/pic3.png",
                    frameRate: 1,
                    loop: true,
                    value: 10,
                }),
                new Coin({
                    position: { x: 205, y: 165 },
                    imageSrc: "./img/pic3.png",
                    frameRate: 1,
                    loop: true,
                    value: 10,
                }),
            ];
        },
    },
};

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

const overlay = {
    opacity: 0,
};

let score = 0;

function addScore(points) {
    score += points;
    updateScoreDisplay();
    console.log("Score:", score);
}

function handleDoorCollision() {
    addScore(10);
    console.log("Entered the door!");
}

function collectCoins() {
    for (let i = coins.length - 1; i >= 0; i--) {
        const coin = coins[i];
        const distanceX = Math.abs(player.position.x - coin.position.x);
        const distanceY = Math.abs(player.position.y - coin.position.y);
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (!coin.collected && distance < 50) {
            player.collectCoin(coin);
            coins.splice(i, 1);
            addScore(5);
            coinSound.play();
            myAudio.volume = 0.5;
            console.log("Collected a coin!");
        }
    }
}

function updateScoreDisplay() {
    const scoreElement = document.getElementById("scoreValue");
    scoreElement.textContent = score;
}

function animate() {
    window.requestAnimationFrame(animate);

    background.draw();

    doors.forEach((door) => {
        door.draw();
    });

    coins.forEach((coin) => {
        coin.draw();
    });

    collectCoins();

    player.handleInput(keys);
    player.draw();
    player.update();

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
}

levels[level].init();
animate();

