document.addEventListener('DOMContentLoaded', function () {


    fillSchedule();
    let listInner = document.getElementsByName("masterIv");
    document.getElementsByName("masterIv").forEach(element => {

        element.addEventListener('click', (e) => {


            for (let i = 0; i < listInner.length; i += 1) {
                if (listInner[i].id != element.id) {
                    listInner[i].setAttribute("flag", "0");
                    listInner[i].classList.remove("active")
                }
            }
            
            
            element.setAttribute("flag","1")
            element.classList.add("active")
            
            
        });
    })
    
});


function showGenre(item) {
    document.getElementById("daysDropdown").innerHTML = item.innerHTML;
}



function setElementToItem(element, item) {
    document.getElementById(element).innerHTML = item.innerHTML;
}

function createSelection() {

    let day = document.getElementById("daysDropdown").innerHTML;
    
    let level = "M1"
    document.getElementsByName("masterIv").forEach(element => {
        if( element.getAttribute("flag") == "1") {
            level = element.id
        }
    });
    
    let spec = document.getElementById("ScheduleDropdown").innerHTML;

    console.log(level+"_"+spec);

    //let levelArray = ["data/Schedules/M1_MIV.JSON","data/Schedules/M2_MIV.JSON"]
    let choice = "data/Schedules/" + level + "_" + spec + ".JSON"

    
    clearTeachers();
    populateTeachers(choice, day.slice(0,3));

    let filterinput = document.getElementById("teacherFilterDropdown").innerHTML.split(" ").join("");


    document.getElementById("frame").src = "viz.html?data=" +  day.slice(0,3) + "=" + choice + "=" + filterinput


}



function populateTeachers(data, day) {

    fetch(data)
        .then((response) => response.json())
        .then((data) => {

            let teachers = new Set()

            data.days[day].forEach(element => {

                if (Object.keys(element.cours).length != 0) {
                    
                    if (element.cours.prof.length != 0) {
                        teachers.add(element.cours.prof)
                    }
                    

                } else {
                    if (element.groups.hasOwnProperty('G1')) {

                        if(element.groups.G1.prof.length != 0) {
                            teachers.add(element.groups.G1.prof)
                        }

                    }
                    if (element.groups.hasOwnProperty('G2')) {

                        if(element.groups.G2.prof.length != 0) {
                            teachers.add(element.groups.G2.prof)
                        }

                    }

                }
                
            });

    
    
    

            teachers.forEach(element => {

                if(!itemInTeacherList(element)) {
                    let filterDropdown = document.getElementById("teachers");
                    let alink =  document.createElement("a");
                    let el = document.createElement("li");
    
                    alink.textContent = element
                    alink.setAttribute("onClick", "setElementToItem('teacherFilterDropdown',this)")
                    alink.classList.add("dropdown-item")
                    el.appendChild(alink);
    
                    
                    filterDropdown.appendChild(el);
                }

            });

            let filterDropdown = document.getElementById("teachers");
            let alink =  document.createElement("a");
            let el = document.createElement("li");

            alink.textContent = "None"
            alink.setAttribute("onClick", "setElementToItem('teacherFilterDropdown',this)")
            alink.classList.add("dropdown-item")
            el.appendChild(alink);

            filterDropdown.appendChild(el);

    
        });
}



function clearTeachers() {
    let filterDropdown = document.getElementById("teachers");
    

    while(filterDropdown.firstChild) {
        filterDropdown.removeChild(filterDropdown.firstChild)
    }

}


function itemInTeacherList(item) {

    let filterDropdown = document.getElementById("teachers");
    

    filterDropdown.childNodes.forEach(element => {
        if(element.firstChild) {
            if(element.firstChild.innerHTML == item) {
                return true
            }
        }
    });

    return false;
}


function fillSchedule() {

    console.log("object");
    let Schedules = ["MIV", "BIGDATA", "BIOINFO", "HPC", "IL", "SSI", "SII", "RSD"];
    for (let i = 0; i < Schedules.length; i++) {
        
        let filterDropdown = document.getElementById("ScheduleList");
        let alink =  document.createElement("a");
        let el = document.createElement("li");

        alink.textContent = Schedules[i];
        alink.setAttribute("onClick", "setElementToItem('ScheduleDropdown', this)") 
        alink.classList.add("dropdown-item")
        el.appendChild(alink);
        
        filterDropdown.appendChild(el);

    }
}