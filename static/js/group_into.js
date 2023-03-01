// ==== Get element ====
// top setting
let mainPagePopup = document.getElementById("mainPagePopup");
let manageGroupEdit = document.getElementById("manageGroupEdit");
let managerOrderListRecord = document.getElementById("managerOrderListRecord");
let createStore = document.getElementById("createStore");
let reloadButton = document.getElementById("reloadButton");
let checkStoreButton = document.getElementById("checkStoreButton");

// Manage group
let manageGroupBlock = document.getElementById("manageGroupBlock");
let manageGroupInvite = document.getElementById("manageGroupInvite");
let manageGroupCreateOrderList = document.getElementById("manageGroupCreateOrderList");
// spacer
let separateGroupInto1 = document.getElementById("separateGroupInto1");
// Manage order list
let manageOrderListBlock = document.getElementById("manageOrderListBlock");
let managerOrderListTitle = document.getElementById("managerOrderListTitle");
// 1-5-2 order list Title
let managerOrderList = document.getElementById("managerOrderList");
let backGroupChooseButton = document.getElementById("backGroupChooseButton");

// Edit group
let editGroupBlock = document.getElementById("editGroupBlock");
// Edit group name
let editGroupNameBlock = document.getElementById("editGroupNameBlock");
let editGroupNameTitle = document.getElementById("editGroupNameTitle");
// Edit group password
let editGroupPasswordBlock = document.getElementById("editGroupPasswordBlock");
let editGroupPasswordTitle = document.getElementById("editGroupPasswordTitle");
let editGroupNewPasswordTitle = document.getElementById("editGroupNewPasswordTitle");
let editGroupNewPasswordInput = document.getElementById("editGroupNewPasswordInput");
// Edit group message
let editGroupErrorOrOkMessage = document.getElementById("editGroupErrorOrOkMessage");
let editGroupErrorOrOkMessageContent = document.getElementById("editGroupErrorOrOkMessageContent");
// Edit group submit
let deleteGroupSubmit = document.getElementById("deleteGroupSubmit");
let deleteGroupSubmitContent = document.getElementById("deleteGroupSubmitContent");
let deleteGroupNewPasswordInput = document.getElementById("deleteGroupNewPasswordInput");
let deleteGroupNewPassword = document.getElementById("deleteGroupNewPassword");
let editBackGroupSubmit = document.getElementById("editBackGroupSubmit");
let editBackGroupSubmitContent = document.getElementById("editBackGroupSubmitContent");
// Make sure to delete
let deleteConfirmBlock = document.getElementById("deleteConfirmBlock");
let deleteConfirmTitle = document.getElementById("deleteConfirmTitle");
let deleteConfirmButton = document.getElementById("deleteConfirmButton");
let deleteConfirmYesButton = document.getElementById("deleteConfirmYesButton");
let deleteConfirmNoButton = document.getElementById("deleteConfirmNoButton");
let deleteGroupErrorMeaasge = document.getElementById("deleteGroupErrorMeaasge");
let deleteGroupErrorMeaasgeContent = document.getElementById("deleteGroupErrorMeaasgeContent");
// invite
let inviteMemberBlock = document.getElementById("inviteMemberBlock");
let inviteMemberEmailBlock = document.getElementById("inviteMemberEmailBlock");
let inviteMemberEmailTitle = document.getElementById("inviteMemberEmailTitle");
let inviteMemberEmailInput = document.getElementById("inviteMemberEmailInput");
let inviteMemberEmail = document.getElementById("inviteMemberEmail");
let inviteMemberMessage = document.getElementById("inviteMemberMessage");
let inviteMemberMessageContent = document.getElementById("inviteMemberMessageContent");
let inviteMemberSubmit = document.getElementById("inviteMemberSubmit");
let inviteMemberSubmitContent = document.getElementById("inviteMemberSubmitContent");
let inviteBackGroupSubmit = document.getElementById("inviteBackGroupSubmit");
let inviteBackGroupSubmitContent = document.getElementById("inviteBackGroupSubmitContent");

let showAllmemberAndMoneyBlock = document.getElementById("showAllmemberAndMoneyBlock");
let inviteMemberEmailBlockBlock = document.getElementById("inviteMemberEmailBlockBlock");
let openInviteMemberButton = document.getElementById("openInviteMemberButton");

let finisIinviteBackGroupButton = document.getElementById("finisIinviteBackGroupButton");

// ==== Create element ====

