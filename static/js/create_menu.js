// ==== Get element ====
// 1-3 create menu
let createMenuBlock = document.getElementById("createMenuBlock");
// 1-3-1 menu name
let createMenuNameBlock = document.getElementById("createMenuNameBlock");
let createMenuNameTitle = document.getElementById("createMenuNameTitle");
let createMenuNameInput = document.getElementById("createMenuNameInput");
let createMenuName = document.getElementById("createMenuName");
// 1-3-2 menu size
let createMenuSizeBlock = document.getElementById("createMenuSizeBlock");
let createMenuSizeTitle = document.getElementById("createMenuSizeTitle");
let createMenuSizeInput = document.getElementById("createMenuSizeInput");
let createMenuSize = document.getElementById("createMenuSize");
// 1-3-3 menu price
let createMenuPriceBlock = document.getElementById("createMenuPriceBlock");
let createMenuPriceTitle = document.getElementById("createMenuPriceTitle");
let createMenuPriceInput = document.getElementById("createMenuPriceInput");
let createMenuPrice = document.getElementById("createMenuPrice");
// 1-3-X menu type
let createMenuTypeBlock = document.getElementById("createMenuTypeBlock");
let createMenuTypeTitle = document.getElementById("createMenuTypeTitle");
let createMenuTypeInput = document.getElementById("createMenuTypeInput");
let createMenuType = document.getElementById("createMenuType");

// 1-3-4 Menu note
let createMenuNoteBlock = document.getElementById("createMenuNoteBlock");
let createMenuNoteTitle = document.getElementById("createMenuNoteTitle");
let createMenuNoteInput = document.getElementById("createMenuNoteInput");
let createMenuNote = document.getElementById("createMenuNote");

// 1-3-5 Error Message
let createMenuErroeMessage = document.getElementById("createMenuErroeMessage");
let createMenuErroeMessageContent = document.getElementById("createMenuErroeMessageContent");

// 1-3-6 menu add submit
let createMenuAddSubmit = document.getElementById("createMenuAddSubmit");
let createMenuAddSubmitContent = document.getElementById("createMenuAddSubmitContent");

// 1-5 already create menu title
let createMenuAlreadyTitleBlock = document.getElementById("createMenuAlreadyTitleBlock");
let createMenuAlreadyTitle = document.getElementById("createMenuAlreadyTitle");
let createMenuAlreadyItemsBlock = document.getElementById("createMenuAlreadyItemsBlock");
let createMenuAlreadyChoose = document.getElementById("createMenuAlreadyChoose");
let createMenuAlreadyMenu = document.getElementById("createMenuAlreadyMenu");
let createMenuAlreadySize = document.getElementById("createMenuAlreadySize");
let createMenuAlreadyPrice = document.getElementById("createMenuAlreadyPrice");

// 1-7 already created menu
let alreadyCreatedMenuBlcok = document.getElementById("alreadyCreatedMenuBlcok");
// 1-8 menu button
let createMenuButtonBlock = document.getElementById("createMenuButtonBlock");
let createMenuErroeMessage2 = document.getElementById("createMenuErroeMessage2");
let createMenuErroeMessageContent2 = document.getElementById("createMenuErroeMessageContent2");
let createMenuEditMenuButton = document.getElementById("createMenuEditMenuButton");
let createMenuEditMenuContent = document.getElementById("createMenuEditMenuContent");
let createMenuRemoveMenuButton = document.getElementById("createMenuRemoveMenuButton");
let createMenuEditFinishMenuButton = document.getElementById("createMenuEditFinishMenuButton");
let createMenuEditFinishMenuContent = document.getElementById("createMenuEditFinishMenuContent");

let createMenuFinishButton = document.getElementById("createMenuFinishButton");
let createMenuFinishContent = document.getElementById("createMenuFinishContent");
let createMenuAddMenuButton = document.getElementById("createMenuAddMenuButton");
let createMenuBackToLoadButton = document.getElementById("createMenuBackToLoadButton");
// menu delete
let deleteMenuConfirmBlock = document.getElementById("deleteMenuConfirmBlock");
let deleteMenuConfirmNoButton = document.getElementById("deleteMenuConfirmNoButton");
let deleteMenuConfirmYesButton = document.getElementById("deleteMenuConfirmYesButton");


