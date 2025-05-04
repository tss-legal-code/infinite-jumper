
// You can write more code here

/* START OF COMPILED CODE */

import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.jumpVelocity = 350;
		this.sideVelocity = 100;
		this.firstJumpMade = false;

		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// leftKeyboardKey
		const leftKeyboardKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// rightKeyboardKey
		const rightKeyboardKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// levelLayer
		const levelLayer = this.add.layer();

		// leftWall
		const leftWall = new WallPrefab(this, 0, 0);
		levelLayer.add(leftWall);

		// rightWall
		const rightWall = new WallPrefab(this, 208, 0);
		rightWall.flipX = true;
		rightWall.flipY = false;
		levelLayer.add(rightWall);

		// playerLayer
		const playerLayer = this.add.layer();

		// player
		const player = new PlayerPrefab(this, 120, 77);
		playerLayer.add(player);

		// platformGroupPrefab
		const platformGroupPrefab = new PlatformGroupPrefab(this);
		this.add.existing(platformGroupPrefab);

		// lists
		const movingLevelTileSprites = [rightWall, leftWall];

		// playerWithPlatformsCollider
		this.physics.add.collider(player, platformGroupPrefab.group);

		this.player = player;
		this.leftKeyboardKey = leftKeyboardKey;
		this.rightKeyboardKey = rightKeyboardKey;
		this.movingLevelTileSprites = movingLevelTileSprites;

		this.events.emit("scene-awake");
	}

	/** @type {PlayerPrefab} */
	player;
	/** @type {Phaser.Input.Keyboard.Key} */
	leftKeyboardKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	rightKeyboardKey;
	/** @type {WallPrefab[]} */
	movingLevelTileSprites;

	/* START-USER-CODE */

	/** @type Boolean */
	firstJumpMade

	create() {
		this.editorCreate();
		this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1);
		this.firstJumpMade = false;
	}

	update(){
		const isTouchingDown = this.player.body.touching.down
		if (isTouchingDown) {
			this.handleLanding()
			if (!this.firstJumpMade) {
				this.firstJumpMade = true;
			}
		} else if (this.firstJumpMade) {
			if (this.leftKeyboardKey.isDown) {
				this.handleMoveLeft()
			} else if (this.rightKeyboardKey.isDown) {
				this.handleMoveRIght()
			} else {
				this.handleNoSideMove();
			}
		}

		this.updateTileSprites();
	}

	handleLanding(){
		this.player.play('playerJump')
		this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'playerJump', () => {
			this.player.play('playerSpin')
		});

		this.player.setVelocityY(-this.jumpVelocity)
	}

	handleMoveLeft() {
		this.player.setFlipX(true);
		this.player.setVelocityX(-this.sideVelocity)
	}

	handleMoveRIght(){
		this.player.setFlipX(false);
		this.player.setVelocityX(this.sideVelocity)
	}

	handleNoSideMove(){
		this.player.setVelocityX(0)
	}

	updateTileSprites(){
		this.movingLevelTileSprites.forEach((tileSprite) => {
			tileSprite.tilePositionY = this.player.y * 0.2;
		})
	}
	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
