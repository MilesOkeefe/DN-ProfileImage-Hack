$(function(){
	//~2 hour hack == not the best code
	// it works okay?! :/

	var holder = document.getElementById('drop-area');

	if (typeof window.FileReader === 'undefined') {
	  alert('FileReader not supported. Visit on a desktop or upgrade your browser.');
	}
	 
	holder.ondragover = function () { this.className = 'hover'; return false; };
	holder.ondragend = function () { this.className = ''; return false; };
	holder.ondrop = function (e) {
	  this.className = '';
	  e.preventDefault();

	  var file = e.dataTransfer.files[0],
	      reader = new FileReader();
	  reader.onload = function (event) {
	    console.log(event.target);
	    var url = event.target.result;
	    //set the image to show to user the drop was sucessfull
	    $("#avi").attr("src", url)
	    // put the image on a canvas to access pixel data
	    var img = $('#avi')[0];
		var canvas = $('<canvas/>')[0];
		canvas.width = img.width;
		canvas.height = img.height;
		var context = canvas.getContext('2d')
		context.drawImage(img, 0, 0, 20, 20);
		var img_data = canvas.toDataURL();
		$("#drop-area").hide();

		var px;
		var portrait_input = ""; //variable we will inject into the DN page

		//portrait_input += "[";
		for(var x = 0; x < 20; x++){
			//portrait_input += "[";
			for(var y = 0; y < 20; y++){
				//console.log(x + ", " + y);
				px = context.getImageData(y, x, 1, 1).data; //get the 1 pixel
				$(".CellRow:nth-child(" + (x+1) + ") .Cell:nth-child(" + (y+1) + ")").css('background-color', 'rgb(' + px[0] + ',' + px[1] + ', ' + px[2] + ')'); //displaying how to image will look, for the user
				//portrait_input += '[' + px[0] + ',' + px[1] + ', ' + px[2] + ']';
				//if(y != 19) //don't insert comma if it's the last element
					//portrait_input += ',';
			}
			//portrait_input += "]";
		}
/////////////////
/*
		$("body").append('<img id="dn-hack-img" src="' + img_data + '" hidden>');var img = $('#dn-hack-img')[0];$("body").append('<canvas id="dn-hack-canvas" hidden></canvas>');var canvas = $('#dn-hack-canvas')[0];canvas.width = img.width;canvas.height = img.height;var context = canvas.getContext('2d'); context.drawImage(img, 0, 0, 20, 20);var px;for(var x = 0; x < 20; x++){for(var y = 0; y < 20; y++){px = context.getImageData(y, x, 1, 1).data;$(".CellRow:nth-child(" + (x+1) + ") .Cell:nth-child(" + (y+1) + ")").css('background-color', 'rgb(' + px[0] + ',' + px[1] + ', ' + px[2] + ')');}}
*/
////////////////////$(".CellRow:last-child .Cell:last-child").trigger('click');

		var js = "$('body').append(\"<img id='dn-hack-img' src='" + img_data + "' hidden>\");var img = $('#dn-hack-img')[0];$('body').append(\"<canvas id='dn-hack-canvas' hidden></canvas>\");var canvas = $('#dn-hack-canvas')[0];canvas.width = img.width;canvas.height = img.height;var context = canvas.getContext('2d'); context.drawImage(img, 0, 0, 20, 20);var px;for(var x = 0; x < 20; x++){for(var y = 0; y < 20; y++){px = context.getImageData(y, x, 1, 1).data;$('.CellRow:nth-child(' + (x+1) + ') .Cell:nth-child(' + (y+1) + ')').css('background-color', 'rgb(' + px[0] + ',' + px[1] + ', ' + px[2] + ')');}}"; //$('.edit_user').submit();"; inject into JS
		$("#code").val(js); //put the code in the input box
		$("#code").select(); //highlight the text for easy copy/paste
	  };
	  console.log(file);
	  reader.readAsDataURL(file);

	  return false;
	};
});