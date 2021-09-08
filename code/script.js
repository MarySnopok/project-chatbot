
// Creating an empty Object
const  userFormInputs = {};


// All the DOM selectors stored as short variables
const chat = document.getElementById('chat');
const inputWrapper = document.getElementById('input-wrapper');


// Global variables, if you need any, declared here

// Functions declared here

// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === 'user') {
  
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
  } else if (sender === 'bot') {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
        <p>${message}</p> 
        </div>
      </section>
    `
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight;
}

// Starts here
// Question 1
const greeting = () => {
  showMessage(`You wanna go to Space? Cool! What's your name?`, 'bot');
  // Just to check it out, change 'bot' to 'user' here 👆
}

// Set up your eventlisteners here

// When website loaded, chatbot asks first question.
// normally we would invoke as function like this:
// greeting()

// const nameInput = document.getElementById('name-input');
// const userName = nameInput.value;
// if (!isNaN(nameInput.value)) {
// prompt("You can't have numbers in you Space-name");
// nameInput.value = ''
// location.reload();
// return false;
// }
// else {
//   const handleNameInput = document.getElementById('name-form').addEventListener('submit', (event) => {
//     showMessage (userName, 'user')
//     nameInput.value = ''
//     event.preventDefault();
//     setTimeout(() => spaceAgeQuestion(userName), 1000);
//   })
// };

  // userFormInputs.name = nameInput.value;

const handleNameInput = document.getElementById('name-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const nameInput = document.getElementById('name-input');
  const userName = nameInput.value;
  userFormInputs.name = userName;
  
  if (!isNaN(nameInput.value)) {
    nameInput.value = '' ;
    prompt("You can't have numbers in you Space-name"); 
  }
  else {
    showMessage (userName, 'user');
    nameInput.value = '' ;
    setTimeout(() => spaceAgeQuestion(userName), 1000);
  }
}
)

// Question 2
// Hi ...! Time goes slower in space. Depending on how far you wanna go you will be older when you get back. 
// 1 year 10 years 1000 years


const spaceAgeQuestion = (userName) => {
  showMessage (`Hi ${userName}! Time goes slower in space. Depending on how far you wanna go you will be older when you get back.`, 'bot')
  
  inputWrapper.innerHTML = `
  <button id="oneYear">1 year</button>
  <button id="tenYears">10 years</button>
  <button id="thousandYears">1000 years</button>
`

document.getElementById('oneYear').addEventListener('click', () => setTimeout(() => destination('1 year'), 1000));
document.getElementById('tenYears').addEventListener('click', () => setTimeout(() => destination('10 years'), 1000));
document.getElementById('thousandYears').addEventListener('click', () => setTimeout(() => destination('1000 years'), 1000));

}  


// Question 3
// Alright ..., check your alternatives!
// 1year: mars, moon, jupiter
// 10years: pluto, sun, saturnnus
// 1000 years: trhourgh a black hole, another galaxy, surprise me

const destination = (type) => {
  showMessage (`I'm fine with ${type}`, 'user');

// we shoudld style select id in css - it looks like shit
console.log(type)
  
setTimeout(() => showMessage (`Alright ${type}, check your alternatives!`, 'bot'), 1000);

 
  if (type === '1 year') {
    inputWrapper.innerHTML = `
      <select id="select">
        <option value="" selected disabled> 	
        &#11088; Select a destination: </option>
        <option value="Mars">Mars</option>
        <option value="Moon">Moon</option>
        <option value="Jupiter">Jupiter</option>
      </select>
    `
  } else if (type === '10 years') {
    inputWrapper.innerHTML = `
      <select id="select">
        <option value="" selected disabled>	
        &#128171; Select a destination:</option>
        <option value="Pluto">Pluto</option>
        <option value="Sun">Sun</option>
        <option value="Saturnus">Saturnus</option>
      </select>
    `
  } else {
    inputWrapper.innerHTML = `
      <select id="select">
        <option value="" selected disabled>	
        &#9203; Select a destination:</option>
        <option value="Through a black hole">Through a black hole</option>
        <option value="Another Galaxy">Another Galaxy</option>
        <option value="Surprise me!">Surprise me!</option>
      </select>
    `
  }
  const select = document.getElementById('select');
  setTimeout(() => select.addEventListener('change', () =>  spaceFood(select.value), 1000));
}

// Question 4

const spaceFood = (select) => {

console.log(select);

// You picked "${select}"!
showMessage (
  `My choice is "${select}"!`, 'user');

setTimeout(() => showMessage (
  `Great! So what do you wanna eat during the trip to ${select}?`, 'bot') , 1000);


 inputWrapper.innerHTML = `
  <button id="tacos">	
  &#127790; Tacos</button>
  <button id="sushi">	
  &#127843; Sushi</button>
  <button id="tuna">	
  &#128031; Tuna</button>
`

document.getElementById('tacos').addEventListener('click', () => setTimeout(() => spacePet('Tacos'), 1000));
document.getElementById('sushi').addEventListener('click', () => setTimeout(() => spacePet('Sushi'), 1000));
document.getElementById('tuna').addEventListener('click', () => setTimeout(() => spacePet('Tuna'), 1000));

} 

// Question 5

const spacePet = (dish) => {
  showMessage (
    `I want "${dish}".`, 'user');
  
  setTimeout(() => showMessage (
    'Yummy! You wanna go alone or bring a Space pet?', 'bot') , 1000);

    inputWrapper.innerHTML = `
    <button id="alone">&#128117;</button>
    <button id="withPet">&#43;&#128054;</button>
  `

  document.getElementById('alone').addEventListener('click', () => setTimeout(() => payment('alone'), 1000));
  document.getElementById('withPet').addEventListener('click', () => setTimeout(() => payment('with Space pet'), 1000));
}

// Question 6

const payment = (preference) => {
  showMessage (
    `I prefer to travel ${preference}.`, 'user');

    let price;
    if (preference === 'alone') {
      price = '15';
    } else {
      price = '20';
    }

  console.log(price);
  setTimeout(() => showMessage (
    `Super, that will cost you ${price} Space Tokens. Please confirm your order:`, 'bot') , 1000);

    inputWrapper.innerHTML = `
    <button id="confirm">Yes</button>
    <button id="reload">No</button> `

    document.getElementById('reload').addEventListener('click', () => {
      location.reload();
    })

    document.getElementById('confirm').addEventListener('click', () => setTimeout(() => niceTrip ('Yes'), 1000));
}

const niceTrip = (wish) => {
  
  showMessage(`${wish}.`, 'user');

  setTimeout(() => showMessage (
  'Have a nice trip! Cya in another life &#128125;', 'bot') , 1000);

  inputWrapper.innerHTML='';


}
// But if we want to add a little delay to it, we can wrap it in a setTimeout:
// setTimeout(functionName, timeToWaitInMilliSeconds)
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greeting, 1000);
