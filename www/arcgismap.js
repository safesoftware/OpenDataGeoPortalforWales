var map, toolbar, clippingGeometry;


window.onload = function()
{
    require([
        "esri/map", "esri/toolbars/draw",
        "esri/graphic", "esri/geometry/webMercatorUtils",
        "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
        "dojo/_base/Color", "dojo/dom", "dojo/on", "dojo/domReady!"
    ], function(
        Map, Draw,
        Graphic, webMercatorUtils,
        SimpleLineSymbol, SimpleFillSymbol,
        Color, dom, on
    )
    {
        map = new Map("mapDiv",
        {
            basemap: "hybrid",
            center: [-3.45, 51.99],
            zoom: 8,
            minZoom: 6,
            smartNavigation: false
        });

        map.on("load", function()
        {
            toolbar = new Draw(map);

            dojo.connect(toolbar, "onDrawEnd", addToMap);

            on(dom.byId("draw"), "click", drawPolygon);
            on(dom.byId("reset"), "click", drawReset);
        });

        function addToMap(geometry)
        {
            var symbol = new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_DASHDOT,
                    new Color([255, 0, 0]), 2
                ),
                new Color([255, 255, 0, 0.25])
            );
            geometry = webMercatorUtils.webMercatorToGeographic(geometry);
            var graphic = new Graphic(geometry, symbol);
            map.graphics.clear();
            map.graphics.add(graphic);
            toolbar.deactivate(Draw.POLYGON);
            clippingGeometry = geometry.rings[0];
        }

        function drawPolygon()
        {
            drawReset();
            toolbar.activate(esri.toolbars.Draw.POLYGON);
        }

        function drawReset()
        {
            toolbar.deactivate(esri.toolbars.Draw.POLYGON);
            map.graphics.clear();
        }
    });

    FMEServer.init(
   {
       server: "https://demos-safe-software.fmecloud.com", //Update to your FME Server hostname - on FME training machines this is http://fmetraining
        token: "ae3cf244ab670e245ed8de3840b39657d0023ba2" //Update to your fmetoken
   });
	var repository = "Wales";
	var workspace = "WalesDataDistribution.fmw";
	FMEServer.getWorkspaceParameters( repository, workspace, generateForm );
	
	
	
};
	function generateForm( json ) {
			var form = document.getElementById( "output-form" );

			// Build the form items using the API
			FMEServer.generateFormItems( "output-form", json );
			// Remove the auto generated GEOM element and label
			 var list = document.getElementsByClassName("GEOM");
			 for(var i = list.length - 1; 0 <= i; i--)
			 if(list[i] && list[i].parentElement)
			 list[i].parentElement.removeChild(list[i]);
		
			
			


			// Create the Run Data Download Button
			var submitButton = document.createElement( "input" );
			submitButton.type = "button";
			submitButton.value = "Run Data Download";
			submitButton.setAttribute( "onclick", "processClip();" );
			form.appendChild( submitButton );
			
		}

function showResults(json)
{
    // The following is to write out the full return object
    // for visualization of the example
    var hr = document.createElement("hr");
    

    // This extracts the download link to the clipped data
    var download = json.serviceResponse.url;

	var downloadarea = document.getElementById( "downloadarea" );
    downloadarea.innerHTML += "<hr><a href=\"" + download + "\">Download Result</a>";
    
}

  
function processClip()
{
	var repository = "Wales";
	var workspace = "WalesDataDistribution.fmw";
	var params ="";
	var form = document.getElementById( "output-form" );
	
	// Loop through unique parameters and build the parameter string
	for( var i = 0; i < form.length; i++ ){
				var element = form.elements[i];
				if( element.type == "select" ) {
					params += element.name+"="+element[element.selectedIndex].value+"&";
				} else if( element.type == "checkbox" ){
					if( element.checked ) {
					    params += element.name+"="+element.value+"&";
					}
				} else {
					params += element.name+"="+element.value+"&";
				}
}
			// Remove trailing & from string
			params = params.substr( 0, params.length - 19 );

    // Process the clippingGeometry into a WKT Polygon string
    var geometry = "POLYGON((";

    for (var i = 0; i < clippingGeometry.length; i++)
    {
        var lat = clippingGeometry[i][1];
        var lng = clippingGeometry[i][0];
        geometry += lng + " " + lat + ",";
    }

    // Remove trailing , from string
    geometry = geometry.substr(0, geometry.length - 1);
    geometry += "))";


    params += "GEOM=" + geometry;
	
	console.log(params);
	//alert(params);

    // Use the FME Server Data Download Service
    FMEServer.runDataDownload(repository, workspace, params, showResults);
}
