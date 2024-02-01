const express = require("express");
const router = express.Router();
const { createTag } = require("../controller/tagController");
const { RegisterController } = require("../controller/RegisterController");
const { PrismaClient } = require("@prisma/client");
const { OsController } = require("../controller/OsController");
const prisma = new PrismaClient();

router.get("/register", async (req, res) => {
  try {
    const tags = await prisma.register_hours.findMany({
      select: {
        id_user: true,
        created_at: true,
        exit: true,
        id_register: true,
        input: true,
        active: true,
        updated_at: true,
        delete_at: true,
        user: true,
      },
    });
    res.json(tags);
  } catch (error) {
    console.error("Erro ao obter tags:", error);
    res.status(500).json({ error: "Erro ao obter tags" });
  }
});

router.get("/tags", async (req, res) => {
  try {
    const tags = await prisma.user.findMany({
      select: {
        tag: true,
        name: true,
        cpf: true,
        id: true,
      },
    });
    res.json(tags);
  } catch (error) {
    console.error("Erro ao obter tags:", error);
    res.status(500).json({ error: "Erro ao obter tags" });
  }
});

router.delete("/tags/:id", async (req, res) => {
  const tagId = req.params.id;

  try {
    const tag = await prisma.user.findUnique({
      where: { id: tagId },
    });

    if (!tag) {
      return res.status(404).json({ error: "Tag não encontrada" });
    }
    await prisma.user.delete({
      where: { id: tagId },
    });

    res.json({ message: "Tag deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar a tag:", error);
    res.status(500).json({ error: "Erro ao deletar a tag" });
  }
});

router.post("/associate-tag", async (req, res) => {
  try {
    const { tag, name, cpf } = req.body;
    const existingTag = await prisma.user.findUnique({
      where: { tag: tag },
    });

    const existingCPF = await prisma.user.findUnique({
      where: { cpf: cpf },
    });

    if (existingTag) {
      return res.status(400).json({ error: "Tag already created" });
    }
    if (existingCPF) {
      return res.status(400).json({ error: "CPF already created" });
    }

    const savedData = await createTag({ tag, name, cpf });
    return res.json({
      success: true,
      message: "Tag received and saved successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/register", async (req, res) => {
  try {
    const { id_user, tag,input, exit } = req.body;
    const result = await RegisterController({ id_user, tag });
    res.json(result);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createOS", async (req, res) => {
  try {
    const { description } = req.body;
    const order = await OsController(description);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/joinOS', async (req, res) => {
  const { orderId, userId } = req.body;

  try {
    const serviceOrder = await prisma.serviceOrder.findUnique({
      where: { id_order: orderId },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!serviceOrder || !user) {
      return res.status(404).json({ error: 'ServiceOrder or User not found' });
    }
    const association = await prisma.serviceOrderUser.create({
      data: {
        id_order: orderId,
        id_user: userId,
      },
    });

    return res.status(201).json(association);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.serviceOrder.findMany({
      include: {
        users: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/orders/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await prisma.serviceOrder.findUnique({
      where: { id_order: orderId },
    });

    if (!order) {
      return res.status(404).json({ error: 'Ordem de Serviço não encontrada' });
    }
    await prisma.serviceOrderUser.deleteMany({
      where: { id_order: orderId },
    });
    await prisma.serviceOrder.delete({
      where: { id_order: orderId },
    });

    res.json({ message: 'Ordem de Serviço deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar a Ordem de Serviço:', error);
    res.status(500).json({ error: 'Erro ao deletar a Ordem de Serviço' });
  }
});

module.exports = router;