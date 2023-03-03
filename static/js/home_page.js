// ==== Get element ====
// header
let topFreezeBackgroung = document.getElementById("topFreezeBackgroung");
let topTitle = document.getElementById("topTitle");
let topTitleText = document.getElementById("topTitleText");
// 0 Enter web
let enterWebBlock = document.getElementById("enterWebBlock");
let homePageImgBlock = document.getElementById("homePageImgBlock");
let enterSignin = document.getElementById("enterSignin");
let enterSignup = document.getElementById("enterSignup");
let helloUser = document.getElementById("helloUser");
let helloUserWelcome1 = document.getElementById("helloUserWelcome1");
let helloUserWelcome2 = document.getElementById("helloUserWelcome2");
let gotoStart = document.getElementById("gotoStart");
// 1 Signin
let signinPage = document.getElementById("signinPage");
let signinPageTopBlock = document.getElementById("signinPageTopBlock");
let signinPageTopErrorContent = document.getElementById("signinPageTopErrorContent");
let signinEmailBlock = document.getElementById("signinEmailBlock");
let signinEmailInput = document.getElementById("signinEmailInput");
let signinEmail = document.getElementById("signinEmail");
let signinPasswordBlock = document.getElementById("signinPasswordBlock");
let signinPasswordInput = document.getElementById("signinPasswordInput");
let signinPassword = document.getElementById("signinPassword");
let signinButton = document.getElementById("signinButton");
let gotoSignupButton = document.getElementById("gotoSignupButton");
// 2 Signup
let signupPage = document.getElementById("signupPage");
let signupPageTopBlock = document.getElementById("signupPageTopBlock");
let signupPageTopErrorContent = document.getElementById("signupPageTopErrorContent");
let signupNameBlock = document.getElementById("signupNameBlock");
let signupNameInput = document.getElementById("signupNameInput");
let signupName = document.getElementById("signupName");
let signupEmailBlock = document.getElementById("signupEmailBlock");
let signupEmailInput = document.getElementById("signupEmailInput");
let signupEmail = document.getElementById("signupEmail");
let signupPasswordBlock = document.getElementById("signupPasswordBlock");
let signupPasswordInput = document.getElementById("signupPasswordInput");
let signupPassword = document.getElementById("signupPassword");
let signupButton = document.getElementById("signupButton");
let gotoSigninButton = document.getElementById("gotoSigninButton");

// ==== Url list ====


// ==== onload ===
helloUser.style.display = "none";
signinPage.style.display = "none";
signupPage.style.display = "none";
homePageShow();

// ==== create event listener ====
// Signin and sign up page
enterSignin.addEventListener("click",displaySignin);
gotoSigninButton.addEventListener("click",displaySignin);
enterSignup.addEventListener("click",displaySignup);
gotoSignupButton.addEventListener("click",displaySignup);
// Signin and sign up and star
signinButton.addEventListener("click",signin);
signupButton.addEventListener("click",signup);
gotoStart.addEventListener("click",start);

// ==== Function ====
// Signin or not
async function homePageShow(){
    await fetch(`/api/user`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        if(data.data == null || data.error == true){
            enterSignin.style.display = "none";
            enterSignup.style.display = "none";
            enterWebBlock.style.display = "block";
            enterSignin.style.display = "block";
            enterSignup.style.display = "block";
            gotoStart.style.display = "none";
            helloUserWelcome1.style.display = "flex";
            helloUserWelcome2.style.display = "flex";
        }
        else{
            enterSignin.style.display = "none";
            enterSignup.style.display = "none";
            enterWebBlock.style.display = "block";
            enterSignin.style.display = "none";
            enterSignup.style.display = "none";
            helloUser.style.display = "block";
            gotoStart.style.display = "block";
            helloUserWelcome1.style.display = "none";
            helloUserWelcome2.style.display = "none";
        };
    })
};
// Display
function displaySignin(){
    signinPage.style.display = "block";
    signupPage.style.display = "none";
    enterWebBlock.style.display = "none";
};
function displaySignup(){
    signinPage.style.display = "none";
    signupPage.style.display = "block";
    enterWebBlock.style.display = "none";
};
function displayHomePage(){
    signinPage.style.display = "none";
    signupPage.style.display = "none"; 
    enterWebBlock.style.display = "block";
};
function signinErrorHint(){
    signinPageTopErrorContent.style.display = "block";
};
function signupErrorHint(){
    signupPageTopErrorContent.style.display = "block";
};
// signin and signup and star
async function signin(){
    let signinEmailValue = signinEmail.value;
    let signinPasswordValue = signinPassword.value;
    let data = {
        "userEmail":signinEmailValue,
        "userPassword":signinPasswordValue
    };
    await fetch(`/api/user`,{
        method:"PUT",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        if(data.ok == true){
            window.location.href = "/group";
        };
        if(data.error == true){
            signinPageTopErrorContent.style.display = "block";
            signinPageTopErrorContent.textContent = data.message;
        };
    })
};
async function signup(){
    let signupNameValue = signupName.value;
    let signupEmailValue = signupEmail.value;
    let signupPasswordValue = signupPassword.value;
    let data = {
        "userName":signupNameValue,
        "userEmail":signupEmailValue,
        "userPassword":signupPasswordValue
    };
    if (signupNameValue == "" || signupEmailValue == "" || signupPasswordValue == ""){
        signupPageTopErrorContent.textContent = "輸入項目請勿為空";
    }
    else{
        await fetch(`/api/user`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:new Headers({
                "Content-Type":"application/json"
            })
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.ok == true){
                homePageShow();
            };
            if(data.error == true){
                signupPageTopErrorContent.style.display = "block";
                signupPageTopErrorContent.textContent = data.message;
            };
        })
    };
    location.reload();
};
function start(){
    window.location.href = "/group";
};
