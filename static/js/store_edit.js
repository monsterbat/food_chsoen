// ==== Get element ====

let checkAndEditStoreBlock = document.getElementById("checkAndEditStoreBlock");
let checkAndEditStore = document.getElementById("checkAndEditStore");

let createStoreNameInput= document.getElementById("createStoreNameInput");
let createStoreNameShow= document.getElementById("createStoreNameShow");
let createStoreName= document.getElementById("createStoreName");

let createStoreAddressBlock= document.getElementById("createStoreAddressBlock");
let createStoreAddressShow= document.getElementById("createStoreAddressShow");
let reateStoreAddress= document.getElementById("reateStoreAddress");

let createStorePhoneBlock= document.getElementById("createStorePhoneBlock");
let createStorePhoneInputShow = document.getElementById("createStorePhoneInputShow");
let createStorePhone= document.getElementById("createStorePhone");

let createStoreOpenTimeBlock = document.getElementById("createStoreOpenTimeBlock");
let createStoreOpenTimeShow = document.getElementById("createStoreOpenTimeShow");
let createStoreOpenTime = document.getElementById("createStoreOpenTime");

let createStoreTypeBlock = document.getElementById("createStoreTypeBlock");
let createStoreTypeShow = document.getElementById("createStoreTypeShow");
let createStoreType = document.getElementById("createStoreType");

let createStoreDeliveryBlock = document.getElementById("createStoreDeliveryBlock");
let createStoreDeliveryShow = document.getElementById("createStoreDeliveryShow");
let createStoreDelivery = document.getElementById("createStoreDelivery");

let createStoreNoteBlock = document.getElementById("createStoreNoteBlock");
let createStoreNoteShow = document.getElementById("createStoreNoteShow");
let createStoreNote = document.getElementById("createStoreNote");

let createStoreErroeMessageContent = document.getElementById("createStoreErroeMessageContent");

let editStoreButton = document.getElementById("editStoreButton");
let finishEditStoreButton = document.getElementById("finishEditStoreButton");
let deleteStoreButton = document.getElementById("deleteStoreButton");
let checkMenuButton = document.getElementById("checkMenuButton");
let createStroeBackGroupSubmit = document.getElementById("createStroeBackGroupSubmit");

// Make sure to delete
let deleteConfirmBlock = document.getElementById("deleteConfirmBlock");
let deleteConfirmButton = document.getElementById("deleteConfirmButton");
let deleteConfirmNoButton = document.getElementById("deleteConfirmNoButton");
let deleteConfirmYesButton = document.getElementById("deleteConfirmYesButton");


// ==== Create element ====
// ==== onload ====
deleteStoreButton.style.display = "none";
deleteConfirmBlock.style.display = "none";
onloadEditStorePage();

// ==== create event listener ====
editStoreButton.addEventListener("click",editStoreButtonClick);
finishEditStoreButton.addEventListener("click",finishEditStoreButtonClick);
checkMenuButton.addEventListener("click",checkMenuButtonClick);
createStroeBackGroupSubmit.addEventListener("click",createStroeBackGroupSubmitClick);
deleteStoreButton.addEventListener("click",deleteStoreButtonClick);
deleteConfirmYesButton.addEventListener("click",deleteConfirmYesButtonClick);
deleteConfirmNoButton.addEventListener("click",deleteConfirmNoButtonClick);
// ==== Function ====


async function onloadEditStorePage(){
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();
    userCheckInGroup(urlGroupName);
    pageTitleContent.textContent = "編輯查看店家";
    let groupApiData = await groupStatus(urlGroupName,"alive");
    groupApiData = groupApiData.group;
    
    for (i=0;i<Object.keys(groupApiData).length;i++){
        if (groupApiData[i].groupName == urlGroupName){            
            groupId = groupApiData[i].groupId;
            // return groupManager
        };
    };
    urlStoreName = getStoreNameFromUrl();
    console.log("urlStoreName",urlStoreName)
    let storeOneInfoGetResult = await storeOneInfoGet(urlGroupName,urlStoreName);
    console.log("storeOneInfoGetResult",storeOneInfoGetResult)
    inputBlockNoneDisplay();
    showStoreListAtStoreEdit(storeOneInfoGetResult);
    
};

