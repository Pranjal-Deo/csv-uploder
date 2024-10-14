document.getElementById('searchBox').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll('#csvTable tbody tr');
    rows.forEach(row => {
        let cell = row.cells[0];  // Change index if searching on different column
        if (cell.textContent.toLowerCase().includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

function sortTable(column) {
    let table = document.getElementById('csvTable');
    let rows = Array.from(table.rows).slice(1);
    let index = Array.from(table.rows[0].cells).findIndex(cell => cell.textContent === column);
    let ascending = table.getAttribute('data-sort-asc') === 'true';
    
    rows.sort((a, b) => {
        let aText = a.cells[index].textContent;
        let bText = b.cells[index].textContent;
        return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
    });

    rows.forEach(row => table.appendChild(row));
    table.setAttribute('data-sort-asc', !ascending);
}
