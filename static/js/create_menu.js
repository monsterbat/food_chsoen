// ==== Get element ====
// 1-3 create menu
let createMenuBlock = document.getElementById("createMenuBlock")
// 1-3-1 menu name
let createMenuNameBlock = document.getElementById("createMenuNameBlock")
let createMenuNameTitle = document.getElementById("createMenuNameTitle")
let createMenuNameMust = document.getElementById("createMenuNameMust")
let createMenuNameInput = document.getElementById("createMenuNameInput")
let createMenuName = document.getElementById("createMenuName")
// 1-3-2 menu size
let createMenuSizeBlock = document.getElementById("createMenuSizeBlock")
let createMenuSizeTitle = document.getElementById("createMenuSizeTitle")
let createMenuSizeMust = document.getElementById("createMenuSizeMust")
let createMenuSizeInput = document.getElementById("createMenuSizeInput")
let createMenuSize = document.getElementById("createMenuSize")
// 1-3-3 menu price
let createMenuPriceBlock = document.getElementById("createMenuPriceBlock")
let createMenuPriceTitle = document.getElementById("createMenuPriceTitle")
let createMenuPriceMust = document.getElementById("createMenuPriceMust")
let createMenuPriceInput = document.getElementById("createMenuPriceInput")
let createMenuPrice = document.getElementById("createMenuPrice")

// 1-3-4 Menu note
let createMenuNoteBlock = document.getElementById("createMenuNoteBlock")
let createMenuNoteTitle = document.getElementById("createMenuNoteTitle")
let createMenuNoteMust = document.getElementById("createMenuNoteMust")
let createMenuNoteInput = document.getElementById("createMenuNoteInput")
let createMenuNote = document.getElementById("createMenuNote")

// 1-3-5 Error Message
let createMenuErroeMessage = document.getElementById("createMenuErroeMessage")
let createMenuErroeMessageContent = document.getElementById("createMenuErroeMessageContent")

// 1-3-6 menu add submit
let createMenuAddSubmit = document.getElementById("createMenuAddSubmit")
let createMenuAddSubmitContent = document.getElementById("createMenuAddSubmitContent")

// 1-5 already create menu title
let createMenuAlreadyTitleBlock = document.getElementById("createMenuAlreadyTitleBlock")
let createMenuAlreadyTitle = document.getElementById("createMenuAlreadyTitle")
let createMenuAlreadyItemsBlock = document.getElementById("createMenuAlreadyItemsBlock")
let createMenuAlreadyChoose = document.getElementById("createMenuAlreadyChoose")
let createMenuAlreadyMenu = document.getElementById("createMenuAlreadyMenu")
let createMenuAlreadySize = document.getElementById("createMenuAlreadySize")
let createMenuAlreadyPrice = document.getElementById("createMenuAlreadyPrice")

// 1-7 already created menu
let alreadyCreatedMenuBlcok = document.getElementById("alreadyCreatedMenuBlcok")
// 1-8 menu button
let createMenuButtonBlock = document.getElementById("createMenuButtonBlock")
let createMenuErroeMessage2 = document.getElementById("createMenuErroeMessage2")
let createMenuErroeMessageContent2 = document.getElementById("createMenuErroeMessageContent2")
let createMenuEditMenuButton = document.getElementById("createMenuEditMenuButton")
let createMenuEditMenuContent = document.getElementById("createMenuEditMenuContent")
let createMenuRemoveMenuButton = document.getElementById("createMenuRemoveMenuButton")
let createMenuEditFinishMenuButton = document.getElementById("createMenuEditFinishMenuButton")
let createMenuEditFinishMenuContent = document.getElementById("createMenuEditFinishMenuContent")

let createMenuFinishButton = document.getElementById("createMenuFinishButton")
let createMenuFinishContent = document.getElementById("createMenuFinishContent")

// 1-3-8 back submit
let createMenuBackGroupSubmit = document.getElementById("createMenuBackGroupSubmit")
let createMenuBackGroupSubmitContent = document.getElementById("createMenuBackGroupSubmitContent")

// ==== Create element ====

