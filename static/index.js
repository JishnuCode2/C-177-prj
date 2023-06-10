/*let words = [
    {
        "inputs":4,
        "hints": ["Category is Sports","Can be played by upto Four Players", "It is a Board Game", "Dice are used"],
        "word": "ludo"
    },
    {
        "inputs":6,
        "hints": ["It is the Name of a European Country", "It is the largest country by territory in Europe", "In South-West part of Europe", "Revolution of 1789"],
        "word": "france"
    }
];*/

$(document).ready(function(){
    getTemplates()
});

function getTemplates(){
    $.ajax({
        url: "/get-template",
        type: "get",
        success: function (result){ fillBlanks(result.word)},
        error: function (result){ alert(result.responseJSON.message)}
    })
}

function fillBlanks(word){

    const randomWord = word;

    $("#blanks").empty();

    for (let i = 0; i < randomWord.inputs; i++) {
        let input_html = `<span class="fill_blanks" id="input_${i}">_</span>`

        $("#blanks").append(input_html)
    }


    var gameOver=false

    $(".clickable").click(function () {
        var correctGuess = false;      

        let id = $(this).attr("id");

        var life = parseInt($("#life").text())

        for (var i = 0; i < randomWord.word.length; i++) {

            if (randomWord.word.charAt(i).toLowerCase() == id) {
      
                if (life>0 && ($(".fill_blanks").eq(i).html() == "_" || $(".fill_blanks").eq(i).html() == id)) {

                    $(".fill_blanks").eq(i).html(id);
                    correctGuess = true;

                    console.log($("#blanks").text());

                    if ($("#blanks").text() === randomWord.word.toLowerCase()) {
                        console.log('a')
                        alert("You Win!!")
                        correctGuess = true;
                        gameOver=true
                    }
                }                
            }
            
        }
       
        if (life > 0 && correctGuess!=true && gameOver!=true) {           
            life = life - 1
            $("#life").text(life)

            var hintNumber = (4 - life);
            $("#hint").html(randomWord.hints[hintNumber])

        }
        else if (life === 0) {
            alert("Game Over!!")
        }
    })
}