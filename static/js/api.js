// Get API

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Group
async function groupApiPost(data){
    return fetch(`/api/group`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
async function groupApiGet(){
    return fetch(`/api/group?page=${groupGetPage}&keyword=${keyword}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
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
};
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
        return data;
    })
};
async function groupApiDelete(data){
    return fetch(`/api/group`,{
        method:"DELETE",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data
    })
};
async function groupInfoApiGet(urlGroupName,getStatus){
    return fetch(`/api/group/info?page=${groupInfoPage}&keyword=${keyword}&urlGroupName=${urlGroupName}&getStatus=${getStatus}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};

async function groupManagerApiPatch(data){
    return fetch(`/api/group/manager`,{
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
};
// user in group
async function groupUserApiGet(urlGroupName){
    return fetch(`/api/group/user?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};

async function groupUserApiGet(urlGroupName){
    return fetch(`/api/group/user?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};

async function groupCheckUserApiPost(data){
    return fetch(`/api/group/check`,{
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
};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// User
async function userApiGet(){
    return fetch(`/api/user`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
async function userApiPatch(data){
    return fetch(`/api/user`,{
        method:"PATCH",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
async function userApiDelete(){
    return fetch(`/api/user`,{
        method:"DELETE",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Store
async function storeApiGet(urlGroupName){
    return fetch(`/api/store?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
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
        return data;
    })
};
async function storeApiPatch(data){
    return fetch(`/api/store`,{
        method:"PATCH",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};


// Store Draw lots
async function storeDrawLotsApiGet(urlGroupName){
    return fetch(`/api/store/drawLots?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
// Store Get one info
async function storeOneInfoGet(urlGroupName,urlStoreName){
    return fetch(`/api/store/info?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}&urlStoreName=${urlStoreName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
// Store get type
async function storeTpyeApiGet(urlGroupName){
    return fetch(`/api/store/type?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
// Store use keyword to crawler sotre list
async function storeFoodChosenCreateApiGet(storeCrawlerKeyword,urlGroupName){
    return fetch(`/api/store/foodChosen?page=${page}&keyword=${storeCrawlerKeyword}&urlGroupName=${urlGroupName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};

async function storeFoodChosenCreateApiPost(data){
    return fetch(`/api/store/foodChosen?page=${page}&keyword=${storeCrawlerKeyword}&urlGroupName=${urlGroupName}`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
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
        return data;
    })
};
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
        return data;
    })
};
async function menuApiGet(urlGroupName,urlStoreName){
    return fetch(`/api/menu?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}&urlStoreName=${urlStoreName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
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
        return data;
    })
};
async function orderListApiGet(urlGroupName,urlStoreName,urlStopTime,getStatus){
    return fetch(`/api/order_list?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}&urlStoreName=${urlStoreName}&urlStopTime=${urlStopTime}&getStatus=${getStatus}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};

async function orderListCheckStoreApiGet(urlGroupName,urlStoreName,getStatus){
    return fetch(`/api/order_list/check_store?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}&urlStoreName=${urlStoreName}&getStatus=${getStatus}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};

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
        return data;
    })
};
// Order list history
async function orderListHistoryApiGet(urlGroupName,urlStoreName,urlStopTime,getStatus){
    return fetch(`/api/order_list/history?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}&urlStoreName=${urlStoreName}&urlStopTime=${urlStopTime}&getStatus=${getStatus}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
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
        return data;
    })
};
async function orderApiGet(orderListId){
    return fetch(`/api/order?page=${page}&keyword=${orderUserKeyword}&orderListId=${orderListId}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
async function orderApiPatch(data){
    return fetch(`/api/order`,{
        method:"PATCH",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
// member center use only
async function orderUserApiGet(getStatus){
    return fetch(`/api/order/user?page=${orderUserApiGetPage}&keyword=${keyword}&getStatus=${getStatus}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Bill
// let billApiPostResult = await billApiPost(data)
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
        return data;
    })
};
async function billApiGet(urlGroupName){
    return fetch(`/api/bill?page=${page}&keyword=${keyword}&urlGroupName=${urlGroupName}`,{
        method:"GET",
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};
// Bill reload
async function billReloadApiPost(data){
    return fetch(`/api/bill/reload`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// reload
async function reloadApiPost(data){
    return fetch(`/api/reload`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    })
};