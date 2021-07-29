////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/logo.png', id:'logo'},
			{src:'assets/area.png', id:'area'},
			{src:'assets/icon_facebook.png', id:'iconFacebook'},
			{src:'assets/icon_twitter.png', id:'iconTwitter'},
			{src:'assets/icon_whatsapp.png', id:'iconWhatsapp'},
			
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/item_exit.png', id:'itemExit'},
			{src:'assets/item_how_to_play.png', id:'itemHowToPlay'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'},

			{src:'assets/button_how_to_play.png', id:'buttonHowToPlay'},
			{src:'assets/button_close.png', id:'buttonClose'},
			{src:'assets/button_replay.png', id:'buttonReplay'},
			{src:'assets/button_start.png', id:'buttonStart'}
			];
	
	for(n=0;n<maths_arr.length; n++){
		var mathName = maths_arr[n];
		if(symbolreplace_arr.indexOf(mathName) != -1){
			mathName = namereplace_arr[symbolreplace_arr.indexOf(mathName)];
		}
		manifest.push({src:'assets/math_'+mathName+'.png', id:maths_arr[n]});
	}
	
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/music.ogg', id:'music'});
		manifest.push({src:'assets/sounds/rightNote1.ogg', id:'soundNote1'});
		manifest.push({src:'assets/sounds/rightNote2.ogg', id:'soundNote2'});
		manifest.push({src:'assets/sounds/rightNote3.ogg', id:'soundNote3'});
		manifest.push({src:'assets/sounds/timer.ogg', id:'soundTimer'});
		manifest.push({src:'assets/sounds/drag.ogg', id:'soundDrag'});
		manifest.push({src:'assets/sounds/drop.ogg', id:'soundDrop'});
		manifest.push({src:'assets/sounds/end.ogg', id:'soundEnd'});
		manifest.push({src:'assets/sounds/click.ogg', id:'soundClick'});
		manifest.push({src:'assets/sounds/whoosh.ogg', id:'soundWhoosh'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}