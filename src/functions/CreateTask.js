const { app } = require("@azure/functions");
const { getTableClient, keysFor } = require("../tableClient");

async function createTask(request, context) {
  try {
    const body = await request.json();
    const id = Date.now().toString(); // simple ID generation
    const task = { ...body, id, completed: false, ...keysFor(id) };
    await getTableClient().createEntity(task);
    return { status: 201, jsonBody: task };
  } catch (error) {
    context.error(error);
    return { status: 500, body: "Error creating task" };
  }
}

app.http("CreateTask", { methods: ["POST"], authLevel: "anonymous", route: "tasks", handler: createTask });

module.exports = { createTask };
