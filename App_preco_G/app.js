let grupos = []
let obj = {}
cadastrarProdutos = () =>{
    let inName_Produto = document.getElementById('name_produto')
    let inPreco_Produto = document.getElementById('preco_produto')
    let inQuantidade_Produto = document.getElementById('quantidade_produto')
    let inUnidadeMedida = document.getElementById('unidade_medida')
    let inPesoProduto = document.getElementById('peso_produto')

    let name_Produto = inName_Produto.value 
    let preco_Produto = Number(inPreco_Produto.value)
    let quantidade_Produto = Number(inQuantidade_Produto.value )
    let unidadeMedida = inUnidadeMedida.value 
    let pesoProduto = Number(inPesoProduto.value )

    if(name_Produto == '' || preco_Produto == '' || isNaN(preco_Produto) || quantidade_Produto == '' || isNaN(quantidade_Produto) || unidadeMedida == '' || pesoProduto == '' || isNaN(pesoProduto)){
        alert('Por favor, preencha os dados corretamente.')
    }else if(preco_Produto <= 0){
        alert('Insira o preço corretamente')
    }else if(quantidade_Produto <= 0){
        alert('Insira a quantidade de produto corretamente')
    }else if(pesoProduto <= 0){
        alert('Insira o peso do produto corretamente')
    }
    else{
        //passar o peso de quilos convertido em gramas
        if(unidadeMedida == 'quilos'){
            //vou ter que conveter para gramas 
            peso_p_gramas = pesoProduto * 1000 //peso em grama
            //passar o peso de quilos convertido em gramas
            //Se a unidade de medida for quilo, vai mandar para o obj o valor já convertido em gramas
            obj = {
                ingrediente: name_Produto,
                preco: preco_Produto,
                quantidade: quantidade_Produto,
                peso: peso_p_gramas,
                unidadeMedida: unidadeMedida 
            }
            }else{
                //se for grama, já manda pro obj direto 
                obj = {
                    ingrediente: name_Produto,
                    preco: preco_Produto,
                    quantidade: quantidade_Produto,
                    peso: pesoProduto,
                    unidadeMedida: unidadeMedida 
                }
            }
    
//verificador de produtos cadastrados, vai verificar se determinado item já foi cadastrado. 
        let x = ''
        for(let i = 0; i < grupos.length; i++){
            x = grupos[i].ingrediente
            if(x === name_Produto){
                alert('Ingrediente já cadastrado')
                inName_Produto.value = ''
                return
            }
        }


        grupos.push(obj) 

        inName_Produto.value = ''
        inPreco_Produto.value = ''
        inQuantidade_Produto.value = ''
        inPesoProduto.value = ''
        inUnidadeMedida.value = ''

        inName_Produto.focus()
        
    }
    console.log(obj)
    console.log(grupos)
   
}



adicionar = () =>{
    let inProdutoFinal = document.getElementById('name_produto_final')
    let inIngredientesFinais = document.getElementById('ingredientes_produto_final')
    let inQuantidade_final = document.getElementById('quantiade_produto_final')

    let produtoFinal = inProdutoFinal.value 
    let ingredientesFinais = inIngredientesFinais.value
    let quantidadeFinal = inQuantidade_final.value 

//validação dos formulários
    if(ingredientesFinais == '' || quantidadeFinal == '' || produtoFinal == ''){
        alert('Por favor, preencha os dados corretamente')
        return
    }

    verificarLista(ingredientesFinais, quantidadeFinal)
    criarLista(produtoFinal,ingredientesFinais, quantidadeFinal )
  
    inIngredientesFinais.value = ''
    inQuantidade_final.value = ''
    inIngredientesFinais.focus()
}


verificarLista = (ingredientesFinais, quantidadeFinal) =>{
    //verificação se existe o ingrediente usado no produto final já cadastrado no array.
    //vai receber o indíce do item, desde que, esteja presente no array
    let disponibilidadeIngrediente = grupos.findIndex((user) => user.ingrediente === ingredientesFinais)
    console.log(disponibilidadeIngrediente)
    if(grupos.length == 0){
        alert('Ainda não foi cadastrado nenhum ingrediente')
    }else if(disponibilidadeIngrediente == -1){
        alert('produto não cadastrado')
    }
    //recebe o valor do peso, de acordo com o indíce, o qual já foi recebido de acordo com o nome do ingrediente
    let gramaCadastro = grupos[disponibilidadeIngrediente].peso
    let faltam =  quantidadeFinal - gramaCadastro
    let diferenca =   gramaCadastro - quantidadeFinal

    //se o valor presente no obj for menor que o valor solicitado, aparecerá uma mensagem
    if(grupos[disponibilidadeIngrediente].peso < quantidadeFinal){
        alert(`Cuidado, quantidade superior ao disponível; Disponível:${gramaCadastro}g, solicitado:${quantidadeFinal}g faltam: ${faltam}g `)
        
    }else{
        //calcular e exibir a quantidade que falta para completar
        grupos[disponibilidadeIngrediente].peso = diferenca
        console.log(grupos)
    }
    
 }

criarLista = (produtoFinal, ingredientesFinais, quantidadeFinal) =>{
    let inTituloFinal = document.getElementById('titulo_produto_final')
    // let inListaIngredientes = document.getElementById('lista_produtos')

    //Dar a saída dos dados criando uma lista
    //Criar o Título. 
    inTituloFinal.textContent = produtoFinal
    inTituloFinal.className = 'tituloLista'
    
    //criando a lista com os ingredientes
    let lista = document.createElement('div')
    lista.id = 'horizontal'
    let texto = document.createTextNode(`${ingredientesFinais} || ${quantidadeFinal} gramas`)
    lista.appendChild(texto)
    let novaLista = document.getElementById('horizontal')

    document.body.insertBefore(lista, novaLista)
}   