const {
    buildModule
} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TransactionModule", (m) => {
    // Deploy contract TransactionRecorder không cần tham số
    const transactionRecorder = m.contract("TransactionRecorder", []);

    return {
        transactionRecorder
    };
});