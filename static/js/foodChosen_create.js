// ==== Get element ====
let foodChosenCreateStore = document.getElementById("foodChosenCreateStore");
let intoKeywordBlock = document.getElementById("intoKeywordBlock");
let intoKeyword = document.getElementById("intoKeyword");
let searchButton = document.getElementById("searchButton");
let earchStoreListBlockBlock_0 = document.getElementById(`earchStoreListBlockBlock_0`);
let searchStoreErrorMessageContent = document.getElementById("searchStoreErrorMessageContent");
let searchStoreListBlock = document.getElementById("searchStoreListBlock");
let confirmStoreButton = document.getElementById("confirmStoreButton");
let backToCreateStoreButton = document.getElementById("backToCreateStoreButton");

// ==== Create element ====
// ==== onload ====
let storeListCount = 0;

onloadFoodChosenCreatePage();

// ==== create event listener ====
searchButton.addEventListener("click",searchButtonClick);
confirmStoreButton.addEventListener("click",confirmStoreButtonClick);
// ==== Function ====
async function onloadFoodChosenCreatePage(){
    let userApiData = await userStatus();
    let userId = userApiData.data.userId;
    let userName = userApiData.data.userName;
    urlGroupName = getGroupNameFromUrl();
    pageTitleContent.textContent = "建立店家";
    let groupApiData = await groupStatus(urlGroupName,"alive");
    groupApiData = groupApiData.group;
    groupId = groupApiData[0].groupId;
};

async function searchButtonClick(){
    let intoKeywordValue = intoKeyword.value;
    console.log(intoKeywordValue.length)
    if (intoKeywordValue.length<2){
        searchStoreErrorMessageContent.textContent = "請輸入兩個字以上"
    }
    else{
        let storeFoodChosenCreateApiGetResult = await storeFoodChosenCreateApiGet(intoKeywordValue,urlGroupName);
        console.log("storeFoodChosenCreateApiGetResult",storeFoodChosenCreateApiGetResult);
        eval(`earchStoreListBlockBlock_${storeListCount}`).remove();
        storeListCount+=1;
        createDivElement(searchStoreListBlock,`earchStoreListBlockBlock_${storeListCount}`,"earchStoreListBlockBlock",null,"appendChild");
        console.log("createDivElement.length");
        for (let i=0;i<storeFoodChosenCreateApiGetResult.length;i++){
            let storeNameLs = storeFoodChosenCreateApiGetResult[i].storeName;
            let storeIndexLs = storeFoodChosenCreateApiGetResult[i].storeIndex;
            createDivElement(eval(`earchStoreListBlockBlock_${storeListCount}`),`earchStoreList${i}`,"",null,"appendChild");
            createInputElement(eval(`earchStoreList${i}`),`searchStoreCheckBox${i}`,"", null, "appendChild",inputType = "radio", inputValue =storeIndexLs,inputName = "searchStoreCheckBox");
            createDivElement(eval(`earchStoreList${i}`),`searchStoreName${i}`,"",storeNameLs,"appendChild");
        };
    };
};

async function confirmStoreButtonClick(){
    let intoKeywordValue = intoKeyword.value;
    let chosenStore = document.querySelector('input[name=searchStoreCheckBox]:checked');
    let chosenStoreValue = chosenStore.value;
    console.log("chosenStoreValue",chosenStoreValue)
    let storeIndexData = {
        "intoKeywordValue":intoKeywordValue,
        "storeIndex":chosenStoreValue
    }
    let storeFoodChosenCreateApiPostResult = await storeFoodChosenCreateApiPost(storeIndexData)
    console.log("storeFoodChosenCreateApiPostResult",storeFoodChosenCreateApiPostResult)
}