// 1-2 page title
createDivElement(pageTitle, "pressToShowInfoDown", "",null,  "appendChild");
createImgElement(pressToShowInfoDown,"pressToShowInfoDownImg","pressToShowInfo", "../static/image/arrow_down.png","appendChild");
createDivElement(pageTitle, "pressToShowInfoUp", "",null, "appendChild");
createImgElement(pressToShowInfoUp,"pressToShowInfoUpImg","pressToShowInfo", "../static/image/arrow_up.png","appendChild");

// ==== onload ====
let groupIntoCount = 0;
let groupUserCount = 0;
noneDisplayGroupInto();
manageGroupBlock.style.display="flex";
onloadThisPage();
async function onloadThisPage(){
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();
    pageTitleContent.textContent = urlGroupName;
    let groupApiData = await groupStatus(urlGroupName,"alive");
    groupApiData = groupApiData.group;
    console.log("groupApiData",groupApiData)
    groupId = groupApiData.groupId;
    let groupManager = "";
    for (i=0;i<Object.keys(groupApiData).length;i++){
        if (groupApiData[i].groupName == urlGroupName){            
            groupManager = groupApiData[i].groupManager;
            // return groupManager
        };
    };
    editGroupDisplayOrNot(userId,groupManager);
    oriGroupNameShow(urlGroupName);
    checkAllOrderMenuButtonClick();
    showAllmemberAndMoneyInGroup();
}

editGroupBlock.style.display = "none";
deleteConfirmBlock.style.display = "none";
inviteMemberBlock.style.display = "none";
finishGroupNameButton.style.display = "none";
finishGroupPasswordButton.style.display = "none";


// ==== create event listener ====
// edit group
pageTitle.addEventListener("click",pageTitleClick);
backGroupChooseButton.addEventListener("click",backGroupChooseButtonClick);
// into page
manageGroupEdit.addEventListener("click",manageGroupEditClick);
manageGroupInvite.addEventListener("click",manageGroupInviteClick);
manageGroupCreateOrderList.addEventListener("click",manageGroupCreateOrderListClick);
// edit group
editGroupNameButton.addEventListener("click",editGroupNameButtonClick);
editGroupPasswordButton.addEventListener("click",editGroupPasswordButtonClick);
finishGroupNameButton.addEventListener("click",finishGroupNameButtonClick);
finishGroupPasswordButton.addEventListener("click",finishGroupPasswordButtonClick);
deleteGroupSubmit.addEventListener("click",deleteGroupSubmitClick);
editBackGroupSubmit.addEventListener("click",editBackGroupSubmitClick);
// // edit delete question
deleteConfirmYesButton.addEventListener("click",deleteConfirmYesButtonClick);
deleteConfirmNoButton.addEventListener("click",deleteConfirmNoButtonClick);
// // invite member
inviteMemberSubmit.addEventListener("click",inviteMemberSubmitClick);
inviteBackGroupSubmit.addEventListener("click",inviteBackGroupSubmitClick);

openInviteMemberButton.addEventListener("click",openInviteMemberButtonClick);
finisIinviteBackGroupButton.addEventListener("click",finisIinviteBackGroupButtonClick);
// 
reloadButton.addEventListener("click",reloadButtonClick);


// order history
managerOrderListRecord.addEventListener("click",rmanagerOrderListRecordClick);

checkStoreButton.addEventListener("click",checkStoreButtonClick);

// ==== Function ====

function noneDisplayGroupInto(){
    mainPagePopup.style.display = "none";
    manageGroupBlock.style.display = "none";
    editGroupBlock.style.display = "none";
    deleteConfirmBlock.style.display = "none";
    inviteMemberBlock.style.display = "none";
    pressToShowInfoUp.style.display = "none";
}

function pageTitleClick(){
    let groupEditShowJudge = groupIntoCount%2
    noneDisplayGroupInto();
    if (groupEditShowJudge == 0){
        mainPagePopup.style.display = "flex";
        pressToShowInfoDown.style.display = "none";
        pressToShowInfoUp.style.display = "flex";
    }
    if (groupEditShowJudge == 1){
        location.reload()
    }
    groupIntoCount+=1
    
}

async function checkStoreButtonClick(){
    window.location.href = `/group/${urlGroupName}/store_check`;
};

async function reloadButtonClick(){
    window.location.href = `/group/${urlGroupName}/reload`;
}

