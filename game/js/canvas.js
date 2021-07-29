// CANVAS
var stage
var canvasW=0;
var canvasH=0;


 // START GAME CANVAS - This is the function that runs to setup game canvas
 
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, mainContainer, gameContainer, mathsContainer, resultContainer;
var bg, logo, startButton, buttonReplay, dragArea, iconTimer, iconTimerShadow, iconQuestion, iconQuestionColour, iconQuestionShadow, resultTxtShadow, resultTxt, iconFacebook, iconTwitter, iconWhatsapp, shareTxt, highScoreTxt, highScoreTxtShadow, quoteTxt, quoteTxtShadow;
$.maths={};

 //BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts

function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	mathsContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	howToPlayContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	
	bg = new createjs.Shape();
	bg.graphics.beginFill(bgColour).drawRect(0, 0, canvasW, canvasH);
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	centerReg(logo);
	logo.x = canvasW/2;
	logo.y = canvasH/2;
	
	for(n=0;n<maths_arr.length; n++){
		$.maths[maths_arr[n]] = new createjs.Bitmap(loader.getResult(maths_arr[n]));
		$.maths[maths_arr[n]].x = -500;
		createHitarea($.maths[maths_arr[n]]);
		centerReg($.maths[maths_arr[n]]);
		mainContainer.addChild($.maths[maths_arr[n]]);
	}
	
	
	startButton = new createjs.Bitmap(loader.getResult('buttonStart'));
	startButton.x = canvasW/2.49;
	startButton.y = (canvasH/100*69);
	
	
	buttonReplay = new createjs.Bitmap(loader.getResult('buttonReplay'));
	buttonReplay.x = canvasW/2.55;
	buttonReplay.y = (canvasH/100*44);
	
	iconTimer = new createjs.Shape();
	iconTimer.x = canvasW/2;
	iconTimer.y = canvasH/100 * 25;
	iconTimer.scaleX = -1;
	
	iconTimerShadow = new createjs.Shape();
	iconTimerShadow.x = canvasW/2;
	iconTimerShadow.y = canvasH/100 * 26.5;
	iconTimerShadow.scaleX = -1;
	iconTimerShadow.alpha = .2;
	
	dragArea = new createjs.Bitmap(loader.getResult('area'));
	centerReg(dragArea);
	dragArea.x = canvasW/2;
	dragArea.y = canvasH/2;
	
	var questionScale = 1;
	iconQuestion = new createjs.Bitmap(loader.getResult('?'));
	centerReg(iconQuestion);
	iconQuestion.x = -500;
	iconQuestion.y = -500;
	
	iconQuestionColour = iconQuestion.clone();
	iconQuestionColour.filters = [
		new createjs.ColorFilter(0,0,0,1,hexToRgb(questionColour).r,hexToRgb(questionColour).g,hexToRgb(questionColour).b)
	];
	iconQuestionColour.cache(0, 0, iconQuestion.image.naturalWidth, iconQuestion.image.naturalHeight);
	iconQuestionColour.x = canvasW/2;
	iconQuestionColour.y = canvasH/2;
	
	iconQuestionShadow = iconQuestion.clone();
	iconQuestionShadow.filters = [
		new createjs.ColorFilter(0,0,0,.2, 0,0,0,0)
	];
	iconQuestionShadow.cache(0, 0, iconQuestion.image.naturalWidth, iconQuestion.image.naturalHeight);
	iconQuestionShadow.x = iconQuestionColour.x;
	iconQuestionShadow.y = iconQuestionColour.y+(numberShadowY*questionScale);
	iconQuestion.scaleX = iconQuestion.scaleY = iconQuestionColour.scaleX = iconQuestionColour.scaleY = iconQuestionShadow.scaleX = iconQuestionShadow.scaleY = questionScale;
	
	resultTxt = new createjs.Text();
	resultTxtShadow = new createjs.Text();
	resultTxt.font = resultTxtShadow.font = "100px odin";
	resultTxt.color = "#ffffff";
	resultTxtShadow.color = "#000000";
	resultTxt.text = resultTxtShadow.text = '';
	resultTxt.textAlign = resultTxtShadow.textAlign = "center";
	resultTxt.textBaseline=resultTxtShadow.textBaseline='alphabetic';
	resultTxt.x = resultTxtShadow.x = canvasW/2;
	resultTxt.y = (canvasH/2.5);
	resultTxtShadow.alpha=.2;
	resultTxtShadow.y = (canvasH/100*42);

	highScoreTxt = new createjs.Text();
	highScoreTxtShadow = new createjs.Text();
	highScoreTxt.font = highScoreTxtShadow.font = "50px odin";
	highScoreTxt.color = "#28282B";
	highScoreTxtShadow.color = "#000000";
	highScoreTxt.text = highScoreTxtShadow.text = '';
	highScoreTxt.textAlign = highScoreTxtShadow.textAlign = "center";
	highScoreTxt.textBaseline=highScoreTxtShadow.textBaseline='alphabetic';
	highScoreTxt.x = highScoreTxtShadow.x = canvasW/2;
	highScoreTxt.y = (canvasH/4);
	highScoreTxtShadow.alpha=.2;
	highScoreTxtShadow.y = (canvasH/100*24.2);
	
	quoteTxt = new createjs.Text();
	quoteTxtShadow = new createjs.Text();
	quoteTxt.font = quoteTxtShadow.font = "1.8vw odin";
	quoteTxt.color = "#585858";
	quoteTxtShadow.color = "#000000";
	quoteTxt.text = quoteTxtShadow.text = '';
	quoteTxt.textAlign = quoteTxtShadow.textAlign = "center";
	quoteTxt.textBaseline=quoteTxtShadow.textBaseline='alphabetic';
	quoteTxt.x = quoteTxtShadow.x = canvasW/2;
	quoteTxt.y = (canvasH/1.63);
	quoteTxtShadow.alpha=.2;
	quoteTxtShadow.y = (canvasH/100*61.8);

	shareTxt = new createjs.Text();
	shareTxt.font = "30px odin";
	shareTxt.color = "#ffffff";
	shareTxt.text = shareText;
	shareTxt.textAlign = "center";
	shareTxt.textBaseline='alphabetic';
	shareTxt.x = canvasW/2;
	shareTxt.y = canvasH/100 * 72;
	
	iconFacebook = new createjs.Bitmap(loader.getResult('iconFacebook'));
	iconTwitter = new createjs.Bitmap(loader.getResult('iconTwitter'));
	iconWhatsapp = new createjs.Bitmap(loader.getResult('iconWhatsapp'));
	centerReg(iconFacebook);
	createHitarea(iconFacebook);
	centerReg(iconTwitter);
	createHitarea(iconTwitter);
	centerReg(iconWhatsapp);
	createHitarea(iconWhatsapp);
	iconFacebook.x = canvasW/100*40;
	iconTwitter.x = canvasW/2;
	iconWhatsapp.x = canvasW/100*60;
	iconFacebook.y = iconTwitter.y = iconWhatsapp.y = canvasH/100 * 80;
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	buttonHowToPlay = new createjs.Bitmap(loader.getResult('buttonHowToPlay'));
	centerReg(buttonHowToPlay);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	createHitarea(buttonHowToPlay);
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit, buttonHowToPlay);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	centerReg(itemExit);
	itemExit.x = canvasW/2;
	itemExit.y = canvasH/2;
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	buttonConfirm.x = canvasW/100* 35;
	buttonConfirm.y = canvasH/100 * 63;
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	buttonCancel.x = canvasW/100 * 65;
	buttonCancel.y = canvasH/100 * 63;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "50px odin";
	confirmMessageTxt.color = "#fff";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *44;
	
	confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
	confirmContainer.visible = false;

	/*howToPlay*/
	itemHowToPlay = new createjs.Bitmap(loader.getResult('itemHowToPlay'));
	centerReg(itemHowToPlay);
	itemHowToPlay.x = canvasW/2;
	itemHowToPlay.y = canvasH/2;

	buttonClose = new createjs.Bitmap(loader.getResult('buttonClose'));
	centerReg(buttonClose);
	buttonClose.x = canvasW/100* 79;
	buttonClose.y = canvasH/100 * 29;

    /*EMBED VIDEO USING LOCAL FILE*/
	var videoDom = $('<video width="500" height="280" autoplay="true" loop><source src="./assets/tutorial.webm" type="video/webm"></video>').appendTo(document.body)[0];
	var obj = new createjs.DOMElement(videoDom);
	obj.x = canvasW/100*44;
	obj.y = canvasH/100*26;

	/*EMBED VIDEO USING YOUTUBE*/


	var txtup = new createjs.Text();
	txtup.font = "25px odin";
	txtup.color = "#edece6";
	txtup.textAlign = "center";
	txtup.textBaseline='alphabetic';
	txtup.text = howToPlayMessageUp;
	txtup.x = canvasW/2;
	txtup.y = canvasH/100 *32;

	var txtdown = new createjs.Text();
	txtdown.font = "25px odin";
	txtdown.color = "#edece6";
	txtdown.textAlign = "center";
	txtdown.textBaseline='alphabetic';
	txtdown.text = howToPlayMessageDown;
	txtdown.x = canvasW/2;
	txtdown.y = canvasH/100 *72;

	howToPlayContainer.addChild(itemHowToPlay, buttonClose, obj, txtup, txtdown);
	howToPlayContainer.visible = false;
	
	mainContainer.addChild(startButton, logo);
	mainContainer.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, canvasW, canvasH));	
	gameContainer.addChild(dragArea, iconTimerShadow, iconTimer, iconQuestionShadow, iconQuestion, iconQuestionColour, mathsContainer)
	resultContainer.addChild(buttonReplay, resultTxtShadow, resultTxt, highScoreTxtShadow, highScoreTxt, quoteTxtShadow, quoteTxt);
	if(shareEnable){
		resultContainer.addChild(shareTxt, iconFacebook, iconTwitter, iconWhatsapp);
	}
	canvasContainer.addChild(bg, mainContainer, gameContainer, resultContainer, confirmContainer,howToPlayContainer, optionsContainer, buttonSettings);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}

 //RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		buttonSettings.x = (canvasW - offset.x) - 60;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 75;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);

			buttonHowToPlay.x = buttonSettings.x;
			buttonHowToPlay.y = buttonSettings.y+(distanceNum*3);
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*3);

			buttonHowToPlay.x = buttonSettings.x;
			buttonHowToPlay.y = buttonSettings.y+(distanceNum*4);
		}
	}
}

 
 // This is the function that runs to remove game canvas
 
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}
