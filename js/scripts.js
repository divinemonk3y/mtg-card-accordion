const container = document.getElementById('cards');

let data = new XMLHttpRequest();

data.open('GET', 'https://api.scryfall.com/cards/search?order=cmc&q=set%3Aemn');
data.send();

data.onreadystatechange = function() {
  if (data.readyState === 4 && data.status === 200) {
    
    let cardData = JSON.parse(data.responseText).data;
    let drawn = getRandom(cardData, 7);
    let cardHTML = '';
    
    for (let i = 0; i < drawn.length; i++) {
      
      if(i === 0) {
        cardHTML += '<div class="card-content expanded">';
      } else {
        cardHTML += '<div class="card-content">';
      }
      
      cardHTML += '<div class="card">';
      
      if (drawn[i].image_uris) {
         cardHTML += '<img class="card-img" src="' + drawn[i].image_uris.small + '" alt="' + drawn[i].name + '" />';
      } else {
        cardHTML += '<img class="card-img" src="https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/thumb/f/f8/Magic_card_back.jpg/500px-Magic_card_back.jpg" alt="' + drawn[i].name + '" />'
      }
      cardHTML += '</div>';
      cardHTML += '<p class="name">' + drawn[i].name + '</p>';
      cardHTML += '<p>' + drawn[i].type_line + '</p>';
      
      if (drawn[i].manaCost) {
        cardHTML += '<p>' + drawn[i].manaCost + '</p>';
      }
      
      if (drawn[i].power && drawn[i].toughness) {
        cardHTML += '<p>' + drawn[i].power + '/' + drawn[i].toughness + '</p>';
      }
      
      cardHTML += '</div>';
      cardHTML += '</div>';
    }
    container.innerHTML = cardHTML;
  }
}

container.addEventListener('click', (event) => {  
    let elem = event.target;
  
    if(elem.classList.contains('card-img')) {
      expand(elem.parentNode.parentNode); 
    }
});

function expand(target) { 
  const all = target.parentNode.childNodes;
  
  all.forEach( (elem) => {
    elem.classList.remove('expanded');
  })
  
  target.classList.add('expanded');
}

function getRandom(data, amount) {  
  let max = data.length;
  let selected = []; 
  
  let filtered = data.filter(d => !d.type_line.includes('Land'));
  
  for (let r = 0; r < amount; r++) {
    let rand = Math.floor( Math.random() * max );
    selected.push(filtered[rand]); 
  }
  
  return selected;
}