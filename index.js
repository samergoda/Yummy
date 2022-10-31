$(".gear").click(function () {
    $(".navBox").toggle()
})



$("#SearchBtn").click(function () {
    if ($("#searchRow").css("display", "block")) {

        $("#categoryRow").css("display", "none")
        $("#areaRow").css("display", "none")
        $("#IngredientsRow").css("display", "none")
        $("#inputs").css("display", "none")

    }

})
$("#CategoryBtn").click(function () {
    if ($("#categoryRow").css("display", "flex")) {
        $("#searchRow").css("display", "none")
        $("#areaRow").css("display", "none")
        $("#IngredientsRow").css("display", "none")
        $("#inputs").css("display", "none")
    }

})
$("#AreaBtn").click(function () {
    if ($("#areaRow").css("display", "flex")) {

        $("#searchRow").css("display", "none")
        $("#categoryRow").css("display", "none")
        $("#IngredientsRow").css("display", "none")
        $("#inputs").css("display", "none")

    }

})
$("#IngredientsBtn").click(function () {
    if ($("#IngredientsRow").css("display", "flex")) {

        $("#searchRow").css("display", "none")
        $("#areaRow").css("display", "none")
        $("#CategoryRow").css("display", "none")
        $("#inputs").css("display", "none")
    }

})


$("#contact").click(function () {
    if ($("#inputs").css("display", "block")) {

        $("#searchRow").css("display", "none")
        $("#areaRow").css("display", "none")
        $("#CategoryRow").css("display", "none")
        $("#IngredientsRow").css("display", "none")
    }

})

// ///////////////////////////////  category ////////////////////////////////////////////////////////////////
// get data gategory
async function category() {
    let cat = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let catdata = await cat.json()
    catdata = catdata.categories
    displayCategory(catdata)
    // console.log(catdata[0].strCategoryThumb);


}
category()

// diplay category
function displayCategory(catdata) {
    let c = ``
    for (let i = 0; i < catdata.length; i++) {
        c += `<div onclick="Meal('${catdata[i].strCategory}')" class="my-3 item position-relative col-md-3" >
        <img class="w-100"  src="${catdata[i].strCategoryThumb}" >
        <div class="text-white bg-black bg-opacity-50 textHover  position-absolute">
        <p class="fs-3">${catdata[i].strCategory}</p>
        </div>
        </div>`
        // Meal(catdata[i].strCategory)
    }
    document.getElementById("categoryRow").innerHTML = c
}

// meal
async function Meal(meals) {
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meals}`)
    let mealdata = await meal.json()
    mealdata = mealdata.meals
    // console.log(mealdata);
    displayMeals(mealdata)


}

    // $("div").click(function (e) {
    //     let code = e.target
    //     console.log(code)
    //     Meal(code)
    // })
    


// displaymeals
function displayMeals(mealdata) {
    let c = ``
    for (let i = 0; i < mealdata.length; i++) {
        c += `<div class="my-3 item position-relative col-md-3" >
         <img class="w-100" src="${mealdata[i].strMealThumb}" >
         <div class="text-white bg-black bg-opacity-50 textHover  position-absolute">
         <p class="fs-3">${mealdata[i].strMeal}</p>
         </div>
         </div>`

    }
    document.getElementById("mealsRow").innerHTML = c
}


// end category///////////////////////////////////////////////////////////////////////////////////////////

// ////////////////// area /////////////////////
async function Area() {
    let area = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let areadata = await area.json()
    areadata = areadata.meals
    displayArea(areadata)
    // console.log(areadata);


}
Area()

// diplay category
function displayArea(areadata) {
    let c = ``
    for (let i = 0; i < areadata.length; i++) {
        c += `<div  class="my-3 text-center m-2 p-3 shadow col-md-3" >
            <i class="fa-solid text-dark  fa-city fa-3x"></i>
            <h2>${areadata[i].strArea}</h2>
        </div>`

    }
    document.getElementById("areaRow").innerHTML = c
}
// end area

// ///////// Ingredients /////////////////////////
async function Inger() {
    let ing = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let ingredata = await ing.json()
    ingredata = ingredata.meals
    displayIngre(ingredata)
    // console.log(ingredata);


}
Inger()

// diplay category
function displayIngre(ingredata) {
    let c = ``
    for (let i = 0; i < ingredata.length; i++) {
        c += `<div class="my-3 text-center m-2 p-3 shadow col-md-3" >
            <i class="fa-solid text-dark  fa-bowl-food fa-3x"></i>
            <h2>${ingredata[i].strIngredient}</h2>
        </div>`

    }
    document.getElementById("IngredientsRow").innerHTML = c
}




