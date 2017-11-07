window.onload = function() {
 	var tweetText = document.getElementById("tweet");
	var userName = document.getElementById("username");
 	var feed = document.getElementsByName("feed")[0];
	var btn = document.getElementById("btn");
	//Estado inical botón "TWITTEAR", deshabilitado cuando no hay caracteres en el textarea:
	btn.disabled = true;
	btn.style.opacity = "0.5";
	
	//FUNCIÓN PARA CONTAR CARÁCTERES DEL TWEET DE FORMA REGRESIVA:
	var textMax = 140;
	var charCount = document.getElementById("char-count");
	charCount.textContent = textMax +'/140';
	
	tweetText.oninput = function() {
	 	var textLength = tweetText.value.length;
		var textRemaining = textMax - textLength;
		charCount.textContent = textRemaining +'/140';
		
		if (textRemaining < 140) {
			btn.disabled = false;
			btn.style.opacity = "1";
		}
		
		if (textLength <120) {
			charCount.style.color = "#fff";
		}
		
		if (textLength >=120) {
			charCount.style.color = "yellow";
		}
		
		if (textLength >=130) {
			charCount.style.color = "red";
		}
		
		if (textRemaining == 140 || textRemaining < 0) {
			btn.disabled = true;
			btn.style.opacity = "0.5";
		}
	};
	
	//FUNCIÓN PARA AUTOAJUSTAR EL ALTO DEL TEXTAREA SEGUN LA CANTIDAD DE TEXTO:
	tweetText.addEventListener('keydown', function autosize(){
  	var el = this;
  	setTimeout(function(){
    	el.style.cssText = 'height:auto; padding:0';
    	// for box-sizing other than "content-box" use:
    	// el.style.cssText = '-moz-box-sizing:content-box';
    	el.style.cssText = 'height:' + el.scrollHeight + 'px';
  	},0);
	});
	 	
	
	//FUNCIÓN PARA ENVIAR EL TWEET Y GENERAR EL FEED:
	btn.onclick = function() {
  	if (tweetText.value !== "") {
			//Estilo para el feed:
			feed.style.background = "#2C1832";
			feed.style.padding = "15px";
			feed.style.border = "2px solid #000";
			
			//Crea los elementos para el feed:
			var feedBox = document.createElement("div");
      var feedUser = document.createElement("p");
      var feedDate = document.createElement("p");
      var feedText = document.createElement("p");
      
			//Agrega los nodos nuevos al feed:
			feedBox.appendChild(feedUser);
      feedBox.appendChild(feedDate);
      feedBox.appendChild(feedText);
      
			//Crea la clase para cada caja de feed:
			feedBox.className = "feedbox";
			
			//Da formato a la fecha:
			var todayFeed = new Date();
			var date = todayFeed.getDate();
			var month = todayFeed.getMonth();
			var year = todayFeed.getFullYear();
			var hours = todayFeed.getHours();
			var minutes = todayFeed.getMinutes();
			var fullDate = date +'/'+ month +'/'+ year +' '+ hours +':'+ minutes;
			
			//Agrega el contenido de texto para cada nuevo elemento:
      feedUser.textContent = userName.textContent;
      feedDate.textContent = fullDate;
      feedText.textContent = tweetText.value;
			
    	//Agrega cada nuevo tweet al inicio del feed:
			feed.insertBefore(feedBox, feed.children[0]);
 		}
	};
};