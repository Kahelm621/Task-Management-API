# Task Management API

A serverless REST API for managing tasks, built with **Azure Functions** (Node.js, v4 programming model) and **Azure Table Storage**. It supports create, read, update, complete and delete operations.

> Learning project. Tested locally with mocks; not deployed.

## Endpoints
| Method | Route | Function | What it does |
|---|---|---|---|
| POST | `/api/tasks` | CreateTask | Create a task (gets a generated `id`, starts `completed: false`) |
| GET | `/api/tasks` | GetAllTasks | List all tasks |
| GET | `/api/tasks/{id}` | GetTaskById | Get one task |
| PUT / PATCH | `/api/tasks/{id}` | UpdateTask | Update fields on a task |
| POST | `/api/tasks/{id}/complete` | CompleteTask | Mark a task complete |
| DELETE | `/api/tasks/{id}` | DeleteTask | Delete a task |

Tasks live in an Azure Table named `tasks`; each task's `id` is used as both its partition key and row key.

## Tech Stack
- JavaScript (Node.js), Azure Functions v4 (`@azure/functions`)
- Azure Table Storage (`@azure/data-tables`)
- Jest for unit tests (with an in-memory fake table)

## Run Locally
Requirements: Node.js 18+, [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local) and [Azurite](https://learn.microsoft.com/azure/storage/common/storage-use-azurite) (local storage emulator) or a real storage account.

```bash
git clone https://github.com/Kahelm621/Task-Management-API.git
cd Task-Management-API
npm install
cp local.settings.example.json local.settings.json   # set AzureWebJobsStorage if not using Azurite
npm start
```

Run the tests (no Azure account needed):
```bash
npm test
```

## Project Structure
```
Task-Management-API/
├── src/
│   ├── functions/        # One file per HTTP endpoint
│   └── tableClient.js    # Shared Azure Table Storage client
├── tests/tasks.test.js   # Jest tests using a fake table
├── host.json
├── local.settings.example.json
└── package.json
```

## License
MIT. See [LICENSE](LICENSE).
