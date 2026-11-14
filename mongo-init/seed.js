// Runs once, on first start of the mongo container (empty data volume).
// Creates sample tickets in the "dev" and "prod" databases.
const now = new Date();

db.getSiblingDB("dev").todos.insertMany([
  { title: "Test login flow", description: "Dev ticket: verify login", completed: false, created_at: now },
  { title: "Try new dashboard layout", description: "Dev ticket: UI experiment", completed: true, created_at: now },
]);

db.getSiblingDB("prod").todos.insertMany([
  { title: "Customer cannot reset password", description: "Prod ticket: high priority", completed: false, created_at: now },
  { title: "Invoice PDF fixed", description: "Prod ticket: resolved", completed: true, created_at: now },
]);
