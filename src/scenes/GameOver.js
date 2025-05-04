
// You can write more code here

/* START OF COMPILED CODE */

import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
import TimeEventActionScript from "../scriptnodes/timer/TimeEventActionScript.js";
import StartSceneActionScript from "../scriptnodes/scene/StartSceneActionScript.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// gameOverTextGameObject
		const gameOverTextGameObject = this.add.text(120, 39, "", {});
		gameOverTextGameObject.setOrigin(0.5, 0.5);
		gameOverTextGameObject.text = "Game Over";
		gameOverTextGameObject.setStyle({ "fontFamily": "PressStart2P-Regular", "fontSize": "20px" });

		// scoreTextGameObject
		const scoreTextGameObject = this.add.text(120, 80, "", {});
		scoreTextGameObject.setOrigin(0.5, 0.5);
		scoreTextGameObject.text = "Score";
		scoreTextGameObject.setStyle({ "fontFamily": "PressStart2P-Regular", "fontSize": "10px" });

		// scoreValueGameObject
		const scoreValueGameObject = this.add.text(120, 100, "", {});
		scoreValueGameObject.setOrigin(0.5, 0.5);
		scoreValueGameObject.text = "0";
		scoreValueGameObject.setStyle({ "fontFamily": "PressStart2P-Regular", "fontSize": "10px" });

		// onAwakeActionScript
		const onAwakeActionScript = new OnAwakeActionScript(this);

		// fadeEffectCameraActionScript
		const fadeEffectCameraActionScript = new FadeEffectCameraActionScript(onAwakeActionScript);

		// timeEventActionScript
		const timeEventActionScript = new TimeEventActionScript(onAwakeActionScript);

		// fadeEffectCameraActionScript_1
		const fadeEffectCameraActionScript_1 = new FadeEffectCameraActionScript(timeEventActionScript);

		// startSceneActionScript
		const startSceneActionScript = new StartSceneActionScript(fadeEffectCameraActionScript_1);

		// fadeEffectCameraActionScript (prefab fields)
		fadeEffectCameraActionScript.duration = 500;

		// timeEventActionScript (prefab fields)
		timeEventActionScript.delay = 3000;

		// fadeEffectCameraActionScript_1 (prefab fields)
		fadeEffectCameraActionScript_1.duration = 500;
		fadeEffectCameraActionScript_1.fadeEvent = "camerafadeoutcomplete";

		// startSceneActionScript (prefab fields)
		startSceneActionScript.sceneKey = "Level";

		this.scoreValueGameObject = scoreValueGameObject;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	scoreValueGameObject;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		const score = this.registry.get('score');
		this.scoreValueGameObject.setText(score);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
