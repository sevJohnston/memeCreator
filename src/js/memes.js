import './general';   //doesn't have a .js, doesn't need it
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

class Memes {   //create a class called Memes
  constructor() {
    console.log("Memes JS File");
    this.$topTextInput = document.getElementById("topText");
      this.$bottomTextInput = document.getElementById("bottomText");
      this.$imageInput = document.getElementById("image");
      this.$downloadButton = document.getElementById("downloadMeme")
      this.$canvas = document.getElementById("imgCanvas");
      // these are not in the book
      this.$defaultImage = document.querySelector('#defaultImage');
      this.image = this.$defaultImage
      this.$context = this.$canvas.getContext('2d');
      this.deviceWidth = window.innerWidth;

      this.createCanvas();
      this.createMeme();    //don't need to bind here because its in the constructor, no event handler to cause trouble
      this.addEventListeners();

  }


  createCanvas(){
    this.$canvas.width = Math.min(640, this.deviceWidth - 30);
    this.$canvas.height = Math.min(480, this.deviceWidth);
  }

  createMeme(){
    this.$context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.$canvas.width = this.image.width;
    this.$canvas.height = this.image.height;
    this.resizeCanvas(this.$canvas.height, this.$canvas.width);
    this.$context.drawImage(this.image, 0, 0);

    //set up the text drawing 
    const fontSize = ((this.$canvas.width+this.$canvas.height)/2)*4/100;
    this.$context.font = `${fontSize}pt sans-serif`;
    this.$context.textAlign = 'center';
    this.$context.textBaseline = 'top';
    this.$context.lineJoin = 'round';
    this.$context.lineWidth  = fontSize/5;
    this.$context.strokeStyle = 'black';
    this.$context.fillStyle = 'white';

    // get the default text from the UI
    const topText = this.$topTextInput.value.toUpperCase();
    const bottomText = this.$bottomTextInput.value.toUpperCase();
    this.$context.strokeText(topText, this.$canvas.width/2, this.$canvas.height*(5/100));
    this.$context.fillText(topText, this.$canvas.width/2, this.$canvas.height*(5/100));
    this.$context.strokeText(bottomText, this.$canvas.width/2, this.$canvas.height*(90/100));
    this.$context.fillText(bottomText, this.$canvas.width/2, this.$canvas.height*(90/100)); 
  }

  addEventListeners(){
    /*
    this.createMeme = this.createMeme.bind(this);   //bind this to the class for the method createMeme
    this.$topTextInput.onkeyup = this.createMeme;
    this.$topTextInput.onchange = this.createMeme;
    this.$bottomTextInput.onkeyup = this.createMeme;
    this.$bottomTextInput.onchange = this.createMeme;   //usual way
    */
    // OR--create an array that contains the elements
    //and then use the arrayName.forEach method and an arrow function

    this.createMeme = this.createMeme.bind(this);
    let inputNodes = [this.$topTextInput, this.$bottomTextInput];
    inputNodes.forEach(element =>
      element.addEventListener('keyup', this.createMeme));
    inputNodes.forEach(element =>
      element.addEventListener('change', this.createMeme));
    
    this.$downloadButton.onclick = this.downloadMeme.bind(this);
    this.$imageInput.onchange = this.loadImage.bind(this);

    this.resizeCanvas = this.resizeCanvas.bind(this);
  }

  downloadMeme(){
    const imageSource = this.$canvas.toDataURL('image/png');
    this.$downloadButton.href = imageSource;
  }

  loadImage(){
    if(this.$imageInput.files && this.$imageInput.files[0]){
      let reader = new FileReader();
      reader.onload = () => {
        this.image = new Image();
        this.image.onload = () =>{
          this.createMeme();
        };
        this.image.src = reader.result;
      };
      reader.readAsDataURL(this.$imageInput.files[0]);
    }
  }

  resizeCanvas(canvasHeight, canvasWidth) {
    let height = canvasHeight;
    let width = canvasWidth;
    while(height > Math.min(1000, this.deviceWidth-30) && width > Math.min(1000, this.deviceWidth-30)) {
      height /= 2;
      width /= 2;
    }
    this.$canvas.style.height = `${height}px`;
    this.$canvas.style.width = `${width}px`;
  }
}
new Memes();    

/*  
- Part 5 - Resize the image if the user picks a really big image
  - Write the method resizeImage
    resizeCanvas(canvasHeight, canvasWidth) {
      let height = canvasHeight;
      let width = canvasWidth;
      while(height > Math.min(1000, this.deviceWidth-30) && width > Math.min(1000, this.deviceWidth-30)) {
        height /= 2;
        width /= 2;
      }
      this.$canvas.style.height = `${height}px`;
      this.$canvas.style.width = `${width}px`;
    }
  - Change the method addEventListener
    - bind the class to the resizeImage method
    - call resizeCanvas in createMeme just before you draw the image
END OF PART 5 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO PICK A REALLY LARGE IMAGE
*/
