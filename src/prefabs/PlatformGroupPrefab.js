
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

		this.group.get(90, 150);

		for (let i = 0; i < 5; i +=1) {
			const x = Phaser.Math.Between(10, 200);
			const y = -150 * i + 150;
			this.group.get(x, y);
		}
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	
	/** @type Phaser.GameObjects.Group */
	group
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
