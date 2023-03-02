// creat element Function
function createElement(appendBlock, elementStyle, addId = null, addClass = null, addText = null, appendForm = "appendChild", hrefContent = null, inputType = null, inputValue =null, lableFor = null){

    element = document.createElement(elementStyle);
    // id select
    if (addId != null){
        element.setAttribute("id",addId);
    };
    // class select
    if (addClass != null){
        element.setAttribute("class",addClass);   
    };
    // style select
    if (elementStyle == "img"){
        element.src = addText;
    };
    if (elementStyle == "a"){
        element.setAttribute("href",hrefContent);
        element.textContent = addText;
    };
    if (elementStyle == "div"){
        element.textContent = addText;
    };
    if (elementStyle == "input"){
        element.type=inputType;
        element.setAttribute("value",inputValue);
    };
    if (elementStyle == "label"){
        element.setAttribute("for",lableFor);
        element.textContent = addText;
    };
    // append select
    if (appendForm == "appendChild"){
        appendBlock.appendChild(element);
    };
    if (appendForm == "prepend"){
        appendBlock.prepend(element);
    };
    // auto create getElementById
    globalThis.addId = document.getElementById(addId);
}
// creat DIV element Function
function createDivElement(
    appendBlock, addId = null, addClass = null, addText = null, appendForm = "appendChild"){
        // createElement
        element = document.createElement("div");        
        // id select
        if (addId != null){
            element.setAttribute("id",addId);
        };
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        };
        // textContent
        element.textContent = addText;
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        };
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        };
        // auto create getElementById
        if (addId != null){
            globalThis.addId = document.getElementById(addId);
        }
        
}
// creat IMG element Function
function createImgElement(
    appendBlock, addId = null, addClass = null, addText = null, appendForm = "appendChild"){
        // createElement
        element = document.createElement("img");        
        // id select
        if (addId != null){
            element.setAttribute("id",addId);
        };
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        };
        // src
        element.src = addText;
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        };
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        };
        // auto create getElementById
        globalThis.addId = document.getElementById(addId);
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
        };
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        };
        // textContent
        element.textContent = addText;
        // href
        element.setAttribute("href",hrefContent);
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        };
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        };
        // auto create getElementById
        globalThis.addId = document.getElementById(addId);
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
        };
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        };
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
        globalThis.addId = document.getElementById(addId);
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
        };
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        };
        // for
        element.setAttribute("for",lableFor);
        // textContent
        element.textContent = addText;
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        };
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        };
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
        };
        // class select
        if (addClass != null){
            element.setAttribute("class",addClass);   
        };
        // optionValue
        element.setAttribute("value",optionValue);
        // textContent
        element.textContent = addText;
        // append select
        if (appendForm == "appendChild"){
            appendBlock.appendChild(element);
        };
        if (appendForm == "prepend"){
            appendBlock.prepend(element);
        };
        // auto create getElementById
        globalThis.addId = document.getElementById(addId);
}
// Replace element
function replaceElement(originalElementBlock, newElementStyle, newElementId, newElementClass, elementText = null, inputType = "text"){
    element = document.createElement(newElementStyle);
    element.setAttribute("id",newElementId);
    element.setAttribute("class",newElementClass);    
    if (newElementStyle == "img"){
        element.src = elementText;
    };
    if (newElementStyle == "input"){
        element.type = inputType;
        element.setAttribute("value",elementText);
    }
    else{
        element.textContent = elementText;
    };
    originalElementBlock.parentNode.replaceChild(element,originalElementBlock);
    globalThis.newElementId = document.getElementById(newElementId);
}

function replaceToInputElement(originalElementBlock, newElementId, newElementClass, elementText = null, inputType = "text"){
    element = document.createElement("input");
    element.setAttribute("id",newElementId);
    element.setAttribute("class",newElementClass);    
    element.type = inputType;
    element.setAttribute("value",elementText);

    originalElementBlock.parentNode.replaceChild(element,originalElementBlock);
    // globalThis.newElementId = document.getElementById(newElementId);
}
function replaceToDivElement(originalElementBlock, newElementId, newElementClass, elementText = null){
    element = document.createElement("div");
    element.setAttribute("id",newElementId);
    element.setAttribute("class",newElementClass);
    element.textContent = elementText;
    originalElementBlock.parentNode.replaceChild(element,originalElementBlock);
    // globalThis.newElementId = document.getElementById(newElementId);
}
function getGroupNameFromUrl(){
    let pathname = window.location.pathname;
    let pathArray = pathname.split('/');
    let groupName = pathArray[2];
    groupName = decodeURIComponent(decodeURIComponent(groupName));
    return groupName;
}

function getStoreNameFromUrl(){
    let pathname = window.location.pathname;
    let pathArray = pathname.split('/');
    let storeName = pathArray[4];
    storeName = decodeURIComponent(decodeURIComponent(storeName));
    return storeName;
}
function getOrderListStopTimeFromUrl(){
    let pathname = window.location.pathname;
    let pathArray = pathname.split('/');
    let orderListStopTime = pathArray[5];
    orderListStopTime = decodeURIComponent(decodeURIComponent(orderListStopTime));
    return orderListStopTime;
}

function getSplit4FromUrl(){
    let pathname = window.location.pathname;
    let pathArray = pathname.split('/');
    let split4 = pathArray[4];
    split4 = decodeURIComponent(decodeURIComponent(split4));
    return split4;
}

function getOrderListStatusFromUrl(){
    let pathname = window.location.pathname;
    let pathArray = pathname.split('/');
    let split6 = pathArray[6];
    split6 = decodeURIComponent(decodeURIComponent(split6));
    return split6;
}


// Status check
async function userStatus(){
    let userApiGetResult = await userApiGet();
    console.log("userApiGetResult",userApiGetResult)
    if(userApiGetResult.data == null || userApiGetResult.error == true){
        window.location.href = "/";
    }
    else{        
        let userNameInGroup = userApiGetResult.data.userName;
        memberCenterName.textContent = "會員中心";
        return userApiGetResult;
    }
};

async function groupStatus(urlGroupName,getStatus){
    data = await groupInfoApiGet(urlGroupName,getStatus);
    console.log("data",data)
    if(data.group == null || data.error == true){
        window.location.href = "/";
    }
    else{
        return data;
    };
};

async function getStoreId(urlGroupName){
    data = await storeApiGet(urlGroupName);
    if(data.group == null || data.error == true){
        window.location.href = "/";
    }
    else{
        groupVerify = "fail";
        groupList = data.group;
        for(i=0;i<Object.keys(groupList).length;i++){
            groupName = groupList[i]["groupName"];
            if (urlGroupName == groupName){
                groupVerify = "pass";
            };
        };
        if (groupVerify == "pass"){
            return data;
        }
        else{
            window.location.href = "/"
        }
    };
};

async function userCheckInGroup(urlGroupName){
    let groupCheckUserApiPostData = {
        "groupName":urlGroupName
    }
    let groupCheckUserApiPostResult = await groupCheckUserApiPost(groupCheckUserApiPostData)
    console.log("groupCheckUserApiPostResult",groupCheckUserApiPostResult)
    if (groupCheckUserApiPostResult.ok == true){
        console.log("DDD")
    }
    if (groupCheckUserApiPostResult.error == true){
        window.location.href = "/group"
        console.log("FF")
    }
}