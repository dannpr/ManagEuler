const { expect } = require("chai");
const hre = require("hardhat");

describe("test contract", function () {
    it("Deployment should have a beneficiary", async function () {
        const [owner] = await ethers.getSigners();
        const tokenvalue = hre.ethers.utils.parseEther("1");

        const Manage = await ethers.getContractFactory("Switcher");

        const manage = await Manage.deploy(owner.address);

        await manage.deployed();


        await manage.deposit({ value: tokenvalue });
    });
});