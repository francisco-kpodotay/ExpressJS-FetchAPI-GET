const fs = require("fs").promises;
let id = 0; 

async function addIdToData(){
  const rawData = await fs.readFile("./data.json", "utf8");
  const data = JSON.parse(rawData);
  
  const newData = data.movies.map((movie) => {
    id++
    movie.id = id;
    return movie
  })
  console.log(newData);
  
  await fs.writeFile("./data.json", JSON.stringify(newData), "utf8");
  

}
//addIdToData()


