inp = document.getElementById("inp");
oldval = inp.value;

function anim() {
    val = inp.value;
    //get cursor position
    pos = inp.selectionStart;
    // if length increases add the letter to div
    inp.addEventListener("click", function() {
        //get the selection start and end
        start = inp.selectionStart;
        end = inp.selectionEnd;
        //get the selection
        selection = inp.value.substring(start, end);
        //get the selection length
        selectionlength = selection.length;
        });

    if (val.length > oldval.length) {
        inputletter = val[val.length - 1];
        //make a span and put the letter in it
        var span = document.createElement("span");
        span.innerHTML = inputletter;
        if(inputletter == " "){
            span.style.display = "initial";
            console.log(span.display);
        }
        //put the span in the div
        document.getElementById("inp_div").appendChild(span);
        //add an animation to the span    

    }
 
    // if length decreases remove the letter from div
    else if (val.length <= oldval.length) {
        //get the selectionstart and selectionend
        if(typeof start !== 'undefined' && start!=end){
        console.log(start, end);
        //remove the letter from the div
        for(i = start; i <end; i++){
            document.getElementById("inp_div").removeChild(document.getElementById("inp_div").childNodes[start]);
            }
        }
        else{
            //get cursor position
            pos = inp.selectionStart;
            //remove the letter from the div
            document.getElementById("inp_div").removeChild(document.getElementById("inp_div").childNodes[pos]);
        }
    }
    

    

    oldval = val.substring(0, val.length - 1);
}

