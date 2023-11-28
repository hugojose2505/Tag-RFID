const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const RegisterController = async ({  tag }) => {
  try {
    const existingTag = await prisma.user.findUnique({
      where: { tag: tag },
    });

    const getTag = await prisma.user.findUnique({
      where: { tag: tag },
    });

    const dados = getTag?.id

    console.log(dados)
    const currentDate = new Date();

    

    if (!existingTag) {
      return {
        success: false,
        message: "Tag not registered",
      };
    }

    const activeRegister = await prisma.register_hours.findFirst({
      where: {
        user: {
          id: dados,
        },
        exit: null,
      },
    });
  
    if(activeRegister?.active === true) {
      const registerUpdate = await prisma.register_hours.update({
        where: {
          id_register: activeRegister.id_register,
        },
        data: {
          exit: currentDate,
          updated_at: currentDate,
          active: false,
        },
      });

      return {
        success: true,
        message: "Saída registrada com sucesso",
        data: registerUpdate,
      };
    }else{
      const register = await prisma.register_hours.create({
        data: {
          input: currentDate,
          exit: null,
          created_at: currentDate,
          updated_at: null,
          delete_at: null,
          active: true,
          user: {
            connect: {
              id: dados
            }
          },
        },
      });
      return {
        success: true,
        message: "Entrada registrada com sucesso",
        data: register,
      };
    }
  } catch (error) {
    console.error("Erro ao processar dados:", error);
    return {
      success: false,
      message: "Erro interno do servidor",
    };
  }
};

module.exports = { RegisterController };