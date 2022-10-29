const { expect } = require("chai");
const hre = require("hardhat");

describe("test contract", function () {
    it("Deployment should have a beneficiary and deposit", async function () {
        const [owner] = await ethers.getSigners();
        const tokenvalue = hre.ethers.utils.parseEther("100");
        const tokencol = hre.ethers.utils.parseEther("10");
        const tokenloan = hre.ethers.utils.parseEther("40");

        const Manage = await ethers.getContractFactory("Switcher");
        const manage = await Manage.deploy();

        //await manage.deployed();

        /*         await manage.deposit({ value: tokenvalue }, { value: tokencol }, { value: tokenloan });
         */
    });
});