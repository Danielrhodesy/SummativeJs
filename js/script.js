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
          $(divC).fadeIn(400, function(){

          createMap()

          });
        });
      });
    });
  };

animsitionCode('.here-button', '#mainpage-div', '#mainpage-div', '#page2-div')
animsitionCode('.ph-button', '#page2-div', '#page2-div', '#page3-div')
animsitionCode('.m-button', '#page4-div', '#page4-div', '#page5-div')

//FOR MAPCREATE

function animsitionMap (buttonName) {
  $(buttonName).click(function(){
    $('#page3-div').fadeOut(function(){
      $('#page3-div').hide(function(){
        $('#page4-div').fadeIn(400, function(){

          createMap()

        });
      });
    });
  });
};

animsitionMap('#motorhome-button')
animsitionMap('#largecar-button')
animsitionMap('#smallcar-button')
animsitionMap('#motorbike-button')

animsitionMap()


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


  var seatsNeeded = $('.ps-input')[0];

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


  // HIRE LENGTH


  var daysNeeded = $('.hl-input')[0];

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


  // APPENDING PARTY SIZE & HIRE LENGTH


  function hlConfirm(value, valuePlace) {

      var src = document.getElementById(valuePlace)

      seatsNeeded.setAttribute('fontsize','120px')
      daysNeeded.setAttribute('fontsize','120px')
      src.innerHTML = value;
  };


// VALIDATION FOR CHOICE


  function vehiclechoice(vehicle, vehicleDiv, divButton) {


      if (parseInt(seatsNeeded.value) >= vehicle.seat[0]
         && parseInt(seatsNeeded.value) <= vehicle.seat[1]
         && parseInt(daysNeeded.value) >= vehicle.days[0]
         && parseInt(daysNeeded.value) <= vehicle.days[1]) {
        document.getElementById(vehicleDiv).style.opacity = "1";
        document.getElementById(divButton).style.display = "inline-block";
      } else {
        document.getElementById(vehicleDiv).style.opacity = "0.7";
        document.getElementById(divButton).style.display = "none";
      }
    }

$('#ph-confirmbutton').on('click', function(){

  vehiclechoice(data.motorhome, 'motorhome-div', 'motorhome-button');
  vehiclechoice(data.largecar, 'largecar-div', 'largecar-button');
  vehiclechoice(data.smallcar, 'smallcar-div', 'smallcar-button');
  vehiclechoice(data.motorbike, 'motorbike-div', 'motorbike-button');


  hlConfirm(seatsNeeded.value, 'yt-partysize')
  hlConfirm(daysNeeded.value, 'yt-hirelength')
})

// -------------------
//      MAP API
// -------------------

var traveldistance;


function createMap(){

    mapWrapper = document.getElementById('mapbox-wrapper')
    mapContainer = document.createElement('div')
    mapContainer.style.width = '97.3%'
    mapContainer.style.height = '100%'
    mapContainer.style.position = 'relative'
    mapContainer.style.float = 'right'
    mapContainer.setAttribute('id', 'map')

    mapWrapper.appendChild(mapContainer)


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
       profile: 'mapbox/driving'
       // Hiding the direction ui controls
     });

     map.addControl(directions, 'top-left');
     directions.on('route', function(direction){

      traveldistance = (Math.ceil(direction.route["0"].distance / 1000))

     });

    //Grabbing route from custom inputs
     document.getElementById('dir').addEventListener('click', setRouteDynamically, false);

     function setRouteDynamically(){
       var getAA = document.getElementById('aa').value;
       var getBB = document.getElementById('bb').value;
       directions.setOrigin(getAA);
       directions.setDestination(getBB);
     }

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
    });
});

 };


$('#searchbutton').on('click', function(){

  $('#sidebar-button').fadeIn(3500);

})


// vbuttonFunc('#motorhome-button')
// vbuttonFunc('#largecar-button')
// vbuttonFunc('#smallcar-button')
// vbuttonFunc('#motorbike-button')
//
// function vbuttonFunc(buttonname){
//
// $(buttonname).on('click', function(){
//
//   createMap(5000)
//
// })
//
// }

// -------------------
//   ADDING VALUES
// -------------------


var motorhomeValue = document.getElementById('motorhome-button')
var largecarValue = document.getElementById('largecar-button')
var smallcarValue = document.getElementById('smallcar-button')
var motorbikeValue = document.getElementById('motorbike-button')


// GIVING VEHICLES VALUES

function giveValues(){

  motorhomeValue.setAttribute('value', 200)
  largecarValue.setAttribute('value', 144)
  smallcarValue.setAttribute('value', 129)
  motorbikeValue.setAttribute('value', 109)

};

giveValues()


// CALCULATING HIRE COST

var hirecostvalue;

function hireCost(vehicleValue) {

  hirecostvalue = daysNeeded.value * vehicleValue

};

$('#motorhome-button').on('click', function() {
  hireCost(motorhomeValue.value)
})

$('#largecar-button').on('click', function() {
  hireCost(largecarValue.value)
})

$('#smallcar-button').on('click', function() {
  hireCost(smallcarValue.value)
})

$('#motorbike-button').on('click', function() {
  hireCost(motorbikeValue.value)
})




var vehicleFuelcost

function fuelValue(vfuelcost) {

  vehicleFuelcost = vfuelcost

}


jqFunction('#motorbike-button', 0.092)
jqFunction('#smallcar-button', 0.212)
jqFunction('#largecar-button', 0.242)
jqFunction('#motorhome-button', 0.425)

function jqFunction(vehicleBtn, vfuelcost){
  $(vehicleBtn).on('click', function() {
    fuelValue(vfuelcost)
  })
}


// CALCULATING FUEL COSTS

var fuelcostvalue

var rfuelcostvalue

function fuelCost(){

  fuelcostvalue = vehicleFuelcost * traveldistance

  rfuelcostvalue = Math.ceil(fuelcostvalue)

}

$('#sidebar-button').on('click', function(){

  fuelCost()

})


// -------------------
//  APPEDNING DETAILS
// -------------------


// APPENDING VEHICLE


function vehicleconfirm (vcClicked, image) {

  document.getElementById(vcClicked).addEventListener('click', function() {
    var src = document.getElementById('yt-vehicle');
    var createPic = document.createElement('img');

    createPic.setAttribute('src', image);
    createPic.setAttribute('height', '160px');
    createPic.setAttribute('width', 'auto');

    src.appendChild(createPic);

  });
};


vehicleconfirm ('motorhome-button', 'images/caravan.png')
vehicleconfirm ('largecar-button', 'images/suv.png')
vehicleconfirm ('smallcar-button', 'images/automobile.png')
vehicleconfirm ('motorbike-button', 'images/motor-sports.png')


// APPENDING Map

function mapConfirm(){

 var srco = document.getElementById('origin')
 var srcd = document.getElementById('destination')

 srco.innerHTML = document.getElementById('aa').value;
 srcd.innerHTML = document.getElementById('bb').value;
}

$('#sidebar-button').on('click', function() {

 mapConfirm()

})

// Cost Confirm

function costConfirm(){

  var srca = document.getElementById('hireCost')
  var srcb = document.getElementById('fuelCost')

  srca.innerHTML = '$' + hirecostvalue
  srcb.innerHTML = '$' + rfuelcostvalue

}

$('#sidebar-button').on('click', function(){

  costConfirm()

})



// ENDING BRACKET

});
