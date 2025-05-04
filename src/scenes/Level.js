
// You can write more code here

/* START OF COMPILED CODE */

import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// platformGroupPrefab
		const platformGroupPrefab = new PlatformGroupPrefab(this);
		this.add.existing(platformGroupPrefab);

		// player
		const player = new PlayerPrefab(this, 113, 77);
		this.add.existing(player);

		// playerWithPlatformsCollider
		this.physics.add.collider(player, platformGroupPrefab.group);

		this.player = player;

		this.events.emit("scene-awake");
	}

	/** @type {PlayerPrefab} */
	player;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();
	}

	update(){
		const isTouchingDown = this.player.body.touching.down
		if (isTouchingDown) {
			this.handlePlayerTouchDown()
		} 
	}

	handlePlayerTouchDown(){
		this.player.setVelocityY(-150)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
