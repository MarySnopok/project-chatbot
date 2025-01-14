// Creating an empty Object to store user inputs
const userFormInputs = {};

// All the DOM selectors stored as short variables
const chat = document.getElementById("chat");
const inputWrapper = document.getElementById("input-wrapper");
const handleNameInput = document.getElementById("name-form");
const heading = document.getElementById("headings");
const btn = document.getElementById("btn");
const bot = document.getElementById("bot");
const video = document.getElementById("video");

// Space-Bot starts here

/*Typing effect  */
let i = 0;
let txt = "";
let textAnimationContainer;
const speed = 50;

const typeReply = () => {
  if (i < txt.length) {
    textAnimationContainer.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeReply, speed);
  }
};

// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === "user") {
    const section = document.createElement("section");
    section.classList.add("user-msg");
    chat.appendChild(section);
    section.innerHTML += `<div class="bubble user-bubble">
  <p></p>
  </div>
  <img src="assets/avatar.png" alt="User" /> `;
    textAnimationContainer = section.querySelectorAll("p")[0];
    txt = message;
    i = 0;
    typeReply();
  } else if (sender === "bot") {
    chat.innerHTML += `
    <section class="bot-msg">
      <img src="assets/alien-img.png" alt="Bot" />
      <div class="bubble bot-bubble">
        <p>${message}</p>
      </div>
    </section>
  `;
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  setTimeout(() => (chat.scrollTop = chat.scrollHeight), 100);
};

// Starts here
// Question 1
const greeting = () => {
  showMessage(`You wanna go to Space? Cool! What's your name?`, "bot");
};

handleNameInput.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name-input");
  const userName = nameInput.value;
  userFormInputs.name = userName;

  if (!isNaN(nameInput.value)) {
    nameInput.value = "";
    alert("Please add your Space-name using letters only");
  } else {
    showMessage(userName, "user");
    nameInput.value = "";
    setTimeout(() => spaceAgeQuestion(userName), 1000);
  }
});

// Question 2
const spaceAgeQuestion = (userName) => {
  showMessage(`Hi ${userName}! Time goes slower in space. How many Earth years do you want to spend in Space?`, "bot");

  inputWrapper.innerHTML = `
    <button  class="bot-button" id="oneYear">1 year</button>
    <button  class="bot-button" id="tenYears">10 years</button>
    <button  class="bot-button" id="thousandYears">1000 years</button>
  `;
  document.getElementById("oneYear").addEventListener("click", () => {
    inputWrapper.innerHTML = "";
    setTimeout(() => destinationPoint("1 year"), 500);
  });
  document.getElementById("tenYears").addEventListener("click", () => {
    inputWrapper.innerHTML = "";
    setTimeout(() => destinationPoint("10 years"), 500);
  });
  document.getElementById("thousandYears").addEventListener("click", () => {
    inputWrapper.innerHTML = "";
    setTimeout(() => destinationPoint("1000 years"), 500);
  });
};

// Question 3
const destinationPoint = (type) => {
  userFormInputs.duration = type;
  showMessage(`I'm fine with ${type}`, "user");

  setTimeout(() => showMessage(`Alright ${type}, check your alternatives!`, "bot"), 2000);

  setTimeout(() => {
    if (type === "1 year") {
      inputWrapper.innerHTML = `
      <select id="select">
        <option value="" selected disabled> 	
        &#11088; Select a destination: </option>
        <option value="Mars">Mars</option>
        <option value="Moon">Moon</option>
        <option value="Jupiter">Jupiter</option>
      </select>
    `;
    } else if (type === "10 years") {
      inputWrapper.innerHTML = `
      <select id="select">
        <option value="" selected disabled>	
        &#128171; Select a destination:</option>
        <option value="Pluto">Pluto</option>
        <option value="Sun">Sun</option>
        <option value="Saturn">Saturn</option>
      </select>
    `;
    } else {
      inputWrapper.innerHTML = `
      <select id="select">
        <option value="" selected disabled>	
        &#9203; Select a destination:</option>
        <option value="Through a black hole">Through a black hole</option>
        <option value="Another Galaxy">Another Galaxy</option>
        <option value="Milky Way">Milky Way</option>
      </select>
    `;
    }
    const select = document.getElementById("select");
    select.addEventListener("change", () => {
      inputWrapper.innerHTML = "";
      setTimeout(() => spaceFood(select.value), 1000);
    });
  }, 2000);
};

