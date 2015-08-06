"use strict";
// jQuery

//Calculate cell height
var w_width = 0;
var w_height = 0;
var w_bestCellH = 42;
var cellHForBrowserSize = [
    {size: "1903x979", cellH: 42},
    {size: "1903x1080", cellH: 42},
    {size: "1869x899", cellH: 20},
    {size: "1263x800", cellH: 20},
    {size: "1349x768", cellH: 42},
    {size: "1263x1024", cellH: 20},
    {size: "1423x900", cellH: 15},
    {size: "1583x900", cellH: 42},
    {size: "1663x1050", cellH: 42},
    {size: "1903x1200", cellH: 42},
    {size: "2543x1440", cellH: 20},
    {size: "1148x415", cellH: 20}
];

function getByValue(arr, value) {
  for (var i=0, iLen=arr.length; i<iLen; i++) {
    if (arr[i].size == value) return arr[i];
  }
}

function calcCellH() {
    w_width = $(window).width();
    w_height = $(window).height();
    var key = w_width + "x" + w_height;
    console.log("key: "+key);
    var found = getByValue(cellHForBrowserSize, key);
    if (found !== undefined) {
        w_bestCellH = found.cellH;
    }else{
        w_bestCellH = 42;
    }
    console.log("screen: "+w_width+" "+w_height+" using cell h: "+w_bestCellH);
}

function buildWall(){
    var wall = new freewall("#freewall");
	wall.reset({
		selector: '.brick',
        animate: false,
		cellW: function(width) {
            var cellWidth = 0;
            if ( width > 1100 ) {
                cellWidth = width / 6;
            }else{
                cellWidth = width / 3;
            }
            return cellWidth - 20;
        },
		cellH: w_bestCellH,
		fixSize: null,
		gutterX: 12,
		gutterY: 12,
		onResize: function() {
		  wall.fitZone();
		}
    });
    
    $(window).trigger("resize");
}

//Store mode
function beginState(){
    if(sessionStorage.currentPlate == undefined){
        sessionStorage.currentPlate = 'all';
    }
}

function fetchState(){
    $( "#insert" ).hide();
    
    if(sessionStorage.currentPlate == 'all'){
        $.get( location.href+"trabalhos", { filter: "all" }, function( data ) {
            $( "#insert" ).html( data );
            setTimeout(function(){
                buildWall();
            }, 5);
            setTimeout(function(){
                $( "#insert" ).fadeIn("slow","swing");
            }, 100);
        });
    }
    if(sessionStorage.currentPlate == 'ilustra'){
        $.get( location.href+"trabalhos", { filter: "ilustra" }, function( data ) {
            $( "#insert" ).html( data );
            setTimeout(function(){
                buildWall();
            }, 5);
            setTimeout(function(){
                $( "#insert" ).fadeIn("slow","swing");
            }, 100);
        });
    }
    if(sessionStorage.currentPlate == 'design'){
        $.get( location.href+"trabalhos", { filter: "design" }, function( data ) {
            $( "#insert" ).html( data );
            setTimeout(function(){
                buildWall();
            }, 5);
            setTimeout(function(){
                $( "#insert" ).fadeIn("slow","swing");
            }, 100);
        });
    }
}

//Build the wall
$(document).ready(function() {
    //$("body").css("overflow", "hidden");
    
    calcCellH();
        
    buildWall();
    
    beginState();
    fetchState();
    
    /*$(window).bind('resize', function(e)
    {
      if (window.RT) clearTimeout(window.RT);
        window.RT = setTimeout(function()
      {
        this.location.reload(false);
      }, 100);
    });*/
    
    
    $("#filter-all").click(function(){
        sessionStorage.currentPlate = 'all';
        fetchState();
    });
    
    $("#filter-art").click(function(){
        sessionStorage.currentPlate = 'ilustra';
        fetchState();
    });

    $("#filter-design").click(function(){
        sessionStorage.currentPlate = 'design';
        fetchState();
    });
});



