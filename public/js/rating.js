// Client side JS to filter landlords in real time based on name entry

let filterLandlords = document.getElementById("filterLandlords");
filterLandlords.addEventListener("input", (e) => {
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