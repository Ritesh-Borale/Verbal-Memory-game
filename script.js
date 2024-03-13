const api = "https://random-word-api.vercel.app/api?words=10";

let NormalText1 = document.getElementById("NormalText1");
let NormalText2 = document.getElementById("NormalText2");
let NormalText3 =document.getElementById("NormalText3");
let maincontainer = document.querySelector(".maincontainer");
let startbutton = document.getElementById("startbutton");
let img = document.getElementById("img");
let WordSet = new Set();
let words = [];
let DisplayWord = document.getElementById("DisplayWord");
let newButton = document.getElementById("new");
let seenButton = document.getElementById("seen");
let Lives = document.getElementById("Lives");
let live =3;
let Score = 0;

let Scores = document.getElementById("Score");
maincontainer.style.display="none";
let randomVal;
Lives.innerHTML=`Lives : ${live}`;
Scores.innerHTML=`Score : ${Score}`;

startbutton.addEventListener("click", function () {
    startbutton.style.display="none";
    maincontainer.style.display="flex";
    NormalText1.textContent="";
    NormalText2.textContent="";
    NormalText3.textContent="";
    img.style.display="none";
    

    GenerateRandomWord();
})

async function getapi() {
    try {
        let response = await fetch(api);
        if (!response.ok) {
            throw new Error("Response Not Ok");
        }
        let data = await response.json();
        let temp =[];
        temp=data;
        words.push(...temp);
    } catch (error) {
        console.error("Error In response Catch", error);
    }
}
getapi();


function GenerateRandomWord(){
    randomVal = Math.floor(Math.random() * 9);
    DisplayWord.innerHTML = words[randomVal];
    if(score%10==0)
    {
        getapi();
    }
}


newButton.addEventListener("click",function(){
    if(!WordSet.has(DisplayWord.innerHTML))
    {
        Score++;
        Scores.innerHTML=`Score : ${Score}`;
    }   
    else
    {
        live--;
        Lives.innerHTML=`Lives : ${live}`;
        if(live==0)
        {
            maincontainer.style.display="none";
            img.style.display = "flex";
            NormalText1.textContent="Well Done!";
            NormalText2.textContent=`Score : ${Score}`;
            NormalText3.textContent=`Lives : ${live}`;
            startbutton.textContent="Play again";
            startbutton.style.display = "block";
        }
    }  
    WordSet.add(words[randomVal]);
    GenerateRandomWord();
})

seenButton.addEventListener("click",function(){
    if(WordSet.has(DisplayWord.innerHTML))
    {
        Score++;
        Scores.innerHTML=`Score : ${Score}`;
    }
    else{
        live--;
        Lives.innerHTML=`Lives : ${live}`;   
    }
    WordSet.add(words[randomVal]);
    GenerateRandomWord();
})
    