// ==== onload ====
createMenuBackGroupSubmit.style.display = "none"
createMenuEditFinishMenuButton.style.display = "none"
createMenuRemoveMenuButton.style.display = "none"
onloadCreateMenuPage()
fromCreateOrOrderMenu(getSplit4FromUrl())
async function onloadCreateMenuPage(){
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();
    
    let groupApiData = await groupStatus(urlGroupName);
    groupApiData = groupApiData.group
    console.log("groupApiData",groupApiData)
    for (i=0;i<Object.keys(groupApiData).length;i++){
        if (groupApiData[i].groupName == urlGroupName){            
            groupId = groupApiData[i].groupId;
        }
    }
    urlStoreName = getStoreNameFromUrl()
    console.log("storeName",urlStoreName)
    let storeApiGetData = await storeApiGet(urlGroupName)
    storeApiGetData = storeApiGetData.store
    console.log("storeApiGetData",storeApiGetData)
    for (i=0;i<Object.keys(storeApiGetData).length;i++){
        if (storeApiGetData[i].storeName == urlStoreName){            
            storeId = storeApiGetData[i].storeId;
        }
    }
    pageTitleContent.textContent = "建立「"+urlStoreName+"」的菜單";
    // console.log("checkurlGroupName",urlGroupName)
    generateMenu(urlGroupName,urlStoreName)

}
// ==== create event listener ====
createMenuAddSubmit.addEventListener("click",createMenuAddSubmitClick)
createMenuEditMenuButton.addEventListener("click",createMenuEditMenuButtonClick)
createMenuEditFinishMenuButton.addEventListener("click",createMenuEditFinishMenuButtonClick)
createMenuFinishButton.addEventListener("click",createMenuFinishButtonClick)
createMenuBackGroupSubmit.addEventListener("click",createMenuBackGroupSubmitClick)
createMenuRemoveMenuButton.addEventListener("click",createMenuRemoveMenuButtonClick)

// ==== Function ====
async function createMenuAddSubmitClick(){
    console.log("into")
    let createMenuNameValue = createMenuName.value;
    let createMenuSizeValue = createMenuSize.value;
    let createMenuPriceValue = createMenuPrice.value;
    let createMenuNoteValue = createMenuNote.value;
    
    if (createMenuNameValue == "" || createMenuNameValue ==null || createMenuSizeValue == "" || createMenuSizeValue ==null || createMenuPriceValue == "" || createMenuPriceValue ==null){
        createMenuErroeMessageContent.textContent = "請填入完整餐點資訊"
    }
    else{
        console.log("into2")
        let data = {
            "storeName":urlStoreName,
            "groupId":groupId,
            "menu":{
                "menuName":createMenuNameValue,
                "menuSize":createMenuSizeValue,
                "menuPrice":createMenuPriceValue,
                "menuStatus":"alive",
                "menuNote":createMenuNoteValue
                }
        }
        console.log("createMenu",data)
        result = await menuApiPost(data)
        console.log("check")
        if (result.ok == true){
            console.log("check2")
        }
        else{
            console.log("check3")
            resultMessage = result.message
            createMenuErroeMessageContent.textContent = resultMessage
        }
        location.reload()
    }

}

async function generateMenu(urlGroupName,urlStoreName){
    console.log("checkurlGroupName",urlGroupName)
    console.log("checkurlStoreName",urlStoreName)
    let getMenuData = await menuApiGet(urlGroupName,urlStoreName)
    console.log("getMenuData",getMenuData)
    menuList = getMenuData.menu;
    console.log("menuList",menuList);
    createElement(alreadyCreatedMenuBlcok, "form", "menuBlockFrom", "menuBlockFrom", null, "appendChild")
    
    if (menuList != null){
        for(i=0;i<Object.keys(menuList).length;i++){
            menuName = menuList[i]["menuName"]
            menuSize = menuList[i]["menuSize"]
            menuPrice = menuList[i]["menuPrice"]
            menuNote = menuList[i]["menuNote"]
            menuInputValue = JSON.stringify({
                "menuName":menuName,
                "menuSize":menuSize,
                "menuPrice":menuPrice,
                "menuNote":menuNote
            })
            createDivElement(menuBlockFrom,`menuBlock${i}`, "createMenuAlreadyItemsBlock", null, "appendChild")
            createInputElement(eval(`menuBlock${i}`),addId=`menuCheckbox${i}`,addClass="menuCheckbox", addText = null, appendForm = "appendChild",inputType = "radio", inputValue =menuInputValue,inputName = "manuCreated")
            createDivElement(eval(`menuBlock${i}`), `menuName${i}`, "menuName", menuName)
            createDivElement(eval(`menuBlock${i}`), `menuSize${i}`, "menuSize", menuSize)
            createDivElement(eval(`menuBlock${i}`), `menuPrice${i}`, "menuPrice", menuPrice)
            createDivElement(eval(`menuBlock${i}`), `menuNote${i}`, "menuNote", menuNote)
        }
    }
    
}

