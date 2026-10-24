const { app } = require("@azure/functions");
const { getTableClient } = require("../tableClient");

async function getAllTasks(request, context) {
  try {
    const tasks = [];
    for await (const task of getTableClient().listEntities()) {
      tasks.push(task);
    }
    return { status: 200, jsonBody: tasks };
  } catch (error) {
    context.error(error);
    return { status: 500, body: "Error retrieving tasks" };
  }
}

app.http("GetAllTasks", { methods: ["GET"], authLevel: "anonymous", route: "tasks", handler: getAllTasks });

module.exports = { getAllTasks };