// 1-3-8 back submit
// let createMenuBackGroupSubmit = document.getElementById("createMenuBackGroupSubmit");
// let createMenuBackGroupSubmitContent = document.getElementById("createMenuBackGroupSubmitContent");

// ==== Create element ====

// ==== onload ====
// let menuOriTypeValue;
// let menuOriNameValue;
// let menuOriSizeValue;
// let menuOriPriceValue;
// let menuOriNoteValue;
createMenuBlock.style.display = "none";
// createMenuBackGroupSubmit.style.display = "none";
createMenuEditFinishMenuButton.style.display = "none";
createMenuRemoveMenuButton.style.display = "none";
onloadCreateMenuPage();
fromCreateOrOrderMenu(getSplit4FromUrl());
async function onloadCreateMenuPage(){
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();
    
    userCheckInGroup(urlGroupName);
    let groupApiData = await groupStatus(urlGroupName,"alive");
    groupApiData = groupApiData.group;
    for (i=0;i<Object.keys(groupApiData).length;i++){
        if (groupApiData[i].groupName == urlGroupName){            
            groupId = groupApiData[i].groupId;
        }
    }
    urlStoreName = getStoreNameFromUrl();
    let storeApiGetData = await storeApiGet(urlGroupName);
    storeApiGetData = storeApiGetData.store;
    for (i=0;i<Object.keys(storeApiGetData).length;i++){
        if (storeApiGetData[i].storeName == urlStoreName){            
            storeId = storeApiGetData[i].storeId;
        }
    }
    pageTitleContent.textContent = "?????????"+urlStoreName+"????????????";
    generateMenu(urlGroupName,urlStoreName);

}
// ==== create event listener ====
createMenuAddSubmit.addEventListener("click",createMenuAddSubmitClick);
createMenuEditMenuButton.addEventListener("click",createMenuEditMenuButtonClick);
createMenuEditFinishMenuButton.addEventListener("click",createMenuEditFinishMenuButtonClick);
createMenuFinishButton.addEventListener("click",createMenuFinishButtonClick);
// createMenuBackGroupSubmit.addEventListener("click",createMenuBackGroupSubmitClick);
createMenuRemoveMenuButton.addEventListener("click",createMenuRemoveMenuButtonClick);
createMenuAddMenuButton.addEventListener("click",createMenuAddMenuButtonClick);
createMenuBackToLoadButton.addEventListener("click",createMenuBackToLoadButtonClick);
deleteMenuConfirmNoButton.addEventListener("click",deleteMenuConfirmNoButtonClick);
deleteMenuConfirmYesButton.addEventListener("click",deleteMenuConfirmYesButtonClick);
// ==== Function ====
function noDisplayAll(){
    createMenuBlock.style.display = "none";
    createMenuAlreadyTitleBlock.style.display = "none";
    alreadyCreatedMenuBlcok.style.display = "none";
    createMenuButtonBlock.style.display = "none";
}

async function createMenuAddSubmitClick(){
    let createMenuNameValue = "";
    let createMenuSizeValue = "";
    let createMenuPriceValue = "";
    let createMenuNoteValue = "";
    let createMenuTypeValue = "";
    createMenuNameValue = createMenuName.value;
    createMenuSizeValue = createMenuSize.value;
    createMenuPriceValue = createMenuPrice.value;
    createMenuNoteValue = createMenuNote.value;
    createMenuTypeValue = createMenuType.value;

    if (createMenuNameValue == "" || createMenuPriceValue == "" || isNaN(createMenuPriceValue) == true){
        if (createMenuNameValue == "" || createMenuPriceValue == ""){
            createMenuErroeMessageContent.textContent = "??????????????????????????????";
        };
        if(isNaN(createMenuPriceValue) == true){
            createMenuErroeMessageContent.textContent = "???????????????????????????";
        }
    }
    else{
        let data = {
            "storeName":urlStoreName,
            "groupId":groupId,
            "menu":{
                "menuName":createMenuNameValue,
                "menuSize":createMenuSizeValue,
                "menuType":createMenuTypeValue,
                "menuPrice":createMenuPriceValue,
                "menuStatus":"alive",
                "menuNote":createMenuNoteValue
                }
        };
        result = await menuApiPost(data);
        if (result.ok == true){
        }
        else{
            resultMessage = result.message;
            createMenuErroeMessageContent.textContent = resultMessage;
        }
        location.reload();
    };
};

