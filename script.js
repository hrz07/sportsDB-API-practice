const allPlayersBox = document.getElementById("search-result-box");
const singlePlayer = document.getElementById("single-info");
const spinner = document.getElementById("spinner");
const validInputMsg = document.getElementById("valid-input-msg");
const timeOutMsg = document.getElementById("timeout-msg");

const searchBtn = () => {
    validInputMsg.style.display = "none"; 
    timeOutMsg.style.display = "none";
    spinner.style.display = "block";
    const input = document.getElementById("input");
    const inputVal = input.value;
    input.value = "";
    fetch(
        `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputVal}`
    )
        .then((res) => res.json())
        .then((data) => {
            if(!isNaN(data.player)){
                spinner.style.display = "none";
                validInputMsg.style.display = "block"; 
            }
            else{
                if(data.player != null){
                    allPlayerFunc(data.player);
                }else{
                    setTimeout(timeOutMsgFunc,10000);
                }     
            }
        });
};

const timeOutMsgFunc = ()=>{
    spinner.style.display = "none";
    timeOutMsg.style.display = "block";
}

const allPlayerFunc = (players) => {
    singlePlayer.innerHTML = "";
    allPlayersBox.innerHTML = "";

    spinner.style.display = "none";
    for (const player of players) {
        const div = document.createElement("div");
        div.innerHTML = `
            
            <div class="card" style="width: 18rem;">
            <img src="${player.strThumb ? player.strThumb : player.strRender
            }" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${player.strPlayer}</h5>
            <p class="card-text">${player.strNationality}</p>
                <a href="#" onclick="details(${player.idPlayer
            })" class="btn btn-primary">Details</a>
            </div>
        </div>
            
            `;
        allPlayersBox.appendChild(div);
    }

};

const details = (idPlayer) => {
    allPlayersBox.innerHTML = "";

    fetch(
        `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${idPlayer}`
    )
        .then((res) => res.json())
        .then((data) => signlePlayerFun(data.players[0]));
};

const signlePlayerFun = (data) => {
    const playerDetails = document.getElementById("single-info");
    const div = document.createElement("div");
    div.innerHTML = `

    <div class="card" style="width: 18rem;">
        <img src="${data.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${data.strPlayer}</h5>
        <p class="card-text">Country : ${data.strNationality}</p>
        <p class="card-text">Position : ${data.strPosition}</p>
        <p class="card-text">Height : ${data.strHeight}</p>
        <p class="card-text">Height : ${data.strWeight}</p>
        </div>
    </div>
    `;
    playerDetails.appendChild(div);
};
