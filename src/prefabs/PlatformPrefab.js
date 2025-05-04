
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlatformPrefab extends Phaser.Physics.Arcade.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "platform", frame);

		this.scaleX = 0.75;
		this.scaleY = 0.5;
		scene.physics.add.existing(this, false);
		this.body.allowGravity = false;
		this.body.checkCollision.down = false;
		this.body.checkCollision.left = false;
		this.body.checkCollision.right = false;
		this.body.pushable = false;
		this.body.setSize(80, 16, false);

		/* START-USER-CTR-CODE */
		this.horizontalVelocity = 50;
		this.platformMinX = 10;
		this.platformMaxX = 200;
		this.enablePlatformMovement = false;


		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/** @type number */
	horizontalVelocity
	/** @type number */
	platformMinX
	/** @type number */
	platformMaxX
	/** @type boolean */
	enablePlatformMovement
	
	update() {
		if (!this.enablePlatformMovement) {
			return
		}
		
		if (this.x < this.platformMinX) {
			this.body.velocity.x = this.horizontalVelocity;
		} else if (this.x > this.platformMaxX) {
			this.body.velocity.x = -this.horizontalVelocity;
		}
	}

	startPlatformMovement(){
		this.body.velocity.x = this.horizontalVelocity;
		this.enablePlatformMovement = true;
	}

	stopPlatformMovement(){
		this.body.velocity.x = 0;
		this.enablePlatformMovement = false;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
