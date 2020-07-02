var CricketGame = /** @class */ (function () {
    function CricketGame() {
        var _this = this;
        this.fillData = function (button, table) {
            var tableDOM = document.getElementById(table);
            console.log(_this.row, _this.column);
            var random = Math.round((Math.random() * 10) % 6);
            var flag = false;
            if (random === 0) {
                tableDOM.rows[_this.row].cells[_this.column].innerHTML = '0';
                for (var itr = _this.column + 1; itr < 6; itr++)
                    tableDOM.rows[_this.row].cells[itr].innerHTML = '';
                _this.column = 6;
                flag = true;
            }
            if (flag === false)
                tableDOM.rows[_this.row].cells[_this.column].innerHTML = random.toString();
            _this.findPlayerTotal(_this.row, _this.column, table);
            _this.column += 1;
            if (_this.column > 6) {
                _this.row += 1;
                _this.column = 1;
                _this.findPlayerTotal(_this.row - 1, _this.column, table);
            }
            flag = false;
            if (_this.row > 10) {
                button.disabled = true;
                _this.column = 1;
                _this.row = 1;
                if (table === "team1")
                    _this.button1flag = true;
                else if (table === "team2")
                    _this.button2flag = true;
                if (_this.button1flag === true && _this.button2flag === true)
                    _this.printResult();
            }
        };
        this.findPlayerTotal = function (row, column, table) {
            console.log("row:", row);
            var tableDOM = document.getElementById(table);
            var total = 0;
            for (var itr = 1; itr <= 6; itr++) {
                var value = tableDOM.rows[row].cells[itr].innerHTML;
                if (value === '')
                    continue;
                else
                    total = total + parseInt(value);
            }
            tableDOM.rows[row].cells[7].innerHTML = total.toString();
        };
        this.printResult = function () {
            //To find Total Score of Team 1
            var tableDOM = document.getElementById("team1");
            var totalScoreTeam1 = document.getElementById("team1Score");
            var team1Score = 0;
            for (var i = 1; i < 11; i++) {
                var value = tableDOM.rows[i].cells[7].innerHTML;
                if (value != '')
                    team1Score += parseInt(value);
            }
            totalScoreTeam1.innerHTML = team1Score.toString();
            //To find Total Score of Team 2
            tableDOM = document.getElementById("team2");
            var totalScoreTeam2 = document.getElementById("team2Score");
            var team2Score = 0;
            for (var i = 1; i < 11; i++) {
                var value = tableDOM.rows[i].cells[7].innerHTML;
                if (value != '')
                    team2Score += parseInt(value);
            }
            totalScoreTeam2.innerHTML = team2Score.toString();
            var winningTeam = '';
            if (team2Score > team1Score)
                winningTeam = "Team 2";
            else if (team1Score > team2Score)
                winningTeam = "Team 1";
            else
                winningTeam = "DRAW";
            //Adding Results
            if (winningTeam != "DRAW")
                document.getElementById("result").innerHTML = "MATCH WON BY " + winningTeam;
            else
                document.getElementById("result").innerHTML = "MATCH DRAW";
        };
        this.timer = function (button) {
            var Timer = setInterval(function () {
                if (_this.timeleft <= 0) {
                    _this.row = 1;
                    _this.column = 1;
                    console.log(_this.row, _this.column);
                    var btn = document.getElementById(button);
                    btn.disabled = true;
                    clearInterval(Timer);
                    if (button === 'teamButton1') {
                        var btn = document.getElementById("teamButton2");
                        btn.disabled = false;
                        _this.timeleft = 60;
                        _this.timer("teamButton2");
                    }
                    else {
                        clearInterval(Timer);
                        return 1;
                    }
                }
                _this.timeleft -= 1;
                _this.timeTracker--;
                if (_this.timeTracker <= 0)
                    _this.printResult();
                document.getElementById("timer").innerHTML = (_this.timeleft).toString();
            }, 1000);
        };
        this.row = 1;
        this.column = 1;
        this.team1PlayerTotal = [];
        this.team2PlayerTotal = [];
        this.timeleft = 60;
        this.timeTracker = 2 * this.timeleft;
        this.button1flag = false;
        this.button2flag = false;
        console.log(this.row, this.column);
        this.timer("teamButton1");
    }
    return CricketGame;
}());
var obj = new CricketGame();
var teamButton1 = document.getElementById('teamButton1');
teamButton1.addEventListener("click", function () {
    obj.fillData(teamButton1, "team1");
});
var teamButton2 = document.getElementById('teamButton2');
console.log(teamButton2);
teamButton2.addEventListener("click", function () {
    obj.fillData(teamButton2, "team2");
});
var generateResult = document.getElementById('genResult');
generateResult.addEventListener("click", function () {
    obj.printResult();
});
console.log(obj);