async function createMenuEditMenuButtonClick(){
    let chosenMenu = document.querySelector('input[name=manuCreated]:checked');
    let chosenMenuId = chosenMenu.id;
    let menuNumber = chosenMenuId.replace(/^menuCheckbox/g, "");
    console.log("chosenMenuId",chosenMenu)
    console.log("menuBlock",eval(`menuName${menuNumber}`).textContent)

    menuOriNameValue = eval(`menuName${menuNumber}`).textContent
    menuOriSizeValue = eval(`menuSize${menuNumber}`).textContent
    menuOriPriceValue = eval(`menuPrice${menuNumber}`).textContent
    menuOriNoteValue = eval(`menuNote${menuNumber}`).textContent

    replaceElement(eval(`menuName${menuNumber}`), "input",`menuNewName${menuNumber}`,"menuNew",menuOriNameValue,inputType = "text")
    replaceElement(eval(`menuSize${menuNumber}`), "input",`menuNewSize${menuNumber}`,"menuNew",menuOriSizeValue,inputType = "text")
    replaceElement(eval(`menuPrice${menuNumber}`), "input",`menuNewPrice${menuNumber}`,"menuNew",menuOriPriceValue,inputType = "text")
    replaceElement(eval(`menuNote${menuNumber}`), "input",`menuNewNote${menuNumber}`,"menuNew",menuOriNoteValue,inputType = "text")
    let chosenMenuValue = JSON.parse(chosenMenu.value)
    createMenuEditFinishMenuButton.style.display = "flex"
    createMenuRemoveMenuButton.style.display = "flex"
    createMenuEditMenuButton.style.display = "none"
} 

