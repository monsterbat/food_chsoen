// ==== Get element ====
// create order list
// choose date
let createOrderListBlock = document.getElementById("createOrderListBlock")
let chooseDateBlock = document.getElementById("chooseDateBlock")
let chooseDateTitle = document.getElementById("chooseDateTitle")
let chooseDate = document.getElementById("chooseDate")
let chooseDataInput = document.getElementById("chooseDataInput")
// choose time
let chooseTimeBlock = document.getElementById("chooseTimeBlock")
let chooseTimeTitle = document.getElementById("chooseTimeTitle")
let chooseTime = document.getElementById("chooseTime")
let chooseTimeInput = document.getElementById("chooseTimeInput")
// choose store
let chooseStoreBlock = document.getElementById("chooseStoreBlock")
let chooseStoreTitle = document.getElementById("chooseStoreTitle")
let chooseStore = document.getElementById("chooseStore")
let chooseStoreDropdown = document.getElementById("chooseStoreDropdown")
// 1-3-4 Note
let createOrderNoteBlock = document.getElementById("createOrderNoteBlock")
let createOrderNoteTitle = document.getElementById("createOrderNoteTitle")
let createOrderNote = document.getElementById("createOrderNote")
let createOrderNoteInput = document.getElementById("createOrderNoteInput")
// 1-3-5 Error Message
let createOrderErroeMessage = document.getElementById("createOrderErroeMessage")
let createOrderErroeMessageContent = document.getElementById("createOrderErroeMessageContent")
// Click group 
let createOrderListSubmitBlock = document.getElementById("createOrderListSubmitBlock")
let askFoodChosen = document.getElementById("askFoodChosen")
let askFoodChosenContent = document.getElementById("askFoodChosenContent")
let createStore = document.getElementById("createStore")
let createStoreContent = document.getElementById("createStoreContent")
let orderListSubmit = document.getElementById("orderListSubmit")
let orderListSubmitContent = document.getElementById("orderListSubmitContent")
let createOrderBackGroupSubmit = document.getElementById("createOrderBackGroupSubmit")
let createOrderBackGroupSubmitContent = document.getElementById("createOrderBackGroupSubmitContent")

// ==== Create element ====
// ==== onload ====
onloadThisPage()
async function onloadThisPage(){
    let userApiData = await userStatus();
    userId = userApiData.data.userId;
    userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();
    pageTitleContent.textContent = "建立團購";
    let groupApiData = await groupStatus(urlGroupName);
    groupApiData = groupApiData.group
    let groupManager = ""
    console.log("groupApiData",groupApiData)
    for (i=0;i<Object.keys(groupApiData).length;i++){
        if (groupApiData[i].groupName == urlGroupName){            
            groupManager = groupApiData[i].groupManager;
            // return groupManager
        }
    }
    let storeApiDataAll = await storeApiGet(urlGroupName);
    let storeApiDataList = storeApiDataAll.store
    showStoreList(storeApiDataList)
    
}



// ==== create event listener ====
console.log("createStore",createOrderListBlock)
createStore.addEventListener("click",createStoreClick)
orderListSubmit.addEventListener("click",orderListSubmitClick)
createOrderBackGroupSubmit.addEventListener("click",createOrderBackGroupSubmitClick)

// ==== Function ====
async function showStoreList(storeApiDataList){
    console.log("storeApiData",storeApiDataList)
    createOptionElement(chooseStoreDropdown,`chooseStore`,"chooseStore","請選擇","appendChild","")
    for (i=0;i<Object.keys(storeApiDataList).length;i++){
        storeApiDataStoreName = storeApiDataList[i].storeName
        createOptionElement(chooseStoreDropdown,`chooseStore${i}`,"chooseStore",storeApiDataStoreName,"appendChild",storeApiDataStoreName)

    }
}

async function createStoreClick(){
    window.location.href = `/group/${urlGroupName}/create_store`
}
async function orderListSubmitClick(){
    let chooseDataInputValue = chooseDataInput.value
    let chooseTimeInputValue = chooseTimeInput.value
    let stopTime = chooseDataInputValue+"-"+chooseTimeInputValue
    // var select = document.querySelector("select");
    let storeNameValue = chooseStoreDropdown.options[chooseStoreDropdown.selectedIndex].value;
    let createOrderNoteInputValue = createOrderNoteInput.value
    console.log("chooseDataInputValue",chooseDataInputValue)
    console.log("chooseTimeInputValue",chooseTimeInputValue)
    console.log("storeNameValue",storeNameValue)
    if (chooseDataInputValue == "" || chooseTimeInputValue == "" || storeNameValue == ""){
        createOrderErroeMessageContent.textContent = "請選擇店家訂購日期及截止時間"
    }
    else{
        let data = {
            "groupName":urlGroupName,
            "userName":userName,
            "storeName":storeNameValue,
            "stopTime":stopTime,
            "orderListNote":createOrderNoteInputValue
        }
        orderListPostResult = await orderListApiPost(data)
        if (orderListPostResult.ok == true){
            let urlStopTime = "stopTime:"+stopTime
            console.log("check2")
            window.location.href = `/group/${urlGroupName}/${storeNameValue}/${urlStopTime}`
        }
        else{
            console.log("check3")
            resultMessage = orderListPostResult.message
            createOrderErroeMessageContent.textContent = resultMessage
        }
    
    }

    
}

async function createOrderBackGroupSubmitClick(){
    window.location.href = `/group/${urlGroupName}`
}