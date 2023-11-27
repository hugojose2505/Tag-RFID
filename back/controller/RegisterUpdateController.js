// controller.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const RegisterUpdateController = async ({ id_user, tag }) => {
  try {
    const currentDate = new Date();
    // Encontrar o registro de horas em aberto para o usuário
    const openRegister = await prisma.register_hours.findFirst({
      where: {
        user : {
          id: id_user,
        },
        exit: null,
      },
    });

    if (!openRegister) {
      return {
        success: false,
        message: "No open register found for the user",
      };
    }

    // Atualizar o campo 'exit' no registro de horas
    const result = await prisma.register_hours.update({
      where: {
        id_register: openRegister.id_register,
      },
      data: {
        exit: currentDate,
        updated_at: currentDate,
      },
    });

    return {
      success: true,
      message: "Exit updated successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error processing data:", error);
    return { success: false, message: "Internal Server Error" };
  }
};

module.exports = { RegisterUpdateController };
