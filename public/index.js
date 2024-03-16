function indexOfElementInParent(element) {
    var parent = element.parentNode;
    var children = parent.children;

    for (var i = 0; i < children.length; i++) {
        if (children[i] === element) {
            return i;
        }
    }

    return -1; // If the element is not found in its parent
}

function getMonthName(index)
{
    switch(index)
    {
        case 0: return "Jan";
        case 1: return "Feb";
        case 2: return "Mar";
        case 3: return "Apr";
        case 4: return "May";
        case 5: return "Jun";
        case 6: return "Jul";
        case 7: return "Aug";
        case 8: return "Sep";
        case 9: return "Oct";
        case 10: return "Nov";
        case 11: return "Dec";
    }
    return -1;
}

let currentNav;
let currentContent;
let contentList;

window.onload = function() {
    contentList = document.querySelectorAll('.content > *');
    currentContent = contentList[0];
    currentContent.style.display = "block"; // Assuming you want to set it to display

    navList = document.querySelectorAll('.nav > *');
    currentNav = navList[0]
    currentNav.style.padding="10px";


    for (let i = 0; i < navList.length; i++) {
        const nav = navList[i];
        nav.addEventListener("click", switchContent);
    }

    jQuery.get("/pageAccessCount.json",function(resp){
        let date = new Date(resp.from);
        let formatDate = getMonthName(date.getMonth())+"&nbsp;"+ date.getDate()+",&nbsp;"+date.getFullYear();

        document.getElementById("valueFromServer").innerHTML="This site has been visited <b>"+resp.ac.toLocaleString()+"</b> times since&nbsp;<b>"+formatDate+ "</b>.";
    });

};

function switchContent() {
    // Reset old 
    currentContent.style.display = "none";
    currentNav.style.padding="5px";

    index = indexOfElementInParent(this);
    currentContent = contentList[index];
    currentNav = this;

    // Set New
    currentContent.style.display="block";
    currentNav.style.padding="10px";
}
