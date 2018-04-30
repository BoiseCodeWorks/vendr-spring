function Vendr() {
  var currentBalance = 0;
  var products = [
    {
      name: "Mt Dew",
      price: 0.75,
      stock: 17
    },
    {
      name: "Flaming Hot Cheetos con Limon",
      price: 1.75,
      stock: 2
    }
  ];

  function drawProducts() {
    var template = "";
    for (let i = 0; i < products.length; i++) {
      var product = products[i];
      template += `<button onclick="vendr.handleProductButton(${i})">${
        product.name
      } - $${product.price}</button>`;
    }
    document.getElementById("buttons-container").innerHTML = template;
  }

  function getProduct(index) {
    return products[index];
  }

  function displayMessage(msg, color) {
    var msgElem = document.getElementById("msg-output");
    msgElem.textContent = msg;
    msgElem.style.color = color;
  }
  function vend(product) {
    product.stock--;
    currentBalance -= product.price;
    //TODO: display product
  }
  function makeChange(balance) {
    currentBalance -= balance;
    if (currentBalance !== 0) {
      console.log("UGH somthing bad just occured");
    }
    return balance
  }

  this.handleProductButton = function handleProductButton(index) {
    var product = getProduct(index);
    //product in stock
    if (product.stock <= 0) {
      displayMessage("Sorry out of stock. Select Again...", "red");
      return;
    }

    // sufficient funds
    if (currentBalance < product.price) {
      displayMessage("Insufficient Funds", "red");
      return;
    }

    vend(product);

    if (currentBalance > 0) {
      var b = makeChange(currentBalance);
      displayMessage("Have a nice day... Don't forget your change $" + b, "green");
      return;
    }

    displayMessage("Have a nice day", "green");
  }

  var moneyTypes = {
    quarter: .25,
    nickle: .05,
    dime: .10,
    dollar: 1
  }

  this.addMoney = function addMoney(type){
    var value = moneyTypes[type]
    if(value){
      currentBalance += value
    }
    displayMessage(`$${currentBalance}`, 'green')
  }

  drawProducts();
}

var vendr = new Vendr()

