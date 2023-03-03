// ==== Get element ====
// 1-3
let drawLostAnimeBlock = document.getElementById("drawLostAnimeBlock");
let drawLotsBlock = document.getElementById("drawLotsBlock");
let drawLotsAnimationBlcok = document.getElementById("drawLotsAnimationBlcok");
let settingDrawLotsConditionButton = document.getElementById("settingDrawLotsConditionButton");
let goDrawLotsButton = document.getElementById("goDrawLotsButton");
let backToAskFoodChosenButton = document.getElementById("backToAskFoodChosenButton");

let classifyTypeBlock = document.getElementById("classifyTypeBlock");
let classifyTypeSelect = document.getElementById("classifyTypeSelect");
let classifyTypeSelectDropdown = document.getElementById("classifyTypeSelectDropdown");
// 1-5
let foodChosenResultBlock = document.getElementById("foodChosenResultBlock");
let foodChosenResultShow = document.getElementById("foodChosenResultShow");
let drawLostAgainButton = document.getElementById("drawLostAgainButton");
let confirmStoreToOrderButton = document.getElementById("confirmStoreToOrderButton");
let backToDrawLotsButton2 = document.getElementById("backToDrawLotsButton2");

// 1-5 result
let foodChosenStoreNameContent = document.getElementById("foodChosenStoreNameContent");
let foodChosenStoreTypeContent = document.getElementById("foodChosenStoreTypeContent");
let foodChosenStoreAddressContent = document.getElementById("foodChosenStoreAddressContent");
let foodChosenStorePhoneNumberContent = document.getElementById("foodChosenStorePhoneNumberContent");
let foodChosenStoreOpenTimeContent = document.getElementById("foodChosenStoreOpenTimeContent");
let foodChosenStoreDelCondiContent = document.getElementById("foodChosenStoreDelCondiContent");
let inputDateAndTimeToOrderBlock = document.getElementById("inputDateAndTimeToOrderBlock");
let chooseDataInput = document.getElementById("chooseDataInput");
let chooseTimeInput = document.getElementById("chooseTimeInput");
let createOrderNoteInput = document.getElementById("createOrderNoteInput");
let createOrderErroeMessageContent = document.getElementById("createOrderErroeMessageContent");
let orderListButton = document.getElementById("orderListButton");
let backToDrawLotsButton = document.getElementById("backToDrawLotsButton");

// ==== Create element ====


// ==== onload ====
let storeDrawLotsApiGetResult;
let storeTypeSortOutData;
let drawLotsResult;
onloadByFatePage();

// ==== create event listener ====
// 1-3
goDrawLotsButton.addEventListener("click",goDrawLotsButtonClick);
goCreateStoreButton.addEventListener("click",goCreateStoreButtonButtonClick);
backToAskFoodChosenButton.addEventListener("click",backToAskFoodChosenButtonClick);
// 1-5
drawLostAgainButton.addEventListener("click",drawLostAgainButtonClick);
confirmStoreToOrderButton.addEventListener("click",confirmStoreToOrderButtonClick);
backToDrawLotsButton2.addEventListener("click",backToDrawLotsButton2Click);


// 1-6
orderListButton.addEventListener("click",orderListButtonClick);
backToDrawLotsButton.addEventListener("click",backToDrawLotsButtonClick);
// ==== Function ====
 
async function onloadByFatePage(){
    pageTitleContent.textContent = "Food Chsoen 幫你選"
    drawLostAnimeBlock.style.display = "none";
    foodChosenNoneDisplay();
    drawLotsBlock.style.display = "flex";
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    currentUserEmail = userApiData.data.userEmail;
    urlGroupName = getGroupNameFromUrl();

    userCheckInGroup(urlGroupName);
    storeDrawLotsApiGetResult = await storeDrawLotsApiGet(urlGroupName);
    storeDrawLotsStoreList = storeDrawLotsApiGetResult.store;
    if (storeDrawLotsStoreList == null){
        classifyTypeBlock.style.display = "none";
        goDrawLotsButton.style.display = "none";
        createDivElement(drawLotsBlock,"drawLotsNoDataTitle","titleWord margin","尚未建立任何店家","prepend")

    }
    else{
        goCreateStoreButton.style.display = "none";
        let storeTypeSortOutData = await findStoreType(storeDrawLotsStoreList);
        showStoreList(storeTypeSortOutData);
    }

    
}

