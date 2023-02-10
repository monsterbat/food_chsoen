// ==== Get element ====
// 1-3 menu title 
let menuItemsBlock = document.getElementById("menuItemsBlock");
// 1-3-1 menu name
let menuItemsChoose = document.getElementById("menuItemsChoose");
let menuItemsMenu = document.getElementById("menuItemsMenu");
let menuItemsSize = document.getElementById("menuItemsSize");
let menuItemsPrice = document.getElementById("menuItemsPrice");
// 1-4 separate
let separate1 = document.getElementById("separate1");
// 1-5 menu list
let menuListBlcok = document.getElementById("menuListBlcok");
// 1-6 separate
// 1-7 menu button
let menuButtonBlock = document.getElementById("menuButtonBlock");
let checkAllOrderMenuButton = document.getElementById("checkAllOrderMenuButton");
let checkAllOrderMenuButtonContent = document.getElementById("checkAllOrderMenuButtonContent");
let menuEditCreateButton = document.getElementById("menuEditCreateButton");
let menuEditCreateButtonContent = document.getElementById("menuEditCreateButtonContent");
let menuSubmitButton = document.getElementById("menuSubmitButton");
let menuSubmitButtonContent = document.getElementById("menuSubmitButtonContent");
let backGroupIntoSubmit = document.getElementById("backGroupIntoSubmit");
// 1-8 check member order list
let checkMemberOrderListBlock = document.getElementById("checkMemberOrderListBlock");
// 1-8-1 check member order list title
let checkMemberOrderTitle = document.getElementById("checkMemberOrderTitle");
// 1-8-2 separate
// 1-8-3 menu order list title
let menuMemberOrderListItemsBlock = document.getElementById("menuMemberOrderListItemsBlock");
let menuMemberOrderListmember = document.getElementById("menuMemberOrderListmember");
let menuMemberOrderListChoose = document.getElementById("menuMemberOrderListChoose");
let menuMemberOrderListMenu = document.getElementById("menuMemberOrderListMenu");
let menuMemberOrderListSize = document.getElementById("menuMemberOrderListSize");
let menuMemberOrderListPrice = document.getElementById("menuMemberOrderListPrice");
// 1-8-4 separate
// 1-8-5 member order list
let memberOrderListBlock = document.getElementById("memberOrderListBlock");
// 1-8-6 separate
// 1-8-7 totel price
let memberOrderListtotelPriceBlock = document.getElementById("memberOrderListtotelPriceBlock");
let memberOrderListtotelPriceTitle = document.getElementById("memberOrderListtotelPriceTitle");
let memberOrderListtotelPrice = document.getElementById("memberOrderListtotelPrice");
// 1-8-8 separate
// 1-8-9 back submit
let backGroupSubmit = document.getElementById("backGroupSubmit");
let backGroupSubmitContent = document.getElementById("backGroupSubmitContent");
// 1-8-10 go to order submit
let goToOrderSubmit = document.getElementById("goToOrderSubmit");
let goToOrderSubmitContent = document.getElementById("goToOrderSubmitContent");
// 1-9 check order list
let checkOrderListBlock = document.getElementById("checkOrderListBlock");
// 1-9-1 check order list title
let checkOrderTitle = document.getElementById("checkOrderTitle");
// 1-9-2 separate
// 1-9-3 menu order list title
let menuOrderListItemsBlock = document.getElementById("menuOrderListItemsBlock");
let menuOrderListChoose = document.getElementById("menuOrderListChoose");
let menuOrderListMenu = document.getElementById("menuOrderListMenu");
let menuOrderListSize = document.getElementById("menuOrderListSize");
let menuOrderListPrice = document.getElementById("menuOrderListPrice");
// 1-9-4 separate
// 1-9-5 member order list
let checkUserOrderListBlock = document.getElementById("checkUserOrderListBlock");
// 1-9-6 separate
// 1-9-7 totel price
let orderListtotelPriceBlock = document.getElementById("orderListtotelPriceBlock");
let orderListtotelPriceTitle = document.getElementById("orderListtotelPriceTitle");
let checkUserTotalPrice = document.getElementById("checkUserTotalPrice");
// 1-9-8 separate
// 1-9-9 edit order
let editOrderSubmit = document.getElementById("editOrderSubmit");
let editOrderSubmitContent = document.getElementById("editOrderSubmitContent");
// 1-9-10 send out order
let sendOutOrderSubmit = document.getElementById("sendOutOrderSubmit");
let sendOutOrderSubmitContent = document.getElementById("sendOutOrderSubmitContent");
// 1-10 order is finish
let orderIsDoneBlock = document.getElementById("orderIsDoneBlock");
let orderIsDoneTitle = document.getElementById("orderIsDoneTitle");
let orderIsDoneSubmit = document.getElementById("orderIsDoneSubmit");
let orderIsDoneSubmitContent = document.getElementById("orderIsDoneSubmitContent");

