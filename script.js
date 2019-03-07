var slideIndex = 0;
function slide(n) {
  var slides = document.getElementsByClassName("slides");
  slides[slideIndex].style.display = "none";
  
  if (slideIndex + n >= slides.length) {
    slideIndex = 0;
  } else if (slideIndex + n < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex += n;
  }
  slides[slideIndex].style.display = "block"; 
}

function toggleMenu(index){
  var contents = document.getElementsByClassName("dropdown-content");
  if( contents[index].style.display  == "block" ) {
    contents[index].style.display = "none";
  } else {
    for(var i=0; i<contents.length; i++){
      contents[i].style.display = "none";
    }
    contents[index].style.display = "block";
  }
}

function modal(id){
  document.getElementById(id).style.display = "flex";
}

function openTab(event, id) {
  var contents = document.getElementsByClassName("tabContent");
  var tabs = document.getElementsByClassName("tabs");
  for (var i=0; i<contents.length; i++) {
    contents[i].style.display = "none";
    tabs[i].className = tabs[i].className.replace(" tabActive", "");
  }
  document.getElementById(id).style.display = "flex";
  event.currentTarget.className += " tabActive";
}

function popup(){
  var contents = document.getElementsByClassName("popup");
  var button = document.getElementById("popupButton");
  if( contents[0].style.display  == "block" ){
    contents[0].style.display = "none";
    button.style.transform = "rotate(0deg)";
  } else {
    contents[0].style.display = "block";
    button.style.transform = "rotate(45deg)";
  }
}