// ==== Get element ====
let checkStoreBlock = document.getElementById("checkStoreBlock");
let checkStoreListBlock = document.getElementById("checkStoreListBlock");
let createStoreButton = document.getElementById("createStoreButton");
let backToGroupEditButton = document.getElementById("backToGroupEditButton");
let checkStoreTitle = document.getElementById("checkStoreTitle");

// ==== Create element ====
// ==== onload ====
onloadStoreCheckPage();
// ==== create event listener ====
createStoreButton.addEventListener("click",createStoreButtonClick);
backToGroupEditButton.addEventListener("click",backToGroupEditButtonClick);
// ==== Function ====

async function onloadStoreCheckPage(){
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();
    pageTitleContent.textContent = "查看店家";
    let groupApiData = await groupStatus(urlGroupName,"alive");
    groupApiData = groupApiData.group;
    
    for (i=0;i<Object.keys(groupApiData).length;i++){
        if (groupApiData[i].groupName == urlGroupName){            
            groupId = groupApiData[i].groupId;
            // return groupManager
        };
    };
    let storeApiDataAll = await storeApiGet(urlGroupName);
    let storeApiDataList = storeApiDataAll.store;
    console.log("storeApiDataList",storeApiDataList)
    showStoreListAtCheckStore(storeApiDataList);
};

async function showStoreListAtCheckStore(storeApiDataList){
    createDivElement(checkStoreListBlock,"checkStoreListBlockBlock","contentPositionCenter margin",null,"appendChild");    
    if (storeApiDataList == null){
        checkStoreTitle.textContent = "點選上方創建新店家";
    }
    else{
        // Title
        checkStoreTitle.textContent = "已建立店家";
        //         
        for (let i=0;i<Object.keys(storeApiDataList).length;i++){
            let storeNameShow = storeApiDataList[i].storeName;
            createAElement(checkStoreListBlockBlock,`showAllStoreList_${i}`,"buttonFormat groupBGC", null, "prepend",hrefContent = `/group/${urlGroupName}/store_edit/${storeNameShow}`);
            createDivElement(eval(`showAllStoreList_${i}`), `showAllStoreListContent_${i}`, "buttonContent", storeNameShow);
        };
    };
};

function createStoreButtonClick(){
    window.location.href = `/group/${urlGroupName}/create_store`;
}

function backToGroupEditButtonClick(){
    window.location.href = `/group/${urlGroupName}`;
}