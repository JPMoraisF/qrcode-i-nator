
## 📱Gere um QR Code "editável"!
  

Com essa ferramenta, você pode criar um QR Code cujo link que ele redireciona é editável!

  
 - QR Code que aponta pra sua página no Instagram? **Pode**  ✅
 - Um site pessoal de portfólio? **Claro** ✅
 - Uma lojinha virtual ou um vídeo no YouTube? **Porque Não?**  ✅ ✅

Utilizando NodeJS, Express para construir o backend e MongoDB para armazenar os dados, essa aplicação irá gerar um documento "QRCode" no banco que contém um nome simples e uma url que redirecionará quem escanear o QR Code. Essa url na verdade pode ser qualquer String, mas por enquanto é só url mesmo.


Você pode consultar a API diretamente [por aqui](https://qrcodeinator.herokuapp.com/). O deploy foi feito no Heroku utilizando a conta gratuita, então provavelmente a primeira requisição irá ser mais demorada para que o Heroku inicie o Dyno da aplicação.


### Para fazer depois:

 1. Permitir que o usuário armazene outras coisas além de String
 2. Criar o login e senha de usuários corretamente.
 3. Criar o Front-End da aplicação

