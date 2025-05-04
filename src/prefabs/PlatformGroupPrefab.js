
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
		})

		this.platfowmMinX = 10;
		this.platfowmMaxX = 200;

		this.platfowmMinOffsetY = 50;
		this.platfowmMaxOffsetY = 140;
		// this.platfowmMinOffsetY = 10;
		// this.platfowmMaxOffsetY = 40;


		this.initPlatforms();

		this.maxPlatformDistance = scene.scale.height * 3;
		this.lowestPlatformY = 0;
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	
	/** @type Phaser.GameObjects.Group */
	group

	/** @type number */
	maxPlatformDistance

	/** @type number */
	lowestPlatformY

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

		let offsetY = 0;

		reusables.forEach((child)=> {
			child.x = Phaser.Math.Between(this.platfowmMinX, this.platfowmMaxX),
			offsetY += Phaser.Math.Between(this.platfowmMinOffsetY, this.platfowmMaxOffsetY);
			child.y = scrollY - offsetY;
		})
	}

	initPlatforms() {
		this.group.get(120, 0);

		for (let i = 0; i < 5; i +=1) {
			const x = Phaser.Math.Between(this.platfowmMinX, this.platfowmMaxX);
			const y = -this.platfowmMaxOffsetY * i;
			this.group.get(x, y);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
