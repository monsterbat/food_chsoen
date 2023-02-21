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
    pageTitleContent.textContent = "詢問強森";
    let groupApiData = await groupStatus(urlGroupName,"alive");
    
}


function chooseByFateButtonClick(){
    window.location.href = `/group/${urlGroupName}/create_order/ask_foodChsoen/by_fate`;
};
function chooseByClassifyButtonClick(){
    window.location.href = `/group/${urlGroupName}/create_order/ask_foodChsoen/by_classify`;
};
function backToCreateOrderButtonClick(){
    window.location.href = `/group/${urlGroupName}/create_order`;
};