async function generateMenu(urlGroupName,urlStoreName){
    let getMenuData = await menuApiGet(urlGroupName,urlStoreName);
    menuList = getMenuData.menu;
    createElement(alreadyCreatedMenuBlcok, "form", "menuBlockFrom", "menuBlockFrom", null, "appendChild");
    if (menuList != null){
        for(i=0;i<Object.keys(menuList).length;i++){
            menuName = menuList[i]["menuName"];
            menuSize = menuList[i]["menuSize"];
            menuPrice = menuList[i]["menuPrice"];
            menuNote = menuList[i]["menuNote"];
            menuType = menuList[i]["menuType"];
            menuInputValue = JSON.stringify({
                "menuName":menuName,
                "menuSize":menuSize,
                "menuPrice":menuPrice,
                "menuNote":menuNote,
                "menuType":menuType
            });
            createDivElement(menuBlockFrom,`menuBlock${i}`, "createMenuAlreadyItemsBlock", null, "appendChild");
            createInputElement(eval(`menuBlock${i}`),addId=`menuCheckbox${i}`,addClass="menuCheckbox", addText = null, appendForm = "appendChild",inputType = "radio", inputValue =menuInputValue,inputName = "manuCreated");
            createDivElement(eval(`menuBlock${i}`), `menuType${i}`, "menuType", menuType);
            createDivElement(eval(`menuBlock${i}`), `menuName${i}`, "menuName", menuName);
            createDivElement(eval(`menuBlock${i}`), `menuSize${i}`, "menuSize", menuSize);
            createDivElement(eval(`menuBlock${i}`), `menuPrice${i}`, "menuPrice", menuPrice);
            createDivElement(eval(`menuBlock${i}`), `menuNote${i}`, "menuNote", menuNote);
        };
    };
};

async function createMenuEditMenuButtonClick(){
    let chosenMenu = document.querySelector('input[name=manuCreated]:checked');
    createMenuErroeMessageContent2.textContent = "";
    if (chosenMenu == null){
        createMenuErroeMessageContent2.textContent = "???????????????";
    }
    else{
        let chosenMenuId = chosenMenu.id;
        let menuNumber = chosenMenuId.replace(/^menuCheckbox/g, "");

        menuOriTypeValue = eval(`menuType${menuNumber}`).textContent;
        menuOriNameValue = eval(`menuName${menuNumber}`).textContent;
        menuOriSizeValue = eval(`menuSize${menuNumber}`).textContent;
        menuOriPriceValue = eval(`menuPrice${menuNumber}`).textContent;
        menuOriNoteValue = eval(`menuNote${menuNumber}`).textContent;
        replaceElement(eval(`menuType${menuNumber}`), "input",`menuNewType${menuNumber}`,"menuNew",menuOriTypeValue,inputType = "text");
        replaceElement(eval(`menuName${menuNumber}`), "input",`menuNewName${menuNumber}`,"menuNew",menuOriNameValue,inputType = "text");
        replaceElement(eval(`menuSize${menuNumber}`), "input",`menuNewSize${menuNumber}`,"menuNew",menuOriSizeValue,inputType = "text");
        replaceElement(eval(`menuPrice${menuNumber}`), "input",`menuNewPrice${menuNumber}`,"menuNew",menuOriPriceValue,inputType = "text");
        replaceElement(eval(`menuNote${menuNumber}`), "input",`menuNewNote${menuNumber}`,"menuNew",menuOriNoteValue,inputType = "text");
        let chosenMenuValue = JSON.parse(chosenMenu.value);
        createMenuEditFinishMenuButton.style.display = "flex";
        createMenuRemoveMenuButton.style.display = "flex";
        createMenuAddMenuButton.style.display = "none";
        createMenuEditMenuButton.style.display = "none";
    };
};

