// ==== Get element ====
// =-=-=-=-=-=-=-=-=-=-= group.html =-=-=-=-=-=-=-=-=-=-=
// header
// Sign
let topFreezeBackgroung = document.getElementById("topFreezeBackgroung");
let topLeftTitle = document.getElementById("topLeftTitle");
let topLeftTitleText = document.getElementById("topLeftTitleText");
// Member center
let memberCenterBlock = document.getElementById("memberCenterBlock");
let memberCenterAvator = document.getElementById("memberCenterAvator");
let memberCenterName = document.getElementById("memberCenterName");
// Title bar
let pageTitle = document.getElementById("pageTitle");
let pageTitleContent = document.getElementById("pageTitleContent");
// main
let allGroupBlock = document.getElementById("allGroupBlock");
// Create group
// name
let createGroupBlock = document.getElementById("createGroupBlock");
let createGroupNameBlock = document.getElementById("createGroupNameBlock");
let createGroupNameTitle = document.getElementById("createGroupNameTitle");
let createGroupNameMust = document.getElementById("createGroupNameMust");
let createGroupNameInput = document.getElementById("createGroupNameInput");
let createGroupName = document.getElementById("createGroupName");
// password
let createGroupPasswordBlock = document.getElementById("createGroupPasswordBlock");
let createGroupPasswordTitle = document.getElementById("createGroupPasswordTitle");
let createGroupPasswordMust = document.getElementById("createGroupPasswordMust");
let createGroupPasswordInput = document.getElementById("createGroupPasswordInput");
let createGroupPassword = document.getElementById("createGroupPassword");
// Error message
let createGroupErrorBlock = document.getElementById("createGroupErrorBlock");
let createGroupErrorContent = document.getElementById("createGroupErrorContent");
// submit
let createGroupSubmit = document.getElementById("createGroupSubmit");
let createGroupSubmitContent = document.getElementById("createGroupSubmitContent");
// back
let backGroupSubmit = document.getElementById("backGroupSubmit");
let backGroupSubmitContent = document.getElementById("backGroupSubmitContent");
// ==== onload ===
createGroupBlock.style.display = "none";
onloadGroupPage();
// ==== create event listener ====
backGroupSubmit.addEventListener("click",backSubmit);
createGroupSubmit.addEventListener("click",createGroup);
memberCenterBlock.addEventListener("click",memberCenterBlockClick);
addGroupBlock.addEventListener("click",addGroupBlockClick);

// ==== Function ====
async function onloadGroupPage(){
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    currentUserName = userName;
    pageTitleContent.textContent = "請選擇或創建群組";
}

function pageTitleContentAddGroup(){
    pageTitleContent.textContent = "新增群組";
};



function addGroupBlockClick(){
    allGroupBlock.style.display = "none";
    createGroupBlock.style.display = "flex";
    pageTitleContentAddGroup();
};

function backSubmit(){
    allGroupBlock.style.display = "flex";
    createGroupBlock.style.display = "none";
    pageTitleContentChooseGroup();
};

async function generateGroup(){
    let getGroupData = await groupApiGet();
    groupList = getGroupData.group;
    for(i=0;i<Object.keys(groupList).length;i++){
        groupName = groupList[i]["groupName"];
        createAElement(allGroupBlock, `groupBlock${groupGetPage}${i}`, "buttonFormat groupBGC", null, "appendChild", `/group/${groupName}`);
        createDivElement(eval(`groupBlock${groupGetPage}${i}`), `groupContent${groupGetPage}${i}`, "buttonContent", groupName);
    };
    groupGetPage = getGroupData.nextPage;
    // return page
};

async function createGroup(){
    let createGroupNameValue = createGroupName.value;
    let createGroupPasswordValue = createGroupPassword.value;

    let data = {
        "groupName":createGroupNameValue,
        "groupPassword":createGroupPasswordValue
    };
    if (createGroupNameValue == "" || createGroupPasswordValue == ""){
        createGroupErrorContent.textContent = "填寫項目請勿留空";
    }
    else{
        let groupApiPostResult = await groupApiPost(data)
        if(groupApiPostResult.ok == true){
            let data = {
                "billUserEmail":currentUserName,
                "orderListId":null,
                "groupId":null,
                "groupName":createGroupNameValue
            };
            let billApiPostResult = await billApiPost(data);
            if (billApiPostResult.ok == true){
                location.reload();
            };
            if (billApiPostResult.error == true){
                createGroupErrorContent.style.display = "block";
                createGroupErrorContent.textContent = data.message;
            };
        };
        if(groupApiPostResult.error == true){
            createGroupErrorContent.style.display = "block";
            createGroupErrorContent.textContent = data.message;
        };
    };
};

function memberCenterBlockClick(){
    window.location = `/member_center`;
}

// IntersectionObserverasy
let target = document.querySelector("footer");
let callback = (entries,observer) => {
    entries.forEach(async function(entry){
        if (groupGetPage != null) {
            await generateGroup(); 
        } 
        else {
            observer.unobserve(target);
        };      
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