// 1-11 check order list
let goOrderBlock = document.getElementById("goOrderBlock");
// 1-11-1 check order list title
let goOrderTitle = document.getElementById("goOrderTitle");
// 1-11-2 separate
// 1-11-3 menu order list title
let menuGoOrderListItemsBlock = document.getElementById("menuGoOrderListItemsBlock");
let menuGoOrderListChoose = document.getElementById("menuGoOrderListChoose");
let menuGoOrderListSize = document.getElementById("menuGoOrderListSize");
let menuGoOrderListPrice = document.getElementById("menuGoOrderListPrice");
// 1-11-4 separate
// 1-11-5 member order list
let checkUserGoOrderListBlock = document.getElementById("checkUserGoOrderListBlock");
// 1-11-6 separate
// 1-11-7 totel price
let goOrderTotelPriceBlock = document.getElementById("goOrderTotelPriceBlock");
let goOrderTotelPriceTitle = document.getElementById("goOrderTotelPriceTitle");
let goOrderTotelPrice = document.getElementById("goOrderTotelPrice");
// 1-11-8 separate
// 1-11-9 member price edit 
let memberPriceEditSubmit = document.getElementById("memberPriceEditSubmit");
let memberPriceEditSubmitContent = document.getElementById("memberPriceEditSubmitContent");
let memberPriceEditFinishSubmit = document.getElementById("memberPriceEditFinishSubmit");
// 1-11-10 Stop order
let stopOrderSubmit = document.getElementById("stopOrderSubmit");
let stopOrderSubmitContent = document.getElementById("stopOrderSubmitContent");
// 1-11-11 send out order
let finishOrderSubmit = document.getElementById("finishOrderSubmit");
let finishOrderSubmitContent = document.getElementById("finishOrderSubmitContent");
// 1-11-12 back submit
let backOrderMenuMemberSubmit = document.getElementById("backOrderMenuMemberSubmit");
let backOrderMenuMemberSubmitContent = document.getElementById("backOrderMenuMemberSubmitContent");

// 1-12 order is close
let orderIsCloseBlock = document.getElementById("orderIsCloseBlock");
let orderIsCloseTitle = document.getElementById("orderIsCloseTitle");
let orderIsCloseSubmit = document.getElementById("orderIsCloseSubmit");
let orderIsCloseSubmitContent = document.getElementById("orderIsCloseSubmitContent");
// 1-12-2 edit order
let editGoOrderSubmit = document.getElementById("editGoOrderSubmit");
let editGoOrderSubmitContent = document.getElementById("editGoOrderSubmitContent");



// ==== Create element ====


