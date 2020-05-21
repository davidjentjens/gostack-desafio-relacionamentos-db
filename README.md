# gostack-desafio-relacionamentos-db
Código para o desafio de relacionamentos com banco de dados no Node.js do curso da Rocketseat.

<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Desafio 09: Relacionamentos com banco de dados no Node.js
</h3>

<p align="center">
  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

### Rotas da aplicação

- **`POST /customers`**: A rota deve receber `name` e `email` dentro do corpo da requisição, sendo o `name` o nome do cliente a ser cadastrado. Ao cadastrar um novo cliente, ele deve ser armazenado dentro do seu banco de dados e deve ser retornado o cliente criado. Ao cadastrar no banco de dados, na tabela `customers` ele deverá possuir os campos possuindo os campos `name`, `email`, `created_at`, `updated_at`.

- **`POST /products`**: Essa rota deve receber `name`, `price` e `quantity` dentro do corpo da requisição, sendo o `name` o nome do produto a ser cadastrado, `price` o valor unitário e `quantity` a quantidade existente em estoque do produto. Com esses dados devem ser criados no banco de dados um novo produto com os seguitnes campos: `name`, `price`, `quantity`, `created_at`, `updated_at`.

- **`POST /orders/`**: Nessa rota você deve receber no corpo da requisição o `customer_id` e um array de products, contendo o `id` e a `quantity` que você deseja adicionar a um novo pedido. Aqui você deve cadastrar na tabela `order` um novo pedido, que estará relacionado ao `customer_id` informado, `created_at` e `updated_at` . Já na tabela `orders_products`, você deve armazenar o `product_id`, `order_id`, `price` e `quantity`, `created_at` e `updated_at`.

- **`GET /orders/:id`**: Essa rota deve retornar as informações de um pedido específico, com todas as informações que podem ser recuperadas através dos relacionamentos entre a tabela `orders`, `customers` e `orders_products`.

</br>

### Específicação dos testes

- **`should be able to create a new customer`**: Para que esse teste passe, sua aplicação deve permitir que um cliente seja criado, e retorne um json com o cliente criado.

- **`should not be able to create a customer with one e-mail thats already registered`**: Para que esse teste passe, sua aplicação deve retornar um erro quando você tentar cadastrar um cliente com um e-mail que já esteja cadastrado no banco de dados.

- **`should be able to create a new product`**: Para que esse teste passe, sua aplicação deve permitir que um produto seja criado, e retorne um json com o produto criado.

- **`should not be able to create a duplicated product`**: Para que esse teste passe, sua aplicação deve retornar um erro quando você tentar cadastrar um produto com um nome que já esteja cadastrado no banco de dados.

- **`should be able to create a new order`**: Para que esse teste passe, sua aplicação deve permitir que um pedido seja criado, e retorne um json com o todos os dados do pedido criado.

- **`should not be able to create an order with a invalid customer`**: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um cliente que não existe no banco de dados, retornando um erro.

- **`should not be able to create an order with invalid products`**: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um produtos que não existem no banco de dados, retornando um erro caso um ou mais dos produtos enviados não exista no banco de dados.

- **`should not be able to create an order with products with insufficient quantities`**: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um produtos que não possuem quantidade disponível, retornando um erro caso um ou mais dos produtos enviados não possua a quantidade necessária.

- **`should be able to subtract an product total quantity when it is ordered`**: Para que esse teste passe, sua aplicação deve permitir que, quando um novo pedido for criado, seja alterada a quantidade total dos produtos baseado na quantidade pedida.

- **`should be able to list one specific order`**: Para que esse teste passe, você deve permitir que a rota `orders/:id` retorne um pedido, contendo todas as informações do pedido com o relacionamento de `customer` e `order_products`.