async function editGroupDisplayOrNot(userId,groupManager){
    if (userId == groupManager){
        manageGroupEdit.style.display = "flex";
    }
    else{
        manageGroupEdit.style.display = "none";
    };
};
// Edit group
function oriGroupNameShow(urlGroupName){
    editGroupNameInput.textContent = urlGroupName;
    editGroupPasswordInput.textContent = "******";
};
function manageGroupEditClick(){
    noneDisplayGroupInto();
    pageTitleContent.textContent = "編輯群組";
    editGroupBlock.style.display = "flex";
    // 
    editGroupNewPasswordTitle.style.display = "none";
    editGroupNewPasswordInput.style.display = "none";
};
// Edit name
function editGroupNameButtonClick(){
    replaceElement(editGroupNameInput, "input", "editGroupNewNameInput", "userInfoInputValue", elementText = urlGroupName, inputType = "text");
    finishGroupNameButton.style.display = "flex";
    editGroupNameButton.style.display = "none";
};
async function finishGroupNameButtonClick(){
    editGroupNewNameInputValue = editGroupNewNameInput.value;
    if (editGroupNewNameInputValue != urlGroupName){
        let data = {
            "groupName":urlGroupName,
            "groupNewName":editGroupNewNameInputValue,
            "groupPassword":null,
            "groupNewPassword":null,
            "groupStatus":"alive"
        };
        result = await groupApiPatch(data);
        if (result.ok == true){
            urlGroupName = editGroupNewNameInputValue
            finishGroupNameButton.style.display = "flex";
            editGroupNameButton.style.display = "none";
        }
        else{
            resultMessage = result.message;
            editGroupErrorOrOkMessageContent.textContent = resultMessage;
        };
        replaceElement(editGroupNewNameInput, "div", "editGroupNameInput", "userInfoInputBlock", elementText = editGroupNewNameInputValue);
    }
    else{
        replaceElement(editGroupNewNameInput, "div", "editGroupNameInput", "userInfoInputBlock", elementText = urlGroupName);
    
    };
    finishGroupNameButton.style.display = "none";
    editGroupNameButton.style.display = "flex";
}
// Edit password
function editGroupPasswordButtonClick(){
    replaceElement(editGroupPasswordInput, "input", "editGroupOriPasswordInput", "userInfoInputValue", elementText = "", elementText = "password", inputType = "password");
    editGroupOriPasswordInput.placeholder="輸入原始群組密碼";
    finishGroupPasswordButton.style.display = "flex";
    editGroupPasswordButton.style.display = "none";
    editGroupNewPasswordTitle.style.display = "flex";
    editGroupNewPasswordInput.style.display = "flex";
};

async function finishGroupPasswordButtonClick(){
    editGroupOriPasswordInputValue = editGroupOriPasswordInput.value;
    editGroupNewPasswordInputValue = editGroupNewPassword.value;
    if (editGroupOriPasswordInputValue != editGroupNewPasswordInputValue && editGroupNewPasswordInputValue != ""){
        let data = {
            "groupName":urlGroupName,
            "groupNewName":null,
            "groupPassword":editGroupOriPasswordInputValue,
            "groupNewPassword":editGroupNewPasswordInputValue,
            "groupStatus":"alive"
        };
        result = await groupApiPatch(data);
        if (result.ok == true){
            finishGroupPasswordButton.style.display = "none";
            editGroupPasswordButton.style.display = "flex";
            editGroupNewPasswordTitle.style.display = "none";
            editGroupNewPasswordInput.style.display = "none";
            replaceElement(editGroupOriPasswordInput, "div", "editGroupPasswordInput", "userInfoInputBlock", elementText = "******");
        }
        else{
            resultMessage = result.message;
            editGroupErrorOrOkMessageContent.textContent = resultMessage;
        };
    }
    else if (editGroupOriPasswordInputValue == editGroupNewPasswordInputValue){
        editGroupErrorOrOkMessageContent.textContent = "與原始密碼相同";
    }
    else if (editGroupNewPasswordInputValue == ""){
        editGroupErrorOrOkMessageContent.textContent = "請勿使用空白密碼";
    }
    else{
        replaceElement(editGroupOriPasswordInput, "div", "editGroupPasswordInput", "userInfoInputBlock", elementText = "******");
    };
};


// delete group
function deleteGroupSubmitClick(){
    deleteConfirmBlock.style.display = "flex";
    blockScreenFilter.style.display = "flex";
};

async function deleteConfirmYesButtonClick(){
    deleteGroupNewPasswordValue = deleteGroupNewPassword.value;
    if (deleteGroupNewPasswordValue != ""){
        let data = {
            "groupName":urlGroupName,
            "groupNewName":null,
            "groupPassword":deleteGroupNewPasswordValue,
            "groupNewPassword":null,
            "groupStatus":"stop"
        };
        result = await groupApiPatch(data);
        if (result.ok == true){
            window.location.href = `/group`;
        }
        else{
            resultMessage = result.message;
            deleteGroupErrorMeaasgeContent.textContent = resultMessage;
        };
    }
    else{
        deleteGroupErrorMeaasgeContent.textContent = "請輸入密碼以更改";
    };
};

