**RF** (requisitos funcionais)

**RNF** (requisitos não funcionais)

**RN** (regras de negócio)



# RECUPERAÇÃO DE SENHAS


**RF**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap.io para testar envios em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job); (fila)

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;



# ATUALIZAÇÃO DE PERFIL

**RF**

- O usuário deve poder seu nome, email e senha;

**RNF**

**RN**

- O usuário não pode utilizar seu email para um email já utilizado;
- Para utilizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuario precisa confirmar a nova senha;



# PAINEL DE PRESTADOR

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um agendamento;
- O prestador deve poder visualizar as notificaçãos não lidas;

**RNF**

- Os agendamentos do prestador no dia deve ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As noificações do prestador deve ser enviados em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar



# AGENDAMENTO DE SERVIÇOS

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armezanada em cache;

**RN**

- Cada agendamento deve durar 1h hora exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar um um horário já ocupado;
- O usuário não pode agendar em um um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;



# GIT COMMANDS

git rm --cached newfile

git rm --cached ormconfig.json

git rm -r --cached .

git add .

git add -A
