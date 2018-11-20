var map, toolbar, clippingGeometry, loading, layer;


window.onload = function() {
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
 ) {
  map = new Map("mapDiv", {
   basemap: "hybrid",
   center: [-3.45, 52.2],
   zoom: 9,
   minZoom: 6,
   smartNavigation: false
  });
  loading = dojo.byId("loadingImg");
  esri.hide(loading);

  map.on("load", function() {
   toolbar = new Draw(map);

   dojo.connect(toolbar, "onDrawEnd", addToMap);

   on(dom.byId("draw"), "click", drawPolygon);
   on(dom.byId("reset"), "click", drawReset);
  });

  function addToMap(geometry) {
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
   console.log(clippingGeometry);

  }

  function drawPolygon() {
   drawReset();
   toolbar.activate(esri.toolbars.Draw.POLYGON);
  }

  function drawReset() {
   toolbar.deactivate(esri.toolbars.Draw.POLYGON);
   map.graphics.clear();
  }
 });

 FMEServer.init({
  server: "https://demos-safe-software.fmecloud.com", //Update to your FME Server hostname - on FME training machines this is http://fmetraining
  token: "ae3cf244ab670e245ed8de3840b39657d0023ba2" //Update to your fmetoken
 });
 var repository = "Wales";
 var workspace = "WalesDataDistribution.fmw";
 FMEServer.getWorkspaceParameters(repository, workspace, generateForm);
}
// Show Loading Icon
function showLoading() {
    esri.show(loading);
    map.disableMapNavigation();
    map.hideZoomSlider();


}

// Hide Loading Icon
function hideLoading(error) {
    esri.hide(loading);
    map.enableMapNavigation();
    map.showZoomSlider();

}
function seaCaves() {
var seaCaves = document.getElementById("seacavesLyr");
if (seaCaves.checked == true) {

var workspace = "https://demos-safe-software.fmecloud.com/fmedatastreaming/Wales/WalesDataStreaming.fmw?tested&FEATURE_TYPES=NRW_ART17_SEA_CAVE";
          loadData(workspace)

          function loadData(workspace) {
              require([
                  "esri/layers/KMLLayer", "dojo/parser"
              ], function (
                  KMLLayer, parser
              ) {


                  parser.parse();
                  // Create the ArcGIS Layer and display on the map
                  showLoading();
                  seacaveslayer = new KMLLayer(workspace);
                  map.addLayer(seacaveslayer, 1000);
                  seacaveslayer.on("load", function () {
                  hideLoading();
                  });
              });
          }
    } else {
          map.removeLayer(seacaveslayer);
      }
}
function estuaries() {
var estuaries = document.getElementById("estuariesLyr");
if (estuaries.checked == true) {

var workspace = "https://demos-safe-software.fmecloud.com/fmedatastreaming/Wales/WalesDataStreaming.fmw?FEATURE_TYPES=NRW_ART17_ESTUARIES";
          loadData(workspace)

          function loadData(workspace) {
              require([
                  "esri/layers/KMLLayer", "dojo/parser"
              ], function (
                  KMLLayer, parser
              ) {


                  parser.parse();
                  // Create the ArcGIS Layer and display on the map
                  showLoading();
                  estuarieslayer = new KMLLayer(workspace);
                  map.addLayer(estuarieslayer, 1000);
                  estuarieslayer.on("load", function () {
                  hideLoading();
                  });
              });
          }
    } else {
          map.removeLayer(estuarieslayer);
      }
}
function floodmaps() {
var floodmap = document.getElementById("floodmapLyr");
if (floodmap.checked == true) {

var workspace = "https://demos-safe-software.fmecloud.com/fmedatastreaming/Wales/WalesDataStreaming.fmw?FEATURE_TYPES=NRW_HISTORIC_FLOODMAP";
          loadData(workspace)

          function loadData(workspace) {
              require([
                  "esri/layers/KMLLayer", "dojo/parser"
              ], function (
                  KMLLayer, parser
              ) {


                  parser.parse();
                  // Create the ArcGIS Layer and display on the map
                  showLoading();
                  floodmaplayer = new KMLLayer(workspace);
                  map.addLayer(floodmaplayer, 1000);
                  floodmaplayer.on("load", function () {
                  hideLoading();
                  });
              });
          }
    } else {
          map.removeLayer(floodmaplayer);
      }
}
function Coastalpath() {
var coastal = document.getElementById("walescoastalpathLyr");
if (coastal.checked == true) {

var workspace = "https://demos-safe-software.fmecloud.com/fmedatastreaming/Wales/WalesDataStreaming.fmw?FEATURE_TYPES=NRW_WALES_COASTAL_PATH";
          loadData(workspace)

          function loadData(workspace) {
              require([
                  "esri/layers/KMLLayer", "dojo/parser"
              ], function (
                  KMLLayer, parser
              ) {


                  parser.parse();
                  // Create the ArcGIS Layer and display on the map
                  showLoading();
                  coastallayer = new KMLLayer(workspace);
                  map.addLayer(coastallayer, 1000);
                  coastallayer.on("load", function () {
                  hideLoading();
                  });
              });
          }
    } else {
          map.removeLayer(coastallayer);
      }
}
function marineChar() {
var marine = document.getElementById("marinecharacterLyr");
if (marine.checked == true) {

var workspace = "https://demos-safe-software.fmecloud.com/fmedatastreaming/Wales/WalesDataStreaming.fmw?FEATURE_TYPES=NRW_MARINE_CHARACTER_AREAS";
          loadData(workspace)

          function loadData(workspace) {
              require([
                  "esri/layers/KMLLayer", "dojo/parser"
              ], function (
                  KMLLayer, parser
              ) {


                  parser.parse();
                  // Create the ArcGIS Layer and display on the map
                  showLoading();
                  marinelayer = new KMLLayer(workspace);
                  map.addLayer(marinelayer, 1000);
                  marinelayer.on("load", function () {
                  hideLoading();
                  });
              });
          }
    } else {
          map.removeLayer(marinelayer);
      }
}


