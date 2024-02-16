let enteringDoor = false;

window.addEventListener("keydown", (event) => {
    if (player.preventInput || enteringDoor) return;
    switch (event.key) {
        case "w":
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i];

                if (
                    player.hitbox.position.x + player.hitbox.width <=
                        door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >=
                        door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height
                ) {
                    player.velocity.x = 0;
                    player.velocity.y = 0;
                    player.preventInput = true;
                    player.switchSprite("enterDoor");
                    door.play();
                    enteringDoor = true;
                    return;
                }
            }
            if (player.velocity.y === 0) player.velocity.y = -25;
            break;
        case "a":
            keys.a.pressed = true;
            break;
        case "d":
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
    if (event.key === "w") enteringDoor = false;
});

function handleDoorCollision() {
    if (!enteringDoor) {
        addScore(10);
        console.log("Score:", score);
        updateScoreDisplay();
        enteringDoor = true;
    }
}