// ==== onload ====
checkMemberOrderListBlock.style.display = "none";
checkOrderListBlock.style.display = "none";
orderIsDoneBlock.style.display = "none";
goOrderBlock.style.display = "none";
orderIsCloseBlock.style.display = "none";
onloadOrderMenuPage();
async function onloadOrderMenuPage(){
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();
    urlStopTime = getOrderListStopTimeFromUrl();
    urlStopTime1 = urlStopTime.split(":")[1];
    urlStopTime2 = urlStopTime.split(":")[2];
    urlStopTime = urlStopTime1+":"+urlStopTime2
    let groupApiData = await groupStatus(urlGroupName);
    groupApiData = groupApiData.group;
    for (let i=0;i<Object.keys(groupApiData).length;i++){
        if (groupApiData[i].groupName == urlGroupName){            
            groupId = groupApiData[i].groupId;
        };
    };
    urlStoreName = getStoreNameFromUrl();
    pageTitleContent.textContent = urlStoreName;
    let storeApiGetData = await storeApiGet(urlGroupName);
    storeApiGetData = storeApiGetData.store;
    for (let i=0;i<Object.keys(storeApiGetData).length;i++){
        if (storeApiGetData[i].storeName == urlStoreName){            
            storeId = storeApiGetData[i].storeId;
        };
    };
    createMenuList(urlGroupName,urlStoreName);
}
// ==== create event listener ====
menuSubmitButton.addEventListener("click",menuSubmitButtonClick);
editOrderSubmit.addEventListener("click",editOrderSubmitClick);
sendOutOrderSubmit.addEventListener("click",sendOutOrderSubmitClick);
orderIsDoneSubmit.addEventListener("click",orderIsDoneSubmitClick);
menuEditCreateButton.addEventListener("click",menuEditCreateButtonClick);
checkAllOrderMenuButton.addEventListener("click",checkAllOrderMenuButtonClick);
goToOrderSubmit.addEventListener("click",goToOrderSubmitClick);
backOrderMenuSubmit.addEventListener("click",backOrderMenuSubmitClick);
editGoOrderSubmit.addEventListener("click",editGoOrderSubmitClick);
stopOrderSubmit.addEventListener("click",stopOrderSubmitClick);
memberPriceEditSubmit.addEventListener("click",memberPriceEditSubmitClick);
backOrderMenuMemberSubmit.addEventListener("click",backOrderMenuMemberSubmitClick);
finishOrderSubmit.addEventListener("click",finishOrderSubmitClick);
orderIsCloseSubmit.addEventListener("click",orderIsCloseSubmitClick);
backGroupIntoSubmit.addEventListener("click",backGroupIntoSubmitClick);
memberPriceEditFinishSubmit.addEventListener("click",memberPriceEditFinishSubmitClick);
// ==== Function ====

// Ori page 
// 1-5
async function createMenuList(urlGroupName,urlStoreName){
    let getMenuData = await menuApiGet(urlGroupName,urlStoreName);
    menuList = getMenuData.menu;
    createElement(menuListBlcok, "form", "menuListBlockFrom", "menuListBlockFrom", null, "appendChild");
    for(i=0;i<Object.keys(menuList).length;i++){
        menuName = menuList[i]["menuName"];
        menuSize = menuList[i]["menuSize"];
        menuPrice = menuList[i]["menuPrice"];
        menuNote = menuList[i]["menuNote"];
        menuInputValue = JSON.stringify({
            "menuName":menuName,
            "menuSize":menuSize,
            "menuPrice":menuPrice,
            "menuNote":menuNote
        });
        createDivElement(menuListBlockFrom,`menuBlock${i}`, "menuItemsBlock", null, "appendChild");
        createInputElement(eval(`menuBlock${i}`),addId=`menuNumber${i}`,addClass="menuNumber", addText = null, appendForm = "appendChild",inputType = "number", inputValue =0,inputName = "orderQty");
        eval(`menuNumber${i}`).addEventListener("input", function() {
            if (this.value < 0) {
                this.value = 0;
            };
            this.value = parseInt(this.value);
        });
        createDivElement(eval(`menuBlock${i}`), `menuName${i}`, "menuName", menuName);
        createDivElement(eval(`menuBlock${i}`), `menuSize${i}`, "menuSize", menuSize);
        createDivElement(eval(`menuBlock${i}`), `menuPrice${i}`, "menuPrice", menuPrice);
        createDivElement(eval(`menuBlock${i}`), `menuNote${i}`, "menuNote", menuNote);
    };
};
// 1-7 Submit
async function menuSubmitButtonClick(){
    let orderListGetData = await orderListApiGet(urlGroupName,urlStoreName,urlStopTime,getStatus = "alive");
    let menuOrderQuantity = document.querySelectorAll("input[type='number']");
    menuOrderDataAll = [];
    let menuOrderDataList = {};
    for (let i = 0; i < menuOrderQuantity.length; i++){
        if (menuOrderQuantity[i].value > 0) {
            let menuOrderQuantityValue = menuOrderQuantity[i].value;
            let menuNameValue = eval(`menuName${i}`).textContent;
            let menuSizeValue = eval(`menuSize${i}`).textContent;
            let menuPriceValue = eval(`menuPrice${i}`).textContent;
            let menuNoteValue = eval(`menuNote${i}`).textContent;
            
            menuOrderDataList = {
                "menuOrderQuantity":menuOrderQuantityValue,
                "menuName":menuNameValue,
                "menuSize":menuSizeValue,
                "menuPrice":menuPriceValue,
                "menuNote":menuNoteValue,
            };
            menuOrderDataAll.push(menuOrderDataList);
          };
    };
    checkOrderListBlock.style.display = "flex";
    menuItemsBlock.style.display = "none";
    separate1.style.display = "none";
    menuListBlcok.style.display = "none";
    menuButtonBlock.style.display = "none";
    showcheckOrderListBlock(menuOrderDataAll);
};
// 1-7 Edit
function menuEditCreateButtonClick(){
    window.location.href = `/group/${urlGroupName}/${urlStoreName}/order_edit`;
};


