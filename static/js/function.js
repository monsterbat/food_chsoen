// creat element Function
function createElement(appendBlock, elementStyle, addId = null, addClass = null, addText = null, appendForm = "appendChild", hrefContent = null, inputType = null, inputValue =null, lableFor = null){
        console.log("inp12313121",addId)
    element = document.createElement(elementStyle);
    // id select
    if (addId != null){
        element.setAttribute("id",addId);
    }
    // class select
    if (addClass != null){
        element.setAttribute("class",addClass);   
    }
    // style select
    if (elementStyle == "img"){
        element.src = addText;
    }
    if (elementStyle == "a"){
        element.setAttribute("href",hrefContent);
        element.textContent = addText;
    }
    if (elementStyle == "div"){
        element.textContent = addText;
    }
    if (elementStyle == "input"){
        console.log("CheckBox")
        element.type=inputType;
        console.log("inputType",inputType)
        element.setAttribute("value",inputValue);
    }
    if (elementStyle == "label"){
        element.setAttribute("for",lableFor);
        element.textContent = addText;
    }
    // append select
    if (appendForm == "appendChild"){
        appendBlock.appendChild(element);
        console.log("inp----",appendBlock)
    }
    if (appendForm == "prepend"){
        appendBlock.prepend(element);
    }
    // auto create getElementById
    console.log("inp",addId)
    globalThis.addId = document.getElementById(addId)
    console.log("inp",globalThis.addId)
}
// creat DIV element Function
function createDivElement(
    appendBlock, addId = null, addClass = null, addText = null, appendForm = "appendChild"){
        // createElement
        element = document.createElement("div");        
        // id select
        if (addId != null){
            element.setAttribute("id",addId);
        }
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        }
        // textContent
        element.textContent = addText;
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        }
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        }
        // auto create getElementById
        globalThis.addId = document.getElementById(addId)
}
// creat IMG element Function
function createImgElement(
    appendBlock, addId = null, addClass = null, addText = null, appendForm = "appendChild"){
        // createElement
        element = document.createElement("img");        
        // id select
        if (addId != null){
            element.setAttribute("id",addId);
        }
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        }
        // src
        element.src = addText;
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        }
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        }
        // auto create getElementById
        globalThis.addId = document.getElementById(addId)
}
// creat A element Function
function createAElement(
    appendBlock, addId = null, addClass = null, addText = null, appendForm = "appendChild",
    hrefContent = null){
        // createElement
        element = document.createElement("a");        
        // id select
        if (addId != null){
            element.setAttribute("id",addId);
        }
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        }
        // textContent
        element.textContent = addText;
        // href
        element.setAttribute("href",hrefContent);
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        }
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        }
        // auto create getElementById
        globalThis.addId = document.getElementById(addId)
}
// creat INPUT element Function
function createInputElement(
    appendBlock, addId = null, addClass = null, addText = null, appendForm = "appendChild",
    inputType = null, inputValue =null, inputName = null){
        // createElement
        element = document.createElement("input");        
        // id select
        if (addId != null){
            element.setAttribute("id",addId);
        }
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        }
        // type
        element.type=inputType;
        // value
        element.setAttribute("value",inputValue);
        // name
        element.setAttribute("name",inputName);
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        }
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        }
        // auto create getElementById
        globalThis.addId = document.getElementById(addId)
}
// creat LABLE element Function
function createLableElement(
    appendBlock, addId = null, addClass = null, addText = null, appendForm = "appendChild",
    lableFor = null){
        // createElement
        element = document.createElement("lable");        
        // id select
        if (addId != null){
            element.setAttribute("id",addId);
        }
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        }
        // for
        element.setAttribute("for",lableFor);
        // textContent
        element.textContent = addText;
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        }
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        }
        // auto create getElementById
        globalThis.addId = document.getElementById(addId)
}
// creat OPTION element Function
function createOptionElement(
    appendBlock, addId = null, addClass = null, addText = null, appendForm = "appendChild",
    optionValue = null){
        // createElement
        element = document.createElement("option");        
        // id select
        if (addId != null){
            element.setAttribute("id",addId);
        }
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        }
        // optionValue
        element.setAttribute("value",optionValue);
        // textContent
        element.textContent = addText;
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        }
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        }
        // auto create getElementById
        globalThis.addId = document.getElementById(addId)
}
// Replace element
function replaceElement(originalElementBlock, newElementStyle, newElementId, newElementClass, elementText = null, inputType = "text"){
    element = document.createElement(newElementStyle);
    element.setAttribute("id",newElementId);
    element.setAttribute("class",newElementClass);    
    if (newElementStyle == "img"){
        element.src = elementText;
    }
    if (newElementStyle == "input"){
        element.type = inputType;
        element.setAttribute("value",elementText);
    }
    else{
        element.textContent = elementText;
    }
    originalElementBlock.parentNode.replaceChild(element,originalElementBlock);
    globalThis.newElementId = document.getElementById(newElementId)
}

function getGroupNameFromUrl(){
    let pathname = window.location.pathname;
    let pathArray = pathname.split('/');
    let groupName = pathArray[2];
    console.log(groupName);
    groupName = decodeURIComponent(decodeURIComponent(groupName));
    return groupName
}

