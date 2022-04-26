$(document).ready(function(){

    //CART TOTAL AND PURCHASE BUTTON SECTION
    /*When the page loads (shopping cart page) the following code will write the total to the page
    It will also insert the purchase button*/
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost) + (parseInt(cartCost) * 14 / 100);//This line of code calculates and adds the VAT to the total

    //The following loop will add empty elements to the row so that the total can be written to the correct column
    for (let i = 0; i < 4; i++){

        let emptyData = document.createElement('td');
        emptyData.innerHTML = "";
        document.getElementById("cart-total-row").appendChild(emptyData);
    }

    //The code will then write the total to the page 
    let total = document.createElement('td');
    total.innerHTML = cartCost;
    total.value = cartCost;
    total.id = "total";
    document.getElementById("cart-total-row").appendChild(total);

    //The following code will also add empty elements to the row so that the purchase button can be added to the correct column
    for (let i = 0; i < 4; i++){

        let emptyData = document.createElement('td');
        emptyData.innerHTML = "";
        document.getElementById("purchase-button-row").appendChild(emptyData);
    }

    //The following will write the purchase button to the page
    let purchaseButton = document.createElement('td');
    purchaseButton.innerHTML = `<button
                                type = "button"
                                class = "btn btn-success"
                                id = "purchase">
                                Purchase
                                </button>`;
    document.getElementById("purchase-button-row").appendChild(purchaseButton);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //When the user clicks on the purchase button the following function will be initiated
    $("#purchase").click(function(){

        //First I make two already created divs visible
        $("#coupon").css("visibility", "visible");
        $("#sandD").css("visibility", "visible");

        //If there is no existing form then the code will run
        if (document.getElementById("shipping") == null){

            //This will create a quick form to ask the user if they would like to collect or have the package delivered
            let shipping = document.createElement('p');
            shipping.id = "shipping";
            shipping.innerHTML = `How Would You Like To Recieve Your Order: 
                                <select
                                id="recieve"
                                style="text-align: center">
                                <option> --Select Option-- </option>
                                <option value="delivery"> Delivery </option>
                                <option value="collect"> Collect </option>
                                </select>`;
            shipping.style.margin = "0 auto";
            shipping.style.width = "250px";
            document.getElementById("sandD").appendChild(shipping);
        }

        //When the drop down menu changes then this function will run
        $("#recieve").change(function(){

            //First I remove the shipping element
            $("#shipping").remove();

            //If the user selected delivery the follwing code will run
            if (this.value == "delivery"){
    
                //If the delivery form doesn't already exist the following code will run
                if (document.getElementById("deliveryForm") == null){

                    //This code will create the delivery form for the site
                    let deliveryForm = document.createElement('form');
                    deliveryForm.id = "deliveryForm";
                    deliveryForm.innerHTML = `<label>Address Line 1</label>
                                                <input id="line1" style="width: 250px">
                                                <label>Address Line 2</label>
                                                <input id="line2" style="width: 250px">
                                                <label>Address Line 3</label>
                                                <input id="line3" style="width: 250px">
                                                <label>City</label>
                                                <input id="city" style="width: 250px">
                                                <label>Zip Code</label>
                                                <input id="zip" style="width: 250px">
                                                <button  
                                                id="confirmDelivery"
                                                class="btn btn-outline-primary">Confirm</button>`;
                    deliveryForm.style.margin = "0 auto";
                    deliveryForm.style.width = "250px";
                    document.getElementById("sandD").appendChild(deliveryForm);

                    //This function will be called when the confirm button is clicked
                    $("#confirmDelivery").click(function(e){

                        e.preventDefault();

                        //First I store the address, the item coupon and the payment type in variables
                        let address = document.getElementById("line1").value + " " + document.getElementById("line2").value + " " + document.getElementById("line3").value;
                        let status = sessionStorage.getItem("coupon");
                        status = JSON.parse(status);
                        let custCost = parseInt(sessionStorage.getItem("customerCost"))
                        custCost = custCost + (custCost * 14/100) + 10;
                        let totalCost = parseInt(localStorage.getItem("totalCost"));
                        totalCost = totalCost + (totalCost * 14/100) + 10;

                        //Lets Generate a ref number for the order
                        //I generate the reference by adding the full year and time to the letters KTS
                        let today = new Date();
                        let date = today.getFullYear();
                        let time = today.getTime();
                        let ref = "KTS" + date + time;

                        //I then code two statements for if a coupon was used
                        if (status == null ){

                            //I then alert the the user that their order is confirmed
                            alert("Order Confirmed!\nYour order will be delivered to " + address + " within 3 business days\n" +
                                "Your total is R" + totalCost + " to be paid on delivery\n" +
                                "Your reference is " + ref);
                                orderAnimation();
                        }

                        else if (status != null){

                            alert("Order Confirmed!\nYour order will be delivered to " + address + " within 3 business days\n" +
                                "Your total is R" + custCost + " to be paid on delivery\n" +
                                "Your reference is " + ref);
                                orderAnimation();
                        }
                    })
                }
            }
    
            //If the user selected collect then the following code will run
            else if (this.value == "collect"){
    
                //If there is no existing collect form then the following code will run
                if (document.getElementById("collectForm") == null){

                    //This code will create the collect form for the site
                    let collectForm = document.createElement('form');
                    collectForm.id = "collectForm";
                    collectForm.innerHTML = `<label>Pick-up Location</label>
                                            <select
                                            id="location"
                                            style="text-align: center">
                                            <option> --Select Option-- </option>
                                            <option value="City of Cape Town"> City of Cape Town </option>
                                            <option value="Bellville"> Bellville </option>
                                            <option value="Claremont"> Claremont </option>
                                            </select>
                                            <button
                                            id="confirmCollect"
                                            class="btn btn-outline-primary">Confirm</button>`;
                    collectForm.style.margin = "0 auto";
                    collectForm.style.width = "250px";
                    document.getElementById("sandD").appendChild(collectForm);

                    //this function will be called when the confirm button is clicked. this will function will work similarly to the confirmDelivery
                    $("#confirmCollect").click(function(e){

                        e.preventDefault();

                        let location = document.getElementById("location").value;
                        let status = sessionStorage.getItem("coupon");
                        status = JSON.parse(status);
                        let custCost = parseInt(sessionStorage.getItem("customerCost"))
                        custCost = custCost + (custCost * 14/100);
                        let totalCost = parseInt(localStorage.getItem("totalCost"));
                        totalCost = totalCost + (totalCost * 14/100);

                        //Lets Generate a ref number for the order
                        let today = new Date();
                        let date = today.getFullYear();
                        let time = today.getTime();
                        let ref = "KTS" + date + time;

                        if (status != null){

                            alert("Order Confirmed!\nYour order can be collected by our " + location + " location\nYour Total is R" + 
                                    custCost + "\nYour reference is " + ref);
                                    orderAnimation();
                        }

                        else if (status == null){

                            alert("Order Confirmed!\nYour order can be collected by our " + location + " location\nYour Total is R" +
                                    totalCost + "\nYour reference is " + ref);
                                    orderAnimation()
                        }
                    })
                }
            }
        })
    })

    //This function will accept the coupon and create a new session storage item for the customers cost
    $("#discount").click(function(e){

        //This prevents the page from reloading after the button press
        e.preventDefault();
        
        //I get the value from the input bar
        let code = document.getElementById("code").value;

        //The following statements are for the valid coupon codes
        if (code == "FISHIN4LIFE"){

            //In each of the statements similar codes will run
            //The code gets the current total from the totalCost item in local Storage
            let totalCost = localStorage.getItem('totalCost');
            totalCost = parseInt(totalCost);

            //Now i want my code to know if a coupon has been activated
            sessionStorage.setItem("coupon", JSON.stringify("active"));

            //Then the code calculates the discount portion and removes it from the total cost
            //The code will then set a new item to session storage with the new total and alert the customer
            let customerCost = totalCost - (totalCost * 40/100);
            sessionStorage.setItem("customerCost", JSON.stringify(customerCost));
            alert("You have activated a 40% discount code\nYour new total is R" + customerCost);

            //The coupon section is then removed so that multiple codes can't be submitted
            $("#coupon").remove();
        }

        else if (code == "1STTIME"){

            let totalCost = localStorage.getItem('totalCost');
            totalCost = parseInt(totalCost);
            sessionStorage.setItem("coupon", JSON.stringify("active"));
            let customerCost = totalCost - (totalCost * 10/100);
            sessionStorage.setItem("customerCost", JSON.stringify(customerCost));
            alert("You have activated a 10% discount code\nYour new total is R" + customerCost);
            $("#coupon").remove();
        }

        else if (code == "14ALL"){

            let totalCost = localStorage.getItem('totalCost');
            totalCost = parseInt(totalCost);
            sessionStorage.setItem("coupon", JSON.stringify("active"));
            let customerCost = totalCost - (totalCost * 100/100);
            sessionStorage.setItem("customerCost", JSON.stringify(customerCost));
            alert("You have activated a 100% discount code\nYour new total is R" + customerCost);
            $("#coupon").remove();
        }

        else if (code == "ALL41"){

            let totalCost = localStorage.getItem('totalCost');
            totalCost = parseInt(totalCost);
            sessionStorage.setItem("coupon", JSON.stringify("active"));
            let customerCost = totalCost - (totalCost * 10/100);
            sessionStorage.setItem("customerCost", JSON.stringify(customerCost));
            alert("You have activated a 41% discount code\nYour new total is R" + customerCost);
            $("#coupon").remove();
        }
    })

    //This function will display an animation that includes and animation effect as well as a chained effect
    function orderAnimation(){

        //First I remove the above divs and make the bottom div visible
        $("#coupon").remove();
        $("#sandD").remove();
        $("#animationDiv").css("visibility", "visible");

        //I add the KT Image
        let shop = document.createElement('img');
        shop.src = "Images/KTImage.png";
        shop.id = "shopIMG";
        shop.style.width = "100px";
        shop.style.height = "100px";
        shop.alt = "Image Not Found";
        document.getElementById("shopCol").appendChild(shop);

        //I add the package Image
        let package = document.createElement('img');
        package.src = "Images/packageImage.png";
        package.id = "packageIMG";
        package.style.width = "100px";
        package.style.height = "100px";
        package.style.margin = "0 auto";
        package.alt = "Image Not Found";
        document.getElementById("packageCol").appendChild(package); 

        //I add the house Image
        let house = document.createElement('img');
        house.src = "Images/houseImage.png";
        house.id = "houseIMG";
        house.style.width = "100px";
        house.style.height = "100px";
        house.style.float = "right";
        house.alt = "Image Not Found";
        document.getElementById("houseCol").appendChild(house);

        //Now lets animate and make a chain effect with the images
        $("#shopIMG").ready(function(){
            $("#shopIMG").slideUp(2000);
            $("#shopIMG").slideDown(2000);
        })

        $("#packageCol").ready(function(){
            $("#packageCol").animate({left: '350px'}, 5000);
        })

        $("#houseIMG").ready(function(){
            $("#houseIMG").slideUp(2000);
            $("#houseIMG").slideDown(2000);
        })

    }

});

