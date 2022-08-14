inp = document.getElementById("inp");
oldval = inp.value;

function anim() {
    val = inp.value;
    //get cursor position
    pos = inp.selectionStart;
    // if length increases add the letter to div
    //add multiple events to the same element
    ['keydown', 'select', 'keyup'].forEach(function (event) {
        inp.addEventListener(event, function (e) {
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



function anim_fn(elem) {
    // get div next to the input
    inp_div = elem.nextElementSibling;
    val = elem.value;
    //get cursor position
    pos = elem.selectionStart;
    console.log(pos);
    // if length increases add the letter to div
    //add multiple events to the same element
    ['keydown', 'select', 'keyup'].forEach(function (event) {
        elem.addEventListener(event, function (e) {
            start = elem.selectionStart;
            end = elem.selectionEnd;
        });
    });


    if (val.length > oldval.length) {
        pos = elem.selectionStart;
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
        inp_div.insertBefore(span, inp_div.childNodes[pos - 1]);
        //add an animation to the span    

    }

    // if length decreases remove the letter from div
    else if (val.length <= oldval.length) {
        //get the selectionstart and selectionend
        if (typeof start !== 'undefined' && start != end) {
            //remove the letter from the div
            for (i = start; i < end; i++) {
                inp_div.removeChild(inp_div.childNodes[start]);
            }
        } else {
            //get cursor position
            pos = elem.selectionStart;
            //remove the letter from the div
            inp_div.removeChild(inp_div.childNodes[pos]);
        }
    }




    oldval = val.substring(0, val.length - 1);
}




/* final script to get fancy-input element to work */

/* create a custom element */
var FancyInput = customElements.define('fancy-input', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        //set default attributes

        this.shadowRoot.innerHTML = `
        <style>
        :host {
            display: block;
            position: relative;  
            font: ` + this.getAttribute('font')+ `;
        }
        :host > input {
            outline: none;
            font: inherit;
            border: ` + this.getAttribute('border') + `;
            border-radius: ` + this.getAttribute('border-radius') + `;
            padding:` + this.getAttribute('padding') + `;
            border:none;

            color: transparent;
            caret-color: #000;
            width: ` + this.getAttribute('width') + `;
            height: ` + this.getAttribute('height') + `;
            
        }
        :host > input::selection {
            background: #44f8;
            color: transparent;
        }
        :host > div {
            outline: none;
            font: inherit;
            border: ` + this.getAttribute('border') + `;
            border-radius: ` + this.getAttribute('border-radius') + `;
            padding:` + this.getAttribute('padding') + `;

            align-items: center;    
            position: absolute;
            top: 0;
            left: 0;
            width: ` + this.getAttribute('width') + `;
            height: ` + this.getAttribute('height') + `;
            color: #333;
            pointer-events: none;
        }
        :host > div > span {
            animation: ` + this.getAttribute('animation') + ` linear forwards;
            display: inline-block;
            line-height: ` + this.getAttribute('height') + `;
        }
        /* animations */
        @keyframes scale {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
                
        @keyframes drop {
            0% {
                transform: translateY(-30px);
            }
            80% {
                transform: translateY(10px);
            }
            85% {
                transform: translateY(-5px);
            }
            90% {
                transform: translateY(10px);
            }
            100% {
                transform: translateY(0px);
            }
        }

        @keyframes shake {
            0% {
                transform: translate(1px,2px) rotate(35deg);
            }
            20% {
                transform: translate(-2px,1px) rotate(-35deg);
            }
            40% {
                transform: translate(4px,-2px) rotate(35deg);
            }
            60% {
                transform: translate(-5px,2px) rotate(-15deg);
            }
            100% {
                transform: translate(0px);
            }
        }

        @keyframes color-bloom{
            0%{
                color: hsl(0,100%,50%);
                /*glow text*/
                text-shadow: 0 0 10px hsl(0,100%,50%);

            }
            20%{
                color: hsl(50,100%,50%);
                text-shadow: 0 0 10px hsl(50,100%,50%);

            }
            40%{
                color: hsl(100,100%,50%);
                text-shadow: 0 0 10px hsl(100,100%,50%);

            }
            60%{
                color: hsl(150,100%,50%);
                text-shadow: 0 0 10px hsl(150,100%,50%);
            }
            80%{
                color: hsl(200,100%,50%);
                text-shadow: 0 0 10px hsl(200,100%,50%);

            }
            100%{
                color: rgb(2, 1, 9);
                text-shadow: 0 0 0px rgb(2, 1, 9);
            }
        }

        @keyframes zoom {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(2);
            }
            100% {
                transform: scale(1);
            }
        }

        @keyframes fade-in {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
        ` + this.getAttribute('style') + `
        </style>
        <input type="text" oninput = anim_fn(this)>
        <div class="inp_div">
        </div>
        `;
    }
});