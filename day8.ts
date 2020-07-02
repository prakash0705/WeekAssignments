class CricketGame {
    team1PlayerTotal: number[];
    team2PlayerTotal: number[];
    row: number;
    column: number;
    flag:boolean
    button1flag: boolean;
    button2flag: boolean;
    timeleft : number;
    timeTracker : number;
    constructor() {
        this.row = 1;
        this.column = 1;
        this.team1PlayerTotal = [];
        this.team2PlayerTotal = [];
        this.timeleft = 60;
        this.timeTracker = 2*this.timeleft;
        this.button1flag = false
        this.button2flag = false
        console.log(this.row, this.column)
        this.timer("teamButton1");
    }

    fillData = (button: HTMLButtonElement, table: string) => {
        var tableDOM = <HTMLTableElement>document.getElementById(table);
        console.log(this.row, this.column)
        let random = Math.round((Math.random() * 10) % 6)
        let flag = false
        if (random === 0) {
            tableDOM.rows[this.row].cells[this.column].innerHTML = '0';
            for (var itr = this.column + 1; itr < 6; itr++)
                tableDOM.rows[this.row].cells[itr].innerHTML = '';
            this.column = 6;
            flag = true
        }
        if (flag === false)
            tableDOM.rows[this.row].cells[this.column].innerHTML = random.toString();

        this.findPlayerTotal(this.row, this.column, table);
        this.column += 1;
        if (this.column > 6) {
            this.row += 1;
            this.column = 1;
            this.findPlayerTotal(this.row - 1, this.column, table);
        }
        flag = false

        if (this.row > 10) {
            button.disabled = true;
            this.column = 1;
            this.row = 1;
            if (table === "team1")
                this.button1flag = true
            else if (table === "team2")
                this.button2flag = true

            if (this.button1flag === true && this.button2flag === true)
                this.printResult();
        }

    }

    findPlayerTotal = (row: number, column: number, table: string) => {
        console.log("row:", row)
        var tableDOM = <HTMLTableElement>document.getElementById(table);
        var total = 0;
        for (var itr = 1; itr <= 6; itr++) {
            var value = tableDOM.rows[row].cells[itr].innerHTML;
            if (value === '')
                continue;
            else
                total = total + parseInt(value)
        }
        tableDOM.rows[row].cells[7].innerHTML = total.toString();
    }

    printResult = () => {
        //To find Total Score of Team 1
        var tableDOM = <HTMLTableElement>document.getElementById("team1");
        var totalScoreTeam1 = <HTMLElement>document.getElementById("team1Score");
        var team1Score = 0;
        for (var i = 1; i <11 ; i++){
            var value = tableDOM.rows[i].cells[7].innerHTML;
            if(value!='')
                team1Score += parseInt(value);
        }

        totalScoreTeam1.innerHTML = team1Score.toString();

        //To find Total Score of Team 2
        tableDOM = <HTMLTableElement>document.getElementById("team2");
        var totalScoreTeam2 = <HTMLElement>document.getElementById("team2Score");
        var team2Score = 0;
        for (var i = 1; i <11 ; i++){
            var value = tableDOM.rows[i].cells[7].innerHTML;
            if(value!='')
                team2Score += parseInt(value);
        }
        totalScoreTeam2.innerHTML = team2Score.toString();
        var winningTeam = ''
        if (team2Score > team1Score)
            winningTeam = "Team 2"
        else if (team1Score > team2Score)
            winningTeam = "Team 1"
        else
            winningTeam = "DRAW"


        //Adding Results
        if (winningTeam != "DRAW")
            document.getElementById("result").innerHTML=`MATCH WON BY ` + winningTeam;
        else
            document.getElementById("result").innerHTML = "MATCH DRAW";
    }

    timer = (button:string) => {
        var Timer = setInterval(()=> {
            if (this.timeleft <= 0) {
                    this.row=1;
                    this.column=1;
                    console.log(this.row,this.column);                  
                    var btn = <HTMLButtonElement>document.getElementById(button)
                    btn.disabled = true
                    clearInterval(Timer);
                    if(button==='teamButton1'){
                        var btn = <HTMLButtonElement>document.getElementById("teamButton2")
                        btn.disabled = false
                        this.timeleft = 60
                        this.timer("teamButton2")
                    }
                    else{
                        clearInterval(Timer);
                        return 1;
                    }                    
            }
            
            this.timeleft -= 1;
            this.timeTracker--;
            if(this.timeTracker<=0)
                this.printResult();

            document.getElementById("timer").innerHTML = (this.timeleft).toString();
        }, 1000);
    }
}



let obj = new CricketGame();
let teamButton1 = <HTMLButtonElement>document.getElementById('teamButton1')
teamButton1.addEventListener("click", () => {
    obj.fillData(teamButton1, "team1");
});

let teamButton2 = <HTMLButtonElement>document.getElementById('teamButton2')
console.log(teamButton2)
teamButton2.addEventListener("click", () => {
    obj.fillData(teamButton2, "team2");
});

let generateResult = <HTMLButtonElement>document.getElementById('genResult')
generateResult.addEventListener("click", () => {
    obj.printResult();
});


console.log(obj);

