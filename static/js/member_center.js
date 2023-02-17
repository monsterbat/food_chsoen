// ==== Get element ====
let userCenterBlock = document.getElementById("userCenterBlock");
let topNameAndAvatorBlock = document.getElementById("topNameAndAvatorBlock");
let topAvatorBlock = document.getElementById("topAvatorBlock");
let topAvator = document.getElementById("topAvator");



let topAvatorEditButton = document.getElementById("topAvatorEditButton");
let topAvatorEdit = document.getElementById("topAvatorEdit");
let topAvatorFinishButton = document.getElementById("topAvatorFinishButton");
let topAvatorFinish = document.getElementById("topAvatorFinish");

let topNameBlock = document.getElementById("topNameBlock");
// let topName = document.getElementById("topName");
let topNameEditButton = document.getElementById("topNameEditButton");
let topNameEdit = document.getElementById("topNameEdit");
let topNameFinishButton = document.getElementById("topNameFinishButton");
let topNameFinish = document.getElementById("topNameFinish");

let memberCenterBlock = document.getElementById("memberCenterBlock");
let topNav = document.getElementById("topNav");
let userCenterSelectBlock = document.getElementById("userCenterSelectBlock");
let userProfileButton = document.getElementById("userProfileButton");
let userProfileButtonContent = document.getElementById("userProfileButtonContent");
let userOrderHistoryButton = document.getElementById("userOrderHistoryButton");
let userOrderHistoryButtonContent = document.getElementById("userOrderHistoryButtonContent");
let userProfileBlock = document.getElementById("userProfileBlock");

let userNameBlock = document.getElementById("userNameBlock");
let userNameTitle = document.getElementById("userNameTitle");
// let userNameShowBlock = document.getElementById("userNameShowBlock");
// let userNameShow = document.getElementById("userNameShow");
let userNameEditButton = document.getElementById("userNameEditButton");
let userNameFinishButton = document.getElementById("userNameFinishButton");
let userNameMessage = document.getElementById("userNameMessage");

let userEmailBlock = document.getElementById("userEmailBlock");
let userEmailTitle = document.getElementById("userEmailTitle");
let userEmailShowBlock = document.getElementById("userEmailShowBlock");
// let userEmailShow = document.getElementById("userEmailShow");
let userEmailEditButton = document.getElementById("userEmailEditButton");
let userEmailFinishButton = document.getElementById("userEmailFinishButton");
let userEmailMessage = document.getElementById("userEmailMessage");

let userPasswordBlock = document.getElementById("userPasswordBlock");
let userPasswordTitle = document.getElementById("userPasswordTitle");
let userPasswordShowBlock = document.getElementById("userPasswordShowBlock");
// let userPasswordShow = document.getElementById("userPasswordShow");
let userPasswordEditButton = document.getElementById("userPasswordEditButton");
let userPasswordFinishButton = document.getElementById("userPasswordFinishButton");
let userNewPasswordBlock = document.getElementById("userNewPasswordBlock");
let userNewPasswordTitle = document.getElementById("userNewPasswordTitle");
// let userNewPasswordShowBlock = document.getElementById("userNewPasswordShowBlock");
let userPasswordMessage = document.getElementById("userPasswordMessage");
// let userNewPasswordShow = document.getElementById("userNewPasswordShow");
let separate = document.getElementById("separate");
let accountInfoTitle = document.getElementById("accountInfoTitle");
let accountInfoItems = document.getElementById("accountInfoItems");
let accountInfoListBlock = document.getElementById("accountInfoListBlock");
let userOrderHistoryBlock = document.getElementById("userOrderHistoryBlock");
let target = document.getElementById("continueDownloadData");
// ==== Create element ====

// ==== onload ====
onloadMemberCenterPage();


