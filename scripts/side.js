document.addEventListener('DOMContentLoaded', function () {

    let M1 = document.getElementById("M1");
    let M2 = document.getElementById("M2");

    
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
    document.getElementById("navbarDropdown").innerHTML = item.innerHTML;
}


function createSelection() {

    let day = document.getElementById("navbarDropdown").innerHTML;
    let year = ""
    document.getElementsByName("masterIv").forEach(element => {
        if( element.getAttribute("flag") == "1") {
            year = element.id
        }
    });
    
    document.getElementById("frame").src = "viz.html?data=" +  day.slice(0,3) + "=" + year


}



