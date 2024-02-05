const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const RegisterController = async ({ tag }) => {
  try {
    const existingTag = await prisma.user.findUnique({
      where: { tag: tag },
    });

    const getTag = await prisma.user.findUnique({
      where: { tag: tag },
    });

    const dados = getTag?.id;

    console.log(dados);
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

    let date = moment().subtract({ h: 3 });

    if (activeRegister?.active === true) {
      const registerUpdate = await prisma.register_hours.update({
        where: {
          id_register: activeRegister.id_register,
        },
        data: {
          exit: date,
          updated_at: date,
          active: false,
        },
      });

      return {
        success: true,
        message: "Saída registrada com sucesso",
        data: registerUpdate,
      };
    } else {
      const register = await prisma.register_hours.create({
        data: {
          input: date,
          exit: null,
          created_at: date,
          updated_at: null,
          delete_at: null,
          active: true,
          user: {
            connect: {
              id: dados,
            },
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

const GetOrdersByTag = async (tag) => {
  try {
    const user = await prisma.user.findUnique({
      where: { tag: tag },
      include: {
        service_orders: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Tag not registered",
      };
    }

    return {
      success: true,
      message: "Tag encontrada com Ordem de Serviço",
      data:user.service_orders,};
  } catch (error) {
    console.error("Error fetching orders by tag:", error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};


module.exports = { RegisterController, GetOrdersByTag };