// ==== create event listener ====
memberCenterBlock.addEventListener("click",memberCenterBlockChange);
topAvatorEditButton.addEventListener("click",topAvatorEditButtonClick);
topAvatorFinishButton.addEventListener("click",topAvatorFinishButtonClick);
topNameEditButton.addEventListener("click",topNameEditButtonClick);
topNameFinishButton.addEventListener("click",topNameFinishButtonClick);
userEmailEditButton.addEventListener("click",userEmailEditButtonClick);
userEmailFinishButton.addEventListener("click",userEmailFinishButtonClick);
userPasswordEditButton.addEventListener("click",userPasswordEditButtonClick);
userPasswordFinishButton.addEventListener("click",userPasswordFinishButtonClick);
userProfileButton.addEventListener("click",userProfileButtonClick);
userOrderHistoryButton.addEventListener("click",userOrderHistoryButtonClick);
// ==== Function ====
function userProfileButtonClick(){
    // userProfileButton.style.backgroundColor = ""
    // userOrderHistoryButton.style.backgroundColor = ""
    userProfileBlock.style.display = "flex";
    userOrderHistoryBlock.style.display = "none";
    target.style.display = "none";
}

function userOrderHistoryButtonClick(){
    // userProfileButton.style.backgroundColor = ""
    // userOrderHistoryButton.style.backgroundColor = ""
    userProfileBlock.style.display = "none";
    userOrderHistoryBlock.style.display = "flex";
    target.style.display = "flex";
}

async function onloadMemberCenterPage(){
    userProfileButtonClick()
    target.style.display = "none";
    userNewPasswordBlock.style.display = "none";
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    let userEmail = userApiData.data.userEmail;
    pageTitleContent.textContent = "會員中心"
    memberCenterBlockChange();
    topNameAndAvatorBlockShow(userName);
    // userNameShow.textContent = userName;
    userEmailShow.textContent = userEmail;
    userPasswordShow.textContent = "******";
    accountInfoListBlockShow();
    // userOrderHistoryShow();
}

async function memberCenterBlockChange(){
    memberCenterBlock.remove();
    createDivElement(topNav,"userSignOutButton","memberCenterBlock",null,"appendChild");
    createDivElement(userSignOutButton,"userSignOutContent","cRed","會員登出","appendChild");
    userSignOutContent.addEventListener("click",userSignOutContentClick);
}

async function userSignOutContentClick(){
    let userApiDeleteResult = await userApiDelete();
    window.location = `/`
}

async function topNameAndAvatorBlockShow(userName){
    // avator S3
    // topAvator.src = ""

    // 
    topName.textContent = userName;
};

async function accountInfoListBlockShow(){
    let groupApiGetResult = await groupApiGet();
    groupList = groupApiGetResult.group
    for(i=0;i<Object.keys(groupList).length;i++){
        let groupId = groupList[i]["groupId"];
        let groupName = groupList[i]["groupName"];
        let billApiGetResult = await billApiGet(groupName)
        let userBalance = billApiGetResult.userBalance
        userBalance = Number(userBalance)
        let reloadClass = ""
        if (userBalance<0){
            reloadClass = ""
        }
        createDivElement(accountInfoListBlock,`accountInfoList${i}`,"accountInfoItems", null, "appendChild")
        createDivElement(eval(`accountInfoList${i}`),`groupNameInfo${i}`, "", groupName, "appendChild");
        createDivElement(eval(`accountInfoList${i}`),`groupBalanceInfo${i}`, "", userBalance, "appendChild");
        createAElement(eval(`accountInfoList${i}`),`goToReloadInfo${i}`, reloadClass, null, "appendChild",`/group/${groupName}/reload`);
        createDivElement(eval(`goToReloadInfo${i}`),`goToReloadContent${i}`, "", "儲值去", "appendChild");
    };
}

// // IntersectionObserverasy
// let target = document.querySelector("footer");
// let callback = (entries,observer) => {
//     entries.forEach(async function(entry){
//         if (groupGetPage != null) {
//             await generateGroup(); 
//         } 
//         else {
//             observer.unobserve(target);
//         }  ;      
//     });
// };

// let headerDiv = document.querySelector("header");
// let mainDIV = document.querySelector("main");

// let headerDivHeight = headerDiv.offsetHeight;
// let sloganDivHeight = mainDIV.offsetHeight;
// let windowHeight = window.innerHeight;

// let rootMarginTop = (headerDivHeight+sloganDivHeight)-windowHeight;