async function createMenuEditFinishMenuButtonClick(){
    let chosenMenu = document.querySelector('input[name=manuCreated]:checked');
    let chosenMenuId = chosenMenu.id;
    let menuNumber = chosenMenuId.replace(/^menuCheckbox/g, "");
    let menuNewTypeValue = eval(`menuNewType${menuNumber}`).value;
    let menuNewNameValue = eval(`menuNewName${menuNumber}`).value;
    let menuNewSizeValue = eval(`menuNewSize${menuNumber}`).value;
    let menuNewPriceValue = eval(`menuNewPrice${menuNumber}`).value;
    let menuNewNoteValue = eval(`menuNewNote${menuNumber}`).value;
    if (isNaN(menuNewPriceValue) == true){
        createMenuErroeMessageContent2.textContent = "???????????????????????????"
    }
    else{
        let data = {
            "storeName":urlStoreName,
            "groupId":groupId,
            "menu":{
                "menuType":menuOriTypeValue,
                "menuName":menuOriNameValue,
                "menuSize":menuOriSizeValue,
                "menuPrice":menuOriPriceValue,
                "menuNote":menuOriNoteValue,
                "menuNewType":menuNewTypeValue,
                "menuNewName":menuNewNameValue,
                "menuNewSize":menuNewSizeValue,
                "menuNewPrice":menuNewPriceValue,
                "menuNewNote":menuNewNoteValue,
                "menuNewStatus":"alive"
                }
        };
        let menuApiPatchData = await menuApiPatch(data);
        if (menuApiPatchData.ok == true){
            replaceElement(eval(`menuNewType${menuNumber}`), "div",`menuType${menuNumber}`,"menuType",menuNewTypeValue,inputType = "text");
            replaceElement(eval(`menuNewName${menuNumber}`), "div",`menuName${menuNumber}`,"menuName",menuNewNameValue,inputType = "text");
            replaceElement(eval(`menuNewSize${menuNumber}`), "div",`menuSize${menuNumber}`,"menuSize",menuNewSizeValue,inputType = "text");
            replaceElement(eval(`menuNewPrice${menuNumber}`), "div",`menuPrice${menuNumber}`,"menuPrice",menuNewPriceValue,inputType = "text");
            replaceElement(eval(`menuNewNote${menuNumber}`), "div",`menuNote${menuNumber}`,"menuNote",menuNewNoteValue,inputType = "text");
        };
        if (menuApiPatchData.message == "?????????????????????"){
            replaceElement(eval(`menuNewType${menuNumber}`), "div",`menuType${menuNumber}`,"menuType",menuOriTypeValue,inputType = "text");
            replaceElement(eval(`menuNewName${menuNumber}`), "div",`menuName${menuNumber}`,"menuName",menuOriNameValue,inputType = "text");
            replaceElement(eval(`menuNewSize${menuNumber}`), "div",`menuSize${menuNumber}`,"menuSize",menuOriSizeValue,inputType = "text");
            replaceElement(eval(`menuNewPrice${menuNumber}`), "div",`menuPrice${menuNumber}`,"menuPrice",menuOriPriceValue,inputType = "text");
            replaceElement(eval(`menuNewNote${menuNumber}`), "div",`menuNote${menuNumber}`,"menuNote",menuOriNoteValue,inputType = "text");
            createMenuErroeMessageContent2.textContent = "?????????????????????"
        };
        if (menuApiPatchData.message == "?????????"){
            replaceElement(eval(`menuNewType${menuNumber}`), "div",`menuType${menuNumber}`,"menuType",menuNewTypeValue,inputType = "text");
            replaceElement(eval(`menuNewName${menuNumber}`), "div",`menuName${menuNumber}`,"menuName",menuNewNameValue,inputType = "text");
            replaceElement(eval(`menuNewSize${menuNumber}`), "div",`menuSize${menuNumber}`,"menuSize",menuNewSizeValue,inputType = "text");
            replaceElement(eval(`menuNewPrice${menuNumber}`), "div",`menuPrice${menuNumber}`,"menuPrice",menuNewPriceValue,inputType = "text");
            replaceElement(eval(`menuNewNote${menuNumber}`), "div",`menuNote${menuNumber}`,"menuNote",menuNewNoteValue,inputType = "text");
            createMenuErroeMessageContent2.textContent = "?????????";
        };
        createMenuRemoveMenuButton.style.display = "none";
        createMenuEditFinishMenuButton.style.display = "none";
        createMenuEditMenuButton.style.display = "flex";
        createMenuAddMenuButton.style.display = "flex";
        createMenuErroeMessageContent2.style.display = "none";
    };
    
};

