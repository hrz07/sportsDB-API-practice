const allPlayersBox = document.getElementById("search-result-box");

const searchBtn = () => {
    const input = document.getElementById("input");
    const inputVal = input.value;
    input.value = "";
    fetch(
        `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputVal}`
    )
        .then((res) => res.json())
        .then((data) => allPlayerFunc(data.player));
};

const allPlayerFunc = (players) => {
    allPlayersBox.innerHTML = "";
    for (const player of players) {
        const div = document.createElement("div");
        div.innerHTML = `
        
        <div class="card" style="width: 18rem;">
        <img src="${player.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${player.strPlayer}</h5>
        <p class="card-text">${player.strNationality}</p>
            <a href="#" class="btn btn-primary">Details</a>
        </div>
    </div>
        
        `
        allPlayersBox.appendChild(div); 
    }
};