function inputBlockNoneDisplay(){
    finishEditStoreButton.style.display = "none";
    editStoreButton.style.display = "flex";

    createStoreName.style.display = "none";
    createStoreAddress.style.display = "none";
    createStorePhone.style.display = "none";
    createStoreOpenTime.style.display = "none";
    createStoreType.style.display = "none";
    createStoreDelivery.style.display = "none";
    createStoreNote.style.display = "none";
    createStoreNameShow.style.display = "flex";
    createStoreAddressShow.style.display = "flex";
    createStorePhoneInputShow.style.display = "flex";
    createStoreOpenTimeShow.style.display = "flex";
    createStoreTypeShow.style.display = "flex";
    createStoreDeliveryShow.style.display = "flex";
    createStoreNoteShow.style.display = "flex";
}
function inputBlockDisplay(){
    finishEditStoreButton.style.display = "flex";
    editStoreButton.style.display = "none";
    
    createStoreName.style.display = "flex";
    createStoreAddress.style.display = "flex";
    createStorePhone.style.display = "flex";
    createStoreOpenTime.style.display = "flex";
    createStoreType.style.display = "flex";
    createStoreDelivery.style.display = "flex";
    createStoreNote.style.display = "flex";
    createStoreNameShow.style.display = "none";
    createStoreAddressShow.style.display = "none";
    createStorePhoneInputShow.style.display = "none";
    createStoreOpenTimeShow.style.display = "none";
    createStoreTypeShow.style.display = "none";
    createStoreDeliveryShow.style.display = "none";
    createStoreNoteShow.style.display = "none";
}
async function showStoreListAtStoreEdit(storeOneInfoGetResult){
    let storeNameShow = storeOneInfoGetResult.storeName;
    let storeaddressShow = storeOneInfoGetResult.storeaddress;
    let storePhoneNumberShow = storeOneInfoGetResult.storePhoneNumber;
    let storeTypeShow = storeOneInfoGetResult.storeType;
    let storePriceRangeShow = storeOneInfoGetResult.storePriceRange;
    let storeOpenTimeShow = storeOneInfoGetResult.storeOpenTime;
    let storeDeliveryConditionShow = storeOneInfoGetResult.storeDeliveryCondition;
    let storeOrderTimeShow = storeOneInfoGetResult.storeOrderTime;
    let storeNoteShow = storeOneInfoGetResult.storeNote;
    createStoreNameShow.textContent = storeNameShow;
    createStoreAddressShow.textContent = storeaddressShow;
    createStorePhoneInputShow.textContent = storePhoneNumberShow;
    createStoreOpenTimeShow.textContent = storeOpenTimeShow;
    createStoreTypeShow.textContent = storeTypeShow;
    createStoreDeliveryShow.textContent = storeDeliveryConditionShow;
    createStoreNoteShow.textContent = storeNoteShow;

    createStoreName.value = storeNameShow;
    createStoreAddress.value = storeaddressShow;
    createStorePhone.value = storePhoneNumberShow;
    createStoreOpenTime.value = storeOpenTimeShow;
    createStoreType.value = storeTypeShow;
    createStoreDelivery.value = storeDeliveryConditionShow;
    createStoreNote.value = storeNoteShow;
}

function editStoreButtonClick(){
    inputBlockDisplay();
    deleteStoreButton.style.display = "flex";
    checkMenuButton.style.display = "none";
}

async function deleteStoreButtonClick(){
    let orderListApiGetResult = await orderListCheckStoreApiGet(urlGroupName,urlStoreName,"alive")

    if (orderListApiGetResult.result == "no data"){
        blockScreenFilter.style.display = "flex";
        deleteConfirmBlock.style.display = "flex";
    }
    else{
        orderListorderConflict = orderListApiGetResult.result;
        deleteStoreButtonContent.textContent = "有 "+orderListorderConflict+" 團購未結單，無法刪除"
        console.log(orderListorderConflict)
    }


}

function deleteConfirmNoButtonClick(){
    blockScreenFilter.style.display = "none";
    deleteConfirmBlock.style.display = "none";
}

async function deleteConfirmYesButtonClick(){
    let storePatchData = {
        "groupName":urlGroupName,
        "storeName":urlStoreName,
        "storeNewName":null,
        "storeNewaddress":null,
        "storeNewPhoneNumber":null,
        "storeNewType":null,
        "storeNewOpenTime":null,
        "storeNewDeliveryCondition":null,
        "storeNewStatus":"stop",
        "storeNote":null,
    }
    let storeApiPatchResult = await storeApiPatch(storePatchData);
    console.log("storeApiPatchResult",storeApiPatchResult)
    

    window.location.href = `/group/${urlGroupName}/store_check`;
}

async function finishEditStoreButtonClick(){
    let createStoreNameValue = createStoreName.value
    let createStoreAddressValue = createStoreAddress.value
    let createStorePhoneValue = createStorePhone.value
    let createStoreOpenTimeValue = createStoreOpenTime.value
    let createStoreTypeValue = createStoreType.value
    let createStoreDeliveryValue = createStoreDelivery.value
    let createStoreNoteValue = createStoreNote.value

    let storePatchData = {
        "groupName":urlGroupName,
        "storeName":urlStoreName,
        "storeNewName":createStoreNameValue,
        "storeNewaddress":createStoreAddressValue,
        "storeNewPhoneNumber":createStorePhoneValue,
        "storeNewType":createStoreTypeValue,
        "storeNewOpenTime":createStoreOpenTimeValue,
        "storeNewDeliveryCondition":createStoreDeliveryValue,
        "storeNewStatus":"alive",
        "storeNote":createStoreNoteValue,
    }
    let storeApiPatchResult = await storeApiPatch(storePatchData);
    console.log("storeApiPatchResult",storeApiPatchResult)
    window.location.href = `/group/${urlGroupName}/store_edit/${createStoreNameValue}`;
}

function checkMenuButtonClick(){
    window.location.href = `/group/${urlGroupName}/store/${urlStoreName}`;
}
function createStroeBackGroupSubmitClick(){
    window.location.href = `/group/${urlGroupName}/store_check`;
}