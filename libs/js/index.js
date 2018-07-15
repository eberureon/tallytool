getData();

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
  let factor = parseInt(document.getElementById("factor").value);

  td1.innerHTML = date_formatted;
  td2.innerHTML = day_given;
  td3.innerHTML = event;
  td4.innerHTML = factor;

  event === "Qauli" && factor === 3 ?
    (td5.innerHTML = 20,
     td6.innerHTML = 20)
  : event === "Qauli" && factor === 4 ?
    (td5.innerHTML = 25,
     td6.innerHTML = 25)
  : (td5.innerHTML = factor * 5,
     td6.innerHTML = factor * 5);

  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  row.appendChild(td5);
  row.appendChild(td6);

  table.children[0].appendChild(row);

  // set Items in localStorage
  let old_items = JSON.parse(localStorage.getItem('itemsArray')) || [];

  let new_items = {
    'date': date_formatted,
    'day': day_given,
    'event': event,
    'factor': factor,
    'salary': event === "Qauli" && factor === 3 ? 20 : event === "Qauli" && factor === 4 ? 25 : factor * 5,
    'sum': event === "Qauli" && factor === 3 ? 20 : event === "Qauli" && factor === 4 ? 25 : factor * 5
  };

  old_items.push(new_items);

  localStorage.setItem('itemsArray', JSON.stringify(old_items));
}

function getData() {
  let items = JSON.parse(localStorage.getItem('itemsArray')) || [];

  for(i = 0; i < items.length; i++) {
    let table = document.getElementById("table");
    let row = document.createElement("tr");

    let td1 = document.createElement("td"); // Datum
    let td2 = document.createElement("td"); // Tag
    let td3 = document.createElement("td"); // Event
    let td4 = document.createElement("td"); // Faktor
    let td5 = document.createElement("td"); // Stundensatz
    let td6 = document.createElement("td"); // Summe

    td1.innerHTML = items[i].date;
    td2.innerHTML = items[i].day;
    td3.innerHTML = items[i].event;
    td4.innerHTML = items[i].factor;
    td5.innerHTML = items[i].salary;
    td6.innerHTML = items[i].sum;

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);

    table.children[0].appendChild(row);
  }
}

// Show current date in input field
document.querySelector("#date").valueAsDate = new Date();

// Convert table to excel file
function saveExcel() {
  let wb = XLSX.utils.table_to_book(document.getElementById("table"), {sheet: "Abrechnung"});
  let wb_binary = XLSX.write(wb, {bookType: "xlsx", bookSST: true, type: "binary"});

  function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for(let i =0; i<s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf;
  }

  saveAs(new Blob([s2ab(wb_binary)], { type: "application/octet-stream" }), "Abrechnung Mil " + new Date().toLocaleString("de-de", {month: "long"}) + ".xlsx");
}