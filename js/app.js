const formulario = document.querySelector("#formulario");
const listatweets = document.querySelector("#lista-tweets");

let tweets = [];

eventListeners();

function eventListeners() {
  formulario.addEventListener("submit", agregarTweet);

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);

    crearHTML();
  });
}

function agregarTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value;
  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacio");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  // Añadiendo al arreglo de tweets

  tweets = [...tweets, tweetObj];
  console.log(tweets);

  crearHTML();

  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 1500);
}

function crearHTML() {
  limpiarHTNL();
  if (tweets.length > 0) {
    tweets.forEach(tweet => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.textContent = "X";

      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      const li = document.createElement("li");

      li.textContent = tweet.tweet;
      li.appendChild(btnEliminar);
      listatweets.appendChild(li);
    });
  }
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter(tweet => tweet.id !== id);

  crearHTML();
}

function limpiarHTNL() {
  while (listatweets.firstChild) {
    listatweets.removeChild(listatweets.firstChild);
  }
}