//I add all the products to an object array
let products = [
    {name: "Rod 8-Feet", tag: "8footrod", price: 600, inCart: 0},
    {name: "Rod 10-Feet", tag: "10footrod", price: 800, inCart: 0},
    {name: "Rod 12-Feet", tag: "12footrod", price: 1000, inCart: 0},
    {name: "Blue Reel", tag: "bluereel", price: 300, inCart: 0},
    {name: "Gold Reel", tag: "goldreel", price: 350, inCart: 0},
    {name: "Silver Reel", tag: "silverreel", price: 320, inCart: 0},
    {name: "Rod and Reel 8-Feet", tag: "8footrodnreel", price: 850, inCart: 0},
    {name: "Rod and Reel 10-Feet", tag: "10footrodnreel", price: 1050, inCart: 0},
    {name: "Rod and Reel 12-Feet", tag: "12footrodnreel", price: 1250,inCart: 0},
    {name: "J-Hook Size-2", tag: "2jhook", price: 19, inCart: 0},
    {name: "J-Hook Size-4", tag: "4jhook", price: 20, inCart: 0},
    {name: "J-Hook Size-6", tag: "6jhook", price: 22, inCart: 0},
    {name: "J-Hook Size-8", tag: "8jhook", price: 25, inCart: 0},
    {name: "J-Hook Size-10", tag: "10jhook", price: 30, inCart: 0},
    {name: "Circle Hook Size-2", tag: "2circlehook", price: 19, inCart: 0},
    {name: "Circle Hook Size-4", tag: "4circlehook", price: 20, inCart: 0},
    {name: "Circle Hook Size-6", tag: "6circlehook", price: 22, inCart: 0},
    {name: "Circle Hook Size-8", tag: "8circlehook", price: 25, inCart: 0},
    {name: "Circle Hook Size-10", tag: "10circlehook", price: 30, inCart: 0},
    {name: "Cob Circle Hook Size-2", tag: "2cobcirclehook",  price: 19, inCart: 0},
    {name: "Cob Circle Hook Size-4", tag: "4circlehook", price: 20, inCart: 0},
    {name: "Cob Circle Hook Size-6", tag: "6circlehook", price: 22, inCart: 0},
    {name: "Cob Circle Hook Size-8", tag: "8circlehook", price: 25, inCart: 0},
    {name: "Cob Circle Hook Size-10", tag: "10circlehook", price: 30, inCart: 0},
    {name: "Swivels Size-2", tag: "2swivels", price: 19, inCart: 0},
    {name: "Swivels Size-4", tag: "4swivels", price: 20, inCart: 0},
    {name: "Swivels Size-6", tag: "6swivels", price: 22, inCart: 0},
    {name: "Swivels Size-8", tag: "8swivels", price: 25, inCart: 0},
    {name: "Swivels Size-10", tag: "10swivels", price: 30, inCart: 0},
    {name: "Half Ounce Ball Sinker", tag: "halfounceballsinker", price: 19, inCart: 0},
    {name: "Quarter Ounce Ball Sinker", tag: "quarterounceballsinker", price: 20, inCart: 0},
    {name: "3 Quarter Ounce Ball Sinker", tag: "threeounceballsinker", price: 22, inCart: 0},
    {name: "1 Ounce Ball Sinker", tag: "oneounceballsinker", price: 25, inCart: 0},
    {name: "2 Ounce Ball Sinker", tag: "twoounceballsinker", price: 30, inCart: 0},
    {name: "10cm Leader", tag: "10cmleader", price: 50, inCart: 0},
    {name: "15cm Leader", tag: "15cmleader", price: 52, inCart: 0},
    {name: "20cm Leader", tag: "20cmleader", price: 55, inCart: 0},
    {name: "25cm Leader", tag: "25cmleader", price: 58, inCart: 0},
    {name: "30cm Leader", tag: "30cmleader", price: 62, inCart: 0},
    {name: "Blue & Yellow Lure", tag: "blue&yellowlure", price: 220, inCart: 0},
    {name: "Red & White Lure", tag: "red&whitelure", price: 220, inCart: 0},
    {name: "Pink & Blue Lure", tag: "pink&bluelure", price: 220, inCart: 0},
    {name: "White & Purple Lure", tag: "white&purplelure", price: 220, inCart: 0},
    {name: "Green & Yellow Lure", tag: "green&yellowlure", price: 300, inCart: 0},
]