// const options = {
//   root: null,
//   rootMargin: `${rootMarginTop}px 0px 0px 0px`,
//   threshold: 0,
// };

// let observer = new IntersectionObserver(callback, options);

// observer.observe(target);



// ----------------------------------------------------------------------------------------
async function userOrderHistoryShow(){
    let getStatus = "alive";
    let orderUserApiGetResult = await orderUserApiGet(getStatus);
    console.log("orderUserApiGetResult",orderUserApiGetResult)
    let orders = orderUserApiGetResult.order

    const groupedOrders = orders.reduce((acc, order) => {
        const key = `${order.orderListId}_${order.stopTime}_${order.storeName}`;
        if (!acc[key]) {
            acc[key] = {
                orderListId: order.orderListId,
                stopTime: order.stopTime,
                storeName: order.storeName,
                items: []
            };
        }
        // 檢查是否有相同的 menuName 和 menuSize 的物件
        const index = acc[key].items.findIndex(item => item.menuName === order.menuName && item.menuSize === order.menuSize);
        if (index >= 0) {
            // 如果已經有相同的物件，則將 orderQuantity 和 orderPrice 相加
            acc[key].items[index].orderQuantity = String(Number(acc[key].items[index].orderQuantity) + Number(order.orderQuantity));
            acc[key].items[index].orderPrice = String(Number(acc[key].items[index].orderPrice) + Number(order.orderPrice));
        } else {
            // 如果沒有相同的物件，則直接將物件加入陣列
            acc[key].items.push({
                menuName: order.menuName,
                menuSize: order.menuSize,
                orderQuantity: order.orderQuantity,
                orderPrice: order.orderPrice
            });
        }
        return acc;
    }, {});

    const orderDataSortout = Object.values(groupedOrders);
    createDivElement(userOrderHistoryBlock,`userOrderHistoryBlockBlock${orderUserApiGetPage}`, "", null, "appendChild");
    
    for(let i=0;i<Object.keys(orderDataSortout).length;i++){
        // 
        createDivElement(eval(`userOrderHistoryBlockBlock${orderUserApiGetPage}`),`userOrderHistoryList${orderUserApiGetPage}${i}`,"", null, "appendChild")

        let orderListId = orderDataSortout[i].orderListId;
        let stopTime = orderDataSortout[i].stopTime;
        let stopTimeDate = stopTime.split('-')[0]+"-"+stopTime.split('-')[1]+"-"+stopTime.split('-')[2];
        let stopTimeTime = stopTime.split('-')[3]
        let storeName = orderDataSortout[i].storeName;
        // 
        createDivElement(eval(`userOrderHistoryList${orderUserApiGetPage}${i}`),`userOrderHistoryListOrderList${orderUserApiGetPage}${i}`,"orderHistory", null, "appendChild")
        createDivElement(eval(`userOrderHistoryListOrderList${orderUserApiGetPage}${i}`),`userOrderHistoryListStopTimeDate${orderUserApiGetPage}${i}`,"", stopTimeDate, "appendChild")
        createDivElement(eval(`userOrderHistoryListOrderList${orderUserApiGetPage}${i}`),`userOrderHistoryListStopTimeTime${orderUserApiGetPage}${i}`,"", stopTimeTime, "appendChild")
        createDivElement(eval(`userOrderHistoryListOrderList${orderUserApiGetPage}${i}`),`userOrderHistoryListStoreName${orderUserApiGetPage}${i}`,"", storeName, "appendChild")

        // 
        createDivElement(eval(`userOrderHistoryList${orderUserApiGetPage}${i}`),`userOrderHistoryListOrderListTitle${orderUserApiGetPage}${i}`,"orderHistory", null, "appendChild")
        createDivElement(eval(`userOrderHistoryListOrderListTitle${orderUserApiGetPage}${i}`),`userOrderHistoryListOrderListTitleMenu${orderUserApiGetPage}${i}`,"", "餐點", "appendChild")
        createDivElement(eval(`userOrderHistoryListOrderListTitle${orderUserApiGetPage}${i}`),`userOrderHistoryListOrderListTitleOrderQuantity${orderUserApiGetPage}${i}`,"", "份數", "appendChild")
        createDivElement(eval(`userOrderHistoryListOrderListTitle${orderUserApiGetPage}${i}`),`userOrderHistoryListOrderListTitleOrderPrice${orderUserApiGetPage}${i}`,"", "價錢", "appendChild")

        orderDataSortoutItems = orderDataSortout[i].items;
        let thisOrderTotalPrice = 0;
        for(let j=0;j<Object.keys(orderDataSortoutItems).length;j++){
            let menuName = orderDataSortoutItems[j].menuName;
            let menuSize = orderDataSortoutItems[j].menuSize;
            let menuTogether = menuName+" "+menuSize;
            let orderPrice = orderDataSortoutItems[j].orderPrice;
            let orderQuantity = orderDataSortoutItems[j].orderQuantity;
            createDivElement(eval(`userOrderHistoryList${orderUserApiGetPage}${i}`),`userOrderHistoryListEachOrder${orderUserApiGetPage}${i}${j}`,"orderHistory", null, "appendChild")
            createDivElement(eval(`userOrderHistoryListEachOrder${orderUserApiGetPage}${i}${j}`),`userOrderHistoryListMenu${orderUserApiGetPage}${i}${j}`,"", menuTogether, "appendChild")
            createDivElement(eval(`userOrderHistoryListEachOrder${orderUserApiGetPage}${i}${j}`),`userOrderHistoryListOrderQuantity${orderUserApiGetPage}${i}${j}`,"", orderQuantity, "appendChild")
            createDivElement(eval(`userOrderHistoryListEachOrder${orderUserApiGetPage}${i}${j}`),`userOrderHistoryListOrderPrice${orderUserApiGetPage}${i}${j}`,"", orderPrice, "appendChild")
            thisOrderTotalPrice = Number(thisOrderTotalPrice)+Number(orderPrice)
        };

        createDivElement(eval(`userOrderHistoryList${orderUserApiGetPage}${i}`),`userOrderHistoryListSeparateBar${orderUserApiGetPage}${i}`,"", null, "appendChild")
        // 
        createDivElement(eval(`userOrderHistoryList${orderUserApiGetPage}${i}`),`userOrderHistoryListTotal${orderUserApiGetPage}${i}`,"orderHistory", null, "appendChild")
        createDivElement(eval(`userOrderHistoryListTotal${orderUserApiGetPage}${i}`),`userOrderHistoryListTotalTitle${orderUserApiGetPage}${i}`,"", "總價", "appendChild")
        createDivElement(eval(`userOrderHistoryListTotal${orderUserApiGetPage}${i}`),`userOrderHistoryListTotalDiv${orderUserApiGetPage}${i}`,"", null, "appendChild")
        createDivElement(eval(`userOrderHistoryListTotal${orderUserApiGetPage}${i}`),`userOrderHistoryListTotalPrice${orderUserApiGetPage}${i}`,"", thisOrderTotalPrice, "appendChild")
    }
    orderUserApiGetPage = orderUserApiGetResult.nextPage
    // return page
}

