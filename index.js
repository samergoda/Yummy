const Search = document.querySelector('.Search')
const Categories = document.querySelector('.Categories')
const Area = document.querySelector('.Area')
const Ingredients = document.querySelector('.Ingredients')
const Contact = document.querySelector('.Contact')
const rowData = document.getElementById('rowData')
const navWidth = $('.nav-tab').outerWidth()
const searchContainer =document.getElementById('searchContainer')
let btn 

// loading
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})
// toggle navBar
$('.side-nav-menu i.open-close-icon').click(()=>{
    if($('.side-nav-menu').css("left") == '0px'){
        $('.side-nav-menu').animate({left:-navWidth},500)
        $('.open-close-icon').addClass('fa-align-justify')
        $('.open-close-icon').removeClass('fa-x')
    }else{
        $('.side-nav-menu').animate({left:0},500)
        $('.open-close-icon').removeClass('fa-align-justify')
        $('.open-close-icon').addClass('fa-x')
    }
})




const searchByName = async function (meal) {
  let response =  await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    response = await response.json()
    // console.log(response.meals);
    displayMeals(response.meals)

}
searchByName('')

const searchByLitter= async function (meal) {
    let response =  await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${meal}`)
      response = await response.json()
    //   console.log(response.meals);
      displayMeals(response.meals)
  
  }
// meals & category
const displayMeals = function (arr){
    // searchContainer.innerHTML =''

    c =''
    if (arr == null) {
            c+=`<h2 class='text-white text-center'>Not found meals😪</h2>`
            // console.log('done');
        }
    for (let i = 0; i < arr?.length; i++) {
// onclick=getMealsDetails(${arr[i].idMeal}) onclick=categoryMeals('${arr[i].strCategory}')
        // console.log(arr[i].idMeal);
        c+=`
       <div   onclick=getMealsDetails(${arr[i].idMeal}) role="button"   class="overflow-hidden  meal position-relative col-md-3" >

       
       <img class="w-100 rounded "  src="${arr[i].strMealThumb|| arr[i].strCategoryThumb} " >
        <div class="text-black text-center bg-white d-flex rounded flex-column align-items-center justify-content-center bg-opacity-50 meal-layer position-absolute">
        <p class="fs-3">${arr[i].strMeal||arr[i].strCategory} </p>
        <p class="">${arr.length==14?arr[i]?.strCategoryDescription?.split(' ').slice(0,20).join(' '):''} </p>
        </div>
        </div>
       

        
        ` 
    }
    rowData.innerHTML= c
}


        

Categories.addEventListener('click', async function () {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    response = await response.json()
    // console.log(response.categories);
    displayCategory(response.categories)
   

})

const displayCategory = function (arr){
    searchContainer.innerHTML =''
    c =''
   
    for (let i = 0; i < arr.length; i++) {
// onclick=getMealsDetails('${arr[i].idMeal}')
        
        c+=`
       <div  role="button" onclick=categoryMeals('${arr[i].strCategory}') onclick=getMealsDetails(${arr[i].idMeal})  class="overflow-hidden  meal position-relative col-md-3" >
        <img class="w-100 rounded "  src="${arr[i].strCategoryThumb} " >
        <div class="text-black text-center bg-white d-flex rounded flex-column align-items-center justify-content-center bg-opacity-50 meal-layer position-absolute">
        <p class="fs-3">${arr[i].strCategory} </p>
        <p class="">${arr.length==14?arr[i]?.strCategoryDescription?.split(' ').slice(0,20).join(' '):''} </p>
        </div>
        </div>
        ` 
    }
    rowData.innerHTML= c
}


// Areaa

const getArea = async function () {
    let response =  await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
      response = await response.json()
    //   console.log(response);
      displayArea(response.meals)
  
  }




Area.addEventListener('click',getArea)

const displayArea = function (arr) {
    searchContainer.innerHTML =''
    c=''
    for (let i = 0; i < arr.length; i++) {
        c+=`<div onclick=areaMeals('${arr[i].strArea}') role="button" class=" text-center  shadow col-md-3">
        <i class="fa-solid text-dark  fa-city fa-3x"></i>
        <h2>${arr[i].strArea}</h2>
    </div>`
    }
    rowData.innerHTML= c
}


// Inger
const getingre = async function () {
    let response =  await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
      response = await response.json()
    //   console.log(response);
      displayingre(response.meals.slice(0,20))
  
  }

Ingredients.addEventListener('click',getingre)

const displayingre = function (arr) {
    searchContainer.innerHTML =''
    c=''
    for (let i = 0; i < arr.length; i++) {
        c+=`<div onclick=ingreMeals('${arr[i].strIngredient}') role="button" class="text-center  shadow col-md-3">
        <i class="fa-solid text-dark  fa-city fa-3x"></i>
        <h2>${arr[i].strIngredient}</h2>
        <p>${arr[i].strDescription.split(' ').slice(0,30).join(' ')}</p>
    </div>`
    }
    rowData.innerHTML= c
}


// category meals
const categoryMeals = async function (category) {
    let response =  await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`)
    response = await response.json()
    // console.log(response.meals);

    displayMeals(response.meals)
}



