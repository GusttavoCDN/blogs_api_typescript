# BLOG API

## O Problema

Preciso de uma API que faça controle de um BLOG. Ela deve permitir que **USUARIOS** possam se cadastrar e ver todos os **POSTS** criados no BLOG. Além disso apenas **ADMINISTRADORES** devem poder criar, editar e deletar **POSTS**, sendo que apenas o **ADMINISTRADOR** que criou o **POST** pode editá-lo ou deletá-lo.

Todos os **POSTS** do BLOG devem ser dividos em **CATEGORIAS**

## Regras de Negócio

### Cadastro de usuarios

> -> O **USUARIO** deve ser capaz de se cadastrar na API enviando: `name`, `email` e `password`

> -> Não deve ser possível cadastrar mais de um **USUARIO** com o mesmo `email`.

> -> Não deve ser possível cadastrar **USUARIO** sem `email` ou `password` válido.