// 1-7 Check member
async function checkAllOrderMenuButtonClick(){
    menuItemsBlock.style.display = "none";
    menuListBlcok.style.display = "none";
    menuButtonBlock.style.display = "none";
    checkMemberOrderListBlock.style.display = "flex";
    checkOrderListBlock.style.display = "none";
    orderIsDoneBlock.style.display = "none";
    separate1.style.display = "none";
    let getStatusAlive = "alive";
    let getStatusOrdering = "ordering";

    let orderListGetDataAlive = await orderListApiGet(urlGroupName,urlStoreName,urlStopTime,getStatusAlive);
    let orderListGetDataOrdering = await orderListApiGet(urlGroupName,urlStoreName,urlStopTime,getStatusOrdering);
    if (orderListGetDataAlive.orderListStatus == "alive"){
        orderListId = orderListGetDataAlive.orderListId;
        let orderListStatus = "alive";
        checkOrderListStatus(orderListStatus);

        let orderGetData = await orderApiGet(orderListId);
        menuOrderDataForAllMember = orderGetData.order;
        showAllMemberOrderListBlock(menuOrderDataForAllMember);
        sortoutAllMemberOrderListBlock(menuOrderDataForAllMember);
    };
    if (orderListGetDataOrdering.orderListStatus == "ordering"){
        orderListId = orderListGetDataOrdering.orderListId;
        let orderListStatus = "ordering";
        checkOrderListStatus(orderListStatus);
        let orderGetData = await orderApiGet(orderListId);
        menuOrderDataForAllMember = orderGetData.order;
        showAllMemberOrderListBlock(menuOrderDataForAllMember);
        sortoutAllMemberOrderListBlock(menuOrderDataForAllMember);
    };
};
// 1-7 Check member function
async function showAllMemberOrderListBlock(menuOrderDataForAllMember){
    let memberTotalPrice = 0;
    createDivElement(memberOrderListBlock,`memberOrderListBlockBlock`, "memberOrderListBlockBlock", null, "appendChild");
    for(i=0;i<Object.keys(menuOrderDataForAllMember).length;i++){
        userName = menuOrderDataForAllMember[i]["userName"];
        menuName = menuOrderDataForAllMember[i]["menuName"];
        menuSize = menuOrderDataForAllMember[i]["menuSize"];
        orderQuantity = menuOrderDataForAllMember[i]["orderQuantity"];
        orderPrice = menuOrderDataForAllMember[i]["orderPrice"];
        orderNote = menuOrderDataForAllMember[i]["orderNote"];
        // Show in 1-8
        createDivElement(memberOrderListBlockBlock,`memberOrderList${i}`, "menuMemberOrderListItemsBlock", null, "appendChild");
        createDivElement(eval(`memberOrderList${i}`), `memberOrderListUserName${i}`, "memberOrderListUserName", userName);
        createDivElement(eval(`memberOrderList${i}`), `memberOrderListMenuName${i}`, "memberOrderListMenuName", menuName);
        createDivElement(eval(`memberOrderList${i}`), `memberOrderListOrderQuantity${i}`, "memberOrderListOrderQuantity", orderQuantity);     
        createDivElement(eval(`memberOrderList${i}`), `memberOrderListMenuSize${i}`, "memberOrderListMenuSize", menuSize);
        createDivElement(eval(`memberOrderList${i}`), `memberOrderListOrderPrice${i}`, "memberOrderListOrderPrice", orderPrice);
        createDivElement(eval(`memberOrderList${i}`), `memberOrderListOrderNote${i}`, "memberOrderListOrderNote", orderNote);
        memberTotalPrice = memberTotalPrice+orderPrice/orderQuantity*orderQuantity;
    };
    memberOrderListtotelPrice.textContent = memberTotalPrice;
};

