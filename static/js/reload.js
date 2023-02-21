// ==== Get element ====
let reloadPageBlcok = document.getElementById("reloadPageBlcok");
let currentBalance = document.getElementById("currentBalance");
let reloadPriceInput = document.getElementById("reloadPriceInput");
let reloadPrice = document.getElementById("reloadPrice");
let reloadToBillButton = document.getElementById("reloadToBillButton");
let reloadToBillContent = document.getElementById("reloadToBillContent");
let backToGroupIntoButton = document.getElementById("backToGroupIntoButton");
let backToGroupIntoContent = document.getElementById("backToGroupIntoContent");
let reloadResultContent = document.getElementById("reloadResultContent");
// ==== Create element ====
// ==== onload ====
onloadReloadPage()


// ==== create event listener ====
currentBalance.addEventListener("click",currentBalanceClick);
reloadToBillButton.addEventListener("click",reloadToBillButtonClick);
backToGroupIntoButton.addEventListener("click",backToGroupIntoButtonClick);

// ==== Function ====

async function onloadReloadPage(){
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
    currentBalanceClick()
}

async function currentBalanceClick(){
    let billApiGetResult = await billApiGet(urlGroupName);
    let userBalance = billApiGetResult.userBalance;
    userBalance = Number(userBalance);
    currentBalance.textContent = Number(userBalance.toFixed(0))
    if (userBalance<0){
        currentBalance.style.color = "red"
    }   
}

async function reloadToBillButtonClick(){
    let reloadPriceValue = reloadPrice.value;
    let currentBalanceValue = currentBalance.textContent;
    let data = {
        "userName":currentUserName,
        "groupName":urlGroupName,
        "reloadPrice":reloadPriceValue,
        "reloadNote":"x"
    };
    let reloadApiPostResult = await reloadApiPost(data);
    if (reloadApiPostResult.ok == true){
        let data2 = {
            "billUserEmail":currentUserEmail,
            "groupName":urlGroupName,
            "billPrice":reloadPriceValue
        };
        let billReloadApiPostResult = await billReloadApiPost(data2);
        if (billReloadApiPostResult.ok == true){
            reloadResultContent.style.color = "green";
            reloadResultContent.textContent = "儲值成功";
            let finalBalance = Number(currentBalanceValue)+Number(reloadPriceValue);
            currentBalance.textContent = Number(finalBalance.toFixed(0));
        };
        if (billReloadApiPostResult.error == true){
            reloadResultContent.style.color = "red";
            reloadResultContent.textContent = "儲值失敗";
        };
    }
    if (reloadApiPostResult.error == true){
        reloadResultContent.style.color = "red";
        reloadResultContent.textContent = "儲值失敗";
    };
};

async function backToGroupIntoButtonClick(){
    window.location.href = `/group/${urlGroupName}`;
};