// IntersectionObserverasy

let callback = (entries,observer) => {
    entries.forEach(async function(entry){
        if (orderUserApiGetPage != null) {
            await userOrderHistoryShow(); 
        } 
        else {
            observer.unobserve(target);
        }  ;      
    });
};

let headerDiv = document.querySelector("header");
let mainDIV = document.querySelector("main");

let headerDivHeight = headerDiv.offsetHeight;
let sloganDivHeight = mainDIV.offsetHeight;
let windowHeight = window.innerHeight;

let rootMarginTop = (headerDivHeight+sloganDivHeight)-windowHeight;

const options = {
  root: null,
  rootMargin: `${rootMarginTop}px 0px 0px 0px`,
  threshold: 0,
};

let observer = new IntersectionObserver(callback, options);

observer.observe(target);

// Edit 
async function topAvatorEditButtonClick(){
    
}
async function topAvatorFinishButtonClick(){
    
}
async function topNameEditButtonClick(){
    let topName = document.getElementById("topName");
    let topNameValue = topName.textContent;
    replaceToInputElement(topName, `topNameNew`,"",topNameValue,inputType = "text");
    topNameEditButton.style.display = "none";
    topNameFinishButton.style.display = "flex";
}
async function topNameFinishButtonClick(){
    let topNameNew = document.getElementById("topNameNew");
    let topNameValue = topNameNew.value;
    let data = {
        "userNewName":topNameValue,	
        "userNewEmail":null,
        "userPassword":null,
        "userNewPassword":null,
        "userStatus":"alive"
    }
    let userApiPatchResult = await userApiPatch(data);
    if (userApiPatchResult.ok == true){
        replaceToDivElement(topNameNew,`topName`,"",topNameValue);
        topNameEditButton.style.display = "flex";
        topNameFinishButton.style.display = "none";
        userNameMessage.textContent = "名稱更新完成";
        userNameMessage.style.display = "flex";
        userNameMessage.style.color = "green";
    }
    if (userApiPatchResult.error == true){
        userNameMessage.style.display = "flex";
        userNameMessage.style.color = "red";
        userNameMessage.textContent = userApiPatchResult.message;
    };
};