// Area meals
const areaMeals = async function (area) {
    let response =  await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    // console.log(response.meals);

    displayMeals(response.meals.slice(0,20))
}


// ingre meals
const ingreMeals = async function (ing) {
    let response =  await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    response = await response.json()
    // console.log(response.meals);

    displayMeals(response.meals)
}



// meals details
const getMealsDetails = async function (id) {
    let response =  await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      response = await response.json()
    //   console.log(response.meals[0]);
      displayDetails(response.meals[0])
  } 

  const displayDetails = function (meal) {
    searchContainer.innerHTML =''
    c=''
    
        c+=` <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}"
            alt="">
            <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
          
        </ul>

        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`
        
    
    rowData.innerHTML=c
  }


// search


const displaySearch = function(){
    searchContainer.innerHTML =`
    <div class='container' >
        
        <div class='row pt-5'>
         

            <div class="mb-3 col-md-6  ">
            <input type="search" onkeyup=searchByName(this.value) placeholder="Name" class="form-control mx-2" id="exampleInputsearch1" aria-describedby="searchHelp">
        </div>
            <div class="mb-3 col-md-6  ">
            <input type="search" maxlength='1' onkeyup=searchByLitter(this.value) placeholder="Meal first letter" class="form-control mx-2" id="exampleInputsearch1">
        </div>
        </div>
    </div>

    `
    rowData.innerHTML= ''
}
Search.addEventListener('click',displaySearch)


// validation inputs
const displayInput =function () {
    searchContainer.innerHTML=''
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup=validationInputs() type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup=validationInputs() type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup=validationInputs() type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup=validationInputs() type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup=validationInputs() type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup=validationInputs() type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="btn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> 
 `
 btn=document.getElementById('btn')
}

const validationInputs = function () {
    
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    
    

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    

    
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    

    
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    

    
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    
    
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }

    // console.log(repasswordValidation());
    
    if (nameValidation() &&
    emailValidation()&&
    phoneValidation()&&
    ageValidation()&&
    passwordValidation() &&
    repasswordValidation()){
        btn.removeAttribute('disabled')
        console.log('yes');
    }else{
        btn.setAttribute('disabled',true)
    }
}
Contact.addEventListener('click',displayInput)


function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}























/*

        // serach
        `<div class='container' >
        
        <div class='row'>
         </div>
        <div class="mb-3 col-md-6  ">
        <input type="search" placeholder="Name" class="form-control mx-2" id="exampleInputsearch1" aria-describedby="searchHelp">
    </div>
        <div class="mb-3 col-md-6  ">
        <input type="search" placeholder="Meal first letter" class="form-control mx-2" id="exampleInputsearch1">
    </div>
        </div>

    `
    // contact
    `<div class="container" id="inputs" >
    <h2 class="text-center m-5">ContacUs...</h2>
    <div class="row">
        <form class="needs-validation  ">
            <div class=" d-flex align-items-center justify-content-center  ">
              <input required="" type="text" placeholder="enter your name" class=" m-2 shadow form-control" aria-describedby="textHelp">
              <input required="" type="email" placeholder="enter your email" class=" m-2 shadow form-control" aria-describedby="textHelp">
            </div>
            <div class=" d-flex align-items-center justify-content-center ">
                <input required="" type="tel" placeholder="enter your phone" class=" m-2 shadow form-control" aria-describedby="textHelp">
                <input required="" type="number" placeholder="enter your age" class=" m-2 shadow form-control" aria-describedby="textHelp">
              </div>
              <div class=" d-flex align-items-center justify-content-center ">
                <input required="" type="password" placeholder="enter your password" class=" m-2 shadow form-control" aria-describedby="textHelp">
                <input required="" type="password" placeholder="enter your repassword" class=" m-2 shadow form-control" aria-describedby="textHelp">
              </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
    </div>
</div>`

*/



// details/////////////
 
