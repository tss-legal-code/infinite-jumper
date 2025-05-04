
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import PlatformPrefab from './PlatformPrefab.js'
/* END-USER-IMPORTS */

export default class PlatformGroupPrefab extends Phaser.GameObjects.Layer {

	constructor(scene) {
		super(scene);

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.group = scene.add.group({
			classType: PlatformPrefab,
			// maxSize: 30
			runChildUpdate: true,
		})

		this.platfowmMinX = 10;
		this.platfowmMaxX = 200;
		this.platfowmMinOffsetY = 100;
		this.platfowmMaxOffsetY = 140;

		this.maxPlatformDistance = scene.scale.height * 3;
		this.lowestPlatformY = 0;
		this.highestPlatformY = 0;

		this.isPlatformMovementEnabled = false;

		this.initPlatforms();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	
	/** @type Phaser.GameObjects.Group */
	group

	/** @type number */
	maxPlatformDistance

	/** @type number */
	lowestPlatformY

	/** @type number */
	highestPlatformY

	/** @type boolean */
	isPlatformMovementEnabled = false;

	update(){
		const scrollY = this.scene.cameras.main.scrollY;
		const children = this.group.getChildren();
		const reusables = [];
		this.lowestPlatformY = children[0].y;

		children.forEach((child)=> {
			if (child.y > this.lowestPlatformY) {
				this.lowestPlatformY = child.y; 
			}

			if (child.y < scrollY + this.maxPlatformDistance) {
				return
			}

			reusables.push(child);
		})

		reusables.forEach((child)=> {
			child.x = this.getRandomX();
			this.highestPlatformY -= this.getRandomY();
			child.y = this.highestPlatformY;

			if (this.isPlatformMovementEnabled) {
				this.randomlyStartMovingPlatforms(child)
			}
		})
	}

	enablePlatformMovement() {
		this.isPlatformMovementEnabled = true
	}

	randomlyStartMovingPlatforms(child) {
		if (Phaser.Math.RND.between(0,1) === 1) {
			child.startPlatformMovement();
		} else {
			child.stopPlatformMovement();
		}
	}

	getRandomX(){
		return Phaser.Math.Between(this.platfowmMinX, this.platfowmMaxX)
	}

	getRandomY(){
		return Phaser.Math.Between(this.platfowmMinOffsetY, this.platfowmMaxOffsetY);
	}

	initPlatforms() {
		this.group.get(120, this.highestPlatformY);

		for (let i = 0; i < 5; i +=1) {
			const x = this.getRandomX();
			this.highestPlatformY -= this.getRandomY();
			const y = this.highestPlatformY;
			this.group.get(x, y);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
