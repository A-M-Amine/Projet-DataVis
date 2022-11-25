document.addEventListener('DOMContentLoaded', function () {
    
});


function showGenre(item) {
    document.getElementById("navbarDropdown").innerHTML = item.innerHTML;
}


function createSelection() {

    let day = document.getElementById("navbarDropdown").innerHTML;
    document.getElementById("frame").src = "viz.html?data=" +  day.slice(0,3)


}