async function sortoutAllMemberOrderListBlock(menuOrderDataForAllMember){
    let memberTotalPriceGoOrder = 0;
    let orderDataALL = [];
    for(i=0;i<Object.keys(menuOrderDataForAllMember).length;i++){
        userNameValue = menuOrderDataForAllMember[i]["userName"];
        menuNameValue = menuOrderDataForAllMember[i]["menuName"];
        menuSizeValue = menuOrderDataForAllMember[i]["menuSize"];
        orderQuantityValue = menuOrderDataForAllMember[i]["orderQuantity"];
        orderPriceValue = menuOrderDataForAllMember[i]["orderPrice"];
        orderNoteValue = menuOrderDataForAllMember[i]["orderNote"];
        orderDataList = {
            "menuName":menuNameValue,
            "menuSize":menuSizeValue,
            "orderPrice":parseInt(orderPriceValue),
            "orderQuantity":parseInt(orderQuantityValue)
        };
        orderDataALL.push(orderDataList);
    };
    let orderDataSortout = orderDataALL.reduce((acc, curr) => {
        let existing = acc.find(item => item.menuName === curr.menuName && item.menuSize === curr.menuSize);
        if (existing) {
            existing.orderQuantity += curr.orderQuantity;
            existing.orderPrice += curr.orderPrice;
        } else {
            acc.push(curr);
        }
        return acc;
    }, []);

    createDivElement(checkUserGoOrderListBlock,`checkUserGoOrderListBlockBlock`, "checkUserGoOrderListBlockBlock", null, "appendChild");
    for(i=0;i<Object.keys(orderDataSortout).length;i++){
        menuName = orderDataSortout[i]["menuName"];
        menuSize = orderDataSortout[i]["menuSize"];
        let orderQuantity = orderDataSortout[i]["orderQuantity"];
        let orderPrice = orderDataSortout[i]["orderPrice"] ;
        let onePrice = parseInt(orderPrice)/parseInt(orderQuantity);
        orderInputValue = JSON.stringify({
            "menuName":menuName,
            "menuSize":menuSize,
            "orderPrice":orderPrice,
            "orderQuantity":orderQuantity
        });
        // Show in 1-8
        createDivElement(checkUserGoOrderListBlockBlock,`checkUserGoOrderList${i}`, "menuGoOrderListItemsBlock", null, "appendChild");
        createInputElement(eval(`checkUserGoOrderList${i}`),addId=`checkUserGoOrderListMenuChoose${i}`,addClass="menuCheckbox", addText = null, appendForm = "appendChild",inputType = "radio", inputValue =orderInputValue,inputName = "manuEdit");
        createDivElement(eval(`checkUserGoOrderList${i}`), `checkUserGoOrderListMenuName${i}`, "checkUserGoOrderListMenuName", menuName);
        createDivElement(eval(`checkUserGoOrderList${i}`), `checkUserGoOrderListMenuSize${i}`, "checkUserGoOrderListMenuSize", menuSize);
        createDivElement(eval(`checkUserGoOrderList${i}`), `checkUserGoOrderListOrderQuantity${i}`, "checkUserGoOrderListOrderQuantity", orderQuantity);
        createDivElement(eval(`checkUserGoOrderList${i}`), `checkUserGoOrderListOrderPrice${i}`, "checkUserGoOrderListOrderPrice", onePrice);
        memberTotalPriceGoOrder = memberTotalPriceGoOrder+onePrice*orderQuantity;
    }
    goOrderTotelPrice.textContent = memberTotalPriceGoOrder;
}

