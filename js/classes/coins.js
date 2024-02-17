class Coin {
    constructor({ position, imageSrc, frameRate, loop, value }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.frameRate = frameRate;
        this.loop = loop;
        this.value = value;

        this.collected = false;
        this.width = 45;
        this.height = 45;
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    collect() {
        this.collected = true;
    }
}
