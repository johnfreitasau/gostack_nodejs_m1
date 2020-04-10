const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
 
  const repository = {
    id: uuid(),
    title, 
    url, 
    techs,
    likes: 0
  }

  repositories.push(repository);

  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const {title, url, techs} = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json({ error : "User not found"});
  }

  repositories[repositoryIndex] = {
    id,
    title, 
    url,
    techs,
    likes : repositories[repositoryIndex].likes 
  }
  
  return response.json(repositories[repositoryIndex]);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error : "User not found"});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json({ error : "Repository does not exist."});
  }

  repositories[repositoryIndex].likes += 1;
  
  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
