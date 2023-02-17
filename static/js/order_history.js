// ==== Get element ====
let orderHistoryBlock = document.getElementById("orderHistoryBlock");
let orderHistoryTitle = document.getElementById("orderHistoryTitle");
let orderHistoryListBlock = document.getElementById("orderHistoryListBlock");
let backToGroupButton = document.getElementById("backToGroupButton");
// ==== Create element ====
// ==== onload ====
onloadOrderHistoryPage()
// ==== create event listener ====
backToGroupButton.addEventListener("click",backToGroupButtonClick);
// ==== Function ====

async function onloadOrderHistoryPage(){
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    currentUserName = userName;
    currentUserEmail = userApiData.data.userEmail;
    urlGroupName = getGroupNameFromUrl();
    pageTitleContent.textContent = urlGroupName;
    let groupApiData = await groupStatus(urlGroupName,"alive");
    groupApiData = groupApiData.group;
    groupId = groupApiData.groupId;
    let groupManager = "";
    for (i=0;i<Object.keys(groupApiData).length;i++){
        if (groupApiData[i].groupName == urlGroupName){            
            groupManager = groupApiData[i].groupManager;
            // return groupManager
        };
    };
    orderHistoryListShow();
}

async function orderHistoryListShow(){
    let orderListHistoryApiGetResult = await orderListHistoryApiGet(urlGroupName,"","","finish")
    let orderListData = orderListHistoryApiGetResult.orderList
    createDivElement(orderHistoryListBlock,`orderHistoryListBlockBlock`, "contentPositionCenter", null, "appendChild");
    for(i=0;i<Object.keys(orderListData).length;i++){
        let orderListId = orderListData[i]["orderListId"];
        let storeName = orderListData[i]["storeName"];
        let orderUserName = orderListData[i]["orderUserName"];
        let stopTime = orderListData[i]["stopTime"];
        let stopTimeUrl = "stopTime:"+stopTime;
        let orderListNote = orderListData[i]["orderListNote"];
        let stopTimeArray = stopTime.split('-');
        let stopTimeDate = stopTimeArray[1]+"/"+stopTimeArray[2];
        let stopTimeTime = stopTimeArray[3];
        let orderListContent = stopTimeDate+"  "+stopTimeTime+"  "+storeName;
        createAElement(orderHistoryListBlockBlock,`orderHistoryList${i}`, "buttonFormat groupBGC", null, "appendChild", hrefContent = `/group/${urlGroupName}/${storeName}/${stopTimeUrl}/finish`);
        createDivElement(eval(`orderHistoryList${i}`), `orderHistoryListContent${i}`, "buttonContent", orderListContent);
    };
}

function backToGroupButtonClick(){
    window.location = `/group/${urlGroupName}`;
}