function deleteConfirmNoButtonClick(){
    deleteConfirmBlock.style.display = "none";
    blockScreenFilter.style.display = "none";
}

function editBackGroupSubmitClick(){
    window.location.href = `/group/${urlGroupName}`;
}

async function showAllmemberAndMoneyInGroup(){
    createDivElement(showAllmemberAndMoneyBlock,`showAllmemberAndMoneyBlockBlock_${groupUserCount}`, null, null, "appendChild");
    createDivElement(eval(`showAllmemberAndMoneyBlockBlock_${groupUserCount}`),`showAllmemberAndMoneyListTitle`, "titleWord", "群組成員", "appendChild");
    createDivElement(eval(`showAllmemberAndMoneyBlockBlock_${groupUserCount}`),`separate`, "separateBlock", null, "appendChild");
    createDivElement(eval(`showAllmemberAndMoneyBlockBlock_${groupUserCount}`),`showAllmemberAndMoneyListItemsTiitle`, "showAllmemberAndMoneyBlock", null, "appendChild");
    createDivElement(showAllmemberAndMoneyListItemsTiitle,`userPositionTitle`, "listContent", "職位", "appendChild");
    createDivElement(showAllmemberAndMoneyListItemsTiitle,`userNameTitle`, "listContent", "姓名", "appendChild");
    createDivElement(showAllmemberAndMoneyListItemsTiitle,`userBalanceTitle`, "listContent", "餘額", "appendChild");
    let groupUserApiGetResult = await groupUserApiGet(urlGroupName);
    console.log("groupUserApiGetResult",groupUserApiGetResult);
    console.log("Object.keys(groupUserApiGetResult)",Object.keys(groupUserApiGetResult));

    for (let i=0;i<groupUserApiGetResult.length;i++){
        userPosition = groupUserApiGetResult[i].userPosition;
        userName = groupUserApiGetResult[i].userName;
        userBalance = groupUserApiGetResult[i].userBalance;
        createDivElement(eval(`showAllmemberAndMoneyBlockBlock_${groupUserCount}`),`showAllmemberAndMoneyList_${i}`, "showAllmemberAndMoneyBlock", null, "appendChild");
        createDivElement(eval(`showAllmemberAndMoneyList_${i}`),`userPosition_${i}`, "listContent", userPosition, "appendChild");
        createDivElement(eval(`showAllmemberAndMoneyList_${i}`),`userName_${i}`, "listContent", userName, "appendChild");
        createDivElement(eval(`showAllmemberAndMoneyList_${i}`),`userBalance_${i}`, "listContent", userBalance, "appendChild");
    }

}

// invite member
function manageGroupInviteClick(){
    noneDisplayGroupInto();
    inviteMemberEmailBlockBlock.style.display = "none"
    inviteMemberBlock.style.display = "flex"
    inviteMemberSubmit.style.display = "none"
    finisIinviteBackGroupButton.style.display = "none"
    pageTitleContent.textContent = "群組成員"
};

async function inviteMemberSubmitClick(){
    inviteMemberEmailValue = inviteMemberEmail.value;
    if (inviteMemberEmailValue != ""){
        let data = {
            "joinUserEmail":inviteMemberEmailValue,
            "groupName":urlGroupName,
            "groupPassword":"null",
            "useFor":"invite"
        };
        result = await groupApiPut(data);
        if (result.ok == true){
            let data = {
                "billUserEmail":inviteMemberEmailValue,
                "orderListId":null,
                "groupId":null,
                "groupName":urlGroupName
            };
            let billApiPostResult = await billApiPost(data);
            inviteMemberMessageContent.textContent = `${inviteMemberEmailValue} 成功加入`;
        }
        else{
            resultMessage = result.message;
            if (resultMessage == "user doesn't exist"){
                inviteMemberMessageContent.textContent = `${inviteMemberEmailValue}使用者不存在`;
            };
            if (resultMessage == "already member"){
                inviteMemberMessageContent.textContent = `${inviteMemberEmailValue}已是會員`;
            };
        };
    }
    else{
        inviteMemberMessageContent.textContent = "請輸入欲邀請人信箱";
    };
};

