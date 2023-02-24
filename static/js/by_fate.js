// ==== Get element ====
// 1-3
let drawLotsBlock = document.getElementById("drawLotsBlock");
let drawLotsAnimationBlcok = document.getElementById("drawLotsAnimationBlcok");
let settingDrawLotsConditionButton = document.getElementById("settingDrawLotsConditionButton");
let goDrawLotsButton = document.getElementById("goDrawLotsButton");
let backToAskFoodChosenButton = document.getElementById("backToAskFoodChosenButton");
// 1-4
let settingDrawLotsConditionBlock = document.getElementById("settingDrawLotsConditionBlock");

let classifyTypeBlock = document.getElementById("classifyTypeBlock");
let classifyTypeSelect = document.getElementById("classifyTypeSelect");
let classifyTypeSelectDropdown = document.getElementById("classifyTypeSelectDropdown");
let recentlyEatBlock = document.getElementById("recentlyEatBlock");
let recentlyEatSelect = document.getElementById("recentlyEatSelect");

let recentlyNotEatBlock = document.getElementById("recentlyNotEatBlock");
let recentlyNotEatSelect = document.getElementById("recentlyNotEatSelect");

let priceRangeBlock = document.getElementById("priceRangeBlock");
let priceRangeSelect = document.getElementById("priceRangeSelect");

let settingDrawLotsConditionDoneButton = document.getElementById("settingDrawLotsConditionDoneButton");
let backToDrawLotsButton = document.getElementById("backToDrawLotsButton");
// 1-5
let foodChosenResultBlock = document.getElementById("foodChosenResultBlock");
let foodChosenResultImage = document.getElementById("foodChosenResultImage");
let drawLostAgainButton = document.getElementById("drawLostAgainButton");
let confirmStoreToOrderButton = document.getElementById("confirmStoreToOrderButton");
let backToDrawLotsButton2 = document.getElementById("backToDrawLotsButton2");


// ==== Create element ====


// ==== onload ====
let storeDrawLotsApiGetResult
onloadByFatePage();

// ==== create event listener ====
// 1-3
settingDrawLotsConditionButton.addEventListener("click",settingDrawLotsConditionButtonClick);
goDrawLotsButton.addEventListener("click",goDrawLotsButtonClick);
backToAskFoodChosenButton.addEventListener("click",backToAskFoodChosenButtonClick);
// 1-4
settingDrawLotsConditionDoneButton.addEventListener("click",settingDrawLotsConditionDoneButtonClick);
backToDrawLotsButton.addEventListener("click",backToDrawLotsButtonClick);
// 1-5
drawLostAgainButton.addEventListener("click",drawLostAgainButtonClick);
confirmStoreToOrderButton.addEventListener("click",confirmStoreToOrderButtonClick);
backToDrawLotsButton2.addEventListener("click",backToDrawLotsButton2Click);
// ==== Function ====
 
async function onloadByFatePage(){
    ByFateNoneDisplay();
    drawLotsBlock.style.display = "flex";
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    currentUserEmail = userApiData.data.userEmail;
    urlGroupName = getGroupNameFromUrl();
    storeDrawLotsApiGetResult = await storeDrawLotsApiGet(urlGroupName)
    storeDrawLotsStoreList = storeDrawLotsApiGetResult.store
    console.log("storeDrawLotsApiGetResult",storeDrawLotsStoreList)
    let storeTypeSortOutData = await findStoreType(storeDrawLotsStoreList)
    console.log("storeTypeSortOutData",storeTypeSortOutData)
    showStoreList(storeTypeSortOutData)
}

