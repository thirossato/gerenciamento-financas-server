# gerenciamento-financas-server

Este é um projeto para o desafio da Flourish no MegaHack.

Nosso projeto visa criar um gerenciador de finanças com uma interface mais simplificada onde os usuários informam seus gastos e renda recorrentes, e a partir disso o sistema gera limites de gastos diários para que o usuário não gaste mais do que já tem comprometido.

Esta é a API usada por esse gerenciador, que fica hospedada na AWS, usando banco de dados não relacional. Esta API é responsável por salvar e retornar o cadastro dos usuários bem como suas informações de renda e despesas.

Futuramente será implementado as funcionalidades de calcular os limites, organizar as informações em categorias e também um sistema de pontuação que irá se basear em quão dentro da meta o usuário se manteve durante o período. Outra implementação futura será o envio de dicas por sms e e-mail.

## tecnlogias
- NodeJs
- Serverless framework

Antes de executar o projeto instale as dependencias do npm com o comando
'npm install'

## Rodando local
Para executar em sua maquina local execute o comando
`serverless offline`
