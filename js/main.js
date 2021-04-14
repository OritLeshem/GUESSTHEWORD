let s=0;
let input_letter;
let numOfTries = 7;
let correctCounter = 0;
let letterWord;
let levelsArray = [
  {word:"FRANCE",hint:"HINT:   Romance",picQ: "Prize: It tastes better than it looks" ,herf: "./pictureproject/eclair.jpeg",winmoto: "You won! take a bite!", losemoto:"You lost! sorry, we're fresh out"},
  { word:"SEASHELL",hint:"HINT:   Ssshhhh...",picQ: "Prize: Swim with dolphins?" ,herf: "./pictureproject/dolphin.jpeg",winmoto: "You won! Pack your swimsuit", losemoto:"You lost! Stay dry"},
  { word:"BEACH",hint:"HINT:   Near the sea",picQ:"Prize: Wanna go there?" ,herf: "./pictureproject/bora-bora.jpeg",winmoto:  "You won! Have you packed alone?", losemoto:"You lost! The food was really great"},
  { word:"SNORKEL",hint:"HINT:   Blending with the fish?",picQ: "Prize: Wanna go cruising?" ,herf: "./pictureproject/boat.jpeg",winmoto: "You won! Anchor away!", losemoto:"You lost! Captain Stuving says hello"},
  {word:"FINGERS",hint:"HINT:   Typo",picQ: "Prize: Treasure hunting??" ,herf: "./pictureproject/treasure.jpeg",winmoto: "You won! Don't forget us", losemoto:"You lost! X didn't mark the spot"},
  {word:"HAMMOCK",hint:"HINT:   Nothing but net",picQ: "Prize: Looking for a place to crash?" ,herf: "./pictureproject/house.jpeg",winmoto: "You won! party time!", losemoto:"You lost! Sorry, you've missed it!"},
  {word:"UMBRELA",hint:"HINT:   Don't Repeat Yourself",picQ: "Prize: Dessert?" ,herf: "./pictureproject/ice dessert.jpeg",winmoto: "You won! yammmy!", losemoto:"You lost! sorry, next customer please"},
  {word:"CELLPHONE",hint:"HINT:   Check your pockets",picQ: "Prize: Looking for a new boss?" ,herf: "./pictureproject/nice boss.jpeg",winmoto: "You won! We've hired Elon Musk", losemoto:"You lost! We hired Mr. Bean "},
];
let btn_level = document.querySelector('#btn_level');
let whk = document.querySelector('.whk');
let wordWrapEl = document.querySelector(".word-wrapper");
let pickedWord = levelsArray[s].word;
let hint = document.querySelector('.hint');
let q_pic = document.querySelector('.q_pic');
let img = document.querySelector('img');
let num_left_tries = document.querySelector('.num_left_tries');
let moto_mistake = document.querySelector('.moto_mistake');
let moto_lose = document.querySelector('.moto_lose');
let moto_win = document.querySelector('.moto_win');
let keyboardErea = document.querySelector('.keyboardErea');
let letter = document.querySelectorAll('.letter')
let confetti = document.querySelector('#confetti');
img.style.display= "none";
whk.style.display = "none";
btn_level.style.display= "block";
q_pic.style.display= "none";
confetti.style.display="none";

btn_level.addEventListener('click', function (next_level) {
  confetti.style.display="none";
  whk.style.display = "flex";
  btn_level.innerHTML= "next game";
  q_pic.style.display= "block";
  img.style.display= "block";
  num_left_tries.style.display = "none";
  moto_mistake.style.display = "none";
  moto_lose.style.display = "none";
  moto_win.style.display = "none";
  keyboardErea.style.display = "block";
  hint.textContent = levelsArray[s].hint;
  q_pic.textContent = levelsArray[s].picQ;
  img.src = levelsArray[s].herf;
  img.style.opacity= "1";
  moto_lose.textContent = levelsArray[s].losemoto;
  moto_win.textContent = levelsArray[s].winmoto;
  pickedWord =levelsArray[s].word;
  console.log(levelsArray[s]);
  s++;
  numOfTries = 7;
  correctCounter = 0;
  //console.log(pickedWord);
  for (let w = 0; w < letter.length; ++w) {
    letter[w].style.opacity = "1"
  }
  game();
});

function game(){
  wordWrapEl.innerHTML="";
  letterWord=pickedWord.split("");
  console.log(letterWord);
  letterWord.forEach((letter)=>{
    let spanEl = document.createElement('span');
    spanEl.style.borderBottom = "solid 4px black";
    wordWrapEl.appendChild(spanEl);
  });

}
// if the key is a letter in the word, and more than one time
function checkInput(l){ 
  let positive = false;
  let arr = [];
  for (let i=0; i < letterWord.length; i++) {
    if (letterWord[i] === l){
      arr[i] = l;
      positive = true; 
    } else{
      arr[i] = 0;
    }
  }
  return {checkedArr : arr, value : positive};
}
// use the game keybord to choose a letter:
let keyLetter = document.querySelector('.keyboardErea');
keyLetter.addEventListener('click', function(z){
  if((z.target.nodeName === "BUTTON")&&(z.target.style.opacity !== "0.5")){
    input_letter =z.target.innerText;
    z.target.style.opacity = "0.5";
    
    let checkedLetter = checkInput(input_letter);
    if(checkedLetter.value){
      for (let i=0; i < letterWord.length; i++){
        if(checkedLetter.checkedArr[i] != 0){
          console.log(checkedLetter.checkedArr[i], ': is a correct, at position [',i+1,']. Number of tries left:',numOfTries);
          wordWrapEl.children[i].textContent = checkedLetter.checkedArr[i];
          
          
          correctCounter++;
        }
      }
      //console.log(correctCounter);
    } else if ((--numOfTries) == 0) {
        keyLetter
        num_left_tries.style.display = "none";
        moto_mistake.style.display = "none";
        moto_lose.style.display = "block";
         //keyLetter.removeEventListener('click', function(z)
        keyboardErea.style.display = "none";
        console.log(input_letter,': is a mistake. Number of tries left:',(numOfTries), 'YOU LOST...');

    } else {
        console.log(input_letter,': is a mistake. Number of tries left:',numOfTries);
        moto_mistake.style.display = "block";
        moto_mistake.innerHTML =  "Number of tries left: "
        num_left_tries.style.display = "block";
        num_left_tries.textContent = numOfTries;
        img.style.opacity = parseFloat(img.style.opacity)*0.8;
      }
    if(correctCounter == letterWord.length){
      console.log('You found all the ',letterWord.length ,' of the word. YOU WON!!!');
      confetti.style.display="block";
      img.style.opacity= "1";
      keyboardErea.style.display = "none";
      num_left_tries.style.display = "none";
      moto_mistake.style.display = "none";
      moto_win.style.display = "block";
    }
  }  
})
game();
