document.addEventListener('DOMContentLoaded', function () {
    //Width and height
    var w = 900;
    var h = 675;

    //Define map projection
    var proj = d3.geoMercator()
        .scale(100)
        //.rotate([1, 48.8, 0])
        .translate([0, 0])
        //.scale([1]);

    //Define path generator
    var path = d3.geoPath(proj);


    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "map");

    console.log("object");
    d3.json("mapUSTHB.geojson").then(function (json) {

        
        var map = svg.selectAll("path")
            .data(json.features);
        map.enter()
            .append("path")
            .attr("d", path)
            .attr("class", "cl1")
            .on("mouseover", function(d, i) {
                console.log(d[i]);
                // if(this["properties"]["name"] != "USTHB") {      
                //     d3.select(this).style("fill", "coral");
                // }
            })
            .on("mouseout", function(d) {
                d3.select(this).style("fill", "white")
            });
    });

});