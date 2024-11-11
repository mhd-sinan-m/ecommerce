const {count} = require("./details")

const product = document.getElementById("product")
console.log(count);


for(let i = 1; i<= count ; i++){
    product.innerHTML = "hi"
}