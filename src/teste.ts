async function buscarComic() {
    const urlTeste =  await fetch('https://gateway.marvel.com:443/v1/public/series/3613/characters?apikey=15a747d5deefa91aeccf500bdd134ec4&ts=1&hash=b6a2d4722e1cd059c793dbd627db048b');
    const dados = await urlTeste.json();

    const personagens = dados.data.results;
    
    personagens.forEach(personagem => {
        const nome = personagem.name;
        const urlImagem = `${personagem.thumbnail.path}.${personagem.thumbnail.extension}`;
        const descricao = personagem.description || "Descrição não disponível";

        console.log("Nome:", nome);
        console.log("URL da Imagem:", urlImagem);
        console.log("Descrição:", descricao);
        console.log("--------------------");
    });
}

buscarComic();