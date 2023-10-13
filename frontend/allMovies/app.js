function loadEvent() {
  const root = document.querySelector("#root");
  fetchData().then((data) => {
    data.map((title) => {
      root.insertAdjacentHTML("beforeend", createHTMLelement(title));
      document.getElementById(title)
      .addEventListener("click", () => createModal(title));
    });
  });
}
window.addEventListener("load", loadEvent);

async function fetchData(url = "http://localhost:3000/api/movies/all") {
  try {
    const rawData = await fetch(url);
    const data = await rawData.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function createHTMLelement(content) {
  return `
  <button id="${content}">${content}</button>
  `;
}

function createModal(content) {
  
  fetchData(`http://localhost:3000/api/movies/title/${content}`)
  .then((data) => {
    console.log(data);


  const modal = document.querySelector("#modal");

  modal.innerHTML = `
  <h1>${content}</h1>
      <h2>Genres: ${createGenres(data[0].genres)}</h2>
      <h3>Runtime: ${data[0].runtime}</h3>
      <h3>Release Date: ${data[0]["release-date"]}</h3>
  
      <h2>Storyline</h2>
      <p>${data[0].storyline}</p>
  
      <h2>Writers</h2>
      ${createPeople(data[0].writers)}
  
      <h2>Actors</h2>
      ${createPeople(data[0].actors)}
  
      <h2>Directors</h2>
      ${createPeople(data[0].directors)}
  `;
  })
}

function createGenres(genres) {
  let result = "";
  for (let i = 0; i < genres.length; i++) {
    const genreName = genres[i].charAt(0).toUpperCase() + genres[i].slice(1);
    result += `${genreName}, `;
  }
  return result.slice(0, -2)
}

function createPeople(people) {
  let result = "";
  for (let i = 0; i < people.length; i++) {
    result += `<li>${people[i]}</li>`
  }
  return result
}