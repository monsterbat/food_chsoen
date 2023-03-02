// ==== Get element ====
let askFoodChosenHomePageBlock = document.getElementById("askFoodChosenHomePageBlock");
let askFoodChosenHomePageTitle = document.getElementById("askFoodChosenHomePageTitle");
let chooseByFateButton = document.getElementById("chooseByFateButton");
let chooseByClassifyButton = document.getElementById("chooseByClassifyButton");
let backToCreateOrderButton = document.getElementById("backToCreateOrderButton");

// ==== Create element ====
// ==== onload ====
onloadAskFoodChosenPage()



// ==== create event listener ====
chooseByFateButton.addEventListener("click",chooseByFateButtonClick);
chooseByClassifyButton.addEventListener("click",chooseByClassifyButtonClick);
backToCreateOrderButton.addEventListener("click",backToCreateOrderButtonClick);

// ==== Function ====
async function onloadAskFoodChosenPage(){
    let userApiData = await userStatus();
    userId = userApiData.data.userId;
    userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();
    userCheckInGroup(urlGroupName);
    pageTitleContent.textContent = "詢問強森";
    let groupApiData = await groupStatus(urlGroupName,"alive");
    
}

