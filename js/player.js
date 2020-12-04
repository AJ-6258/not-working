class Player{
    constructor(){
     this.index = null;
     this.distance = 0;
     this.name = null;
     this.move = 0;
     this.rank = null;
    }
    getCount(){
        var playercountref = database.ref('playerCount');
        playercountref.on("value",function(data){
            playerCount = data.val();
        })
    }
    updateCount(count){
        database.ref("/").update({
            playerCount : count
        })
    }
    update(){
        var playerindex = "players/player"+ this.index;
        database.ref(playerindex).set({
        name : this.name,
        distance : this.distance,
        move : this.move,
        rank : this.rank
        })
    }
    static getPlayerinfo(){
        var playerinforef = database.ref('players');
        playerinforef.on("value",(data)=>{
            allPlayers = data.val()
        })
    }
    getcarsatend(){
        database.ref('carsatend').on("value",(data)=>{
            this.rank = data.val();
        })
    }
    static updatecarsatend(rank){
        database.ref('/').update({
            carsatend : rank
        })
    }
}