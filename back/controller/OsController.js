const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const OsController = async (description) => {
  let date = moment().subtract({h: 3})
  try{
  const order = await prisma.serviceOrder.create({
    data: {
      description: description,
      created_at: date
    },
  });
  return{
    success: true,
    message: 'OS criada com sucesso!',
    data: order
  }
  }
  catch (error) {
    console.error("Erro ao processar dados:", error);
    return {
      success: false,
      message: "Erro interno do servidor",
    };
  
  }
  
};

module.exports = {
  OsController,
};
