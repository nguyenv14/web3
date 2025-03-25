// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GreetModule", (m) => {
  // Tham số tùy chỉnh cho greeting
  const initialGreeting = m.getParameter("initialGreeting", "Hello, World!");

  // Triển khai hợp đồng "Greet" với tham số greeting ban đầu
  const greeter = m.contract("Greeter", [initialGreeting]);

  return { greeter };
});
