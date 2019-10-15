console.log("Howdy there pardner, you're doin a great job!! :)");

fetch("http://localhost:8088/food")
    .then(foods => {
        console.log("foods", foods);
        //convert results of fetch request to js
        return foods.json()
    })
    .then(parsedFoods => {


        let foodData = [];
        foodData = parsedFoods
        const makeHFrag = (foodArray) => {
            const fragmentOuter = document.createDocumentFragment();
            
            for (let i = 0; i < foodArray.length; i++) {
                const fragmentInner = document.createElement
                ('div');
                fragmentInner.classList = "foodBox"
                for (let foodKey in foodArray[i]) {
                    if (foodKey === "id"){

                    } else {
                    let foodBite = "";
                    
                    foodBite += `${foodArray[i][foodKey]}`;
                    const foodEl = document.createElement('div');
                    foodEl.textContent = foodBite;
                    fragmentInner.appendChild(foodEl);
                }}
                fragmentOuter.appendChild(fragmentInner)
            }
            return fragmentOuter;
        }
        const foodInfo = makeHFrag(foodData);
        console.log(foodInfo);
        const domRef = document.querySelector(".foodList")
        domRef.appendChild(foodInfo);
    });