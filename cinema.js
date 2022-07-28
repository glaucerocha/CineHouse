// importando módulo próprio
let fs = require('fs')
let filmes = require ("./database/catalogo.json");
let filmeStr = JSON.stringify(filmes);
//console.log(filmeStr);

function buscarFilme(codigo, filmes){
    let filmesObj = filmes['filmes']    
    for (let i = 0; i < filmesObj.length;i++){        
        if (codigo === filmesObj[i]['codigo']){
            return filmesObj[i]
        }
    }
}

function alterarStatusEmCartaz(codigo, filmes){    
    for (let i = 0; i < filmes['filmes'].length; i++){

        if (codigo === filmes['filmes'][i]['codigo']){            
            (filmes['filmes'][i]['emCartaz']) ? filmes['filmes'][i]['emCartaz'] = false :  filmes['filmes'][i]['emCartaz'] = true           
            let newData = JSON.stringify(filmes)
             //cria-se uma nova variavel para fazer modificação dentro do catalogo, o objeto 'filmes' continua igual
            fs.writeFileSync ('./database/catalogo.json', newData, err => {
                // Verificação de erros
                (err) ? console.log("Erro ao inserir os dados") : console.log ("Novos dados adicionados");        
            });
        }
    }
    return filmes
}

//fs - biblioteca para fazer escrita/leitura dentro de arquivos

function adicionarFilme(filmes, dadosFilme){
    let filmeExistente = false
    let newData = ""

    for (let i = 0; i < filmes['filmes'].length;i++){        
        if (dadosFilme['codigo'] === filmes['filmes'][i]['codigo']){
            filmeExistente = true           
        }
    }
    if (!filmeExistente){
        filmes['filmes'].push(dadosFilme)
        newData = JSON.stringify(filmes)
        fs.writeFile ('./database/catalogo.json', newData, err => {
            // Verificação de erros
            (err) ? console.log("Erro ao inserir os dados") : console.log ("Novos dados adicionados");        
        });
        return JSON.parse(newData)
    }else{
        console.log("Filme já existente")
        return filmes
    }
}

let matrix = {
    "codigo": 4, 
    "titulo": "Matrix", 
    "ano": 1999, 
    "duracao": 1, 
    "atores": ["Keanu Reves", "Lawrence Fishburne"], 
    "emCartaz": false
}
let filmesNovos = adicionarFilme(filmes, matrix)
console.log(filmesNovos)

let filmeBuscado = buscarFilme(1, filmes)
console.log(filmeBuscado)

let matrixAlterado = alterarStatusEmCartaz(4, filmes)
console.log(matrixAlterado)


let listarFilmesDeLongaDuracao = filmes['filmes'].filter(function(filme) {
    return filme['duracao'] > 2 })