// Question 4
const spaceFood = (select) => {
  userFormInputs.destination = select;

  showMessage(`My choice is ${select}!`, "user");

  setTimeout(() => showMessage(`Great! So what do you wanna eat during the trip to ${select}?`, "bot"), 2500);

  setTimeout(() => {
    inputWrapper.innerHTML = `
    <button  class="bot-button" id="tacos">	
    &#127790; Tacos</button>
    <button  class="bot-button" id="sushi">	
    &#127843; Sushi</button>
    <button  class="bot-button" id="tuna">	
    &#128031; Tuna</button>
    `;

    document.getElementById("tacos").addEventListener("click", () => {
      inputWrapper.innerHTML = "";
      setTimeout(() => spacePet("Tacos"), 1000);
    });
    document.getElementById("sushi").addEventListener("click", () => {
      inputWrapper.innerHTML = "";
      setTimeout(() => spacePet("Sushi"), 1000);
    });
    document.getElementById("tuna").addEventListener("click", () => {
      inputWrapper.innerHTML = "";
      setTimeout(() => spacePet("Tuna"), 1000);
    });
  }, 2500);
};

// Question 5
const spacePet = (dish) => {
  userFormInputs.dish = dish;
  showMessage(`I want ${dish}.`, "user");

  setTimeout(() => showMessage("Yummy! You wanna go alone or bring a Space pet?", "bot"), 2000);

  setTimeout(() => {
    inputWrapper.innerHTML = `
    <button  class="bot-button" id="alone">&#128117;</button>
    <button  class="bot-button" id="withPet">&#43;&#128054;</button>
    `;

    document.getElementById("alone").addEventListener("click", () => {
      inputWrapper.innerHTML = "";
      setTimeout(() => payment("alone"), 1000);
    });
    document.getElementById("withPet").addEventListener("click", () => {
      inputWrapper.innerHTML = "";
      setTimeout(() => payment("with a Space pet"), 1000);
    });
  }, 2000);
};

// Question 6
const payment = (preference) => {
  userFormInputs.preference = preference;
  showMessage(`I prefer to travel ${preference}.`, "user");

  let price;
  if (preference === "alone") {
    price = "15";
  } else {
    price = "20";
  }

  setTimeout(() => {
    showMessage(
      // This is an explanation of how to access and display object value: https://www.w3schools.com/js/js_object_display.asp
      `Super, that will cost you ${price} Space Tokens. Please confirm your Trip details: 
     `,
      "bot"
    );

    showMessage(
      `Space name : ${userFormInputs.name}<br> Duration : ${userFormInputs.duration}<br> Destination : "${userFormInputs.destination}"<br>
     Meal : "${userFormInputs.dish}"<br> I will travel ${userFormInputs.preference}`,
      "bot"
    );
  }, 2500);

  setTimeout(() => {
    inputWrapper.innerHTML = `
      <button  class="bot-button" id="confirm">Yes</button>
      <button  class="bot-button" id="reload">No</button> `;

    document.getElementById("confirm").addEventListener("click", () => {
      inputWrapper.innerHTML = "";
      setTimeout(() => niceTrip("Yes"), 1000);
    });
    document.getElementById("reload").addEventListener("click", () => {
      location.reload();
    });
  }, 2500);
};

const niceTrip = (wish) => {
  userFormInputs.confirmation = wish;
  showMessage(`${wish}`, "user");

  setTimeout(() => showMessage("Have a nice trip! Cya in another life &#128125;", "bot"), 1000);

  inputWrapper.innerHTML = "";
};

setTimeout(greeting, 1000);

// Pausing video on click
const videoPlayer = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};
video.addEventListener("click", videoPlayer);

// Bot pop-up-function:
// hide headings + remove class form bot (show it)

const botPopUp = () => {
  heading.classList.add("headings");
  bot.classList.remove("bot");
};
btn.addEventListener("click", botPopUp);
