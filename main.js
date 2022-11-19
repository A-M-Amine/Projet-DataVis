document.addEventListener('DOMContentLoaded', function () {


    //Width and height
    let w = 920;
    let h = 620;
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

            function highlightDay(day) {

                for (ele in day) {
                    if(Object.keys(day[ele].cours).length != 0) {
                        id = day[ele].cours.loc
                        d3.select("[id='" + id + "']")
                            .style("fill", "red");

                    }else {
                        if(day[ele].groups.hasOwnProperty('G1')) {
                            id = day[ele].groups.G1.loc
                            
                            d3.select("[id='" + id + "']")
                                .style("fill", "red");
                        }
                        if(day[ele].groups.hasOwnProperty('G2')) {
                            id = day[ele].groups.G2.loc
                            d3.select("[id='" + id + "']")
                                .style("fill", "green");
                        }
                        
                    }
                    
                }

            };


            let mouseOn = function (d) {
                if(d.properties["name"] != "USTHB") {
                    let cord = d3.mouse(this)
                    let xpos = parseFloat(cord[0] + 10);
                    let ypos = parseFloat(cord[1]);
        
        
                    d3.select("#tooltip")
                        .style("left", xpos + "px")
                        .style("top", ypos + "px")
                        .select("#value")
                        .text("hh")
        
                    d3.select("#tooltip")
                        .classed("hidden", false)
                }
                
            }
    
    
            let mouseOff = function (d) {
                
                d3.select("#tooltip")
                    .classed("hidden", true)
            }



            // creating map
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("class", "cl1")
                .attr("id", function(d) {
                    if (Object.hasOwnProperty.call(d.properties, "name")) {
                        return d.properties.name;
                    } 
                    
                })
                .on("mouseover", mouseOn)
                .on("mouseout", mouseOff);
            

            //TODO make days and semestre change by user input
            day = prog.days.Dim;

            highlightDay(day);
            


        });
    });



    // zoom + pan
    let zoom = d3.behavior.zoom() 
        .on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
        
    });
    

    svg.call(zoom);
});