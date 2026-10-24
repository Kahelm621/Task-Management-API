const { app } = require("@azure/functions");
const { getTableClient } = require("../tableClient");

async function completeTask(request, context) {
  const id = request.params.id;
  try {
    const client = getTableClient();
    const task = await client.getEntity(id, id);
    task.completed = true;
    await client.updateEntity(task, "Merge");
    return { status: 200, jsonBody: task };
  } catch (error) {
    return { status: 404, body: "Task not found" };
  }
}

app.http("CompleteTask", { methods: ["POST"], authLevel: "anonymous", route: "tasks/{id}/complete", handler: completeTask });

module.exports = { completeTask };
