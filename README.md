# Gerenciador de Consultas Médicas 🩺

Este projeto é uma aplicação de gerenciamento de consultas médicas, desenvolvida para praticar conceitos de desenvolvimento web em Angular 17. A aplicação possui funcionalidades específicas para diferentes perfis de usuários, como ADMIN e USER, com permissões ajustadas às necessidades de cada tipo.

## 📌 Funcionalidades

### Usuários

- **Cadastro de Usuário:** Registre-se como USER ou ADMIN.
- **Login:** Autentique-se na aplicação para acessar o dashboard.

- **Login válido:** usuário - email@email.com / 
                    senha   - 123@4

### Dashboard

- **ADMIN:**
  - Visualizar todas as consultas agendadas.
  - Cancelar consultas.
  - Marcar consultas como concluídas.

- **USER:**
  - Visualizar suas próprias consultas.
  - Editar ou cancelar consultas.

### Regras de Negócio

1. **Status das Consultas:**
   - `SCHEDULED`: Status padrão ao criar uma consulta.
   - `DONE`: Indica que a consulta foi concluída.
   - `CANCELED`: Indica que a consulta foi cancelada.

2. **Restrições:**
   - Uma consulta concluída (`DONE`) não pode ser editada ou cancelada.
   - Uma consulta cancelada (`CANCELED`) não pode ser editada ou marcada como concluída.