async function createMenuEditFinishMenuButtonClick(){
    let chosenMenu = document.querySelector('input[name=manuCreated]:checked');
    let chosenMenuId = chosenMenu.id;
    let menuNumber = chosenMenuId.replace(/^menuCheckbox/g, "");
    console.log("menuNewName",eval(`menuNewName${menuNumber}`))
    let menuNewNameValue = eval(`menuNewName${menuNumber}`).value
    let menuNewSizeValue = eval(`menuNewSize${menuNumber}`).value
    let menuNewPriceValue = eval(`menuNewPrice${menuNumber}`).value
    let menuNewNoteValue = eval(`menuNewNote${menuNumber}`).value
    let data = {
        "storeName":urlStoreName,
        "groupId":groupId,
        "menu":{
            "menuName":menuOriNameValue,
            "menuSize":menuOriSizeValue,
            "menuPrice":menuOriPriceValue,
            "menuNote":menuOriNoteValue,
            "menuNewName":menuNewNameValue,
            "menuNewSize":menuNewSizeValue,
            "menuNewPrice":menuNewPriceValue,
            "menuNewNote":menuNewNoteValue,
            "menuNewStatus":"alive"
            }
    }
    let menuApiPatchData = await menuApiPatch(data)
    console.log("menuApiPatchData",menuApiPatchData)
    if (menuApiPatchData.ok == true){
        replaceElement(eval(`menuNewName${menuNumber}`), "div",`menuName${menuNumber}`,"menuName",menuNewNameValue,inputType = "text")
        replaceElement(eval(`menuNewSize${menuNumber}`), "div",`menuSize${menuNumber}`,"menuSize",menuNewSizeValue,inputType = "text")
        replaceElement(eval(`menuNewPrice${menuNumber}`), "div",`menuPrice${menuNumber}`,"menuPrice",menuNewPriceValue,inputType = "text")
        replaceElement(eval(`menuNewNote${menuNumber}`), "div",`menuNote${menuNumber}`,"menuNote",menuNewNoteValue,inputType = "text")
    }
    if (menuApiPatchData.message == "餐點及大小重複"){
        replaceElement(eval(`menuNewName${menuNumber}`), "div",`menuName${menuNumber}`,"menuName",menuOriNameValue,inputType = "text")
        replaceElement(eval(`menuNewSize${menuNumber}`), "div",`menuSize${menuNumber}`,"menuSize",menuOriSizeValue,inputType = "text")
        replaceElement(eval(`menuNewPrice${menuNumber}`), "div",`menuPrice${menuNumber}`,"menuPrice",menuOriPriceValue,inputType = "text")
        replaceElement(eval(`menuNewNote${menuNumber}`), "div",`menuNote${menuNumber}`,"menuNote",menuOriNoteValue,inputType = "text")
        createMenuErroeMessageContent2.textContent = "餐點及大小重複"
    }
    if (menuApiPatchData.message == "未變更"){
        replaceElement(eval(`menuNewName${menuNumber}`), "div",`menuName${menuNumber}`,"menuName",menuNewNameValue,inputType = "text")
        replaceElement(eval(`menuNewSize${menuNumber}`), "div",`menuSize${menuNumber}`,"menuSize",menuNewSizeValue,inputType = "text")
        replaceElement(eval(`menuNewPrice${menuNumber}`), "div",`menuPrice${menuNumber}`,"menuPrice",menuNewPriceValue,inputType = "text")
        replaceElement(eval(`menuNewNote${menuNumber}`), "div",`menuNote${menuNumber}`,"menuNote",menuNewNoteValue,inputType = "text")
        createMenuErroeMessageContent2.textContent = "未變更";
    }
    createMenuRemoveMenuButton.style.display = "none"
    createMenuEditFinishMenuButton.style.display = "none"
    createMenuEditMenuButton.style.display = "flex"
}

function createMenuFinishButtonClick(){
    window.location.href = `/group/${urlGroupName}/create_order`
}

function fromCreateOrOrderMenu(url4){
    if (url4 == "order_edit"){
        createMenuFinishButton.style.display = "none"
        createMenuBackGroupSubmit.style.display = "flex"
    }
}

async function createMenuRemoveMenuButtonClick(){
    let chosenMenu = document.querySelector('input[name=manuCreated]:checked');
    let chosenMenuId = chosenMenu.id;
    let menuNumber = chosenMenuId.replace(/^menuCheckbox/g, "");
    console.log("menuNewName",eval(`menuNewName${menuNumber}`))
    let menuNewNameValue = eval(`menuNewName${menuNumber}`).value
    let menuNewSizeValue = eval(`menuNewSize${menuNumber}`).value
    let menuNewPriceValue = eval(`menuNewPrice${menuNumber}`).value
    let menuNewNoteValue = eval(`menuNewNote${menuNumber}`).value
    let data = {
        "storeName":urlStoreName,
        "groupId":groupId,
        "menu":{
            "menuName":menuOriNameValue,
            "menuSize":menuOriSizeValue,
            "menuPrice":menuOriPriceValue,
            "menuNote":menuOriNoteValue,
            "menuNewName":menuNewNameValue,
            "menuNewSize":menuNewSizeValue,
            "menuNewPrice":menuNewPriceValue,
            "menuNewNote":menuNewNoteValue,
            "menuNewStatus":"stop"
            }
    }
    let menuApiPatchResult = await menuApiPatch(data);
    console.log("menuApiPatchResult",menuApiPatchResult)
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
    }
    let orderApiPatchResult = await orderApiPatch(dataPatchOrder);
    console.log("orderApiPatchResult",orderApiPatchResult)
    location.reload()
}

function createMenuBackGroupSubmitClick(){
    window.history.back();
}