function generateForm(json) {
 var form = document.getElementById("output-form");

 // Build the form items using the API
 FMEServer.generateFormItems("output-form", json);
 // Remove the auto generated GEOM element and label
 var list = document.getElementsByClassName("GEOM");
 for (var i = list.length - 1; 0 <= i; i--)
  if (list[i] && list[i].parentElement)
   list[i].parentElement.removeChild(list[i]);


 // Remove the auto generated Feature_Types element and label
 var flist = document.getElementsByClassName("FEATURE_TYPES");
 for (var i = flist.length - 1; 0 <= i; i--)
 if (flist[i] && flist[i].parentElement)
 flist[i].parentElement.removeChild(flist[i]);


 // Create the Run Data Download Button
 var submitButton = document.createElement("input");
 submitButton.type = "button";
 submitButton.value = "Run Data Download";
 submitButton.setAttribute("onclick", "processClip();");
 form.appendChild(submitButton);

}

function showResults(json) {
 // The following is to write out the full return object
 // for visualization of the example
 var hr = document.createElement("hr");
 var downloadarea = document.getElementById("downloadarea");
 downloadarea.innerHTML = "<p>Processing Data...</p>";

 // This extracts the download link to the clipped data
 var download = json.serviceResponse.url;
 var numOutput = json.serviceResponse.fmeTransformationResult.fmeEngineResponse.numFeaturesOutput;
 console.log(json.serviceResponse);

 var downloadarea = document.getElementById("downloadarea");


 if (numOutput != 0){
         downloadarea.innerHTML = "";
		 downloadarea.innerHTML += "<hr><a href=\"" + download + "\">Download Result</a>";
       }
       else {
        downloadarea.innerHTML = "";
		 downloadarea.innerHTML += "No features found in selected area. Please try again.";
       }

}


function processClip() {
 var repository = "Wales";
 var workspace = "WalesDataDistribution.fmw";
 var params = "";
 var host = "https://demos-safe-software.fmecloud.com";
 var form = document.getElementById("output-form");
 var downloadarea = document.getElementById("downloadarea");
 var requestarea = document.getElementById("requestarea");
 var layerform = document.getElementById("exampleForm");

 //See the layers the user selected
 // Loop through unique parameters and build the parameter string
 for (var i = 0; i < layerform.length; i++) {
  var element = layerform.elements[i];
   if (element.type == "checkbox") {
   if (element.checked) {
    params += element.name + "=" + element.value + "&";
   }
  } 
 }


 downloadarea.innerHTML = "<p>Processing Data...</p>";

 // Loop through unique parameters and build the parameter string
 for (var i = 0; i < form.length; i++) {
  var element = form.elements[i];
  if (element.type == "select") {
   params += element.name + "=" + element[element.selectedIndex].value + "&";
  } else if (element.type == "checkbox") {
   if (element.checked) {
    params += element.name + "=" + element.value + "&";
   }
  } else if (element.type == "button") { 

  } else {
   params += element.name + "=" + element.value + "&";
  }
 }
 // Remove trailing & from string
 params = params.substr(0, params.length - 1);

 // Process the clippingGeometry into a WKT Polygon string
 var geometry = "POLYGON((";

 for (var i = 0; i < clippingGeometry.length; i++) {
  var lat = clippingGeometry[i][1];
  var lng = clippingGeometry[i][0];
  geometry += lng + " " + lat + ",";
 }

 // Remove trailing , from string
 geometry = geometry.substr(0, geometry.length - 1);
 geometry += "))";


 params += "&GEOM=" + geometry;


 var str = '';
 str = host + '/fmedatadownload/' + repository + '/' + workspace + '?';

 str += params;

 requestarea.innerHTML += "<a href=\"" + str + "\">" + str + "</a>";

 console.log(params);
 //alert(params);

 // Use the FME Server Data Download Service
 FMEServer.runDataDownload(repository, workspace, params, showResults);
}
