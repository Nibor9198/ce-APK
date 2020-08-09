function calculate_apk(root, number_of_digits){
    let nod = 10**number_of_digits;
    return parseInt(getVolume(root) * (getPercent(root) / 100) * nod / getPrice(root)) / nod;
}

function getPrice(root){
    return parseInt(root.getElementsByClassName("price")[0].innerHTML.replace(/\s/g, ''));
}

function getVolume(root){
    return root.getElementsByClassName("packaging").item(0).innerText.match(/\d+/g).pop();
}

function getPercent(root){
    let li_list = root.getElementById("destopview").childNodes[1].childNodes

    for(li of li_list){
        if(li.innerHTML != null && li.innerHTML.includes("Alkoholhalt")){
            return li.childNodes[3].innerText.match(/\d+/g)[0];
        }
    }

//.childNodes[3].childNodes[3].innerHTML.match(/\d+/g)[0];
}

function httpGetAsync(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
             callback(xmlHttp.responseText);
        }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function main(){
    if(location.href.includes(".se/dryck/")){
        let apk = calculate_apk(document, 2)
        let apkNode = document.createElement("h1");
        
        apkNode.innerText = "APK: " + apk;
        document.getElementsByClassName("name")[0].appendChild(apkNode)

    }else if(location.href.includes(".se/sok-dryck/")){
        let list = document.getElementsByClassName("elm-product-list-item-full");

        for(let i = 0; i < list.length; i++){
            let li = list[i]
            let a_tag = li.getElementsByTagName("a")[0];
            
            httpGetAsync(a_tag.href, (res)=>{
                let resDom = new DOMParser().parseFromString( res, "text/html");

                let apk = calculate_apk(resDom, 2)
                let apkNode = document.createElement("div");
                apkNode.innerText = "APK: " + apk;

                a_tag.getElementsByClassName("row-1")[0].appendChild(apkNode)
                
            });

        }
    }
}

main();
