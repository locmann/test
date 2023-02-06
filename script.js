fetch("test.json")
	.then(response => response.json())
	.then(data => {
		test(data)
		/*считывание json*/
	})
	.then(() => {
		/*редактирование таблицы*/
		let table = document.getElementById("table"),rIndex;
		
		for(let i = 1; i < table.rows.length; i++) {
		    table.rows[i].onclick = function() {
		    	console.log("in foo");
		    	document.getElementById("menu").style.visibility = "visible";
		        rIndex = this.rowIndex;
		        console.log(rIndex);
		        
		        document.getElementById("fName").value = this.cells[0].innerHTML;
		        document.getElementById("lName").value = this.cells[1].innerHTML;
		        document.getElementById("truncate").value = this.cells[2].innerHTML;
		        document.getElementById("eyeColor").value = this.cells[3].innerHTML;
		    };
		}
		document.getElementById("rofl").onclick = () => {
			table.rows[rIndex].cells[0].innerHTML = document.getElementById("fName").value;
		    table.rows[rIndex].cells[1].innerHTML = document.getElementById("lName").value;
		    table.rows[rIndex].cells[2].innerHTML = document.getElementById("truncate").value;
		    table.rows[rIndex].cells[3].innerHTML = document.getElementById("eyeColor").value;
		    document.getElementById("menu").style.visibility = "hidden";
		}
			
	})


function test(data) {
	/*заполнение таблицы*/
	let length = Object.keys(data).length;
	for (let i = 0; i < length; i++) {
		let tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
	    let row = document.createElement("tr");
	    let td1 = document.createElement("td");
	    td1.id = "fName";
	    td1.appendChild(document.createTextNode(data[i].name.firstName));
	    let td2 = document.createElement("td");
	    td2.id = "lName";
	    td2.appendChild (document.createTextNode(data[i].name.lastName));
	    let td3 = document.createElement("td");
	    td3.id = "truncate";
	    td3.appendChild(document.createTextNode(data[i].about));
	    let td4 = document.createElement("td");
	    td4.id = "eyeColor";
	    td4.appendChild(document.createTextNode(data[i].eyeColor));
	    row.appendChild(td1);
	    row.appendChild(td2);
	    row.appendChild(td3);
	    row.appendChild(td4);
	    tbody.appendChild(row);
	}
}


/*сортировка по клику*/
document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };

    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

});



