
// You can write more code here

/* START OF COMPILED CODE */

import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
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

		// fadeEffectCameraActionScript (prefab fields)
		fadeEffectCameraActionScript.duration = 500;

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
