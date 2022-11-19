document.addEventListener('DOMContentLoaded', function () {


    //Width and height
    let w = 700;
    let h = 525;
    const margin = { top: 20, right: 20, bottom: 110, left: 55 }

    //Define map projection
    let proj = d3.geo.mercator()
        .rotate([1, 48.8, 0])
        .translate([0, 0])
        .scale([1]);

    //Define path generator
    let path = d3.geo.path()
        .projection(proj);


    // attach svg to body
    let svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "map");

    console.log("object");


    d3.json("mapUSTHBen.geojson", function (json) {
        d3.json("data.JSON", function (prog) {


            // scaling parameters
            let b = path.bounds(json);
            s = .99 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h);
            t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];
            proj.translate(t).scale(s);



            // functions

            function getLocById(loc) {

                let regSalleDep = /^TP/
                let regSalle
            }




            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("class", (d, i) => "loc" + i + " cl1")
                // .attr("class", )
                .on("mouseover", function (d, i) {
                    if (d["properties"]["name"] != "USTHB") {
                        d3.select(this).style("fill", "coral");
                    }
                })
                .on("mouseout", function (d) {
                    d3.select(this).style("fill", "white")
                });

            
            day = prog.days.Dim;
            
            for ( ele in day) {
                if(ele == 1) {
                    console.log(day[ele].cours.loc.split(" ")[1]);
                    d3.selectAll("path.loc7")
                        .style("fill", "coral");
                }
            }

        });
    });



    // zoom + pan
    let zoom = d3.behavior.zoom() 
        .on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
        
    });
    

    svg.call(zoom);
});