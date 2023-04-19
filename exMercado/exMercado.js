class Produto {


    constructor() {
        this.mercado = []
        this.id = 1
        this.editId = null;

    }


    salvar() {
        let produto = this.verificarDados();
        if (this.validaCampo(produto)) {
            if (this.editId == null) {
                this.adicionar(produto);

            } else {
                this.atualizar(this.editId, produto)
            }

        };
        this.criarTabela();
        this.cancelar();

        localStorage.setItem('mercado', JSON.stringify(this.mercado));



        var escrevaLocal = document.createElement('h2');
        escrevaLocal.innerHTML = localStorage.getItem('mercado');
        document.body.appendChild(escrevaLocal);


    }

    verificarDados() {
        var produto = {}
        produto.id = this.id;
        produto.nomeProduto = window.document.getElementById('produto').value
        produto.valor = window.document.getElementById('valor').value
        produto.categoria = this.verificarCategoria();

        return produto;

    }

    validaCampo(produto) {
        var msg = '';

        if (produto.nomeProduto == '') {
            msg += `- Verifique o Nome do Produto \n`
        }
        if (produto.valor == '' || produto.valor > 99999) {
            msg += `- Verifique o Valor do Produto \n`
        }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;
    }

    verificarCategoria() {
        var categoria = window.document.getElementsByName('categorias')

        if (categoria[0].checked) {
            return 'Alimentos';
        }

        else if (categoria[1].checked) {
            return 'Bebidas';
        }

        else (categoria[2].checked)
        return 'Higiene ou Limpeza';



    }
    adicionar(produto) {
        produto.valor = parseFloat(produto.valor)
        this.mercado.push(produto);
        this.id++;
    }


    criarTabela() {
        let tabela = window.document.getElementById('tbody')
        tabela.innerText = ''


        for (let i = 0; i < this.mercado.length; i++) {
            let tr = tabela.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_categoria = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();


            td_id.innerText = this.mercado[i].id;
            td_produto.innerText = this.mercado[i].nomeProduto;
            td_categoria.innerText = this.mercado[i].categoria;
            td_valor.innerText = this.mercado[i].valor;


            let imgEdit = document.createElement('img');
            imgEdit.src = 'edit2.png';
            let imgDel = document.createElement('img');
            imgDel.src = 'delete.png';
            imgDel.setAttribute('onclick', 'produto.deletar(' + this.mercado[i].id + ')');
            imgEdit.setAttribute('onclick', 'produto.editar(' + JSON.stringify(this.mercado[i]) + ')');

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDel);

        }

    }
    cancelar() {
        window.document.getElementById('produto').value = ''
        window.document.getElementById('valor').value = ''

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;


    }

    deletar(id) {
        let resposta = confirm(`Deseja Excluir o Produto?`)
        if (resposta === true) {
            let tabela = window.document.getElementById('tbody')
            for (let i = 0; i < this.mercado.length; i++) {
                if (this.mercado[i].id == id) {
                    this.mercado.splice(i, 1);
                    tabela.deleteRow(i);
                }
            }
        }


    }
    editar(dados) {
        this.editId = dados.id;

        document.getElementById('btn1').innerText = 'Atualizar';
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valor;
        document.getElementsByName('categorias').value = dados.categoria;


    }
    atualizar(id, produto) {
        for (let i = 0; i < this.mercado.length; i++) {
            if (this.mercado[i].id == id) {
                this.mercado[i].nomeProduto = produto.nomeProduto;
                this.mercado[i].valor = produto.valor;
                this.mercado[i].categoria = produto.categoria;

            }
        }

    }

}


var produto = new Produto();
