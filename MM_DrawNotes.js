Module.register("MM_DrawNotes",{

	// Default module config.
	defaults: {
		postit: "Notas",
		width: "300",
		height: "300"
	},
	start: function () {
		this.sendSocketNotification("start", "dummy payload");
	},
	
	getStyles: function() {
		return["MM_DrawNotes.css"];
	},
	
	getDom: function() {
		var canvas,
		self = this,
		wrapper,
		context,
		background,
		canvasWidth = this.config.width,
		canvasHeight = this.config.height,
		clickX = [],
		clickY = [],
		clickDrag = [],
		clickSize = [],
		clickColor = [],
		curColor = 'black';
		lineWidth = 1,
		curSize = 1,
		paint = false,
		bgsource =  this.data.path + "img/blackboard.jpg";
		
		wrapper = document.createElement("div");
		wrapper.className = "postit";
		wrapper.innerHTML = this.config.postit;
		wrapper.setAttribute("width", this.config.width);    
		wrapper.setAttribute("min-height", this.config.height);
		wrapper.setAttribute("max-height", this.config.height);
		
		var erase = document.createElement("div");
		erase.className = "fab_center";
		var erase_img = document.createElement("img");
		erase_img.setAttribute("src", "modules/MM_DrawNotes/img/eraser.png");
		erase.appendChild(erase_img);
		wrapper.appendChild(erase);
		erase.addEventListener('mousedown', function(event) {
			 curSize = 8;
			 curColor = '#ffff88';
		});
				
		var edit = document.createElement("div");
		edit.className = "fab";
		var edit_img = document.createElement("img");
		edit_img.setAttribute("src", "modules/MM_DrawNotes/img/pencil.png");
		edit.appendChild(edit_img);
		wrapper.appendChild(edit);
		edit.addEventListener('mousedown', function(event) {
			switch(curSize) {
				case 1:
					curSize = 2;
					break;
				case 2:
					curSize = 4;
					break;
				case 4:
					curSize = 8;
					break;
				case 8:
					curSize = 1;
					break;
			};
			curColor = 'black';
		});
		
		var send = document.createElement("div");
		send.className = "fab_send";
		var send_img = document.createElement("img");
		send_img.setAttribute("src", "modules/MM_DrawNotes/img/email.png");
		send.appendChild(send_img);
		wrapper.appendChild(send);
		send.addEventListener('mousedown', function(event) {
			 var dataURL = canvas.toDataURL('image/png');
			self.sendSocketNotification("canvas", dataURL);
		});
			
		canvas = document.createElement('canvas');
		canvas.className = "canvas_style";
		canvas.setAttribute('width', canvasWidth);
		canvas.setAttribute('height', canvasHeight);
		canvas.setAttribute('id', 'canvas');
		context = canvas.getContext("2d"); // Grab the 2d canvas context
		
	    wrapper.appendChild(canvas);
		
		var clearCanvas = function () {
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			context.fillStyle = '#ffff88';
			context.fillRect(0, 0, canvas.width, canvas.height);
		}
		
		var addClick = function addClick(x, y, dragging){
		  clickX.push(x);
		  clickY.push(y);
		  clickDrag.push(dragging);
		  clickSize.push(curSize);
		  clickColor.push(curColor);
		}
		
		var redraw = function redraw(){
		  clearCanvas();
					
		  for(var i=0; i < clickX.length; i++) {		
			context.beginPath();
			if(clickDrag[i] && i){
			  context.moveTo(clickX[i-1], clickY[i-1]);
			}else{
				context.moveTo(clickX[i]-1, clickY[i]);
			}
				context.lineJoin = "round";
				context.lineWidth = clickSize[i];
     			context.strokeStyle = clickColor[i];
				context.lineTo(clickX[i], clickY[i]);
				context.closePath();
				context.stroke();
			}
		}
				
		
		canvas.addEventListener('mousedown', function(event) {
			if (event.button != 0){
				clearAll();
			}else {
			paint = true;
			var pos = getMousePos(canvas, event), /// provide this canvas and event
				x = pos.x,
				y = pos.y;
			addClick(x, y);
			redraw();
			}
			
		}, false);

		canvas.addEventListener('mousemove', function(event) {
			var pos = getMousePos(canvas, event), /// provide this canvas and event
				x = pos.x,
				y = pos.y;
			if(paint){
				addClick(x, y, true);
				redraw();
			}

		}, false);
		
		canvas.addEventListener('mouseup', function(event) {
			paint = false;
		}, false);
		
		canvas.addEventListener('mouseleave', function(event) {
			paint = false;
		}, false);

		function getMousePos(canvas, e) {
			var rect = canvas.getBoundingClientRect();
			return {x: e.clientX - rect.left, y: e.clientY - rect.top};
		}
		
		function clearAll() {
			clearCanvas();
			clickX = [];
			clickY = [];
			clickColor = [];
			clickDrag = [];
			clickSize = [];
		}
		
		return wrapper;
	},
	
	
});
