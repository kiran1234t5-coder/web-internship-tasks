async function addStudent() {
    let name = document.getElementById("name").value.trim();
    let marks = document.getElementById("marks").value;
    if (!name || !marks) {
        document.getElementById("msg").innerText = "Please fill all fields";
        return;
    }

    const res = await fetch("add_student.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, marks: Number(marks) })
    });
    const data = await res.json();
    document.getElementById("msg").innerText = data.message || data.error;
    document.getElementById("name").value = "";
    document.getElementById("marks").value = "";
    render();
}

async function render() {
    const res = await fetch("get_students.php");
    const students = await res.json();
    let list = document.getElementById("list");
    list.innerHTML = "";
    students.forEach(s => {
        list.innerHTML += `<div class="student">
            <span>${s.name}</span>
            <span class="badge">${s.marks}</span>
        </div>`;
    });
}

async function searchStudent() {
    let q = document.getElementById("search").value.trim();
    const res = await fetch(`search_student.php?name=${q}`);
    const resultDiv = document.getElementById("searchResult");
    if (res.status === 200) {
        const s = await res.json();
        resultDiv.innerText = `${s.name} scored ${s.marks} marks`;
    } else {
        resultDiv.innerText = "Student not found";
    }
}

async function average() {
    const res = await fetch("average.php");
    const data = await res.json();
    document.getElementById("avg").innerText = "Average Marks: " + data.average;
}

// Load all students on page load
render();