function openInviteMemberButtonClick(){
    showAllmemberAndMoneyBlock.style.display = "none";
    openInviteMemberButton.style.display = "none";
    inviteBackGroupSubmit.style.display = "none";
    // 
    inviteMemberEmailBlockBlock.style.display = "flex";
    inviteMemberSubmit.style.display = "flex";
    finisIinviteBackGroupButton.style.display = "flex";

    pageTitleContent.textContent = "新增成員";
}

async function finisIinviteBackGroupButtonClick(){
    eval(`showAllmemberAndMoneyBlockBlock_${groupUserCount}`).remove();
    groupUserCount+=1;
    await showAllmemberAndMoneyInGroup();
    showAllmemberAndMoneyBlock.style.display = "flex";
    openInviteMemberButton.style.display = "flex";
    inviteBackGroupSubmit.style.display = "flex";
    // 
    inviteMemberEmailBlockBlock.style.display = "none";
    inviteMemberSubmit.style.display = "none";
    finisIinviteBackGroupButton.style.display = "none";
}

function inviteBackGroupSubmitClick(){
    noneDisplayGroupInto();
    mainPagePopup.style.display = "flex";
    pressToShowInfoDown.style.display = "none";
    pressToShowInfoUp.style.display = "flex";
    pageTitleContent.textContent = urlGroupName;

};

function manageGroupCreateOrderListClick(){
    window.location.href = `/group/${urlGroupName}/create_order`;
};

// BackSummit

// 
async function groupApiPatch(data){
    return fetch(`/api/group`,{
        method:"PATCH",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};

async function groupApiPut(data){
    return fetch(`/api/group`,{
        method:"PUT",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};

// order list already 
async function checkAllOrderMenuButtonClick(){
    urlStoreName = "";
    urlStopTime = "";
    let orderListGetDataAlive = await orderListApiGet(urlGroupName,urlStoreName,urlStopTime,"alive");
    let orderListDataAlive = orderListGetDataAlive.orderList;
    if (orderListDataAlive == null){
        createDivElement(managerOrderList,`separate`, "separateBlock", null, "appendChild");
        ifNoOrderListShow();
    }
    if (orderListDataAlive != null){
        createDivElement(managerOrderList,`separate`, "separateBlock", null, "appendChild");
        showAllGrooupOrderAliveListBlock(orderListDataAlive);
    }
    let orderListGetDataOrdering = await orderListApiGet(urlGroupName,urlStoreName,urlStopTime,"ordering");
    let orderListDataOrdering = orderListGetDataOrdering.orderList;
    if (orderListDataOrdering != null){
        createDivElement(managerOrderList,`separate`, "separateBlock", null, "appendChild");
        showAllGrooupOrderListOrderingBlock(orderListDataOrdering);
    };

};
async function ifNoOrderListShow(){
    let noDataResponse = "尚未建立團購，請點選上方建立團購"
    createDivElement(managerOrderList,`managerOrderListNoData`,"",noDataResponse,"appendChild")
};

async function showAllGrooupOrderAliveListBlock(orderListData){
    let managerOrderListAliveTitleContent = "正在進行的團購"
    createDivElement(managerOrderList,`managerOrderListAliveTitle`,"titleWord",managerOrderListAliveTitleContent, "appendChild")
    createDivElement(managerOrderList,`managerOrderListBlock`, "contentPositionCenter", null, "appendChild");
    for(let i=0;i<Object.keys(orderListData).length;i++){
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
        createAElement(managerOrderListBlock,`managerOrderList${i}`, "buttonFormat groupBGC", null, "prepend", hrefContent = `/group/${urlGroupName}/store/${storeName}/${stopTimeUrl}/alive`);
        createDivElement(eval(`managerOrderList${i}`), `managerOrderListContent${i}`, "buttonContent", orderListContent);
    };
};

async function showAllGrooupOrderListOrderingBlock(orderListData){ 
    let alreadyOrderingContent = "已經結單的團購"
    createDivElement(managerOrderList,`alreadyOrdering`, "titleWord", alreadyOrderingContent, "appendChild");
    createDivElement(managerOrderList,`managerOrderListOrderingBlock`, "contentPositionCenter", null, "appendChild");
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
        createAElement(managerOrderListOrderingBlock,`managerOrderListOrdering${i}`, "buttonFormat deleteBGC", null, "prepend", hrefContent = `/group/${urlGroupName}/store/${storeName}/${stopTimeUrl}/ordering`);
        createDivElement(eval(`managerOrderListOrdering${i}`), `managerOrderListOrderingContent${i}`, "buttonContent", orderListContent);
    };
};

function rmanagerOrderListRecordClick(){
    window.location.href = `/group/${urlGroupName}/order_history`;
};

function backGroupChooseButtonClick(){
    window.location.href = `/group`;
}