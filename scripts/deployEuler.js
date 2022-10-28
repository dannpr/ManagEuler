const hre = require("hardhat");

async function main() {
    const addr = "0x8EfA5dA2966d4ef0F5Ea6826Dec64447DD9c75Cc";
    const tokenvalue = hre.ethers.utils.parseEther("1");

    const Manage = await hre.ethers.getContractFactory("Switcher");

    const manage = await Manage.deploy(addr);

    await manage.deployed();


    console.log("Switcher deployed to:", manage.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
