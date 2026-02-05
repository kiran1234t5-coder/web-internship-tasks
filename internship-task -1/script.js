function task1() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    document.getElementById("output1").innerText =
        `Hello ${name}, you are ${age} years old.`;
}

function task2() {
    let num = document.getElementById("evenOdd").value;
    document.getElementById("output2").innerText =
        num % 2 === 0 ? "Even Number" : "Odd Number";
}

function task3() {
    let a = Number(document.getElementById("n1").value);
    let b = Number(document.getElementById("n2").value);
    let c = Number(document.getElementById("n3").value);

    let largest = a >= b && a >= c ? a : (b >= a && b >= c ? b : c);
    document.getElementById("output3").innerText =
        "Largest Number: " + largest;
}

function task4() {
    let numbers = [10, 20, 30, 40, 50];
    let sum = 0;

    for (let n of numbers) {
        sum += n;
    }

    let avg = sum / numbers.length;
    document.getElementById("output4").innerText =
        `Sum: ${sum}, Average: ${avg}`;
}

function task5() {
    let text = document.getElementById("text").value;
    let reverse = "";

    for (let char of text) {
        reverse = char + reverse;
    }

    document.getElementById("output5").innerText =
        "Reversed String: " + reverse;
}

function task6() {
    let list = [1, 2, 3, 2, 4, 2, 5];
    let num = Number(document.getElementById("countNum").value);
    let count = 0;

    for (let n of list) {
        if (n === num) count++;
    }

    document.getElementById("output6").innerText =
        `Number appears ${count} times`;
}

function task7() {
    let result = "";
    for (let i = 1; i <= 50; i++) {
        if (i % 5 !== 0) {
            result += i + " ";
        }
    }
    document.getElementById("output7").innerText = result;
}
