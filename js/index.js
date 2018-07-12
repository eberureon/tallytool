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

  let date_today = new Date(document.getElementById("date").value);
  day = date_today.getDate();
  month = date_today.getMonth() + 1;
  year = date_today.getFullYear();

  let date_formatted = [day, month, year].join('.');
  let day_given = document.getElementById("day").value;
  let event = document.getElementById("event").value;
  let factor = document.getElementById("factor").value;

  td1.innerHTML = date_formatted;
  td2.innerHTML = day_given;
  td3.innerHTML = event;
  td4.innerHTML = factor;

  event === "Qauli" && factor === "3" ?
    (td5.innerHTML = 20 + " &euro;",
     td6.innerHTML = 20 + " &euro;")
  : event === "Qauli" && factor === "4" ?
    (td5.innerHTML = 25 + " &euro;",
     td6.innerHTML = 25 + " &euro;")
  : (td5.innerHTML = parseInt(factor) * 5 + " &euro;",
     td6.innerHTML = parseInt(factor) * 5 + " &euro;");

  localStorage.setItem("date", date_formatted);
  localStorage.setItem("day", day_given);
  localStorage.setItem("event", event);
  localStorage.setItem("factor", factor);

  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  row.appendChild(td5);
  row.appendChild(td6);

  table.children[0].appendChild(row);
}

function getData() {
  let row = document.createElement("tr");

  let td1 = document.createElement("td"); // Datum
  let td2 = document.createElement("td"); // Tag
  let td3 = document.createElement("td"); // Event
  let td4 = document.createElement("td"); // Faktor
  let td5 = document.createElement("td"); // Stundensatz
  let td6 = document.createElement("td"); // Summe

  td1.innerText = localStorage.getItem("date");
  td2.innerText = localStorage.getItem("day");
  td3.innerText = localStorage.getItem("event");
  td4.innerText = localStorage.getItem("factor");

  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  // row.appendChild(td5);
  // row.appendChild(td6);

  table.children[0].appendChild(row);
}

getData();

// Show current date in input field
document.querySelector("#date").valueAsDate = new Date();
