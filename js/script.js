$(document).ready(function() {


// -------------------
// Fade in start up main-page
// -------------------


$('#animsition-mainpage').animsition();


// -------------------
// Animsition through pages
// -------------------


  function animsitionCode (clicked, divA, divB, divC) {
    $(clicked).click(function(){
      $(divA).fadeOut(function(){
        $(divB).hide(function(){
          $(divC).fadeIn();
        });
      });
    });
  };

animsitionCode('.here-button', '#mainpage-div', '#mainpage-div', '#page2-div')
animsitionCode('.ph-button', '#page2-div', '#page2-div', '#page3-div')
animsitionCode('.v-button', '#page3-div', '#page3-div', '#page4-div')
animsitionCode('.m-button', '#page4-div', '#page4-div', '#page5-div')


// -------------------
//     Back button
// -------------------


function backAnimsitionCode (bclicked, backA, backB, backC) {
  $(bclicked).click(function(){
    $(backA).fadeOut(function(){
      $(backB).hide(function(){
        $(backC).fadeIn();
      });
    });
  });
};

backAnimsitionCode ('.ph-backbutton-wrapper', '#page2-div', '#page2-div', '#mainpage-div')
backAnimsitionCode ('.v-backbutton-wrapper', '#page3-div', '#page3-div', '#page2-div')
backAnimsitionCode ('.m-backbutton-wrapper', '#page4-div', '#page4-div', '#page3-div')
backAnimsitionCode ('.c-backbutton-wrapper', '#page5-div', '#page5-div', '#page4-div')


// -------------------
// PLUS MINUS FUNCTION
// -------------------


  // PARTY SIZE

  $('.ps-plus').click(function psAdd(e){
      e.preventDefault();
      fieldName = $(this).attr('field');
      var currentVal = parseInt($('input[name='+fieldName+']').val());
      if (!isNaN(currentVal)) {
          $('input[name='+fieldName+']').val(currentVal + 1);
      } else {
          $('input[name='+fieldName+']').val(0);
      }
  });


  $(".ps-minus").click(function psMinus(e) {
      e.preventDefault();
      fieldName = $(this).attr('field');
      var currentVal = parseInt($('input[name='+fieldName+']').val());
      if (!isNaN(currentVal) && currentVal > 0) {
          $('input[name='+fieldName+']').val(currentVal - 1);
      } else {
        $('input[name='+fieldName+']').val(0);
      }
  });

function vehiclechoice() {

  if (currentVal >= obj.seat[0] && currentVal <= obj.seat[1] && hlcurrentVal >= obj.days[0] && hlcurrentVal <= obj.days[0]) {

  } else {
    document.getElementById('motorhome-div').style.backgroundColor = "red";

  }
}

  // HIRE LENGTH

  $('.hl-plus').click(function hlPlus(e){
      e.preventDefault();
      fieldName = $(this).attr('field');
      var hlcurrentVal = parseInt($('input[name='+fieldName+']').val());
      if (!isNaN(hlcurrentVal)) {
          $('input[name='+fieldName+']').val(hlcurrentVal + 1);
      } else {
          $('input[name='+fieldName+']').val(0);
      }
  });

  $(".hl-minus").click(function hlMinus(e) {
      e.preventDefault();
      fieldName = $(this).attr('field');
      var hlcurrentVal = parseInt($('input[name='+fieldName+']').val());
      if (!isNaN(hlcurrentVal) && hlcurrentVal > 0) {
          $('input[name='+fieldName+']').val(hlcurrentVal - 1);
      } else {
          $('input[name='+fieldName+']').val(0);
      }
  });


// -------------------
//      MAP API
// -------------------


(function(){

  var token = 'pk.eyJ1IjoidmVyYXRlY2giLCJhIjoiY2phYmZ1NXFmMHIwMDM1cGV4bHV4bHhzbSJ9.gbT5J_uXxbjRRuj00D7Xeg';

  mapboxgl.accessToken = token

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [174.77701,-41.28868],
    zoom: 5
  });

  var directions = new MapboxDirections({
    accessToken: token,
    unit: 'metric',
    // Hiding the direction ui controls
  });

     // HILL SHADING

  map.on('load', function () {
      map.addSource('dem', {
          "type": "raster-dem",
          "url": "mapbox://mapbox.terrain-rgb"
      });
      map.addLayer({
          "id": "hillshading",
          "source": "dem",
          "type": "hillshade"
      // insert below waterway-river-canal-shadow;
      // where hillshading sits in the Mapbox Outdoors style
      }, 'waterway-river-canal-shadow');
  });

  map.addControl(directions, 'top-left');

  directions.on('route', function(direction){
    console.log(directions.route["0"].distance / 1000 + "kms");

  });
})();


// -------------------
//   ADDING VALUES
// -------------------


// var partysize = document.getElementsByClassName('ps-input')
// var hirelength = document.getElementsByClassName('hl-input')
//
// function detailsFunction() {
//
// // var motorhome = document.getElementsByClassName('motorhome-button')
// // var largecar = document.getElementsByClassName('largecar-button')
// // var smallcar = document.getElementsByClassName('smallcar-button')
// // var motorbike = document.getElementsByClassName('motorbike-button')
//
// };
//
// console.log(partysize);


// -------------------
//  APPEDNING DETAILS
// -------------------


// APPENDING VEHICLE

function vehicleconfirm (vcClicked, image) {

  document.getElementById(vcClicked).addEventListener('click', function() {
    var src = document.getElementById('yt-vehicle');
    var creatPic = document.createElement('img');

    creatPic.setAttribute('src', image);
    creatPic.setAttribute('height', '160px');
    creatPic.setAttribute('width', 'auto');

    src.appendChild(creatPic);

  });
};

vehicleconfirm ('motorhome-button', 'images/caravan.png')
vehicleconfirm ('largecar-button', 'images/suv.png')
vehicleconfirm ('smallcar-button', 'images/automobile.png')
vehicleconfirm ('motorbike-button', 'images/motor-sports.png')


});
