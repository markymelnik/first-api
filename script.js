// API Test

const container = document.querySelector('.container');

const title = document.createElement('div');
const form = document.createElement('form');
const label = document.createElement('label');
const input = document.createElement('input');
const btn = document.createElement('button');
const img = document.createElement('img');
const errorMsg = document.createElement('div');

title.classList.add('title');
title.innerHTML = "Random GIF Search";

label.setAttribute('for', 'search');
input.setAttribute('type', 'text');
input.setAttribute('id', 'search');
input.setAttribute('placeholder', 'Enter keyword(s)')

form.append(label, input);

btn.classList.add('button');
btn.innerHTML = 'Search!';

img.src = '';

errorMsg.classList.add('errorMsg');
errorMsg.innerHTML = '';

container.append(title, form, btn, img, errorMsg);

form.addEventListener('submit', displayGIF); // Press Enter key
btn.addEventListener('click', displayGIF); // Press Submit button

function displayGIF(element) {

  const search = document.querySelector('#search');
  const img = document.querySelector('img');
  const errorMsg = document.querySelector('.errorMsg');

  let searchValue = search.value;

  if(!searchValue) {
    searchValue = 'random';
  }

	element.preventDefault();
  search.value = '';

  getGIF();

  async function getGIF() {
    try {
      const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=6KBgsLuVDLq1TUUDKcwJ7vt3JO3DmKvT&s='+searchValue,
		  { mode: 'cors' });
      const gifData = await response.json();
		  img.src = gifData.data.images.original.url;
      errorMsg.innerHTML = '';
    } catch (err) {
      console.log(err);
      img.src = '';
      errorMsg.innerHTML = 'Invalid input. Try again!';
    }
  }
}