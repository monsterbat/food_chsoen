// ==== Get element ====
// 1-3
let classifyConditionBlock = document.getElementById("classifyConditionBlock");
let classifyItemsBlock = document.getElementById("classifyItemsBlock");
let classifyItemsSelect = document.getElementById("classifyItemsSelect");
let recentlyEatBlock = document.getElementById("recentlyEatBlock");
let recentlyEatSelect = document.getElementById("recentlyEatSelect");
let recentlyNotEatBlock = document.getElementById("recentlyNotEatBlock");
let recentlyNotEatSelect = document.getElementById("recentlyNotEatSelect");
let priceRangeBlock = document.getElementById("priceRangeBlock");
let priceRangeSelect = document.getElementById("priceRangeSelect");
let settingDrawLotsConditionDoneButton = document.getElementById("settingDrawLotsConditionDoneButton");
let backToDrawLotsButton = document.getElementById("backToDrawLotsButton");
// 1-4
let meetTheConditionBlock = document.getElementById("meetTheConditionBlock");
let showTheMeetStoreBlock = document.getElementById("showTheMeetStoreBlock");
let chooseClassifyStoreButton = document.getElementById("chooseClassifyStoreButton");
let backConditionSettingButton = document.getElementById("backConditionSettingButton");

// ==== Create element ====


// ==== onload ====
onloadByClassifyPage();

// ==== create event listener ====
// 1-3 Button
settingDrawLotsConditionDoneButton.addEventListener("click",settingDrawLotsConditionDoneButtonClick);
backToDrawLotsButton.addEventListener("click",backToDrawLotsButtonClick);

// 1-4 Button
chooseClassifyStoreButton.addEventListener("click",chooseClassifyStoreButtonClick);
backConditionSettingButton.addEventListener("click",backConditionSettingButtonClick);
// ==== Function ====
async function onloadByClassifyPage(){
    ByClassifyNoneDisplay();
    classifyConditionBlock.style.display = "flex";
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    currentUserEmail = userApiData.data.userEmail;
    urlGroupName = getGroupNameFromUrl();

}

function ByClassifyNoneDisplay(){
    // 1-3
    classifyConditionBlock.style.display = "none";
    // 1-4
    meetTheConditionBlock.style.display = "none";
}

// 1-3
async function settingDrawLotsConditionDoneButtonClick(){
    ByClassifyNoneDisplay();
    meetTheConditionBlock.style.display = "flex";
}


// 1-4

async function chooseClassifyStoreButtonClick(){

}

async function backConditionSettingButtonClick(){
    ByClassifyNoneDisplay();
    classifyConditionBlock.style.display = "flex";
}