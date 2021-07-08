# Projeto Final da {Reprograma}

<h1 align="center">
    <img alt="EasyFluxo" title="#EasyFluxo" src="./assets/EasyFluxo.png" />
</h1>

<h4 align="center"> 
	💰  EasyFluxo 📈
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> •  
 <a href="#-rotas">Rotas</a> • 
 <a href="#-construcao">Construção</a> •
 <a href="#-autor">Autora</a> • 
 <a href="#-agradecimentos">Agradecimentos</a> •
 <a href="#user-content--licença">Licença</a>
</p>


## 💻 Sobre o projeto

EasyFluxo - é um fluxo de caixa que surgiu depois que minha família sofreu um golpe financeiro. Junto com meu pai e para nos reerguermos começamos a vender brinquedos na rua em cima do carro. A ideia tem dado certo e a forma que sustentamos nossa família, só que diante disso surgiu outro problema: como saber os ganhos reais? Qual as margens de lucro? Como administrar as despesas fixas?
Então, essa aplicação é uma forma de ajudar na organização, catálogo e no fluxo de caixa de entrada e saída de produtos, compras e despesas. 

A aplicação vai além do seu propósito inicial e será disponibilizada gratuitamente como uma forma de auxiliar micro empresas e ambulantes no controle da receita, visto que o número de trabalhadores informais e MEI 's nos últimos 2 anos cresceu de forma exponencial no Brasil devido ao desemprego. Diante desse dado, além das vendas, o empreendedor precisa saber administrar seus ganhos, por isso a EasyFluxo é a ferramenta ideal e prática de controle financeiro e visualização diária dos seus ganhos.


---

## ⚙️ Funcionalidades

- [x] Micro e pequenas Empresas ou ambulantes podem se cadastrar na plataforma enviando:
  - [x] nome da empresa ou pessoa
  - [x] dados para contato, email e whatsapp
  - [x] e o endereço para que possa aparecer no mapa
  - [x] e cadastrar seus produtos, com os itens: 
    - nome
    - preço unitario
    - estoque
    - valor de vendas no dia
    - ganhos
    - desespesas pessoais
    - e valor de fornecedores

---

## 🎨 Layout


### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="EasyFluxo" title="#EasyFluxo" src="./assets/cadastro.png">
</p>

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="EasyFluxo" title="#EasyFluxo" src="./assets/easyfbanner.png">
</p>

---

## 🚀 Como executar o projeto

💡 Backend (pasta server) 


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone 

# Acesse a pasta do projeto no terminal/cmd
$ cd easy-fluxo/

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm start

# O servidor inciará na porta:8080 - acesse http://localhost:8080 

```
<p align="center">
  <a href="https://insomnia.rest/" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>


## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[nodemon](https://www.npmjs.com/package/nodemon/v/2.0.7)**
-   **[MongoDb](https://www.mongodb.com/)**
-   **[Mongoose](https://mongoosejs.com/)**
-   **[JavaScript](https://www.javascript.com/)**
-   **[Node.js](https://nodejs.org/en/)**

## ✅ Rotas 

#### Aplicação:

- [x] Cadastros das lojas / serviços - POST
- [x] Autenticação de usuarios - POST
- [x] Busca por lojas - GET
- [x] Busca por produtos - GET
- [x] Atualização em todos os campos tanto de lojas e produtos - PUT
- [x] Apagar lojas, produtos e usuarios - DELETE

#### Produtos:

→ Necessario token para usar as rotas

post('/create')

get('/getAll')
get('/findProduto')

patch('/:id')

delete('/:id')

```json
{
    "nome": String,
    "precoUnitario": Number,
    "estoque": Number,
    "categoria": String,
    "loja": "60e63feeb9283d0d1ca90a2e"
```

#### Loja:
→ Necessario token para usar as rotas

post('/createLoja')

get('/getlojas')
get('/:id')

patch('/:id')

delete('/:id')

```json
{
  "nome": "Nome da sua loja",
  "endereco": "Endereço VI",
  "redesSociais": "@seuuser",
  "telefone": "00 00000-0000",
  "loja": "60e63feeb9283d0d1ca90a2e"
}
```

#### Venda:
→ Necessario token para usar as rotas

post('/createVend')

get('/getVendas')

patch('/:id')

delete('/:id')

```json
{
  "dia": "07/07/2021",
  "quantItensVendidoDia": 15,
  "valorMontanteDia": 150,
  "despesaPessoal": 30,
  "valorFornecedor": 60,
  "loja": "60e63feeb9283d0d1ca90a2e"
}
```

#### Usuarios:

post('/create')

delete('/:id')

post("/login");

get('/getUsuario')

```json
{
  "nome":"Seu nome / loja",
  "email":"seuemail@gmail.com",
  "senha":"521521",
  "isAdmin": true
}
```


---

## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

---
### 🚧 Construção

  Implementação para mobile
  Relatorio mensal 

## 🦸 Autora

<a href="https://github.com/EmileMoraes">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/71241785?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Emile Moraes</b></sub></a> <a href="https://github.com/EmileMoraes" title="GitHub">🚀</a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Emile-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/emile-moraes-82a624111/)](https://www.linkedin.com/in/emile-moraes-82a624111/) 
[![Gmail Badge](https://img.shields.io/badge/-moraesemile@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:moraesemile@gmail.com)](mailto:moraesemile@gmail.com)

---

## 👩‍👧‍👦 Agradecimentos

Agradeço a {Reprograma} por ser constituida de tantas pessoas incriveis e cuidado com todas nós e agradeço pela oportunidade incrivel de aprendizado e parceria, a todas as minha colegas que me acompanharam inclusive nos surtos 😅
A minha familia que sempre me apoia em todos os meus caminhos, e um agradecimento especial a QA mais exigente e incrivel que tenho o prazer de conviver Julliane Freitas, que sempre me aconselha e puxa minha orelha nesse mundo tão novo e desafiador que é a tecnologia.


---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ by: Emile Moraes  [Entre em contato!](https://www.linkedin.com/in/emile-moraes-82a624111/)
