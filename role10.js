
// game object
var gameObj = {
    roleNum: 0,
    roleCount: 0,
    correctCount: 0,
    numbers: [],
    playerName: ''
}

// game event handlers
var handlers = {
    gameBTN: function () {
        if (gameObj.correctCount < 9){
            gameObj.roleNum = handlers.randomNumber(1, 9);
            gameObj.roleCount= gameObj.roleCount + 1;
            view.showRoleCount();
            view.showRoleNumber();
        } else {
            view.doneNotice();
        }
    },
    randomNumber: function (min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },
    clickRole: function() {
        var boardItem = document.querySelector("#roleNum");
        listeners.set(boardItem, handlers.gameBTN);
    },
    replay: function () {
        location.reload(true);
    }
};

// methods to change the gameboard veiw
var view = {
    generateGamePieces: function (min, max) {
        var gameBoard = document.querySelector('ul');
        gameBoard.innerText = '';
        gameObj.numbers.length = 0;
        gameObj.correctCount = 0;
        for (var i = 0; i < max; i++){
            gameObj.numbers.push(handlers.randomNumber(min, max));
            var createLi = document.createElement('li');
            createLi.innerText = gameObj.numbers[i];
            gameBoard.appendChild(createLi);
        };
        listeners.gamePiece(gameBoard);
    },
    showRoleNumber: function () {
        var roleNum = document.querySelector('#roleNum');
        // var btnText = document.querySelector('#btnStart');
        // btnText.textContent = "Role Again";
        roleNum.textContent = gameObj.roleNum;
    },
    showRoleCount: function () {
        var roleCount = document.querySelector('#roleCount');
        roleCount.textContent = gameObj.roleCount;
    },
    wrongAnswerNotice: function () {
        var wrongNotice = document.querySelector('#wrongNotice');
        wrongNotice.classList.toggle('hiddenClass');
        setTimeout(function(){
            wrongNotice.classList.toggle('hiddenClass');
        }, 1000);
    },
    doneNotice: function () {
        var boardItem = document.querySelector('#gameOverNotice');
        boardItem.classList.remove('hiddenClass');
        listeners.set(boardItem, handlers.replay);
    }
};

// listeners for gameboard clicks
var listeners = {
    set: function(boardItem, fn){
        boardItem.addEventListener('click', function(){
            fn();
        });
    },
    gamePiece: function(boardItem){
        boardItem.addEventListener('click', function(event){
            if (event.target.className == "usedNum" || event.target.tagName !== "LI"){
                // do nothing;
            } else {
                if (Number(event.target.textContent) + gameObj.roleNum == 10){
                        event.target.classList.add("usedNum"); 
                        gameObj.correctCount = gameObj.correctCount + 1;
                        handlers.gameBTN();
                } else {
                       view.wrongAnswerNotice();
                }
            }

        });
        handlers.clickRole();
    }
};


view.generateGamePieces(1, 9);
