sets = ["1"]
ownerAdminId = 1

Game.command("load", async(p,i) => {
    if (p.userId !== ownerAdminId) return;
    world.bricks.forEach(async(brick) => {
        await sleep(2000)
        brick.destroy()
    })
    await sleep(2000)
    Game.messageAll(`\\c6Loading ${i}.brk`)
    let data = await Game.loadBrk(`./maps/${i}.brk`)
    Game.setEnvironment(data.environment)
    Game.players.forEach((player) => {
        player.respawn()
    })
    world.bricks.forEach(async(brick) => {
        if (brick.name == "sb1") { //Gives 10 points
            spawnscorebubble(brick.position,1)
            await sleep (4000)
            brick.destroy()
        } else if (brick.name == "sb2") { //Gives 50 points
            spawnscorebubble(brick.position,2)
            await sleep (4000)
            brick.destroy()
        } else if (brick.name == "sb3") { //Gives 100 points
            spawnscorebubble(brick.position,3)
            await sleep (4000)
            brick.destroy()
        }
    })
})

Game.command("add", (p,i) => {
    if (p.userId !== ownerAdminId) return;
    sets.push(i)
    Game.messageAll(`\\c6${i}.brk has been added!`)
})

Game.command("pop", (p,i) => {
    if (p.userId !== ownerAdminId) return;
    var i = sets.pop()
    Game.messageAll(`\\c6${i}.brk has been removed!`)
})

Game.command("remove", (p,i) => {
    if (p.userId !== ownerAdminId) return;
    x = sets.indexOf(i)
    if (x == -1) return p.message(`\\c6Unable to find ${i}`)
    sets.splice(x,1);
    Game.messageAll(`\\c6${i}.brk has been removed!`)
})

setInterval(async() => {
    console.log("loading")
    i = sets[randynumber(0,sets.length - 1)]
    world.bricks.forEach(async(brick) => {
        await sleep(2000)
        brick.destroy()
    })
    await sleep(2000)
    Game.messageAll(`\\c6Automaticly loading ${i}.brk`)
    let data = await Game.loadBrk(`./maps/${i}.brk`)
    Game.setEnvironment(data.environment)
    Game.players.forEach((player) => {
        player.respawn()
    })
    world.bricks.forEach(async(brick) => {
        if (brick.name == "sb1") { //Gives 10 points
            spawnscorebubble(brick.position,1)
            await sleep (4000)
            brick.destroy()
        } else if (brick.name == "sb2") { //Gives 50 points
            spawnscorebubble(brick.position,2)
            await sleep (4000)
            brick.destroy()
        } else if (brick.name == "sb3") { //Gives 100 points
            spawnscorebubble(brick.position,3)
            await sleep (4000)
            brick.destroy()
        }
    })
},600000)

function randynumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function spawnscorebubble(pos,type){
    if (type == 1) { // Normal bubble gives 10
        var brick = new Brick(pos, new Vector3(1, 1, 1), "#00ff00")
        Game.newBrick(brick)
    } else if (type == 2) { // Medium bubble gives 50 
        var brick = new Brick(pos, new Vector3(1, 1, 1), "#ffff00")
        Game.newBrick(brick)
    } else if (type == 3) {  // Huge bubble gives 100 
        var brick = new Brick(pos, new Vector3(1, 1, 1), "#ff0000")
        Game.newBrick(brick)
    }

    brick.touching(debounce(p => {
        if (type == 1) {
            p.bubblescore += 10
            p.bubblemut++
            p.bubblecooldown = 3
            //brick-streamstuuf line
            p.centerPrint(`${p.bubblescore}`,3)
            bubbleexplode(brick.position.x,brick.position.y,brick.position.z,"#00ff00",)
            bubbleexplode(brick.position.x,brick.position.y,brick.position.z,"#00ff00",)
            bubbleexplode(brick.position.x,brick.position.y,brick.position.z,"#00ff00",)
            brick.destroy()
        } else if (type == 2) {
            p.bubblescore += 50
            p.bubblemut++
            p.bubblecooldown = 3
            //brick-streamstuuf line
            p.centerPrint(`${p.bubblescore}`,3)
            bubbleexplode(brick.position.x,brick.position.y,brick.position.z,"#ffff00",)
            bubbleexplode(brick.position.x,brick.position.y,brick.position.z,"#ffff00",)
            bubbleexplode(brick.position.x,brick.position.y,brick.position.z,"#ffff00",)
            brick.destroy()
        } else if (type == 3) {
            p.bubblescore += 100
            p.bubblemut++
            p.bubblecooldown = 3
            //brick-streamstuuf line
            p.centerPrint(`${p.bubblescore}`,3)
            bubbleexplode(brick.position.x,brick.position.y,brick.position.z,"#ff0000",)
            bubbleexplode(brick.position.x,brick.position.y,brick.position.z,"#ff0000",)
            bubbleexplode(brick.position.x,brick.position.y,brick.position.z,"#ff0000",)
            brick.destroy()
        }
    }, 800))
}

Game.on('playerJoin', (p) => {
    p.bubblescore = 0
    p.newbubblescore
    p.bubblemut = 0
    p.bubblecooldown = 0
    p.mut = 0

    p.setInterval(() => {
        p.bubblecooldown--
        if (p.bubblecooldown == 0) {
            if (p.bubblemut > 4) {
                p.mut = 1
                p.mut += Math.floor(p.bubblemut / 5)
                p.newbubblescore = Math.floor(p.bubblescore * p.mut)
                p.centerPrint(`\\c5X${p.mut}! ${p.newbubblescore}+ (${p.bubblescore})`,2)
                p.setScore(p.score += p.newbubblescore)
                p.bubblescore = 0
                p.bubblemut = 0
            } else {
                p.centerPrint(`\\c5${p.bubblescore}+`,2)
                p.setScore(p.score += p.bubblescore)
                p.bubblescore = 0
                p.bubblemut = 0
            }
        }
    },1000)
})



function bubbleexplode(px,py,pz,color) {
    let brick = new Brick(new Vector3(px,py,pz+3),new Vector3(0.35,0.35,0.35),color)
    Game.newBrick(brick)
    var grav = 1
    var time = 0
    var sped = 1
    var prot = randynumber(0,9999)
    brick.setInterval(() => {
        var rotx = brick.position.x += 1 * Math.sin(prot)
        var roty = brick.position.y -+ 1 * Math.cos(prot)
        var rotz = brick.position.z += grav
        brick.setPosition(new Vector3(rotx,roty,rotz))
        time++
        if (time > 1) {
            grav -= 0.1
            sped -= 0.05
            time++
            var rotx = brick.position.x += sped * Math.sin(prot)
            var roty = brick.position.y -+ sped * Math.cos(prot)
            var rotz = brick.position.z += grav
            if (time > 80 && !brick.destroyed)
            brick.destroy()
        }
    }, 35)
}