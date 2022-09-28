$(document).ready(function () {

    var images_level = [
        ["0.png", "1.png", "2.png", "3.png"],
        ["4.png", '5.png', "6.png", "7.png"],
        ["8.png", "9.png", "10.png", "11.png"],
        ["12.png", "13.png", "14.png", "15.png"],
        ["16.png", "17.png", "18.png", "19.png"]
    ]

        var c_n_level = [
        ["Vietnam", "South Korea", "North Korea", "Philipine"],
        ["Poland", "Belarus", "Luxembourg", "Belgium"],
        ["Angola", "Zimbabwe", "Zambia", "Chad"],
        ["Cube", "Dominica Republic", "Haiti", "Costa Rica"],
        ["Colombia", "Ecuador", "Argentina", "Chile"]
    ]



    var lives = 3;
    var level = 0
    let happy = new Audio("win.wav")
    var victory = new Audio("gamewin.wav")
    var loss = new Audio("gamelose.wav")

    function hearts() {
        $("h3 span").html('')
        for (var i = 0; i < lives; i++) {
            $("h3 span").append("<img class='hearts' src= 'heart.png'>")
        }
    }
    hearts()


    function play_game() {
        if (level < images_level.length) {
            $("#flags").html("")
            $("#countries").html("")
            var points = 0
            var images = images_level[level]
            console.log(images)
            console.log(images_level)
            var c_n = c_n_level[level]


            images.sort(function () {
                return Math.random() - 0.5
            })

            for (var i = 0; i < images.length; i++) {

                let index = images[i].indexOf('.')
                let data = images[i].slice(0, index)
                $(` <div class = "country" data-number = "${data}" >
            <img src = "${images[i]}" >
          </div>`).appendTo("#countries").draggable({
                    "revert": true
                })
            }

            for (var i = 0; i < c_n.length; i++) {
                $(`<div class = "flag" data-number = "${i + 4 * level}"> <p>
         ${c_n[i]}
            <p></div>`).appendTo("#flags").droppable({
                    "accept": ".country",
                    "drop": match
                })
            }
            function match(e, ui) {
                let acceptor = $(this)
                let visitor = ui.draggable


                if (acceptor.data("number") == visitor.data("number")) {
                    acceptor.droppable("disable")
                    visitor.draggable("disable").draggable({
                        "revert": false
                    })
                    visitor.position({
                        of: acceptor,
                        at: "center",
                        my: "center"

                    })
                    points++
                    if (points == images.length) {
                        level++

                        if (level == images_level.length) {
                            victory.play()
                            $("#win h2").text("YOU WIN!!! :)")
                            $("#win").slideDown(1000)

                        }
                        else {
                            happy.play()
                            alert("YOU PASSED LEVEL" + level)
                            play_game()
                        }
                    }
                }
                else {
                    lives--
                    hearts()

                    if (lives == 0) {
                        loss.play()
                        $("#win h2").text('You Lose :(')
                        $("#win").slideDown(1000)
                    }
                }
            }
        }
    }

    play_game()

})
