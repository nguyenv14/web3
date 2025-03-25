const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
    let Greeter, greeter, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners(); // Lấy tài khoản
        Greeter = await ethers.getContractFactory("Greeter"); // Lấy contract

        // Deploy contract trực tiếp, không dùng .deployed()
        greeter = await Greeter.deploy("Hello, world1!"); 
    });

    it("Should deploy with the correct initial greeting", async function () {
        const greeting = await greeter.greet(); // Gọi hàm greet()
        expect(greeting).to.equal("Hello, world1!"); // Kiểm tra kết quả
    });
});