function createMenuFinishButtonClick(){
    window.location.href = `/group/${urlGroupName}/store_edit/${urlStoreName}`;
};

function fromCreateOrOrderMenu(url4){
    if (url4 == "order_edit"){
        createMenuFinishButton.style.display = "none";
        // createMenuBackGroupSubmit.style.display = "flex";
    }
};

function createMenuRemoveMenuButtonClick(){
    deleteMenuConfirmBlock.style.display = "flex";
    blockScreenFilter.style.display = "flex";
};

function deleteMenuConfirmNoButtonClick(){
    deleteMenuConfirmBlock.style.display = "none";
    blockScreenFilter.style.display = "none";
};

async function deleteMenuConfirmYesButtonClick(){
    let chosenMenu = document.querySelector('input[name=manuCreated]:checked');
    let chosenMenuId = chosenMenu.id;
    let menuNumber = chosenMenuId.replace(/^menuCheckbox/g, "");
    let menuNewTypeValue = eval(`menuNewType${menuNumber}`).value;
    let menuNewNameValue = eval(`menuNewName${menuNumber}`).value;
    let menuNewSizeValue = eval(`menuNewSize${menuNumber}`).value;
    let menuNewPriceValue = eval(`menuNewPrice${menuNumber}`).value;
    let menuNewNoteValue = eval(`menuNewNote${menuNumber}`).value;
    let data = {
        "storeName":urlStoreName,
        "groupId":groupId,
        "menu":{
            "menuType":menuOriTypeValue,
            "menuName":menuOriNameValue,
            "menuSize":menuOriSizeValue,
            "menuPrice":menuOriPriceValue,
            "menuNote":menuOriNoteValue,
            "menuNewType":menuNewTypeValue,
            "menuNewName":menuNewNameValue,
            "menuNewSize":menuNewSizeValue,
            "menuNewPrice":menuNewPriceValue,
            "menuNewNote":menuNewNoteValue,
            "menuNewStatus":"stop"
            }
    };
    let menuApiPatchResult = await menuApiPatch(data);
    let dataPatchOrder = {
        "groupId":groupId,
        "userId":null,
        "orderListId":orderListId,
        "storeName":urlStoreName,
        "menuName":menuNewNameValue,
        
        "menuSize":menuNewSizeValue,
        "menuNewName":null,
        "menuNewSize":null,
        "orderQuantity":null,
        "orderStatus":"stop",
        "orderNote":null
    };
    let orderApiPatchResult = await orderApiPatch(dataPatchOrder);
    location.reload();
};

// function createMenuBackGroupSubmitClick(){
//     window.history.back();
// };

function createMenuAddMenuButtonClick(){
    noDisplayAll();
    createMenuAddMenuButton.style.display = "none";
    createMenuEditMenuButton.style.display = "none";
    createMenuFinishButton.style.display = "none";
    createMenuErroeMessage2.style.display = "none";
    createMenuBlock.style.display = "flex";
}

function createMenuBackToLoadButtonClick(){
    location.reload();
}