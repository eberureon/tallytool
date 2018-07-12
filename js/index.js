// add row to table
function addRow() {
  let table = document.getElementById("table");

  let row = document.createElement("tr");
  
  let td1 = document.createElement("td"); // Datum
  let td2 = document.createElement("td"); // Tag
  let td3 = document.createElement("td"); // Event
  let td4 = document.createElement("td"); // Faktor
  let td5 = document.createElement("td"); // Stundensatz
  let td6 = document.createElement("td"); // Summe

  let date = new Date($('#date').val());
  day = date.getDate();
  month = date.getMonth() + 1;
  year = date.getFullYear();

  td1.innerHTML = [day, month, year].join('.');
  td2.innerHTML = document.getElementById("day").value;
  td3.innerHTML = document.getElementById("event").value;
  td4.innerHTML = document.getElementById("factor").value;

  let event = document.getElementById("event").value;
  let factor = document.getElementById("factor").value;

  event === "Training" || event === "Spiel" ? 
      (td5.innerHTML = parseInt(document.getElementById("factor").value) * 5 + " &euro;",
       td6.innerHTML = parseInt(document.getElementById("factor").value) * 5 + " &euro;")
    : factor === "3" ? 
      (td5.innerHTML = 20 + " &euro;",
       td6.innerHTML = 20 + " &euro;")
    : factor === "4" ? 
    (td5.innerHTML = 25 + " &euro;",
     td6.innerHTML = 25 + " &euro;")
    : (td5.innerHTML = 5 + " &euro;",
       td6.innerHTML = 5 + " &euro;");

if(event === "Training" || event === "Spiel") {
  td5.innerHTML = parseInt(document.getElementById("factor").value) * 5 + " &euro;";
  td6.innerHTML = parseInt(document.getElementById("factor").value) * 5 + " &euro;";
} else {

}

  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  row.appendChild(td5);
  row.appendChild(td6);

  table.children[0].appendChild(row);
}

// Show current date in input field
// TODO: doesnt work right 
document.querySelector("#date").valueAsDate = new Date();