function ByFateNoneDisplay(){
    // 1-3
    drawLotsBlock.style.display = "none";
    // 1-4
    settingDrawLotsConditionBlock.style.display = "none";
    // 1-5
    foodChosenResultBlock.style.display = "none";
}
// 
async function findStoreType(dataList){
    console.log("dataList",dataList)
    const sortOutData = dataList.reduce((acc, curr) => {
        let found = false;
        for (let i = 0; i < acc.length; i++) {
        if (acc[i].storeType === curr.storeType) {
            acc[i].storeItems.push({
                storeId:curr.storeId,
                storeName: curr.storeName,
                storeaddress: curr.storeaddress,
                storePhoneNumber: curr.storePhoneNumber,
                storePriceRange: curr.storePriceRange,
                storeOpenTime: curr.storeOpenTime,
                storeDeliveryCondition: curr.storeDeliveryCondition,
                storeOrderTime: curr.storeOrderTime,
                storeOrderFrequence: curr.storeOrderFrequence,
                storeDistance: curr.storeDistance,
                storeLatestData: curr.storeLatestData,
                storeNote: curr.storeNote,
            });
            found = true;
            break;
        }
        }
        if (!found) {
        acc.push({
            storeType: curr.storeType,
            storeItems: [{
                storeId:curr.storeId,
                storeName: curr.storeName,
                storeaddress: curr.storeaddress,
                storePhoneNumber: curr.storePhoneNumber,
                storePriceRange: curr.storePriceRange,
                storeOpenTime: curr.storeOpenTime,
                storeDeliveryCondition: curr.storeDeliveryCondition,
                storeOrderTime: curr.storeOrderTime,
                storeOrderFrequence: curr.storeOrderFrequence,
                storeDistance: curr.storeDistance,
                storeLatestData: curr.storeLatestData,
                storeNote: curr.storeNote,
            }]
        });
        }
        return acc;
    }, []);    
    sortOutData.sort((a, b) => {
        const aType = a.storeType ? a.storeType.toLowerCase() : '';
        const bType = b.storeType ? b.storeType.toLowerCase() : '';
        if (aType === '' || aType === null) {
        return 1;
        }
        if (bType === '' || bType === null) {
        return -1;
        }
        if (aType < bType) {
        return -1;
        }
        if (aType > bType) {
        return 1;
        }
        return 0;
    });    
    for (let i = 0; i < sortOutData.length; i++) {
        sortOutData[i].storeItems.sort((a, b) => {
        const aName = a.storeName ? a.storeName.toLowerCase() : '';
        const bName = b.storeName ? b.storeName.toLowerCase() : '';
        if (aName === '' || aName === null) {
            return 1;
        }
        if (bName === '' || bName === null) {
            return -1;
        }
        if (aName < bName) {
            return -1;
        }
        if (aName > bName) {
            return 1;
        }
        return 0;
        });
    }
    return sortOutData
}

// 1-3
async function settingDrawLotsConditionButtonClick(){
    ByFateNoneDisplay();
    settingDrawLotsConditionBlock.style.display = "flex";
}

async function goDrawLotsButtonClick(){
    // ByFateNoneDisplay();
    // foodChosenResultBlock.style.display = "flex";
}


// 1-4
// Show type drop down list
async function showStoreList(storeTypeSortOutData){
    createOptionElement(classifyTypeSelectDropdown,`chooseStoreType`,"","請選擇","appendChild","");
    console.log("storeTypeSortOutData",storeTypeSortOutData)
    for (i=0;i<Object.keys(storeTypeSortOutData).length;i++){
        let storeTypeSortOutDataLs = storeTypeSortOutData[i].storeType;
        if (storeTypeSortOutDataLs == ""){
            storeTypeSortOutDataLs = "(未分類)";
        }
        createOptionElement(classifyTypeSelectDropdown,`chooseStoreType${i}`,"",storeTypeSortOutDataLs,"appendChild",storeTypeSortOutDataLs);
    };
};

async function settingDrawLotsConditionDoneButtonClick(){
    ByFateNoneDisplay();
    drawLotsBlock.style.display = "flex";
}

async function backToDrawLotsButtonClick(){
    ByFateNoneDisplay();
    drawLotsBlock.style.display = "flex";
}

async function classifyTypeSelectShow(){

}
// 1-5
async function drawLostAgainButtonClick(){
    console.log("again")
}

async function confirmStoreToOrderButtonClick(){
    console.log("confirm")
}
async function backToDrawLotsButton2Click(){
    ByFateNoneDisplay();
    drawLotsBlock.style.display = "flex";
}