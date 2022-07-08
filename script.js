inp = document.getElementById("inp");
oldval = inp.value;

function anim() {
    val = inp.value;
    // if length increases add the letter to div
    if (val.length > oldval.length) {
        inputletter = val[val.length - 1];
        //make a span and put the letter in it
        var span = document.createElement("span");
        span.innerHTML = inputletter;
        //put the span in the div
        document.getElementById("inp_div").appendChild(span);
        //add an animation to the span    

    }
    // if length decreases remove the letter from div
    else if (val.length <= oldval.length) {
        //get how many letters are deleted
        deleted = oldval.length - val.length + 1;
        //remove all the deleted letters from the div
        for (i = 0; i < deleted; i++) {
            //todo : add an animation to the removed letter
            document.getElementById("inp_div").removeChild(document.getElementById("inp_div").lastChild);
        }

    }

    oldval = val.substring(0, val.length - 1);
}