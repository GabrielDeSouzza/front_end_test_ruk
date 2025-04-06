# 📱 Desafio Frontend - App de Autenticação com React Native
Este projeto é o frontend mobile de um sistema de autenticação que utiliza JWT, desenvolvido com React Native + Expo, TypeScript e TailwindCSS. A aplicação permite que usuários realizem login e visualizem seus dados em um cartão de identificação.

## 🔧 Tecnologias Utilizadas
React Native

Expo

TypeScript

TailwindCSS (via NativeWind)

React Navigation

JWT (integração com backend)

React Hook Form

Zod

## 📦 Instalação
Clone o repositório:

git clone [https://github.com/seu-usuario/nome-do-repo.git](https://github.com/GabrielDeSouzza/front_end_test_ruk.git)

cd front_end_test_ruk
Instale as dependências:
```bash
npm install
Inicie o projeto com Expo:
```
Inicie a Aplicação
Obs: Necessario confiurar o android Studio ou usar um celular IOS ou ANDROID
```bash
npx expo start
```
## ✅ Funcionalidades
Autenticação via e-mail e senha.

Validações de dos dados com React Hook Form e Zod

Exibição de dados do usuário autenticado com base no token JWT.

Cartão de identificação estilizado com os dados do usuário.

## 📲 Telas

### 🔐 Tela de Login
Campos de entrada: email, senha

Autentica via JWT

Armazena o token em async storage

### 🏠 Tela Home
Requisição com token no header

Exibe: nome, e-mail, telefones, data de criação e modificação

### 📝 Tela de Criação de Usuário
Permite o registro de um novo usuário com os seguintes campos: 
nome, email, senha e telefones