let quickProducts = [
    {name: "Rod 8-Feet", tag: "8footrod", price: 600, inCart: 0},
    {name: "Blue Reel", tag: "bluereel", price: 300, inCart: 0},
    {name: "Rod and Reel 8-Feet", tag: "8footrodnreel", price: 850, inCart: 0},
    {name: "J-Hook Size-2", tag: "2jhook", price: 19, inCart: 0},
    {name: "Circle Hook Size-2", tag: "2circlehook", price: 19, inCart: 0},
    {name: "Cob Circle Hook Size-2", tag: "2cobcirclehook",  price: 19, inCart: 0},
    {name: "Swivels Size-2", tag: "2swivels", price: 19, inCart: 0},
    {name: "Half Ounce Ball Sinker", tag: "halfounceballsinker", price: 19, inCart: 0},
    {name: "10cm Leader", tag: "10cmleader", price: 50, inCart: 0},
    {name: "Blue & Yellow Lure", tag: "blue&yellowlure", price: 220, inCart: 0},
]

//I add all the btn-primary to the carts variable
let carts = document.querySelectorAll('.btn-primary');
let cart2 = document.querySelectorAll('.btn-dark');

//I then loop through all the buttons selected and add an eventlistener for a click
for (let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {

        //Using the clicked product I call the appropraite functions for setting products to local storage and a total cost
        setItems(products[i]);
        totalCost(products[i]);
        alert(`Your Total is R${localStorage.getItem('totalCost')}`);//I alert the user to their current total after adding a product to cart
    })
}

