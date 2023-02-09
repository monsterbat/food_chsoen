// ==== Get element ====
// =-=-=-=-=-=-=-=-=-=-= group.html =-=-=-=-=-=-=-=-=-=-=
// header
// Sign
let topFreezeBackgroung = document.getElementById("topFreezeBackgroung")
let topLeftTitle = document.getElementById("topLeftTitle")
let topLeftTitleText = document.getElementById("topLeftTitleText")
// Member center
let memberCenterBlock = document.getElementById("memberCenterBlock")
let memberCenterAvator = document.getElementById("memberCenterAvator")
let memberCenterName = document.getElementById("memberCenterName")
// Title bar
let pageTitle = document.getElementById("pageTitle")
let pageTitleContent = document.getElementById("pageTitleContent")
// main
let allGroupBlock = document.getElementById("allGroupBlock")
// Create group
// name
let createGroupBlock = document.getElementById("createGroupBlock")
let createGroupNameBlock = document.getElementById("createGroupNameBlock")
let createGroupNameTitle = document.getElementById("createGroupNameTitle")
let createGroupNameMust = document.getElementById("createGroupNameMust")
let createGroupNameInput = document.getElementById("createGroupNameInput")
let createGroupName = document.getElementById("createGroupName")
// password
let createGroupPasswordBlock = document.getElementById("createGroupPasswordBlock")
let createGroupPasswordTitle = document.getElementById("createGroupPasswordTitle")
let createGroupPasswordMust = document.getElementById("createGroupPasswordMust")
let createGroupPasswordInput = document.getElementById("createGroupPasswordInput")
let createGroupPassword = document.getElementById("createGroupPassword")
// Error message
let createGroupErrorBlock = document.getElementById("createGroupErrorBlock")
let createGroupErrorContent = document.getElementById("createGroupErrorContent")
// submit
let createGroupSubmit = document.getElementById("createGroupSubmit")
let createGroupSubmitContent = document.getElementById("createGroupSubmitContent")
// back
let backGroupSubmit = document.getElementById("backGroupSubmit")
let backGroupSubmitContent = document.getElementById("backGroupSubmitContent")
console.log('Static URL: ', "{{ url_for('static', filename='js/group.js') }}")
// ==== onload ===

console.log("createGroupBlock",topFreezeBackgroung)
createGroupBlock.style.display = "none";
addGroupShow()
pageTitleContentChooseGroup()
userStatus()
// console.log(userName)
// ==== create event listener ====
backGroupSubmit.addEventListener("click",backSubmit)
createGroupSubmit.addEventListener("click",createGroup)

// ==== Function ====
async function userStatus(){
    let userApiGetResult = await userApiGet()
    let userNameInGroup = userApiGetResult.data.userName
    console.log("userNameInGroupDD",userApiGetResult)
    memberCenterName.textContent = userNameInGroup
}

function pageTitleContentChooseGroup(){
    pageTitleContent.textContent = "請選擇或創建群組"
}
function pageTitleContentAddGroup(){
    pageTitleContent.textContent = "新增群組";
}

function addGroupShow(){
    createElement(allGroupBlock, "div", "addGroupBlock", "buttonFormat createBGC")
    createElement(addGroupBlock, "div", "addGroupContent", "buttonContent", "新增群組")
    addGroupBlock.addEventListener("click",addGroup)
}

function addGroup(){
    allGroupBlock.style.display = "none";
    createGroupBlock.style.display = "flex";
    pageTitleContentAddGroup();
}

function backSubmit(){
    allGroupBlock.style.display = "flex";
    createGroupBlock.style.display = "none";
    pageTitleContentChooseGroup();
}

async function generateGroup(){
    let getGroupData = await groupApiGet()
    console.log("getGroupData",getGroupData)
    groupList = getGroupData.group
    console.log("groupList",groupList)
    for(i=0;i<Object.keys(groupList).length;i++){
        groupName = groupList[i]["groupName"]
        createElement(allGroupBlock, "a", `groupBlock${i}`, "buttonFormat groupBGC", null, "appendChild", `/group/${groupName}`)
        createElement(eval(`groupBlock${i}`), "div", `groupContent${i}`, "buttonContent", groupName)
    }
    page = getGroupData.nextPage
}

async function createGroup(){
    let createGroupNameValue = createGroupName.value;
    let createGroupPasswordValue = createGroupPassword.value;

    let data = {
        "groupName":createGroupNameValue,
        "groupPassword":createGroupPasswordValue
    }
    if (createGroupNameValue == "" || createGroupPasswordValue == ""){
        createGroupErrorContent.textContent = "填寫項目請勿留空";
    }
    else{
        await fetch(`/api/group`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:new Headers({
                "Content-Type":"application/json"
            })
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.ok == true){
                location.reload();
                console.log("C1")
            }
            if(data.error == true){
                createGroupErrorContent.style.display = "block";
                createGroupErrorContent.textContent = data.message;
            }
        })
    }

    console.log("createGroup",data)

}

// IntersectionObserver
let target = document.querySelector("footer");
let callback = (entries,observer) => {
    entries.forEach(entry => {
        if (page != null) {
            generateGroup(); 
        } 
        else {
            observer.unobserve(target);
        }        
    });
};

let headerDiv = document.querySelector("header")
let mainDIV = document.querySelector("main")

let headerDivHeight = headerDiv.offsetHeight
let sloganDivHeight = mainDIV.offsetHeight
let windowHeight = window.innerHeight

let rootMarginTop = (headerDivHeight+sloganDivHeight)-windowHeight

const options = {
  root: null,
  rootMargin: `${rootMarginTop}px 0px 0px 0px`,
  threshold: 0,
};

let observer = new IntersectionObserver(callback, options);
let onloadCount = 0

observer.observe(target);

