const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllRestore= async (req, res) => {
  try {
    const allRestore = await prisma.restoreItems.findMany({
        orderBy:{
        created_at:"desc"
    }});
    res.status(200).json(allRestore);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "No bills" });
  }
};

exports.createRestore = async (req, res) => {
  try {
    const {description,restore_products} = req.body;
 
    console.log(restore_products, "rrrrrrrrrrrrrr");
 
    const random4Digit = Math.floor(1000 + Math.random() * 9000);
    const todayDate = new Date().toISOString().split("T")[0].replace(/-/g, "");
 
    const resultString = `${random4Digit}${todayDate}`;
    console.log()
    const newRestore = await prisma.restors.create({
      data: {
        restore_number: resultString,
        description:description,
      },
    });
 
    const restoreNumber = newRestore.restore_number;
 
    if (restoreNumber) {
      const mappedData = restore_products.map((e) => {
        return {
          restore_number : restoreNumber,
          product_id: e.id,
        };
      });
 
      const newRestoreItems = await prisma.restoreItems.createMany({
        data: mappedData,
      });
 
      console.log("iiii", newRestoreItems );
 
    
      res.status(200).json({ "newRestoreItems":newRestoreItems});
    } else {
      res.status(404).json({ error: "No restore number" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "No Restore" });
  }
};



