console.log("Howdy there pardner, you're doin a great job!! :)");
// FIRST PRACTICE
// fetch("http://localhost:8088/food")
//     .then(foods => {
//         console.log("foods", foods);
//         //convert results of fetch request to js
//         return foods.json()
//     })
//     .then(parsedFoods => {


//         let foodData = [];
//         foodData = parsedFoods
//         const makeHFrag = (foodArray) => {
//             const fragmentOuter = document.createDocumentFragment();

//             for (let i = 0; i < foodArray.length; i++) {
//                 const fragmentInner = document.createElement
//                 ('div');
//                 fragmentInner.classList = "foodBox"
//                 for (let foodKey in foodArray[i]) {
//                     if (foodKey === "id"){

//                     } else {
//                     let foodBite = "";

//                     foodBite += `${foodArray[i][foodKey]}`;
//                     const foodEl = document.createElement('div');
//                     foodEl.textContent = foodBite;
//                     fragmentInner.appendChild(foodEl);
//                 }}
//                 fragmentOuter.appendChild(fragmentInner)
//             }
//             return fragmentOuter;
//         }
//         const foodInfo = makeHFrag(foodData);
//         console.log(foodInfo);
//         const domRef = document.querySelector(".foodList")
//         domRef.appendChild(foodInfo);
//     });





fetch("http://localhost:8088/food")
    //
    .then(response => response.json())
    .then(myParsedFoods => {
        //get a reference for the div in HTML to use to append stuff later
        const foodRef = document.querySelector(".foodList");
        myParsedFoods.forEach(food => {
            console.log(food["barcode"]) // check the barcode

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food["barcode"]}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    //pass the ingredients info to a variable
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }
                    //create an div element with a class of "foodThing" that contains the food name as a header and the ingredients as a div
                    const foodFactory = (foodObj) => {
                        const foodFrag = document.createElement('div');
                        foodFrag.classList = "foodThing"
                        const foodName = document.createElement('h2');
                        foodName.innerText = foodObj["name"];
                        const foodInfo = document.createElement('div');
                        foodInfo.innerText = food.ingredients;
                        foodFrag.appendChild(foodName);
                        foodFrag.appendChild(foodInfo);
                        return foodFrag;
                    }
                    // // Call foodFactory and assign its return to a variable
                    const foodAsHTML = foodFactory(food)
                    console.log(foodAsHTML);


                    //take foodAsHTML and add it to the dom by appending it to the foodEl
                    const addFoodToDom = (foodEl) => {
                        foodRef.appendChild(foodEl);
                    }
                    addFoodToDom(foodAsHTML)

                })

        })
    })