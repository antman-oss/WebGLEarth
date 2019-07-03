define( [ "qlik","jquery","//www.webglearth.com/v2/api.js","./properties"
],
function ( qlik,$,WE3,props) {
	'use strict';
	return {
		initialProperties: {
				version: 1.0,
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 10,
						qHeight: 1000
					}]
				}
		},
		definition: props,
		support : {
			snapshot: true,
			export: false,
			exportData : false
		},
		paint: function ($element, layout) {
			//Credit to WebGLEarth for example working code.
			
			//Initialise
			$element.empty();
						
			//Extension variables
			var id = layout.qInfo.qId + "_webglearth";
			var eID = id + "_earth";
			var width = $element.width(), height = $element.height();
			var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
			var url = layout.props.q_tileurl;
			var zm = layout.props.q_tilezoom;
			var image_vector = layout.props.q_icons != '' ? layout.props.q_icons.split(',') : ['/extensions/WebGLEarth/default.png'] ; 
			var qAnimate = layout.props.q_animation || 0;
			var qStart = layout.props.q_starting.split(',');
						
			//Setup CSS Styling
			var styles = `
				html, body{padding: 0; margin: 0;}
				
				.earth{
					top: 0;
					right: 0; 
					bottom: 0; 
					left: 0;
					background-color: #000; 
					position: absolute !important;
				}
			`

			var styleSheet = document.createElement("style")
			styleSheet.type = "text/css"
			styleSheet.innerText = styles
			document.head.appendChild(styleSheet)
			
			
			//Setup HTML elements
			if(!document.getElementById(id)) {
				var $webglearth = $('<div />');
				var html = '<div id="' + eID + '" width="' + width + '" height="' + height + '" class="earth"></div>';
				$webglearth.html(html);
				$element.append($webglearth.attr("id",id).width(width).height(height));
			}

			//WebGLEarth Code 
			var earth;
		
			function earth_render(){
				
				var mapBounds = [[-85, -180],[85, 179.976804]];
          		var mapMinZoom = 0;
          		var mapMaxZoom = 16;
				var options = { zoom: zm, position: qStart};
    			earth = new WE.map(eID, options); 
				WE.tileLayer(url,{
                	bounds: mapBounds,
                	attribution: 'NASA',
                	minZoom: mapMinZoom,
                	maxZoom: mapMaxZoom,
          		}).addTo(earth);
				var markers = [];
				for(var a=0;a<qMatrix.length;a++){
					var lat = qMatrix[a][0].qNum, long = qMatrix[a][1].qNum; //Lat Long
					var n = qMatrix[a][2] ? qMatrix[a][2].qText : '.'; //Name
					var c = qMatrix[a][3] && qMatrix[a][3].qNum < image_vector.length ? qMatrix[a][3].qNum : 0; //Image Array Position
					var d = qMatrix[a][4] ? qMatrix[a][4].qText : ''; //Description
				    if(lat != "NaN" && long != "NaN"){
						var tmpMarker = WE.marker([lat,long],image_vector[c],20,20);
						tmpMarker.bindPopup(n+"<BR>"+d, {maxWidth: 150, closeButton: false});
						markers.push(tmpMarker)
					};
				};
		
				for (var b=0;b<markers.length;b++){
					markers[b].addTo(earth);
				};
			}
			
			function animateGlobe(){
				if (qAnimate > 0){
					// Start a simple rotation animation
					var before = null;
					requestAnimationFrame(function animate(now) {
							var c = earth.getPosition();
							var elapsed = before? now - before: 0;
							before = now;
							earth.setCenter([c[0], c[1] + qAnimate*(elapsed/30)]);
							requestAnimationFrame(animate);
					});
				};
			};

			earth_render()
			setTimeout(animateGlobe(),500);

		}
	};

} );

