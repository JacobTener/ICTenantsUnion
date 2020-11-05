//Get Input Element
let filterLandlords = document.getElementById("filterLandlords");
//Add event listener
filterLandlords.addEventListener("input", (e) => {
  //Get value of input
  let filterValue = document
    .getElementById("filterLandlords")
    .value.toUpperCase();

   let row = document.querySelectorAll(".table-row");

  row.forEach((r) => {
    let name = r.getElementsByTagName("td")[0];
    if (name.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      r.style.display = "";
    } else {
      r.style.display = "none";
    }
  });
});