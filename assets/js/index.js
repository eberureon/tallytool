let table = document.getElementById('table');
let tableSumData = document.querySelectorAll('#sum td');

// initialize Items in localStorage and save new Items to localStorage
function saveToLS(date, day, event, factor, salary, deleteButton) {
  let items = JSON.parse(localStorage.getItem('dateEntry')) || [];

  let newItems = {
    'date'          : date,
    'day'           : day,
    'event'         : event,
    'factor'        : factor,
    'salary'        : salary,
    'deleteButton'  : deleteButton
  };

  items.push(newItems);

  localStorage.setItem('dateEntry', JSON.stringify(items));
}

(function getFromLS() {
  let items = JSON.parse(localStorage.getItem('dateEntry')) || [];
  let sum = JSON.parse(localStorage.getItem('sum')) || null;

  for(let i = 0; i < items.length; i++) {
    addRow(items[i].date, items[i].day, items[i].event, items[i].factor, items[i].salary, items[i].deleteButton);
  }

  if(sum !== null) {
    addSum(sum);
  }

  document.getElementById('youth').innerHTML = JSON.parse(localStorage.getItem('youth'));
  document.getElementById('month').innerHTML = JSON.parse(localStorage.getItem('month'));
})();

function deleteItem(elem) {
  let items = JSON.parse(localStorage.getItem('dateEntry')) || [];
  let tableRow = elem.parentNode.parentNode;

  for (let i = 0; i < items.length; i++) {
    if (items[i].date === tableRow.children[0].innerHTML.replace(/(<td>|<\/td>)/g, '')) {
      // Calculate new sum
      let salary = items[i].salary;
      let newSum = JSON.parse(localStorage.getItem('sum')) - salary;
      tableSumData[0].innerHTML = newSum;
      localStorage.setItem('sum', JSON.stringify(newSum));
      // Remove selected Item from LocalStorage
      items.splice(i, 1);
    }
  }

  localStorage.setItem('dateEntry', JSON.stringify(items));
  tableRow.parentNode.removeChild(tableRow);
}

function clearLS() {
  let keys = ['dateEntry', 'sum', 'month'];
  for (key of keys) {
    localStorage.removeItem(key);
  }
  location.reload();
}

function addSum(sum) {
  tableSumData[0].innerHTML = sum;
}

function addRow(date, day, event, factor, salary, deleteButton) {
    let row = document.createElement('tr');

    let tableData = [];
    for(let i = 0; i < 6; i++) {
      tableData[i] = document.createElement('td');
    }

    tableData[0].innerHTML = date;
    tableData[1].innerHTML = day;
    tableData[2].innerHTML = event;
    tableData[3].innerHTML = factor;
    tableData[4].innerHTML = salary;
    tableData[5].innerHTML = deleteButton;

    for(let i = 0; i < tableData.length; i++) {
      row.appendChild(tableData[i]);
    }

    table.children[0].appendChild(row);
}

function submit() {
  let selectedDay = new Date(document.querySelector('#date').value);

  let dateFormatted  = selectedDay.toLocaleDateString('de-de', {day: '2-digit', month: '2-digit', year: 'numeric'});
  let dateWeekday    = selectedDay.toLocaleDateString('de-de', {weekday: 'short'});
  let event          = document.getElementById('event').value;
  let factor         = parseInt(document.getElementById('factor').value);
  let salary         = event === 'Quali' && factor === 3 ? 20 : event === 'Quali' && factor === 4 ? 25 : factor * 5;
  let sum            = parseInt(localStorage.getItem('sum')) || [];
  let deleteButton   = document.innerHTML = '<button class="button" id="deleteItem" type="button" onclick="deleteItem(this)">Eintrag l&ouml;schen</button>';

  localStorage.setItem('sum', sum += salary);

  addRow(dateFormatted, dateWeekday, event, factor, salary, deleteButton);
  addSum(sum);
  saveToLS(dateFormatted, dateWeekday, event, factor, salary, deleteButton);
}

// Save Youth and Month to Local Storage
document.getElementById('youth').oninput = () => {
  localStorage.setItem('youth', JSON.stringify(document.getElementById('youth').innerHTML));
}

document.getElementById('month').oninput = () => {
  localStorage.setItem('month', JSON.stringify(document.getElementById('month').innerHTML));
}

// Convert table to excel file
function saveExcel() {
  let wb = XLSX.utils.table_to_book(
    document.getElementById('tables'),
  {
    sheet: 'Abrechnung',
    raw: true
  });

  let wbBinary = XLSX.write(
    wb,
  {
    bookType: 'xlsx',
    bookSST: true,
    type: 'binary',
    Props: {
      Author: 'Trainer',
      LastAuthor: 'Trainer',
      Title: 'Abrechnung Mil',
      Category: 'Finanzen'
    }
  });

  let s2ab = (s) => {
    let buf  = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for(let i = 0; i<s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf;
  }

  saveAs(new Blob([s2ab(wbBinary)], { type: 'application/octet-stream' }), 'Abrechnung Mil ' + new Date().toLocaleString('de-de', {month: 'long', year: 'numeric'}) + '.xlsx');
}

// onClick Handlers
document.getElementById('submit').addEventListener('click', submit);
document.getElementById('download').addEventListener('click', saveExcel);
document.getElementById('reset').addEventListener('click', clearLS);

// Show current date in input field
document.querySelector('#date').valueAsDate = new Date();
