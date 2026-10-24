const { TableClient } = require("@azure/data-tables");

const TABLE_NAME = "tasks";
let client;

// Lazily create one TableClient from the AzureWebJobsStorage connection string.
function getTableClient() {
  if (!client) {
    const connectionString = process.env.AzureWebJobsStorage;
    if (!connectionString) {
      throw new Error("AzureWebJobsStorage is not set. Add it to local.settings.json.");
    }
    client = TableClient.fromConnectionString(connectionString, TABLE_NAME, {
      allowInsecureConnection: connectionString.includes("UseDevelopmentStorage=true"),
    });
  }
  return client;
}

// Allows tests to inject a fake client.
function setTableClient(fake) {
  client = fake;
}

// Each task uses its id as both partitionKey and rowKey.
const keysFor = (id) => ({ partitionKey: id, rowKey: id });

module.exports = { getTableClient, setTableClient, keysFor };
