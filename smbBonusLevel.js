var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(context, sprite_sheet, posX, posY) {
        this.width = 56;
        this.height = 56;
        this.width_on_sprite_sheet = 28;
        this.height_on_sprite_sheet = 28;
        this.sprite_sheet = new Image();
        this.poses = [{ 'x': 0, 'y': 0 }];
        this.current_pose = 0;
        this.posX = posX;
        this.posY = posY;
        this.context = context;
        this.sprite_sheet.onload = function () {
            console.log(this + ' loaded');
        };
        this.sprite_sheet.src = sprite_sheet;
    }
    GameObject.prototype.draw = function () {
        this.context.save();
        this.context.translate(this.posX, this.posY);
        this.context.drawImage(this.sprite_sheet, this.poses[this.current_pose].x * this.width_on_sprite_sheet, this.poses[this.current_pose].y * this.height_on_sprite_sheet, this.width_on_sprite_sheet, this.height_on_sprite_sheet, 0, 0, this.width, this.height);
        // console.log(
        //   this.sprite_sheet,
        //   this.poses[this.current_pose].x * this.width_on_sprite_sheet,
        //   this.poses[this.current_pose].y * this.height_on_sprite_sheet,
        //   this.width_on_sprite_sheet,
        //   this.height_on_sprite_sheet,
        //   0, 0, this.width, this.height);
        this.context.restore();
        this.context.rect(this.posX, this.posY, 10, 10);
    };
    GameObject.prototype.getPos = function () {
        return { 'x': this.posX, 'y': this.posY };
    };
    GameObject.prototype.getDimensions = function () {
        return { 'width': this.width, 'height': this.height };
    };
    return GameObject;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(context, path, posX, posY) {
        var _this = _super.call(this, context, path, posX, posY) || this;
        _this.movement_speed = 50;
        _this.poses = [
            { 'x': 7, 'y': 0 },
            { 'x': 6, 'y': 0 }
        ];
        _this.GRAVITY = 9.81;
        _this.is_jumping = false;
        _this.max_jump_height = 20;
        _this.initial_ground_y = _this.posY;
        _this.jump_speed = ((_this.posY + _this.GRAVITY) / 3) * 2;
        return _this;
    }
    Player.prototype.move = function (direction) {
        this.posX += direction * this.movement_speed;
        if (direction > 0) {
            this.current_pose = 0;
        }
        else {
            this.current_pose = 1;
        }
    };
    Player.prototype.jump = function () {
        console.log("jump");
        this.is_jumping = true;
    };
    Player.prototype.update = function () {
        //jump
        if (this.is_jumping) {
            this.posY -= this.jump_speed;
            this.is_jumping = false;
        }
        if (this.posY <= this.initial_ground_y) {
            this.posY += this.GRAVITY;
        }
        if (this.posY <= 0) {
            this.posY = 0;
        }
    };
    Player.prototype.draw = function () {
        this.context.save();
        this.context.rotate(Math.PI / 2);
        _super.prototype.draw.call(this);
        this.context.restore();
    };
    return Player;
}(GameObject));
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin(context, path, posX, posY) {
        var _this = _super.call(this, context, path, posX, posY) || this;
        _this.width_on_sprite_sheet = 260 / 9;
        _this.height_on_sprite_sheet = 114 / 4;
        _this.poses = [
            // {'x': 7, 'y':3},
            { 'x': 6, 'y': 3 },
            { 'x': 5, 'y': 3 },
            { 'x': 4, 'y': 3 }
        ];
        _this.draw_me = true;
        _this.frame_counter = 0;
        return _this;
    }
    Coin.prototype.draw = function () {
        if (this.draw_me) {
            _super.prototype.draw.call(this);
            this.frame_counter += 1;
            if (this.frame_counter % 22 == 0) {
                this.frame_counter = 0;
                this.current_pose += 1;
                if (this.current_pose > this.poses.length - 1) {
                    this.current_pose = 0;
                }
            }
        }
    };
    Coin.prototype.remove = function () {
        console.log('huhu');
        this.draw_me = false;
    };
    return Coin;
}(GameObject));
