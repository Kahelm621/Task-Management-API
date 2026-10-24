const { setTableClient } = require("../src/tableClient");
const { createTask } = require("../src/functions/CreateTask");
const { getAllTasks } = require("../src/functions/GetAllTasks");
const { getTaskById } = require("../src/functions/GetTaskById");
const { completeTask } = require("../src/functions/CompleteTask");
const { deleteTask } = require("../src/functions/DeleteTask");

// Simple in-memory stand-in for Azure Table Storage.
function fakeTable() {
  const rows = new Map();
  return {
    createEntity: async (e) => rows.set(e.rowKey, { ...e }),
    getEntity: async (pk, rk) => {
      if (!rows.has(rk)) throw new Error("not found");
      return { ...rows.get(rk) };
    },
    updateEntity: async (e) => rows.set(e.rowKey, { ...rows.get(e.rowKey), ...e }),
    deleteEntity: async (pk, rk) => {
      if (!rows.delete(rk)) throw new Error("not found");
    },
    listEntities: async function* () {
      yield* rows.values();
    },
  };
}

const context = { error: () => {}, log: () => {} };
const req = (body, params = {}) => ({ json: async () => body, params });

beforeEach(() => setTableClient(fakeTable()));

test("creates a task and reads it back", async () => {
  const created = await createTask(req({ title: "Test Task" }), context);
  expect(created.status).toBe(201);
  expect(created.jsonBody.completed).toBe(false);

  const { id } = created.jsonBody;
  const fetched = await getTaskById(req(null, { id }), context);
  expect(fetched.status).toBe(200);
  expect(fetched.jsonBody.title).toBe("Test Task");

  const all = await getAllTasks(req(null), context);
  expect(all.jsonBody).toHaveLength(1);
});

test("completes and deletes a task", async () => {
  const { jsonBody } = await createTask(req({ title: "Finish README" }), context);
  const done = await completeTask(req(null, { id: jsonBody.id }), context);
  expect(done.jsonBody.completed).toBe(true);

  expect((await deleteTask(req(null, { id: jsonBody.id }), context)).status).toBe(200);
  expect((await getTaskById(req(null, { id: jsonBody.id }), context)).status).toBe(404);
});
