console.log("Welcome to Console");

function getElementFromString(str){
    let div = document.createElement("div");
    div.innerHTML=str;
    return div.firstElementChild;
}

let urlField = document.getElementById("urlField");
let jsonRequestBox = document.getElementById("jsonRequestBox");
let parametersBox = document.getElementById("parametersBox");
let addParams = document.getElementById("addParams");
let params = document.getElementById("params");
let submit = document.getElementById("submit");
let jsonResponseText = document.getElementById("jsonResponseText");

//Hide contenttype div initially
let contentTypeDiv = document.getElementById("contentTypeDiv");
contentTypeDiv.style.display = "none";
jsonRequestBox.style.display = "none";

document.getElementById("postType").addEventListener("click", ()=>{
    contentTypeDiv.style.display = "block";
    jsonRequestBox.style.display = "block";
})

document.getElementById("getType").addEventListener("click", ()=>{
    contentTypeDiv.style.display = "none";
    jsonRequestBox.style.display = "none";
})

// Hide Parameters Box initially
parametersBox.style.display="none";

// if custom parameters is clicked then json box hides
paramsRadio.addEventListener("click", ()=>{
    jsonRequestBox.style.display="none";
    parametersBox.style.display="block";
    
})

// if json radio is clicked then parameters box hides
jsonRadio.addEventListener("click", ()=>{
    jsonRequestBox.style.display="block";
    parametersBox.style.display="none";
})


let paramCount = 1;
addParams.addEventListener("click", function(index){
    let paramText =  `<div class="row my-1" id="deleteParamDiv${paramCount+1}">
                    <label class=" col-form-label col-sm-2 pt-0 py-2">Parameters ${paramCount+1}</label>
                    <div class="col">
                        <input type="text" class="form-control" id="parametersKey${paramCount+1}" placeholder="Key">
                    </div>
                    <div class="col mr-3">
                        <input type="text" class="form-control" id="parametersValue${paramCount+1}" placeholder="Value">
                    </div>
                    <button class="btn btn-primary deleteParams">-</button>
                </div>`;    
    let paramElement = getElementFromString(paramText);
    
    params.appendChild(paramElement); 
    let deleteParams = document.getElementsByClassName("deleteParams");
    for(item of deleteParams){
        item.addEventListener("click", (e)=>{
            e.target.parentElement.remove();
            console.log("removing")
        })
    }
    paramCount++;
})
        
submit.addEventListener("click", ()=>{
    jsonResponseText.value = "Please Wait... Fetching Response..."
    let requestType = document.querySelector("input[name='request']:checked").value;
    let contentType = document.querySelector("input[name='content']:checked").value;
    
    let data = {};
    if(contentType == "params")
    {
        for(i=0; i<paramCount; i++){
            if(document.getElementById(`parametersKey${i+1}`)!=undefined){
            let key = document.getElementById(`parametersKey${i+1}`).value;
            let value = document.getElementById(`parametersValue${i+1}`).value;
            data[key] = value;
            }
        }
       data = JSON.stringify(data);
       
    }
    else{
        data = document.getElementById("jsonRequestText").value;
    }

    // if request type is get
    if(requestType == "GET")
    {
        fetch(urlField.value).then(response => response.text()).then(text => jsonResponseText.value=text)
    }
    // if request type is POST
    else{
        fetch(urlField.value, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            body: data
        }).then(response => response.text()).then(text => jsonResponseText.value=text)
    }
})


