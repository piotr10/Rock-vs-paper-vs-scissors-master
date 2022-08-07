//state
//  score
//  player pick
//  ai pick

const playerWinsLSKey = "playerWins";
const AIWinsLSKey = "AIWins";
playerPick = null;
AIPick = null;

const winningResultsMap = {
    paper: ['rock'],
    rock: ['scissors'],
    scissors: ['paper'],
}

let state = {
    playerWins: Number(localStorage.getItem(playerWinsLSKey)) || 0,
    AIWins: Number(localStorage.getItem(AIWinsLSKey)) || 0,
};

const renderScore = () => {
    const pointsElement = document.querySelector(".points");
    pointsElement.innerText = state.playerWins - state.AIWins;
};

const bindPickEvents = () => {
    document.querySelectorAll(".options button").forEach((button) => {
        button.addEventListener("click", pick);
        });
    };

const pick = (e) => {
    pickByPlayer(e.currentTarget.dataset.pick);
    pickByAI();
    hiddenOptions();
    showFight();
};

const pickByPlayer = (pickedOption) => {
    state = {
        ...state,
        playerPick: pickedOption,
    };
};

const pickByAI = () => {
    const options = ["rock", "paper", "scissors"];
    const AIPick = options[Math.floor(Math.random() * options.length)];

    state = {
        ...state,
        AIPick,
    };
};

const hiddenOptions = () => {
    document.querySelector(".options").classList.add("hidden");
};

const showFight = () => {
    document.querySelector(".fight").classList.remove("hidden");
    createElementPickedByPlayer();
    createElementPickedByAI();

    showResult();
};

const showResult = () => {
    if(state.AIPick === state.playerPick)
    {
        console.log("draw");
    }
    else if(winningResultsMap[state.playerPick].includes(state.AIPick))
    {
        localStorage.setItem(playerWinsLSKey, state.playerWins + 1);
        state = {
            ...state,
            playerWins: state.playerWins + 1,
        };        
    }
    else
    {
        // if(state.playerWins <= 0)
        // {
        //     localStorage.setItem(playerWinsLSKey, state.playerWins);
        // }
        // else
        // {
        //     localStorage.setItem(playerWinsLSKey, state.playerWins - 1);
        // }        
        // console.log("ai wins");

        localStorage.setItem(playerWinsLSKey, state.AIWins + 1);
        state = {
            ...state,
            AIWins: state.AIWins + 1,
        };        
    }

    renderScore();
}

const createElementPickedByPlayer = () => {
    const playerPick = state.playerPick;
    const pickContainerElement = document.querySelector(".pick__container--player");
    pickContainerElement.innerHTML = "";
    pickContainerElement.appendChild(createPickElement(playerPick));    
}

const createElementPickedByAI = () => {
    const AIPick = state.AIPick;
    const pickContainerElement = document.querySelector(".pick__container--ai");
    pickContainerElement.innerHTML = "";
    pickContainerElement.appendChild(createPickElement(AIPick)); 
}

const createPickElement = (options) => {
    const pickElement = document.createElement("div");
    pickElement.classList.add("button", `button--${options}`);

    const imageContainerElement = document.createElement("div");
    imageContainerElement.classList.add("button__image-container");

    const imgElement = document.createElement("img");
    imgElement.src = `./images/icon-${options}.svg`;
    imgElement.alt = options;

    imageContainerElement.appendChild(imgElement);

    pickElement.appendChild(imageContainerElement);

    return pickElement;
}

const init = () => {
    renderScore();
    bindPickEvents();
};

init();