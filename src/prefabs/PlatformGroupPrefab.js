
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

		// this.platfowmMinOffsetY = 130;
		// this.platfowmMaxOffsetY = 150;
		this.platfowmMinOffsetY = 10;
		this.platfowmMaxOffsetY = 40;


		this.group.get(90, 150);

		for (let i = 0; i < 5; i +=1) {
			const x = Phaser.Math.Between(10, 200);
			const y = -150 * i + 150;
			this.group.get(x, y);
		}

		this.maxPlatformDistance = scene.scale.height * 3;
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	
	/** @type Phaser.GameObjects.Group */
	group

	/** @type number */
	maxPlatformDistance
	// Write your code here.

	update(){
		const scrollY = this.scene.cameras.main.scrollY;
		const children = this.group.getChildren();
		const reusables = [];

		children.forEach((child)=> {
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

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
