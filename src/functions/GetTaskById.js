const { app } = require("@azure/functions");
const { getTableClient } = require("../tableClient");

async function getTaskById(request, context) {
  const id = request.params.id;
  try {
    const task = await getTableClient().getEntity(id, id);
    return { status: 200, jsonBody: task };
  } catch (error) {
    return { status: 404, body: "Task not found" };
  }
}

app.http("GetTaskById", { methods: ["GET"], authLevel: "anonymous", route: "tasks/{id}", handler: getTaskById });

module.exports = { getTaskById };
