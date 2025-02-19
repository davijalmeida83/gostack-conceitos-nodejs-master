const express = require("express");
const cors = require("cors");

const {uuid, isUuid} = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url,  techs} = request.body;
  const likes = 0;
  const repository = {id:uuid(), title, url,  techs, likes};

  repositories.push(repository);
  
  return response.json(repository);  
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url,  techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error:"Repository not found!"});
  }
  
  const repository = repositories[repositoryIndex];

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  repositories[repositoryIndex] = repository;  

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({error:"Repository not found!"});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
 
  if (repositoryIndex < 0){  
    return response.status(400).json({error:"Repository not found!"});
  }

  console.log(`LIKES ANTES: ${repositories[repositoryIndex].likes}`);
  repositories[repositoryIndex].likes += 1;  
  console.log(`LIKES DEPOIS: ${repositories[repositoryIndex].likes}`);
  
  return response.json({likes:repositories[repositoryIndex].likes});
  

});

module.exports = app;
