let table = document.getElementById("table");
getFromLS();

// set Items in localStorage
function saveToLS(date, day, event, factor, salary, sum) {
  let old_items = JSON.parse(localStorage.getItem('itemsArray')) || [];

  let new_items = {
    'date'  : date,
    'day'   : day,
    'event' : event,
    'factor': factor,
    'salary': salary,
    'sum'   : sum
  };

  old_items.push(new_items);

  localStorage.setItem('itemsArray', JSON.stringify(old_items));
}

function getFromLS() {
  let items = JSON.parse(localStorage.getItem('itemsArray')) || [];

  for(i = 0; i < items.length; i++) {
    addRow(items[i].date, items[i].day, items[i].event, items[i].factor, items[i].salary, items[i].sum);
  }
}

// add row to table
function submit() {
  
  let date_today = new Date(document.getElementById("date").value);
  day   = date_today.getDate();
  month = date_today.getMonth() + 1;
  year  = date_today.getFullYear();

  let date_formatted = [day, month, year].join('.');
  let day_given      = document.getElementById("day").value;
  let event          = document.getElementById("event").value;
  let factor         = parseInt(document.getElementById("factor").value);


  let salary = event === "Quali" && factor === 3 ?
    20
  : event === "Quali" && factor === 4 ?
    25
  : factor * 5;

  addRow(date_formatted, day_given, event, factor, salary, salary); //TODO add proper sum 
  saveToLS(date_formatted, day_given, event, factor, salary, salary);
}

function addRow(date, day, event, factor, salary, sum) {

  let row = document.createElement("tr");

  let tableData = [];
  for(let i = 0; i < 6; i++) {
    tableData[i] = document.createElement("td");
  }

    tableData[0].innerHTML = date;
    tableData[1].innerHTML = day;
    tableData[2].innerHTML = event;
    tableData[3].innerHTML = factor;
    tableData[4].innerHTML = salary;
    tableData[5].innerHTML = sum;

    for(let i = 0; i < tableData.length; i++) {
      row.appendChild(tableData[i]);
    }

    table.children[0].appendChild(row);

}

// Show current date in input field
document.querySelector("#date").valueAsDate = new Date();

// Convert table to excel file
function saveExcel() {
  let wb = XLSX.utils.table_to_book(document.getElementById("table"), {sheet: "Abrechnung"});
  let wb_binary = XLSX.write(wb, {bookType: "xlsx", bookSST: true, type: "binary"});

  function s2ab(s) {
    let buf  = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for(let i = 0; i<s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf;
  }

  saveAs(new Blob([s2ab(wb_binary)], { type: "application/octet-stream" }), "Abrechnung Mil " + new Date().toLocaleString("de-de", {month: "long"}) + ".xlsx");
}