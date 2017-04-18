class GameObject{

  posX:number;
  posY:number;

  width:number =  56;
  height:number =  56;

  width_on_sprite_sheet:number = 28;
  height_on_sprite_sheet:number = 28;

  sprite_sheet: HTMLImageElement = new Image();
  context: CanvasRenderingContext2D;

  poses = [{'x':0, 'y':0}];
  current_pose:number = 0;

  constructor(context: CanvasRenderingContext2D, sprite_sheet:string,  posX:number, posY:number){
    this.posX = posX;
    this.posY = posY;
    this.context = context;

    this.sprite_sheet.onload=function(){
      console.log(this + ' loaded');
    }
    this.sprite_sheet.src = sprite_sheet;
  }

  public draw(){

    this.context.save();
    this.context.translate(this.posX, this.posY);
    this.context.drawImage(
      this.sprite_sheet,
      this.poses[this.current_pose].x * this.width_on_sprite_sheet,
      this.poses[this.current_pose].y * this.height_on_sprite_sheet,
      this.width_on_sprite_sheet,
      this.height_on_sprite_sheet,
      0, 0, this.width, this.height);

      // console.log(
      //   this.sprite_sheet,
      //   this.poses[this.current_pose].x * this.width_on_sprite_sheet,
      //   this.poses[this.current_pose].y * this.height_on_sprite_sheet,
      //   this.width_on_sprite_sheet,
      //   this.height_on_sprite_sheet,
      //   0, 0, this.width, this.height);
    this.context.restore();
    this.context.rect(this.posX, this.posY, 10, 10);
  }

  public getPos(){
    return {'x': this.posX, 'y': this.posY};
  }

  public getDimensions(){
    return {'width': this.width, 'height': this.height};
  }
}



  class Player extends GameObject{
    movement_speed:number = 50;

    poses = [
      {'x': 7, 'y':0},
      {'x': 6, 'y':0}
    ];

    GRAVITY:number = 9.81;
    is_jumping:boolean = false;

    jump_speed:number;
    max_jump_height:number = 20;
    initial_ground_y:number;

    constructor(context: CanvasRenderingContext2D, path:string,  posX:number, posY:number){
      super(context, path,  posX, posY);
      this.initial_ground_y = this.posY;
      this.jump_speed = ((this.posY + this.GRAVITY)/3)*2;
    }

    public move(direction: number){
      this.posX += direction * this.movement_speed;
      if(direction > 0){
        this.current_pose = 0;
      }else{
        this.current_pose = 1;
      }
    }

    public jump(){
      console.log("jump");
      this.is_jumping = true;
    }

    public update(){

      //jump
      if(this.is_jumping){
        this.posY -= this.jump_speed;
        this.is_jumping = false;
      }
      if(this.posY <= this.initial_ground_y){
        this.posY += this.GRAVITY;
      }
      if(this.posY <= 0){
        this.posY = 0;
      }
    }
    public draw(){
      this.context.save();
      this.context.rotate(Math.PI/2);
      super.draw();
      this.context.restore();

    }



  }











  class Coin extends GameObject{
    width_on_sprite_sheet:number = 260/9;
    height_on_sprite_sheet:number = 114/4;

    poses = [
      // {'x': 7, 'y':3},
      {'x': 6, 'y':3},
      {'x': 5, 'y':3},
      {'x': 4, 'y':3}
    ];
    draw_me:boolean = true;
    frame_counter:number = 0;
    constructor(context: CanvasRenderingContext2D,path:string, posX:number, posY:number){
      super(context, path, posX, posY);
    }

    draw(){
      if(this.draw_me){
        super.draw();
        this.frame_counter+=1;
        if(this.frame_counter%22 == 0){
          this.frame_counter = 0;
          this.current_pose += 1;
          if(this.current_pose > this.poses.length -1){this.current_pose = 0;}
        }
      }
    }

    public remove(){
      console.log('huhu');
      this.draw_me = false;
    }

  }