// """"""""""""""""""""""""""

// 1-7 go to order 
async function goToOrderSubmitClick(){
    menuItemsBlock.style.display = "none";
    menuListBlcok.style.display = "none";
    menuButtonBlock.style.display = "none";
    checkMemberOrderListBlock.style.display = "none";
    checkOrderListBlock.style.display = "none";
    orderIsDoneBlock.style.display = "none";
    goOrderBlock.style.display = "flex";
    orderIsCloseBlock.style.display = "none";
    memberPriceEditFinishSubmit.style.display = "none";
    memberPriceEditSubmit.style.display = "flex";
};

function backGroupIntoSubmitClick(){
    window.location.href = `/group/${urlGroupName}`;
};

// Go to order page

// user order page
// 1-9
async function showcheckOrderListBlock(menuOrderDataAll){
    let userTotalPrice = 0;
    createDivElement(checkUserOrderListBlock,`checkUserOrderListBlockBlock`, "checkUserOrderListBlockBlock", null, "appendChild");
    for(i=0;i<Object.keys(menuOrderDataAll).length;i++){
        menuOrderQuantity = menuOrderDataAll[i]["menuOrderQuantity"];
        menuName = menuOrderDataAll[i]["menuName"];
        menuSize = menuOrderDataAll[i]["menuSize"];
        menuPrice = menuOrderDataAll[i]["menuPrice"];
        menuNote = menuOrderDataAll[i]["menuNote"];
        menuInputValue = JSON.stringify({
            "menuName":menuName,
            "menuSize":menuSize,
            "menuPrice":menuPrice,
            "menuNote":menuNote
        });
        createDivElement(checkUserOrderListBlockBlock,`checkUserOrderList${i}`, "menuOrderListItemsBlock", null, "appendChild");
        
        createDivElement(eval(`checkUserOrderList${i}`), `checkUserOrderMenuName${i}`, "checkUserOrderMenuName", menuName);
        createDivElement(eval(`checkUserOrderList${i}`), `checkUserOrderMenuSize${i}`, "checkUserOrderMenuSize", menuSize);
        createDivElement(eval(`checkUserOrderList${i}`), `checkUserOrderMenuNumber${i}`, "checkUserOrderMenuNumber", menuOrderQuantity);
        createDivElement(eval(`checkUserOrderList${i}`), `checkUserOrderMenuPrice${i}`, "checkUserOrderMenuPrice", menuPrice);
        createDivElement(eval(`checkUserOrderList${i}`), `checkUserOrderMenuNote${i}`, "checkUserOrderMenuNote", menuNote);
        userTotalPrice = userTotalPrice+(menuPrice*menuOrderQuantity);
    };
    checkUserTotalPrice.textContent = userTotalPrice;
}
// 1-9 Back Submit
function editOrderSubmitClick(){
    checkUserOrderListBlockBlock.remove();
    checkOrderListBlock.style.display = "none";
    menuItemsBlock.style.display = "grid";
    separate1.style.display = "flex";
    menuListBlcok.style.display = "flex";
    menuButtonBlock.style.display = "flex";
};
// 1-9 OK submit
async function sendOutOrderSubmitClick(){
    for (let i=0;i<Object.keys(menuOrderDataAll).length;i++){
        menuOrderQuantity = menuOrderDataAll[i]["menuOrderQuantity"];
        menuName = menuOrderDataAll[i]["menuName"];
        menuSize = menuOrderDataAll[i]["menuSize"];
        menuPrice = menuOrderDataAll[i]["menuPrice"];
        menuNote = menuOrderDataAll[i]["menuNote"];
        let data = {
            "urlStopTime":urlStopTime,
            "storeId":storeId,
            "groupId":groupId,
            "menuOrderQuantity":menuOrderQuantity,
            "menuName":menuName,
            "menuSize":menuSize,
            "menuPrice":menuPrice,
            "menuNote":menuNote,            
        };
        let orderPostResult = await orderApiPost(data);
    };
    orderIsDoneBlock.style.display = "flex";
    checkOrderListBlock.style.display = "none";
    menuItemsBlock.style.display = "none";
    separate1.style.display = "none";
    menuListBlcok.style.display = "none";
    menuButtonBlock.style.display = "none";
};

