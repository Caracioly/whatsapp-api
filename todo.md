# 📂 Plano de Implementação do Bot

## 1. 🕒 Horário de Atendimento

Impede o bot de responder fora do expediente.

```js
function isWithinWorkingHours() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 9 && hour < 18;
}
```

## 2. ➕ Adicionar Opção de Resposta no Painel

Permite adicionar novos campos de mensagens dinamicamente via interface.

- Botão “Adicionar opção”
- Criação de novo campo de input
- Ligação direta a uma nova chave de mensagem

## 3. 🔁 Fluxo de Mensagens

Criação de uma estrutura condicional para navegação entre mensagens com base na entrada do usuário.

## 4. 📊 Dashboard Simples

Exibição de status e métricas do bot:

- Online/offline
- Mensagens recentes
- Logs

## 5. 🧝 Atendimento Humanizado

Encaminhamento para atendente real:

- Redirecionamento via WhatsApp
- Controle manual ou automático

## 6. 📥 Fila de Atendimento

Gerenciamento de usuários aguardando atendimento:

- Registro de sessões
- Organização por ordem de chegada
- Distribuição para atendentes
