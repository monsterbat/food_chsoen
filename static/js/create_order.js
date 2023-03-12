// ==== Get element ====
// create order list
// choose date
let createOrderListBlock = document.getElementById("createOrderListBlock");
let chooseDateBlock = document.getElementById("chooseDateBlock");
let chooseDateTitle = document.getElementById("chooseDateTitle");
let chooseDate = document.getElementById("chooseDate");
let chooseDataInput = document.getElementById("chooseDataInput");
// choose time
let chooseTimeBlock = document.getElementById("chooseTimeBlock");
let chooseTimeTitle = document.getElementById("chooseTimeTitle");
let chooseTime = document.getElementById("chooseTime");
let chooseTimeInput = document.getElementById("chooseTimeInput");
// choose store
let chooseStoreBlock = document.getElementById("chooseStoreBlock");
let chooseStoreTitle = document.getElementById("chooseStoreTitle");
let chooseStore = document.getElementById("chooseStore");
let chooseStoreDropdown = document.getElementById("chooseStoreDropdown");
// 1-3-4 Note
let createOrderNoteBlock = document.getElementById("createOrderNoteBlock");
let createOrderNoteTitle = document.getElementById("createOrderNoteTitle");
let createOrderNote = document.getElementById("createOrderNote");
let createOrderNoteInput = document.getElementById("createOrderNoteInput");
// 1-3-5 Error Message
let createOrderErroeMessage = document.getElementById("createOrderErroeMessage");
let createOrderErroeMessageContent = document.getElementById("createOrderErroeMessageContent");
// Click group 
let createOrderListSubmitBlock = document.getElementById("createOrderListSubmitBlock");
let askFoodChosen = document.getElementById("askFoodChosen");
let askFoodChosenContent = document.getElementById("askFoodChosenContent");
let orderListSubmit = document.getElementById("orderListSubmit");
let orderListSubmitContent = document.getElementById("orderListSubmitContent");
let createOrderBackGroupSubmit = document.getElementById("createOrderBackGroupSubmit");
let createOrderBackGroupSubmitContent = document.getElementById("createOrderBackGroupSubmitContent");

// ==== Create element ====
// ==== onload ====
onloadThisPage()
async function onloadThisPage(){
    let userApiData = await userStatus();
    userId = userApiData.data.userId;
    userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();

    userCheckInGroup(urlGroupName);
    pageTitleContent.textContent = "建立團購";
    let groupApiData = await groupStatus(urlGroupName,"alive");
    groupApiData = groupApiData.group;
    let groupManager = "";
    for (i=0;i<Object.keys(groupApiData).length;i++){
        if (groupApiData[i].groupName == urlGroupName){            
            groupManager = groupApiData[i].groupManager;
            // return groupManager
        };
    };
    let storeApiDataAll = await storeApiGet(urlGroupName);
    let storeApiDataList = storeApiDataAll.store;
    showStoreList(storeApiDataList);
};

// ==== create event listener ====
orderListSubmit.addEventListener("click",orderListSubmitClick);
createOrderBackGroupSubmit.addEventListener("click",createOrderBackGroupSubmitClick);
askFoodChosen.addEventListener("click",askFoodChosenClick);
// ==== Function ====
async function showStoreList(storeApiDataList){
    createOptionElement(chooseStoreDropdown,`chooseStore`,"chooseStore","請選擇","appendChild","");
    for (i=0;i<Object.keys(storeApiDataList).length;i++){
        storeApiDataStoreName = storeApiDataList[i].storeName;
        createOptionElement(chooseStoreDropdown,`chooseStore${i}`,"chooseStore",storeApiDataStoreName,"appendChild",storeApiDataStoreName);

    };
};
function askFoodChosenClick(){
    window.location.href = `/group/${urlGroupName}/foodChsoen`;
};


async function orderListSubmitClick(){
    let chooseDataInputValue = chooseDataInput.value;
    let chooseTimeInputValue = chooseTimeInput.value;
    let stopTime = chooseDataInputValue+"-"+chooseTimeInputValue;
    let storeNameValue = chooseStoreDropdown.options[chooseStoreDropdown.selectedIndex].value;
    let createOrderNoteInputValue = createOrderNoteInput.value;
    if (chooseDataInputValue == "" || chooseTimeInputValue == "" || storeNameValue == ""){
        createOrderErroeMessageContent.textContent = "請選擇店家訂購日期及截止時間"
    }
    else{
        let data = {
            "groupName":urlGroupName,
            // "userName":userName,
            "storeName":storeNameValue,
            "stopTime":stopTime,
            "orderListNote":createOrderNoteInputValue
        };
        orderListPostResult = await orderListApiPost(data);
        if (orderListPostResult.ok == true){
            let urlStopTime = "stopTime:"+stopTime;
            window.location.href = `/group/${urlGroupName}/store/${storeNameValue}/${urlStopTime}/alive`;
        }
        else{
            resultMessage = orderListPostResult.message;
            createOrderErroeMessageContent.textContent = resultMessage;
        };    
    };    
};

async function createOrderBackGroupSubmitClick(){
    window.location.href = `/group/${urlGroupName}`;
};