//The quick add will follow the same process as the normal add
for (let i = 0; i < cart2.length; i++){
    cart2[i].addEventListener('click', () => {

        setItems(quickProducts[i]);
        totalCost(quickProducts[i]);
        alert(`Your Total is R${localStorage.getItem('totalCost')}`);
    })
}

//This function will set the items to the local storage
function setItems(product){

    //I add the local storage item productsInCart to cartItems
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    //If there is something in the productsInCart item the following code will run
    if (cartItems != null){

        //If the clicked on product is not in the item already it is added and the inCart variable in increased
        if (cartItems[product.tag] == undefined){

            cartItems = {

                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }

    //If there is nothing in the productsInCart item the following code will run
    else {

        //The inCart variable is set to 1 and the product is added to the item
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    //The productsInCart is then set
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//The following function will set the current total of the products in cart
function totalCost(product){

    //I add the item totalCost to the variable cartCost
    let cartCost = localStorage.getItem('totalCost');

    //If there is something in the item the following code will run
    if (cartCost != null){

        //I parse the cartCost to int and then add the price variable of the product to the item and set it.
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    
    //If there is nothing in the totalCost item the following code will run
    else {

        localStorage.setItem("totalCost", product.price);
    }
}

/*The following function will display the cart item on the shopping cart page 
in an appropraite fashion*/
function displayCart(){

    /*I add the productsInCart item to the cartItems variable and 
    add the element cart-contents to the cartContents variable*/
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartContents = document.getElementById("cart-contents");

    //If there is data in cartItems and cartContents then the following code will run
    if (cartItems && cartContents){

        //I then loop through the object values to add them to the shopping cart page
        Object.values(cartItems).map(item => {

            if (item != null){

                //CREATING THE TABLE ROW
                let cartRow = document.createElement('tr');
                cartRow.id = item.tag;
                cartContents.appendChild(cartRow);

                //CREATING THE REMOVE BUTTON
                let cartRemove = document.createElement('td');
                cartRemove.innerHTML = `
                                        <button
                                        class="btn btn-danger btn-rounded"
                                        value="${item.tag}"
                                        onclick="removeItem(this.value)"
                                        style="text-align: center; background-color: red">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-reverse-fill" viewBox="0 0 16 16">
                                            <path d="M0 3a2 2 0 0 1 2-2h7.08a2 2 0 0 1 1.519.698l4.843 5.651a1 1 0 0 1 0 1.302L10.6 14.3a2 2 0 0 1-1.52.7H2a2 2 0 0 1-2-2V3zm9.854 2.854a.5.5 0 0 0-.708-.708L7 7.293 4.854 5.146a.5.5 0 1 0-.708.708L6.293 8l-2.147 2.146a.5.5 0 0 0 .708.708L7 8.707l2.146 2.147a.5.5 0 0 0 .708-.708L7.707 8l2.147-2.146z"/>
                                        </svg>
                                        </button>
                                        <br></br>
                                        `;
                document.getElementById(item.tag).appendChild(cartRemove);

                //ADDING THE PRODUCT
                let cartDataProduct = document.createElement('td');
                cartDataProduct.innerHTML = item.name;
                document.getElementById(item.tag).appendChild(cartDataProduct);

                //ADDING THE PRICE
                let cartDataPrice = document.createElement('td');
                cartDataPrice.innerHTML = `R${item.price}`;
                document.getElementById(item.tag).appendChild(cartDataPrice);

                //ADDING THE QUANTITY
                let cartDataQuantity = document.createElement('td');
                cartDataQuantity.innerHTML = item.inCart;
                document.getElementById(item.tag).appendChild(cartDataQuantity);

                //ADDING THE TOTAL
                let cartDataTotal = document.createElement('td');
                cartDataTotal.innerHTML = `R${item.inCart * item.price}`;
                document.getElementById(item.tag).appendChild(cartDataTotal);
            }
        });
    }
}

//The following function will remove an item from the shopping cart page and the local storage
function removeItem(item){

    //First I simply remove the row of the product
    let itemRow = document.getElementById(item);
    itemRow.parentNode.removeChild(itemRow);

    /*I add the productsInCart item to the cartItems variable
    I then set the price variable to the product of the products price and inCart value
    I then make the object null in the item*/
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let price = cartItems[item].price * cartItems[item].inCart;
    cartItems[item].inCart = 0;
    products[item] = 0;
    cartItems[item] = null;
    let newCartItems = {};

    //I then loop through the objects and only add those that are not null to the newCartItems array
    Object.values(cartItems).map(item => {

        if (item != null){

            newCartItems = {
                ...newCartItems,
                [item.tag]: item
            }
        }
    });

    //I then set the productsInCart using the newCartItems array
    localStorage.setItem("productsInCart", JSON.stringify(newCartItems));

    //I then get the totalCost item and subtract the price of the removed items from it and set it again
    let currentTotal = localStorage.getItem('totalCost');
    currentTotal = parseInt(currentTotal);
    currentTotal = currentTotal - price;
    localStorage.setItem("totalCost", currentTotal);

    //I then get the totalCost again and write it to the webpage with the VAT included
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost) + (parseInt(cartCost) * 14 / 100);//This equation will get 14% of the current total and add it to the total
    let total = document.getElementById("total");
    total.value = cartCost;
    total.innerHTML = cartCost;
    
}

displayCart();