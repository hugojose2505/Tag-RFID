const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const checkIfOrderExists = async (description) => {
  try {
    const existingOrder = await prisma.serviceOrder.findFirst({
      where: {
        description: description,
      },
    });
    return existingOrder !== null;
  } catch (error) {
    console.error("Erro ao verificar a existência da OS:", error);
    throw error;
  }
};

const OsController = async (description) => {
  let date = moment().subtract({ h: 3 });
  try {
    const orderExists = await checkIfOrderExists(description);

    if (orderExists) {
      return {
        success: false,
        message: "Já existe uma OS com essa descrição",
      };
    }

    const order = await prisma.serviceOrder.create({
      data: {
        description: description,
        created_at: date,
      },
    });
    
    return {
      success: true,
      message: "OS criada com sucesso!",
      data: order,
    };
  } catch (error) {
    console.error("Erro ao processar dados:", error);
    return {
      success: false,
      message: "Erro interno do servidor",
    };
  }
};

module.exports = {
  OsController,
  checkIfOrderExists,
};