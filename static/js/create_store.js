// ==== Get element ====
// 1-3 create store 
let createStoreBlock = document.getElementById("createStoreBlock");
// 1-3-1 store name
let createStoreNameBlock = document.getElementById("createStoreNameBlock");
let createStoreNameTitle = document.getElementById("createStoreNameTitle");
let createStoreNameMust = document.getElementById("createStoreNameMust");
let createStoreNameInput = document.getElementById("createStoreNameInput");
let createStoreName = document.getElementById("createStoreName");
// 1-3-2 store address
let createStoreAddressBlock = document.getElementById("createStoreAddressBlock");
let createStoreAddressTitle = document.getElementById("createStoreAddressTitle");
let createStoreAddressMust = document.getElementById("createStoreAddressMust");
let createStoreAddressInput = document.getElementById("createStoreAddressInput");
let reateStoreAddress = document.getElementById("reateStoreAddress");
// 1-3-3 store phone
let createStorePhoneBlock = document.getElementById("createStorePhoneBlock");
let createStorePhoneTitle = document.getElementById("createStorePhoneTitle");
let createStorePhoneMust = document.getElementById("createStorePhoneMust");
let createStorePhoneInput = document.getElementById("createStorePhoneInput");
let createStorePhone = document.getElementById("createStorePhone");
// 1-3-4 store open time
let createStoreOpenTimeBlock = document.getElementById("createStoreOpenTimeBlock");
let createStoreOpenTimeTitle = document.getElementById("createStoreOpenTimeTitle");
let createStoreOpenTimeMust = document.getElementById("createStoreOpenTimeMust");
let createStoreOpenTimeInput = document.getElementById("createStoreOpenTimeInput");
let createStoreOpenTime = document.getElementById("createStoreOpenTime");
//  1-3-5 store type
let createStoreTypeBlock = document.getElementById("createStoreTypeBlock");
let createStoreTypeTitle = document.getElementById("createStoreTypeTitle");
let createStoreTypeMust = document.getElementById("createStoreTypeMust");
let createStoreTypeInput = document.getElementById("createStoreTypeInput");
let createStoreType = document.getElementById("createStoreType");
// 1-3-6 store delivery condition
let createStoreDeliveryBlock = document.getElementById("createStoreDeliveryBlock");
let createStoreDeliveryTitle = document.getElementById("createStoreDeliveryTitle");
let createStoreDeliveryMust = document.getElementById("createStoreDeliveryMust");
let createStoreDeliveryInput = document.getElementById("createStoreDeliveryInput");
let createStoreDelivery = document.getElementById("createStoreDelivery");
// 1-3-6*2 store note
let createStoreNoteBlock = document.getElementById("createStoreNoteBlock");
let createStoreNoteTitle = document.getElementById("createStoreNoteTitle");
let createStoreNoteMust = document.getElementById("createStoreNoteMust");
let createStoreNoteInput = document.getElementById("createStoreNoteInput");
let createStoreNote = document.getElementById("createStoreNote");
// 1-3-7 store submit
let createStoreSubmit = document.getElementById("createStoreSubmit");
let createStoreSubmitContent = document.getElementById("createStoreSubmitContent");
// Error Message
let createStoreErroeMessage = document.getElementById("createStoreErroeMessage");
let createStoreErroeMessageContent = document.getElementById("createStoreErroeMessageContent");
// 1-3-8 back submit
let createStroeBackGroupSubmit = document.getElementById("createStroeBackGroupSubmit");
let createStroeBackGroupSubmitContent = document.getElementById("createStroeBackGroupSubmitContent");

// ==== Create element ====

// ==== onload ====
onloadCreateStorePage()
async function onloadCreateStorePage(){
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();
    pageTitleContent.textContent = "建立店家";
    let groupApiData = await groupStatus(urlGroupName);
    groupApiData = groupApiData.group;
    
    for (i=0;i<Object.keys(groupApiData).length;i++){
        if (groupApiData[i].groupName == urlGroupName){            
            groupId = groupApiData[i].groupId;
            // return groupManager
        };
    };
};
// ==== create event listener ====
createStoreSubmit.addEventListener("click",createStoreSubmitClick);
createStroeBackGroupSubmit.addEventListener("click",createStroeBackGroupSubmitClick);
// ==== Function ====
async function createStoreSubmitClick(){
    let createStoreNameValue = createStoreName.value;
    let reateStoreAddressValue = reateStoreAddress.value;
    let createStorePhoneValue = createStorePhone.value;
    let createStoreOpenTimeValue = createStoreOpenTime.value;
    let createStoreTypeValue = createStoreType.value;
    let createStoreDeliveryValue = createStoreDelivery.value;
    let createStoreNoteValue = createStoreNote.value;
    

    if (createStoreNameValue == "" || createStoreNameValue ==null){
        createStoreErroeMessageContent.textContent = "請填入店家名稱";
    }
    else{
        let data = {
            "groupId":groupId,
            "groupName":urlGroupName,
            "storeName":createStoreNameValue,
            "storeAddress":reateStoreAddressValue,
            "storePhoneNumber":createStorePhoneValue,
            "storeOpenTime":createStoreOpenTimeValue,
            "storeType":createStoreTypeValue,        
            "storeDeliveryCondition":createStoreDeliveryValue,
            "storeNote":createStoreNoteValue,
            "storeStatus":"alive"
        }
        result = await storeApiPost(data);
        if (result.ok == true){
            window.location.href = `/group/${urlGroupName}/${createStoreNameValue}`;
        }
        else{
            resultMessage = result.message;
            editGroupErrorOrOkMessageContent.textContent = resultMessage;
        };
        
    };
        
};

function createStroeBackGroupSubmitClick(){
    window.location.href = `/group/${urlGroupName}/create_order`;
};