const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote");

const authortext =document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById('new-quote');
const loader = document.getElementById("loader")
let apiQuotes=[];

function loading()
{
    loader.hidden = false ; 
    quoteContainer.hidden=true; 
}
function complete()
{
    quoteContainer.hidden=false;
    loader.hidden=true;
}
function newQuote()
{
    loading();
    const quote=apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    console.log("")

    if(!quote.author)
        authortext.textContent="Unkowen"
    else
       authortext.textContent=quote.author;

    if(quote.text.length>100)
    {
        quoteText.classList.add("long-quote");
    }
    else
    {
        quoteText.classList.remove("long-quote");

    }

    quoteText.textContent=quote.text;
    complete();
}
async function getQuotes()
{
    const apiUrl='https://type.fit/api/quotes';
    try
    {
        const response = await fetch(apiUrl)
        apiQuotes=await response.json();
        newQuote()  
  }catch(error)
    {
        alert(error)
    }
}
function tweetQuote()
{
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authortext.textContent}`;
    window.open(twitterUrl,'_blank');
}
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
getQuotes();
