const { app } = require("@azure/functions");
const { getTableClient } = require("../tableClient");

async function deleteTask(request, context) {
  const id = request.params.id;
  try {
    await getTableClient().deleteEntity(id, id);
    return { status: 200, body: "Task deleted successfully" };
  } catch (error) {
    return { status: 404, body: "Task not found" };
  }
}

app.http("DeleteTask", { methods: ["DELETE"], authLevel: "anonymous", route: "tasks/{id}", handler: deleteTask });

module.exports = { deleteTask };
