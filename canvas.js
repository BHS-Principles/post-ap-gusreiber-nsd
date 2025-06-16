
class Sprite{
    
    
    static defaultCtx = document.getElementsByTagName("canvas")[0].getContext('2d');
    

    constructor(x, y, width, height, vX, vY){

        this.game;
        this.ctx           = Sprite.defaultCtx;
        this.fillStyle     = 'skyblue';
        this.x             = x;
        this.y             = y;
        this.width         = width  || 50;
        this.height        = height || 50;
        this.content       = [];
        
        this.vX            = vX;
        this.vY            = vY;

        this.draw();
    }
    addGame(game){
        this.game = game;
        this.setCtx(game.CTX); 
    }
    setCtx(ctx){
        this.ctx = ctx;
    }

    update(cameraX = 0, cameraY = 0){
        this.x += this.vX;
        this.y += this.vY;
        this.draw(cameraX,cameraY);
        for(let i = 0; i < this.content.length; i++){
            let s = this.content[i];
            s.x += s.vX + this.vX;
            s.y += s.vY + this.vY;    
            s.update(cameraX,cameraY);
            this.checkWall(s);
            for(let j = i+1; j < this.content.length; j++){
                this.checkCollide(s, this.content[j]);
            }
        }
     
    }
    checkCollide(a,b){
        if (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        ) {
            const tempVX = a.vX;
            const tempVY = a.vY;

            a.vX = b.vX;
            a.vY = b.vY;

            b.vX = tempVX;
            b.vY = tempVY;
        }
    }
    checkWall(sprite){
        if(sprite.x > this.width + this.x - sprite.width) {
            sprite.vX = -1 * sprite.vX;
        }
        if(sprite.y > this.height + this.y - sprite.height){ 
            sprite.vY = -1 * sprite.vY;
        }
        if(sprite.x - this.x <= 0) sprite.vX = -1 * sprite.vX;
        if(sprite.y - this.y <= 0) sprite.vY = -1 * sprite.vY; 
    }
    draw(cameraX = 0, cameraY = 0){
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(this.x - cameraX, this.y - cameraY, this.width, this.height);
        this.ctx.fillRect(this.x - cameraX, this.y - cameraY, this.width, this.height);
    }
}
class Container extends Sprite{
    constructor(x, y, width, height, xV, yV, sprites){
        super(x, y, width, height, xV , yV);
        this.content = sprites;

    }


}
class Game{
    constructor(sprites){
        this.WIDTH         = 2000; 
        this.HEIGHT        = 2000;
        this.CANVAS        = document.getElementsByTagName("canvas")[0];
        this.CANVAS.width  = this.WIDTH;
        this.CANVAS.height = this.HEIGHT;
        this.CTX           = this.CANVAS.getContext('2d');

        this.sprites       = sprites;
        this.sprites.forEach(sprite => {sprite.setCtx(this.CTX)});

        this.cameraX = 0;
        this.cameraY = 0;
        this.keySet = new Set();

        document.addEventListener("keydown", (e) =>{
            this.keySet.add(e.key.toLowerCase())
        });
        document.addEventListener("keyup", (e) =>
            this.keySet.delete(e.key.toLowerCase())
        );
        
        this.play.bind(this);
        requestAnimationFrame(this.play.bind(this));
        
    }
    addSprite(sprite){
        sprite.addGame(this);
        this.sprites.push(sprite);
    }
    drive(){
        const speed = 10;
        if(this.keySet.has('w')) this.cameraY -= speed;
        if(this.keySet.has('s')) this.cameraY += speed;
        if(this.keySet.has('a')) this.cameraX -= speed;
        if(this.keySet.has('d')) this.cameraX += speed;
        
    }
    play(){
        this.CTX.clearRect(0, 0, this.WIDTH, this.HEIGHT);

        this.drive();
        this.sprites.forEach(sprite => sprite.update(this.cameraX, this.cameraY));

        requestAnimationFrame(this.play.bind(this));
    }

}

const s = new Sprite(2,3, 100, 100, 1,2);
const s1 = new Sprite(200, 130, 150, 200, -1.3,2);
const s2 = new Sprite(300, 400, 15, 17, -1.3,-1.8);
const c = new Container(0,0,800,800, -1,2,[s,s1,s2]);
new Game([c]); 
alert("??");