function getStoreNameFromUrl(){
    let pathname = window.location.pathname;
    let pathArray = pathname.split('/');
    let storeName = pathArray[3];
    console.log(storeName);
    storeName = decodeURIComponent(decodeURIComponent(storeName));
    return storeName
}
function getOrderListStopTimeFromUrl(){
    let pathname = window.location.pathname;
    let pathArray = pathname.split('/');
    let orderListStopTime = pathArray[4];
    console.log(orderListStopTime);
    orderListStopTime = decodeURIComponent(decodeURIComponent(orderListStopTime));
    return orderListStopTime
}

function getSplit4FromUrl(){
    let pathname = window.location.pathname;
    let pathArray = pathname.split('/');
    let split4 = pathArray[4];
    console.log(split4);
    split4 = decodeURIComponent(decodeURIComponent(split4));
    return split4
}

// 
let page = 0;
let keyword = "";
let urlGroupName = "";
let urlStoreName = "";
let urlStopTime = "";
let groupId = "";
let storeId = "";
let orderListId = "";
let userName = "";
let userId = "";
let getStatus = "alive";
// group_into
let deleteGroupNewPasswordValue = "";
let orderListData
// create_menu.js
let menuOriNameValue = "";
let menuOriSizeValue = "";
let menuOriPriceValue = "";
let menuOriNoteValue = "";

// order_menu
let menuOrderDataAll = [] 
let menuOrderDataForAllMember = []

// Trigger
let createMenuForOrderTrigger


// Get API

// Group
async function groupApiGet(){
    return fetch(`/api/group?page=${page}&keyword=${keyword}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log("data",data)
        return data
    })
}
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
        return data
    })
}
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
        return data
    })
}

// User
async function userApiGet(){
    return fetch(`/api/user`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data
    })
}

// Store
async function storeApiGet(urlGroupName){
    return fetch(`/api/store?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log("data",data)
        return data
    })
}
async function storeApiPost(data){
    return fetch(`/api/store`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data
    })
}

// Menu
async function menuApiPost(data){
    return fetch(`/api/menu`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data
    })
}
async function menuApiPatch(data){
    return fetch(`/api/menu`,{
        method:"PATCH",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data
    })
}
async function menuApiGet(urlGroupName,urlStoreName){
    return fetch(`/api/menu?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}&urlStoreName=${urlStoreName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log("urlGroupName111",urlGroupName)
        console.log("data",data)
        return data
    })
}
// Order list
async function orderListApiPost(data){
    return fetch(`/api/order_list`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data
    })
}
async function orderListApiGet(urlGroupName,urlStoreName,urlStopTime,getStatus){
    return fetch(`/api/order_list?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}&urlStoreName=${urlStoreName}&urlStopTime=${urlStopTime}&getStatus=${getStatus}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log("urlGroupName111",urlGroupName)
        console.log("data",data)
        return data
    })
}
async function orderListApiPatch(data){
    return fetch(`/api/order_list`,{
        method:"PATCH",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data
    })
}
// Bill
async function billApiPost(data){
    return fetch(`/api/bill`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data
    })
}


// User order
async function orderApiPost(data){
    return fetch(`/api/order`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data
    })
}
async function orderApiGet(orderListId){
    return fetch(`/api/order?page=${page}&keyword=${keyword}&orderListId=${orderListId}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log("orderListId",orderListId)
        console.log("data",data)
        return data
    })
}

// Status check
async function userStatus(){
    data = await userApiGet();
    if(data.data == null || data.error == true){
        window.location.href = "/"
    }
    else{        
        return data
    }
}

async function groupStatus(urlGroupName){
    data = await groupApiGet();
    if(data.group == null || data.error == true){
        console.log("FAIL")
        window.location.href = "/"
    }
    else{
        groupVerify = "fail"
        groupList = data.group
        console.log("urlGroupName",urlGroupName)
        // console.log("urlGroupName",urlGroupName)
        for(i=0;i<Object.keys(groupList).length;i++){
            groupName = groupList[i]["groupName"]
            if (urlGroupName == groupName){
                console.log("change2pass",data)
                groupVerify = "pass"
            }
        }
        if (groupVerify == "pass"){
            return data
        }
        else{
            console.log("FAIL2")
            window.location.href = "/"
        }
    }
}

async function getStoreId(urlGroupName){
    data = await storeApiGet(urlGroupName);
    if(data.group == null || data.error == true){
        console.log("FAIL")
        window.location.href = "/"
    }
    else{
        groupVerify = "fail"
        groupList = data.group
        console.log("urlGroupName",urlGroupName)
        // console.log("urlGroupName",urlGroupName)
        for(i=0;i<Object.keys(groupList).length;i++){
            groupName = groupList[i]["groupName"]
            if (urlGroupName == groupName){
                console.log("change2pass",data)
                groupVerify = "pass"
            }
        }
        if (groupVerify == "pass"){
            return data
        }
        else{
            console.log("FAIL2")
            window.location.href = "/"
        }
    }
}