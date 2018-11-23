let table = document.getElementById("table");
getFromLS();

// set Items in localStorage
function saveToLS(date, day, event, factor, salary, sum, deleteButton) {
  let old_items = JSON.parse(localStorage.getItem('dateEntry')) || [];
 
  let new_items = {
    'date'          : date,
    'day'           : day,
    'event'         : event,
    'factor'        : factor,
    'salary'        : salary,
    'sum'           : parseInt(sum),
    'deleteButton'  : deleteButton
  };

  old_items.push(new_items);

  localStorage.setItem('dateEntry', JSON.stringify(old_items));
}

function getFromLS() {
  let items = JSON.parse(localStorage.getItem('dateEntry')) || [];

  for(let i = 0; i < items.length; i++) {
    addRow(items[i].date, items[i].day, items[i].event, items[i].factor, items[i].salary, items[i].sum, items[i].deleteButton);
  }
}

function deleteItem(elem) {
  let items = JSON.parse(localStorage.getItem('dateEntry')) || [];
  let tableRow = elem.parentNode.parentNode;

  for (let i = 0; i < items.length; i++) {
    if (items[i].date === tableRow.children[0].innerHTML.replace(/(<td>|<\/td>)/g, "")) {
      items.splice(i, 1);
    }
  }

  localStorage.setItem('dateEntry', JSON.stringify(items));
  tableRow.parentNode.removeChild(tableRow);
}

function clearLS() {
  localStorage.clear();
  location.reload();
}

// Show current date in input field
document.querySelector("#date").valueAsDate = new Date();

// add row to table
function addRow(date, day, event, factor, salary, sum, deleteButton) {
    let row = document.createElement("tr");

    let tableData = [];
    for(let i = 0; i < 7; i++) {
        tableData[i] = document.createElement("td");
    }

    tableData[0].innerHTML = date;
    tableData[1].innerHTML = day;
    tableData[2].innerHTML = event;
    tableData[3].innerHTML = factor;
    tableData[4].innerHTML = salary;
    tableData[5].innerHTML = sum;
    tableData[6].innerHTML = deleteButton;

    for(let i = 0; i < tableData.length; i++) {
        row.appendChild(tableData[i]);
    }

    table.children[0].appendChild(row);
}

function submit() {
  let selected_day = new Date(document.querySelector("#date").value);
  let weekdays = [ 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa' ];

  formatDate = () => {
    let day   = selected_day.getDate();
    let month = selected_day.getMonth() + 1;
    let year  = selected_day.getFullYear();

    return [day, month, year].join('.');
  }

  let date_formatted = formatDate();
  let day_of_date    = weekdays[selected_day.getDay()];
  let event          = document.getElementById("event").value;
  let factor         = parseInt(document.getElementById("factor").value);
  let salary         = event === "Quali" && factor === 3 ? 20 : event === "Quali" && factor === 4 ? 25 : factor * 5;
  let sum            = parseInt(localStorage.getItem('sum')) || [];
  let deleteButton   = document.innerHTML = '<button class="button" type="button" onclick="deleteItem(this)">Eintrag l&ouml;schen</button>';

  localStorage.setItem('sum', sum += salary);

  addRow(date_formatted, day_of_date, event, factor, salary, sum, deleteButton);
  saveToLS(date_formatted, day_of_date, event, factor, salary, sum, deleteButton);
}

// Convert table to excel file
function saveExcel() {
  let wb = XLSX.utils.table_to_book(document.getElementById("table"), {sheet: "Abrechnung"});
  let wb_binary = XLSX.write(wb, {bookType: "xlsx", bookSST: true, type: "binary"});

  let s2ab = (s) => {
    let buf  = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for(let i = 0; i<s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf;
  }

  saveAs(new Blob([s2ab(wb_binary)], { type: "application/octet-stream" }), "Abrechnung Mil " + new Date().toLocaleString("de-de", {month: "long"}) + ".xlsx");
}

// document.getElementById('delete').onclick(saveExcel());