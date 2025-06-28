
// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "../prefabs/BackgroundPrefab.js";
import ForegroundPrefab from "../prefabs/ForegroundPrefab.js";
import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
import TweenActionScript from "../scriptnodes/animation/TweenActionScript.js";
import SceneOnPointerDownActionScript from "../scriptnodes/scene/SceneOnPointerDownActionScript.js";
import StartSceneActionScript from "../scriptnodes/scene/StartSceneActionScript.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Title extends Phaser.Scene {

	constructor() {
		super("Title");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

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
		rightWall.tilePositionX = 0;
		rightWall.tilePositionY = -120;
		levelLayer.add(rightWall);

		// ground
		const ground = this.add.image(0, 144, "ground");
		ground.setOrigin(0, 0);
		levelLayer.add(ground);

		// titleTextGamObject
		const titleTextGamObject = this.add.text(120, 40, "", {});
		titleTextGamObject.setOrigin(0.5, 0.5);
		titleTextGamObject.text = "Infinite\nCave\nEscape";
		titleTextGamObject.setStyle({ "align": "center", "color": "#00ace1ff", "fontFamily": "PressStart2P-Regular", "stroke": "#0ff", "shadow.offsetX": 3, "shadow.offsetY": 1, "shadow.stroke": true, "shadow.fill": true });
		titleTextGamObject.setLineSpacing(2);
		levelLayer.add(titleTextGamObject);

		// clickToPlayTextGameObject
		const clickToPlayTextGameObject = this.add.text(120, 100, "", {});
		clickToPlayTextGameObject.setOrigin(0.5, 0.5);
		clickToPlayTextGameObject.text = "click to Play";
		clickToPlayTextGameObject.setStyle({ "color": "#59006eff", "fontFamily": "PressStart2P-Regular", "fontSize": "11px", "stroke": "#000000" });
		levelLayer.add(clickToPlayTextGameObject);

		// playerLayer
		const playerLayer = this.add.layer();

		// player
		const player = new PlayerPrefab(this, 120, 136);
		playerLayer.add(player);

		// onAwakeActionScript
		const onAwakeActionScript = new OnAwakeActionScript(this);

		// fadeEffectCameraActionScript
		const fadeEffectCameraActionScript = new FadeEffectCameraActionScript(onAwakeActionScript);

		// tweenActionScript
		const tweenActionScript = new TweenActionScript(onAwakeActionScript);

		// sceneOnPointerDownActionScript
		const sceneOnPointerDownActionScript = new SceneOnPointerDownActionScript(onAwakeActionScript);

		// startSceneActionScript
		const startSceneActionScript = new StartSceneActionScript(sceneOnPointerDownActionScript);

		// rightWall (prefab fields)
		rightWall.tileOffsetY = -120;

		// fadeEffectCameraActionScript (prefab fields)
		fadeEffectCameraActionScript.duration = 500;

		// tweenActionScript (prefab fields)
		tweenActionScript.target = clickToPlayTextGameObject;
		tweenActionScript.duration = 300;
		tweenActionScript.yoyo = true;
		tweenActionScript.repeat = -1;
		tweenActionScript.delay = 300;
		tweenActionScript.loopDelay = 300;
		tweenActionScript.tweenProperty = "alpha";
		tweenActionScript.tweenPropertyValue = 0.2;

		// sceneOnPointerDownActionScript (prefab fields)
		sceneOnPointerDownActionScript.once = true;

		// startSceneActionScript (prefab fields)
		startSceneActionScript.sceneKey = "Level";

		this.player = player;

		this.events.emit("scene-awake");
	}

	/** @type {PlayerPrefab} */
	player;

	/* START-USER-CODE */

  // Write your code here

  create() {

    this.editorCreate();
	this.player.body.enable = false;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
