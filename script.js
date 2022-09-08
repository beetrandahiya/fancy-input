/* final script to get fancy-input element to work */

// mutliple event listeners function
const addMultipleListeners = (el, types, listener, options, useCapture) => {
    types.forEach(type =>
      el.addEventListener(type, listener, options, useCapture)
    );
  };
  
/* create a custom element */
var FancyInput = customElements.define('fancy-input', class extends HTMLElement {
    constructor() {
        super();
        this.oldval = this.getAttribute('value') || '';
        console.log(this.oldval);
        this.attachShadow({
            mode: 'open'
        });
        //set default attributes
        this.styles=this.formatStyles(this.getAttribute('styles'));
        this.shadowRoot.innerHTML += `
        <style>
        :host > input::selection {
            background: #44f8;
            color: transparent;
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
</style>
        `;

        this.inp = document.createElement('input');
        this.inp.setAttribute('type', 'text');
        if (this.getAttribute('placeholder') != null) {
            this.inp.setAttribute('placeholder', this.getAttribute('placeholder'));
        }
        if (this.getAttribute('value') != null) {
            this.inp.setAttribute('value', this.getAttribute('value'));
        }
        this.inp_div = document.createElement('div');

        this.shadowRoot.host.style.display = "block";
        this.shadowRoot.host.style.position = "relative";
        this.shadowRoot.host.style.margin = this.getAttribute('margin') || this.styles.margin || "0px";
        this.shadowRoot.host.style.padding = "0px";
        this.shadowRoot.host.style.border = "none";
        this.shadowRoot.host.style.outline = "none";
        this.shadowRoot.host.style.background = "none";
        this.shadowRoot.host.style.font = this.getAttribute('font') || this.styles.font || "inherit";
        this.shadowRoot.host.style.fontFamily = this.getAttribute('font-family') || this.styles['font-family'] || "sans-serif";
        this.shadowRoot.host.style.fontSize = this.getAttribute('font-size') || this.styles['font-size'] || "16px";
        this.shadowRoot.host.style.fontWeight = this.getAttribute('font-weight') || this.styles['font-weight'] || "normal";

        // set styles for input
        this.inp.style.outline = "none";
        this.inp.style.border = this.getAttribute('border') || this.styles.border || "none";
        this.inp.style.borderRadius = this.getAttribute('border-radius') || this.styles['border-radius'] || "0px";
        this.inp.style.background = this.getAttribute('background') || this.styles.background || "none";
        this.inp.style.width = this.getAttribute('width') || this.styles.width || "100%";
        this.inp.style.height = this.getAttribute('height') || this.styles.height || "100%";
        this.inp.style.margin = "0px";
        this.inp.style.padding = this.getAttribute('padding') || this.styles.padding || "0px";
        this.inp.style.fontFamily = this.getAttribute('font-family') || this.styles['font-family'] || "sans-serif";
        this.inp.style.fontSize = this.getAttribute('font-size') || this.styles['font-size'] || "16px";
        this.inp.style.fontWeight = this.getAttribute('font-weight') || this.styles['font-weight'] || "normal";
        this.inp.style.font= this.getAttribute('font') || this.styles.font || "inherit";
        this.inp.style.color = "transparent";
        this.inp.style.caretColor = this.getAttribute('caret-color') || this.styles['caret-color'] || "#000";        

        // set styles for input div
        this.inp_div.style.position = "absolute";
        this.inp_div.style.top = "0px";
        this.inp_div.style.left = "0px";
        this.inp_div.style.width = this.getAttribute('width') || this.styles.width || "100%";
        this.inp_div.style.height = this.getAttribute('height') || this.styles.height || "100%";
        this.inp_div.style.margin = "0px";
        this.inp_div.style.padding = this.getAttribute('padding') || this.styles.padding || "0px";
        this.inp_div.style.fontFamily = this.getAttribute('font-family') || this.styles['font-family'] || "sans-serif";
        this.inp_div.style.fontSize = this.getAttribute('font-size') || this.styles['font-size'] || "16px";
        this.inp_div.style.fontWeight = this.getAttribute('font-weight') || this.styles['font-weight'] || "normal";
        this.inp_div.style.font= this.getAttribute('font') || this.styles.font || "inherit";
        this.inp_div.style.color = this.getAttribute('color') || this.styles.color || "black";
        this.inp_div.style.border = this.getAttribute('border') || this.styles.border || "none";
        this.inp_div.style.borderRadius = this.getAttribute('border-radius') || this.styles['border-radius'] || "0px";
        this.inp_div.style.borderColor = "transparent";
        this.inp_div.style.background = "transparent";
        this.inp_div.style.pointerEvents = "none";



        this.shadowRoot.appendChild(this.inp_div);
        this.shadowRoot.appendChild(this.inp);
     

        //add event listener
        this.inp.addEventListener('input', this.anim_fn.bind(this));
        this.inp.addEventListener('click', this.getSelection());
        //this.inp.oninput = this.anim_fn(this.inp);

        // make span elements for default value
        if(this.getAttribute('value') != null){
            for(var i=0; i<this.getAttribute('value').length; i++){
                var span = document.createElement('span');
                span.style.display = "inline-block";
                span.style.lineHeight = this.getAttribute('height') || this.styles.height || "100%";
                span.style.animation = this.getAttribute('animation') + " linear" + " forwards";
                span.textContent = this.getAttribute('value')[i];
                if(this.getAttribute('value')[i] == ' '){
                    span.style.display = 'initial';
                }
                this.inp_div.appendChild(span);
                this.val = this.getAttribute('value');
            }
        }

    }
    //function to get start and end of selection
    getSelection() {
        this.start = this.inp.selectionStart;
        this.end = this.inp.selectionEnd;
        console.log(this.start, this.end);
    }

    //format styles from string to object
    formatStyles(styles) {
        var style = {};
        styles = styles.split(';');
        for (var i = 0; i < styles.length; i++) {
            var s = styles[i].trim();
            if (s != '') {
            var s = styles[i].split(':');
            style[s[0].trim()] = s[1].trim();}
        }
        console.log(style);
        return style;
    }        

    anim_fn() {
        // get div next to the input
        this.val = this.inp.value;
        //get cursor position
        var pos = this.inp.selectionStart;
        var elem = this.inp;
        // if length increases add the letter to div
        //add multiple events to the same element

        addMultipleListeners(
            elem,
            ['keydown', 'selection', 'keyup','click'],
            () => { this.getSelection() }
          );
        

        if (this.val.length > this.oldval.length) {
            var pos = elem.selectionStart;
            var inputletter = this.val[pos - 1];
            //make a span and put the letter in it
            var span = document.createElement("span");
            span.style.display = "inline-block";
            span.style.lineHeight = this.getAttribute('height') || this.styles.height || "100%";
            span.style.animation = this.getAttribute('animation')+ " linear"+" forwards";
            span.innerHTML = inputletter;
            if (inputletter == " ") {
                span.style.display = "initial";
            }
            //put the span in the div
            this.inp_div.insertBefore(span, this.inp_div.childNodes[pos - 1]);
            //add an animation to the span    

        }

        // if length decreases remove the letter from div
        else if (this.val.length <= this.oldval.length) {
            //get the selectionstart and selectionend
        
           if (typeof this.start != 'undefined' && this.start!=this.end){
                //remove the letter from the div
                for (var i = this.start; i < this.end; i++) {
                    this.inp_div.removeChild(this.inp_div.childNodes[this.start]);
                }
            } else {
                //get cursor position
                var pos = elem.selectionStart;
                //remove the letter from the div
                this.inp_div.removeChild(this.inp_div.childNodes[pos]);
            } 
           
        }

        if(this.oldval!=this.val){
            this.oldval = this.val.substring(0, this.val.length - 1);
        }

    }


});