async function userEmailEditButtonClick(){
    let userEmailShow = document.getElementById("userEmailShow");
    let userEmailShowValue = userEmailShow.textContent;
    replaceToInputElement(userEmailShow, `userEmailShowNew`,"",userEmailShowValue,inputType = "text");
    userNameEditButton.style.display = "none";
    userNameFinishButton.style.display = "flex";
}
async function userEmailFinishButtonClick(){
    let userEmailShowNew = document.getElementById("userEmailShowNew");
    let userEmailShowNewValue = userEmailShowNew.value;
    let data = {
        "userNewName":null,	
        "userNewEmail":userEmailShowNewValue,
        "userPassword":null,
        "userNewPassword":null,
        "userStatus":"alive"
    }
    let userApiPatchResult = await userApiPatch(data);
    if (userApiPatchResult.ok == true){
        replaceToDivElement(userEmailShowNew,`userEmailShow`,"",userEmailShowNewValue);
        userNameEditButton.style.display = "flex";
        userNameFinishButton.style.display = "none";
        userEmailMessage.style.display = "flex";
        userEmailMessage.style.color = "green";
        userEmailMessage.textContent = "信箱更新完成";
    }
    if (userApiPatchResult.error == true){
        userEmailMessage.style.display = "flex";
        userEmailMessage.style.color = "red";
        userEmailMessage.textContent = userApiPatchResult.message;
    }

}
async function userPasswordEditButtonClick(){
    userNewPasswordBlock.style.display = "flex";
    let userPasswordShow = document.getElementById("userPasswordShow");
    let userNewPasswordShow = document.getElementById("userNewPasswordShow");
    replaceToInputElement(userPasswordShow, `userPasswordShowNew`,"","",inputType = "password");
    userPasswordEditButton.style.display = "none";
    userPasswordFinishButton.style.display = "flex";
}
async function userPasswordFinishButtonClick(){
    let userPasswordShowNew = document.getElementById("userPasswordShowNew");
    let userNewPasswordShow = document.getElementById("userNewPasswordShow");
    let userPasswordShowNewValue = userPasswordShowNew.value;    
    let userNewPasswordShowValue = userNewPasswordShow.value;
    let data = {
        "userNewName":null,	
        "userNewEmail":null,
        "userPassword":userPasswordShowNewValue,
        "userNewPassword":userNewPasswordShowValue,
        "userStatus":"alive"
    }
    let userApiPatchResult = await userApiPatch(data);
    if (userApiPatchResult.ok == true){
        replaceToDivElement(userPasswordShowNew,`userPasswordShow`,"","******");
        userPasswordEditButton.style.display = "flex";
        userPasswordFinishButton.style.display = "none";
        userNewPasswordBlock.style.display = "none";
        userPasswordMessage.style.display = "flex";
        userPasswordMessage.style.color = "green";
        userPasswordMessage.textContent = "密碼更新完成";
    }
    if (userApiPatchResult.error == true){
        userPasswordMessage.style.display = "flex";
        userPasswordMessage.style.color = "red";
        userPasswordMessage.textContent = userApiPatchResult.message;
    }
}