const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTag = async ({ tag, name, cpf }) => {
  try {
    const user = await prisma.user.create({
      data: {
        tag: tag,
        name:name,
        cpf:cpf
      }
    });

    return user;
  } catch (error) {
    console.error('Erro ao processar dados:', error);
    throw error;
  }
};

module.exports = { createTag };
