

document.addEventListener('DOMContentLoaded', function () {
    

    let input = location.href.split('=')[1];
    
    if (input!= undefined) {
        drawMap(1, input);
    }
    

});




function drawMap(semester_Nb, day_Str) {


    //Width and height
    let w = 860;
    let h = 500;
    const margin = { top: 20, right: 20, bottom: 110, left: 55 }

    //Define map projection
    let proj = d3.geo.mercator()
        .rotate([1, 48.8, 0])
        .translate([0, 0])
        .scale([1]);

    //Define path generator
    let path = d3.geo.path()
        .projection(proj);






    d3.json("data/USTHB_V11.geojson", function (json) {
        d3.json("data/M2_MIV.JSON", function (prog) {


            // scaling parameters
            let b = path.bounds(json);
            s = 0.95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h);
            t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];

            proj.translate(t).scale(s);

            // used to smooth zooming
            let zoomSvg = d3.select("body").append('g')
            

            // attach svg to body
            let svg = zoomSvg.append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("class", "map");


            // zoom + pan
            let zoom = d3.behavior.zoom()
                .scaleExtent([1, 10])
                .on("zoom", function () {
                    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")

            });


            zoomSvg.call(zoom);


            // functions

            function highlightDay(day) {

                for (ele in day) {
                    if (Object.keys(day[ele].cours).length != 0) {
                        id = day[ele].cours.loc
                        d3.select("[id='" + id + "']")
                            .style("fill", "#dc3545");

                    } else {
                        if (day[ele].groups.hasOwnProperty('G1')) {
                            id = day[ele].groups.G1.loc

                            d3.select("[id='" + id + "']")
                                .style("fill", "#dc3545");
                        }
                        if (day[ele].groups.hasOwnProperty('G2')) {
                            id = day[ele].groups.G2.loc
                            d3.select("[id='" + id + "']")
                                .style("fill", "#dc3545");
                        }

                    }

                }

            };


            let mouseOn = function (d) {

                let location = d3.select(this).attr("id");
                let details = getLocDetails(prog.days[day_Str], location);
                // insert function that gets the loc fro

                if (details != "none") {

                    d3.select("#tooltip")
                        .select("#value")
                        .html(details)

                    d3.select("#tooltip")
                        .classed("hidden", false)
                }

            }


            let mouseOff = function (d) {

                d3.select("#tooltip")
                    .classed("hidden", true)
            }




            function getLocDetails(day, loc) {

                let details = ""

                for (ele in day) {
                    if (Object.keys(day[ele].cours).length != 0 && day[ele].cours.loc == loc) {
                        details += "<br><b>Cours</b> <br>"
                        details += getObjectDetails(day[ele].cours)


                    } else {
                        if (day[ele].groups.hasOwnProperty('G1') && day[ele].groups.G1.loc == loc) {
                            details += "<br><b>Group</b> : G1 <br>"
                            details += getObjectDetails(day[ele].groups.G1)


                        }
                        if (day[ele].groups.hasOwnProperty('G2') && day[ele].groups.G2.loc == loc) {

                            details += "<br><b>Group</b> : G2 <br>"
                            details += getObjectDetails(day[ele].groups.G2)

                        }

                    }

                }


                return details.length == 0 ? "none" : details;
            }


            function getObjectDetails(obj) {
                let res = ""

                for (const [key, value] of Object.entries(obj)) {
                    res += "<b>" + key + "</b> : " + value + " <br>"
                }

                return res
            }

            //TODO change color based on location floor 
            // function checkSalleTDFloor(loc) {

            //     if(!isNaN(loc)) {
            //         let number = parseInt(loc) 
            //         if(number >= 200 && number < 300) || (number >= )
            //     }
            // }


            // creating map            
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("class", "cl1")
                .attr("id", function (d) {
                    if (Object.hasOwnProperty.call(d.properties, "name")) {
                        return d.properties.name;
                    }

                })
                .on("mouseover", mouseOn)
                .on("mouseout", mouseOff);


            
            day = prog.days[day_Str];

            highlightDay(day);



        });
    });



}