inp = document.getElementById("inp");
oldval = inp.value;

function anim() {
    val = inp.value;
    //get cursor position
    pos = inp.selectionStart;
    // if length increases add the letter to div
    //add multiple events to the same element
    ['keydown','select','keyup'].forEach(function(event) {
        inp.addEventListener(event, function(e) {
            start = inp.selectionStart;
        end = inp.selectionEnd;
        });
    });
    

    if (val.length > oldval.length) {
        pos = inp.selectionStart;
        inputletter = val[pos - 1];
        //make a span and put the letter in it
        var span = document.createElement("span");
        span.innerHTML = inputletter;
        if (inputletter == " ") {
            span.style.display = "initial";
        }
        //put the span in the div
        //get the cursor position

        //put the span in the div
        document.getElementById("inp_div").insertBefore(span, document.getElementById("inp_div").childNodes[pos - 1]);
        //add an animation to the span    

    }

    // if length decreases remove the letter from div
    else if (val.length <= oldval.length) {
        //get the selectionstart and selectionend
        if (typeof start !== 'undefined' && start != end) {
            //remove the letter from the div
            for (i = start; i < end; i++) {
                document.getElementById("inp_div").removeChild(document.getElementById("inp_div").childNodes[start]);
            }
        } else {
            //get cursor position
            pos = inp.selectionStart;
            //remove the letter from the div
            document.getElementById("inp_div").removeChild(document.getElementById("inp_div").childNodes[pos]);
        }
    }




    oldval = val.substring(0, val.length - 1);
}
