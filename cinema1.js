let filmes = require("./database/catalogo.json");
console.log(JSON.stringify(filmes));

function adicionarFilme (filmes, dadosFilmes) {
    let filmeNovo = JSON.parse(filmes['filmes'])
    filmeNovo['filmes'].push(dadosFilmes)
    let novosDados = JSON.stringify(filmeNovo)}


