class Produto {
  constructor() {
    this.id = 1;
    this.arrayProduto = [];
    this.editId = null;
  }

  salvar() {
    let produto = this.lerDados();
    if (this.validaCampo(produto)) {
      if(this.editId === null) {
        this.adicionar(produto);
      }else {
        this.atualizar(this.editId, produto);
      }
      
    }
    console.log(this.arrayProduto)
    this.listaTabela()
    this.limparTela()
  }


  listaTabela() {
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';
    for (let i = 0; i < this.arrayProduto.length; i++) {
      let tr = tbody.insertRow();
      let td_id = tr.insertCell();
      let td_produto = tr.insertCell();
      let td_valor = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_id.innerText = this.arrayProduto[i].id;
      td_produto.innerText = this.arrayProduto[i].nomeProduto;
      td_valor.innerText = this.arrayProduto[i].preco;

      td_id.classList.add('center')

      let imgEdit = document.createElement('img')
      imgEdit.src = 'img/edit.png'
      imgEdit.setAttribute('onClick', 'produto.preparaEditacao(' + JSON.stringify(this.arrayProduto[i]) + ')')
      let imgDelete = document.createElement('img')
      imgDelete.src = 'img/bin.png'
      imgDelete.setAttribute('onClick', 'produto.deletar(' + this.arrayProduto[i].id + ')')
      td_acoes.appendChild(imgEdit)
      td_acoes.appendChild(imgDelete)
    }
  }

  adicionar(produto) {
    produto.preco = parseFloat(produto.preco)
    this.arrayProduto.push(produto);
    this.id++
  }

  atualizar(id, produto) {
    for(let i = 0; i < this.arrayProduto.length;i++) {
      if(this.arrayProduto[i].id == id) {
        this.arrayProduto[i].nomeProduto = produto.nomeProduto
        this.arrayProduto[i].preco = produto.preco
      }
    }
  }

  lerDados() {
    let produto = {}
    produto.id = this.id
    produto.nomeProduto = document.getElementById("produto").value;
    produto.preco = document.getElementById("preco").value;
    return produto;
  }
  validaCampo(produto) {
    let msg = ""
    if (produto.nomeProduto === '') {
      msg += ' - Informe o nome do produto \n'
    }
    if (produto.preco === '') {
      msg += ' - Informe o preço do produto \n'
    }

    if (msg !== '') {
      alert(msg)
      return false;
    }
    return true;
  }
  limparTela() {
    document.getElementById('produto').value = '';
    document.getElementById('preco').value = '';

    document.getElementById('btn1').innerText = 'Salvar'
    this.editId = null;
  }
  deletar(id) {
    if (confirm('Deseja deletar esse item?')) {
      let tbody = document.getElementById('tbody');
      for (var i = 0; i < this.arrayProduto.length; i++) {
        if (this.arrayProduto[i].id === id) {
          this.arrayProduto.splice(i, 1);
          tbody.deleteRow(i)
        }
      }
    }


  }
  preparaEditacao(dados) {
    this.editId = dados.id;
    document.getElementById('produto').value = dados.nomeProduto
    document.getElementById('preco').value = dados.preco
    document.getElementById('btn1').innerText = 'Atualizar'
  }
}

var produto = new Produto();