// Order finish page
// 1-10 Done 
function orderIsDoneSubmitClick(){
    window.location.href = `/group/${urlGroupName}`;
};

// 1-8
async function backOrderMenuSubmitClick(){
    location.reload();
};
// 1-11
function editGoOrderSubmitClick(){
    window.location.href = `/group/${urlGroupName}/${urlStoreName}/order_edit`;
};

async function stopOrderSubmitClick(){
    let data = {
        "orderListId":orderListId,
        "groupId":groupId,
        "newStoreName":null,
        "newOrderListManagerEmail":null,
        "newStopTime":null,        
        "orderListStatus":"ordering",
        "newOrderListNote":null
    };
    let orderListApiPatchResult = await orderListApiPatch(data);
    if (orderListApiPatchResult.ok == true){
        stopOrderSubmit.style.display = "none";
        finishOrderSubmit.style.display = "flex";
        memberPriceEditSubmit.style.display = "flex";
    }else{
    };
};
// 1-11 Check order list status 
async function checkOrderListStatus(orderListStatus){
    // backOrderMenuMemberSubmit
    if (orderListStatus == "alive"){
        stopOrderSubmit.style.display = "flex";
        memberPriceEditSubmit.style.display = "none";
        finishOrderSubmit.style.display = "none";
    };
    if (orderListStatus == "ordering"){
        stopOrderSubmit.style.display = "none";
        memberPriceEditSubmit.style.display = "flex";
        finishOrderSubmit.style.display = "flex";
    };
};
// 1-11-9 member price edit
async function memberPriceEditSubmitClick(){
    let chosenMenu = document.querySelector('input[name=manuEdit]:checked');
    let chosenMenuId = chosenMenu.id;
    let menuNumber = chosenMenuId.replace(/^checkUserGoOrderListMenuChoose/g, "");
    menuOriNoteValue = eval(`checkUserGoOrderListOrderPrice${menuNumber}`).textContent;

    replaceElement(eval(`checkUserGoOrderListOrderPrice${menuNumber}`), "input",`checkUserGoOrderListOrderPriceNew${menuNumber}`,"menuNew",menuOriNoteValue,inputType = "text");
    let chosenMenuValue = JSON.parse(chosenMenu.value);
    memberPriceEditFinishSubmit.style.display = "flex";
    memberPriceEditSubmit.style.display = "none";
    finishOrderSubmit.style.display = "none";
}

