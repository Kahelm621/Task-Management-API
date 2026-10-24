const { app } = require("@azure/functions");
const { getTableClient, keysFor } = require("../tableClient");

async function updateTask(request, context) {
  const id = request.params.id;
  try {
    const client = getTableClient();
    const existing = await client.getEntity(id, id);
    const updates = await request.json();
    const task = { ...existing, ...updates, id, ...keysFor(id) };
    await client.updateEntity(task, "Merge");
    return { status: 200, jsonBody: task };
  } catch (error) {
    return { status: 404, body: "Task not found" };
  }
}

app.http("UpdateTask", { methods: ["PUT", "PATCH"], authLevel: "anonymous", route: "tasks/{id}", handler: updateTask });

module.exports = { updateTask };
