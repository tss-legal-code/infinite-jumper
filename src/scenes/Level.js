
// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "../prefabs/BackgroundPrefab.js";
import ForegroundPrefab from "../prefabs/ForegroundPrefab.js";
import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import LaunchSceneActionScript from "../scriptnodes/scene/LaunchSceneActionScript.js";
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

		// backgroundPrefab
		const backgroundPrefab = new BackgroundPrefab(this, 0, 0);
		levelLayer.add(backgroundPrefab);

		// foregroundPrefab
		const foregroundPrefab = new ForegroundPrefab(this, 0, 0);
		levelLayer.add(foregroundPrefab);

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
		const player = new PlayerPrefab(this, 120, -64);
		playerLayer.add(player);

		// platformGroupPrefab
		const platformGroupPrefab = new PlatformGroupPrefab(this);
		this.add.existing(platformGroupPrefab);

		// onAwakeActionScript
		const onAwakeActionScript = new OnAwakeActionScript(this);

		// launchSceneActionScript
		const launchSceneActionScript = new LaunchSceneActionScript(onAwakeActionScript);

		// lists
		const movingLevelTileSprites = [rightWall, leftWall, foregroundPrefab];
		const walls = [rightWall, leftWall];

		// playerWithPlatformsCollider
		this.physics.add.collider(player, platformGroupPrefab.group);

		// playerWithWallsCollider
		this.physics.add.collider(player, walls);

		// rightWall (prefab fields)
		rightWall.tileOffsetY = -120;

		// launchSceneActionScript (prefab fields)
		launchSceneActionScript.sceneKey = "UI";

		this.player = player;
		this.platformGroupPrefab = platformGroupPrefab;
		this.leftKeyboardKey = leftKeyboardKey;
		this.rightKeyboardKey = rightKeyboardKey;
		this.movingLevelTileSprites = movingLevelTileSprites;
		this.walls = walls;

		this.events.emit("scene-awake");
	}

	/** @type {PlayerPrefab} */
	player;
	/** @type {PlatformGroupPrefab} */
	platformGroupPrefab;
	/** @type {Phaser.Input.Keyboard.Key} */
	leftKeyboardKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	rightKeyboardKey;
	/** @type {Array<WallPrefab|ForegroundPrefab>} */
	movingLevelTileSprites;
	/** @type {WallPrefab[]} */
	walls;

	/* START-USER-CODE */

	/** @type Boolean */
	firstJumpMade
	level = 0;
	isGameOver = false;
	currentScore = 0;
	maxHeight = 0;
	startingMaxheight = 0;

	create() {
		this.editorCreate();
		this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1);
		this.cameras.main.setDeadzone(this.scale.width);
		this.firstJumpMade = false;
		this.isGameOver = false;
		this.currentScore = 0;
		this.maxHeight = 0;
		this.startingMaxheight = 0;
		this.level = 0;
		this.levels = {
			0: 70,
		}
	}

	update(){
		this.updateScore();
		const isTouchingDown = this.player.body.touching.down;

		if (isTouchingDown) {
			this.handleLanding()
			if (!this.firstJumpMade) {
				this.handleFirstJump();
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

		this.updateSpites();
		this.updateWalls();

		this.gameOverConditionCheck();

		this.reusePlatforms();
	}

	getPlayerDistance() {
		return Math.floor(Math.abs(this.player.body.bottom));
	}

	updateScore(){
		if (!this.firstJumpMade) {
			return;
		}

		const distance = this.getPlayerDistance();

		if (distance < this.maxHeight) {
			return
		}

		this.maxHeight = distance;
		this.currentScore = Math.floor((this.maxHeight - this.startingMaxheight) / 10);
		this.scene.get('UI').updateScoreText(this.currentScore);

		this.updateLevel();
	}

	updateLevel() {
		if (this.level === 0 && this.currentScore > this.levels[this.level]) {
			this.platformGroupPrefab.enablePlatformMovement();
			this.level = 1;
		}
	}

	handleFirstJump() {
		this.firstJumpMade = true;
		this.startingMaxheight = this.getPlayerDistance();
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

	updateSpites(){
		this.movingLevelTileSprites.forEach((tileSprite) => {
			tileSprite.tilePositionY = this.player.y * 0.2 + (tileSprite.tileOffsetY || 0);
		})
	}

	updateWalls(){
		this.walls.forEach((wall) => {
			// fix wall positioning
			const x = wall.flipX ? 16 : 0;
			wall.body.setOffset(x, this.cameras.main.worldView.y);
		})
	}

	reusePlatforms(){
		this.platformGroupPrefab.update();
	}

	gameOverConditionCheck(){
		if (this.isGameOver) {
			this.player.setVelocityY(15);
			return
		}

		const isPlayerTooLow = this.player.y > this.platformGroupPrefab.lowestPlatformY;

		if (!isPlayerTooLow) {
			return
		}

		this.isGameOver = true;
		this.player.setVelocityY(15);
		this.player.play('playerHurt');

		const wipeFx = this.player.postFX.addWipe(0.1, 0, 1);

		this.tweens.add({
			targets: wipeFx,
			progress: 1,
			duration: 3000,
			onComplete: () => {
				this.player.body.enable = false;
				this.registry.set('score', this.currentScore);
				this.scene.stop('UI');
				this.scene.start('GameOver');
				// console.log("GAME OVER!")
			}
		})
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
