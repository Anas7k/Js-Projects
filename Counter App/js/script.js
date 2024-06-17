let counter = 0;

let dec = document.getElementById('dec-btn')
let res = document.getElementById('res-btn')
let inc = document.getElementById('inc-btn')


dec.addEventListener('click', function() {
    counter--;
    // if (counter > 0) {
    //     counter--;
    // }
    // counter = counter > 0 ? --counter : counter
    document.getElementById('countLabel').textContent = counter
})

res.onclick = function() {
    counter = 0;
    document.getElementById('countLabel').textContent = counter
}

document.getElementById('inc-btn').onclick = function () {
    counter++;
    document.getElementById('countLabel').textContent = counter;
};
