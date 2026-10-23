# Task Management API

A serverless REST-style API for managing tasks, built with **Azure Functions** (Node.js) and **Azure Table Storage**. It supports basic CRUD (Create, Read, Update, Delete) operations for tasks.

> This is a learning project and a work in progress. Some function folders are still the default Azure Functions templates.

## Features
The HTTP-triggered handlers in `task-management-api/HttpTriggers/` cover:
- Create a task (gets a generated ID and starts as not completed)
- Get all tasks
- Get a task by ID
- Update a task
- Mark a task as complete
- Delete a task

Tasks are stored in an Azure Table Storage table named `tasks`.

## Tech Stack
- JavaScript (Node.js)
- Azure Functions
- Azure Table Storage (`@azure/data-tables`)
- Jest-style unit test (`createTask/createTask.test.js`)

## How to Run Locally
Requirements: Node.js, [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local), and an Azure Storage account.

```bash
git clone https://github.com/Kahelm621/Task-Management-API.git
cd Task-Management-API/task-management-api
npm install @azure/data-tables
# Set AzureWebJobsStorage, StorageAccountName and StorageAccountKey in your local settings
func start
```

## Project Structure
```
task-management-api/
├── HttpTriggers/        # CRUD handlers backed by Azure Table Storage
├── createTask/ getTasks/ getTaskById/ updateTask/ deleteTask/ completeTask/
│                        # Function folders (function.json + index.js)
├── models/Task.js
├── services/            # Task and notification services
├── utils/               # Auth middleware and DB config
├── TaskManagementAPI/   # Azure Functions v4 project scaffold
└── host.json
```