function foodChosenNoneDisplay(){
    // 1-3
    drawLotsBlock.style.display = "none";
    // 1-5
    foodChosenResultBlock.style.display = "none";
    // 1-6
    inputDateAndTimeToOrderBlock.style.display = "none";
}
// 
async function findStoreType(dataList){
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
// Do Draw lots
async function doDrawLots(){
    setTimeout(function(){
        drawLostAnimeBlock.style.display = "none";
        blockScreenFilter.style.display = "none";
        let storeNameValue = classifyTypeSelectDropdown.options[classifyTypeSelectDropdown.selectedIndex].value;
        console.log("storeNameValue",storeNameValue)
        console.log("storeDrawLotsApiGetResult",storeDrawLotsApiGetResult)
        let drawLotsData;
        if (storeNameValue == "請選擇"){
            drawLotsData = storeDrawLotsApiGetResult.store;
        }else if(storeNameValue == "未分類店家"){
            drawLotsData = storeTypeSortOutData[-1].storeItems;
        }else{
            drawLotsData = storeTypeSortOutData[storeNameValue].storeItems;
        };
        let drawLotsNumberLength = drawLotsData.length;
        let randomNum = Math.floor(Math.random() * (drawLotsNumberLength));

        drawLotsResult = drawLotsData[randomNum];
        foodChosenStoreNameContent.textContent = drawLotsResult.storeName;
        foodChosenStoreTypeContent.textContent = drawLotsResult.storeType;
        foodChosenStoreAddressContent.textContent = drawLotsResult.storeaddress;
        foodChosenStorePhoneNumberContent.textContent = drawLotsResult.storePhoneNumber;
        foodChosenStoreOpenTimeContent.textContent = drawLotsResult.storeOpenTime;
        foodChosenStoreDelCondiContent.textContent = drawLotsResult.storeDeliveryCondition;
    }, 6000);
    showdrawLostAnime();

}
function goCreateStoreButtonButtonClick(){
    window.location.href = `/group/${urlGroupName}/create_store`;
}
// 1-3
async function settingDrawLotsConditionButtonClick(){
    foodChosenNoneDisplay();
    settingDrawLotsConditionBlock.style.display = "flex";
}

async function goDrawLotsButtonClick(){
    doDrawLots();
    foodChosenNoneDisplay();
    foodChosenResultBlock.style.display = "flex";
}

async function backToAskFoodChosenButtonClick(){
    window.location.href = `/group/${urlGroupName}/create_order`;
}
// 1-4
// Show type drop down list
async function showStoreList(storeTypeSortOutData){
    createOptionElement(classifyTypeSelectDropdown,`chooseStoreType`,"","請選擇","appendChild","請選擇");
    for (i=0;i<Object.keys(storeTypeSortOutData).length;i++){
        let storeTypeSortOutDataLs = storeTypeSortOutData[i].storeType;
        let storeItemsQuantity = storeTypeSortOutData[i].storeItems.length;
        if (storeTypeSortOutDataLs == ""){
            storeTypeSortOutDataLs = "未分類店家";
        }
        storeTypeSortOutDataLsWithQuantity = storeTypeSortOutDataLs+"("+storeItemsQuantity+")";
        createOptionElement(classifyTypeSelectDropdown,`chooseStoreType${i}`,"",storeTypeSortOutDataLsWithQuantity,"appendChild",i);
    };
};
function showdrawLostAnime(){
    drawLostAnimeBlock.style.display = "flex";
    blockScreenFilter.style.display = "flex";
}


// 1-5
async function drawLostAgainButtonClick(){
    doDrawLots();
};

async function confirmStoreToOrderButtonClick(){
    foodChosenNoneDisplay();
    inputDateAndTimeToOrderBlock.style.display = "flex";
};

async function orderListButtonClick(){
    let chooseDataInputValue = chooseDataInput.value;
    let chooseTimeInputValue = chooseTimeInput.value;
    let stopTime = chooseDataInputValue+"-"+chooseTimeInputValue;
    let storeNameValue = drawLotsResult.storeName;
    let createOrderNoteInputValue = createOrderNoteInput.value;
    if (chooseDataInputValue == "" || chooseTimeInputValue == ""){
        createOrderErroeMessageContent.textContent = "請選擇訂購日期及截止時間";
    }
    else{
        let data = {
            "groupName":urlGroupName,
            "userName":userName,
            "storeName":storeNameValue,
            "stopTime":stopTime,
            "orderListNote":createOrderNoteInputValue
        };
        let orderListPostResult = await orderListApiPost(data);
        if (orderListPostResult.ok == true){
            let urlStopTime = "stopTime:"+stopTime;
            window.location.href = `/group/${urlGroupName}/store/${storeNameValue}/${urlStopTime}/alive`;
        }
        else{
            let resultMessage = orderListPostResult.message;
            createOrderErroeMessageContent.textContent = resultMessage;
        };
    
    };

};

async function backToDrawLotsButton2Click(){
    foodChosenNoneDisplay();
    drawLotsBlock.style.display = "flex";
};

function backToDrawLotsButtonClick(){
    foodChosenNoneDisplay();
    foodChosenResultBlock.style.display = "flex";
}