async function memberPriceEditFinishSubmitClick(){
    let chosenMenu = document.querySelector('input[name=manuEdit]:checked');
    let chosenMenuId = chosenMenu.id;
    let menuNumber = chosenMenuId.replace(/^checkUserGoOrderListMenuChoose/g, "");
    let menuNewValue = JSON.parse(eval(`checkUserGoOrderListMenuChoose${menuNumber}`).value);
    
    let menuName = menuNewValue.menuName;
    let menuSize = menuNewValue.menuSize;
    let menuNewPriceValue = eval(`checkUserGoOrderListOrderPriceNew${menuNumber}`).value;
    let menuTotalQuantityValue = menuNewValue.orderQuantity;
    let dataPatchMenu = {
        "storeName":urlStoreName,
        "groupId":groupId,
        "menu":{
            "menuName":menuName,
            "menuSize":menuSize,
            "menuPrice":"",
            "menuNote":"null",
            "menuNewName":menuName,
            "menuNewSize":menuSize,
            "menuNewPrice":menuNewPriceValue,
            "menuNewNote":"null",
            "menuNewStatus":"alive"
            }
    };
    let menuApiPatchData = await menuApiPatch(dataPatchMenu);
    let menuId = menuApiPatchData.menuId;
    let dataPatchOrder = {
        "groupId":groupId,
        "userId":null,
        "orderListId":orderListId,
        "storeName":urlStoreName,
        "menuName":menuName,
        "menuSize":menuSize,
        "menuNewName":menuName,
        "menuNewSize":menuSize,
        "orderQuantity":null,
        "orderStatus":"alive",
        "orderNote":null
    };
    let orderApiPatchResult = await orderApiPatch(dataPatchOrder);
    
    replaceElement(eval(`checkUserGoOrderListOrderPriceNew${menuNumber}`), "div",`checkUserGoOrderListOrderPrice${menuNumber}`,"checkUserGoOrderListOrderPrice",menuNewPriceValue,inputType = "text");
    
    memberPriceEditFinishSubmit.style.display = "none";
    memberPriceEditSubmit.style.display = "flex";

    let itemsDivNumber = checkUserGoOrderListBlockBlock.getElementsByTagName("div");
    let itemsDivNumberLength = itemsDivNumber.length;
    let itemsDivQuantity = itemsDivNumberLength/5;
    let editedTotalPrice = 0;
    for (let i=0;i<itemsDivQuantity;i++){
        let totalQuantity = eval(`checkUserGoOrderListOrderQuantity${i}`).textContent;
        let totalPrice = eval(`checkUserGoOrderListOrderPrice${i}`).textContent;
        let itemtotalPrice = Number(totalQuantity)*Number(totalPrice);
        editedTotalPrice = editedTotalPrice + itemtotalPrice;
    }
    goOrderTotelPrice.textContent = editedTotalPrice;

};

async function backOrderMenuMemberSubmitClick(){
    menuItemsBlock.style.display = "none";
    menuListBlcok.style.display = "none";
    menuButtonBlock.style.display = "none";
    checkMemberOrderListBlock.style.display = "flex";
    checkOrderListBlock.style.display = "none";
    orderIsDoneBlock.style.display = "none";
    goOrderBlock.style.display = "none";
    orderIsCloseBlock.style.display = "none";       
};

async function finishOrderSubmitClick(){
    let data = {
        "joinUserEmail":null,
        "orderListId":orderListId,
        "groupId":groupId,
        "groupName":null
    };
    let billApiPostResult = await billApiPost(data);
    if (billApiPostResult.ok == true){
        menuItemsBlock.style.display = "none";
        menuListBlcok.style.display = "none";
        menuButtonBlock.style.display = "none";
        checkMemberOrderListBlock.style.display = "none";
        checkOrderListBlock.style.display = "none";
        orderIsDoneBlock.style.display = "none";
        goOrderBlock.style.display = "none";
        orderIsCloseBlock.style.display = "flex";
        let data = {
            "orderListId":orderListId,
            "groupId":groupId,
            "newStoreName":null,
            "newOrderListManagerEmail":null,
            "newStopTime":null,        
            "orderListStatus":"finish",
            "newOrderListNote":null
        };
        let orderListApiPatchResult = await orderListApiPatch(data);
        
    }
    else{
    };

};

function orderIsCloseSubmitClick(){
    window.location.href = `/group/${urlGroupName}`;
};
