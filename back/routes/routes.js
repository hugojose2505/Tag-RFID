const express = require("express");
const router = express.Router();
const { createTag } = require("../controller/tagController");
const { RegisterController } = require("../controller/RegisterController");
const { RegisterUpdateController } = require("../controller/RegisterUpdateController");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/api/tags", async (req, res) => {
  try {
    const { tag } = req.body;
    if (!tag) {
      return res
        .status(400)
        .json({ success: false, message: "Tag is required" });
    }

    const savedData = await createTag({ tag });

    return res.json({
      success: true,
      message: "Tag received and saved successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Erro ao processar dados:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/tags/:tag", async (req, res) => {
  const tag = req.params.tag;

  try {
    const tagInfo = await prisma.user.findUnique({
      where: { tag: tag },
    });

    if (tagInfo) {
      return res.json({ tag: tagInfo.tag });
    } else {
      return res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    console.error("Erro ao obter informações da tag:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/tags", async (req, res) => {
  try {
    const tags = await prisma.user.findMany({
      select: {
        tag: true,
        name: true,
        cpf: true,
      },
    });
    res.json(tags);
  } catch (error) {
    console.error("Erro ao obter tags:", error);
    res.status(500).json({ error: "Erro ao obter tags" });
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
    const { id_user, tag } = req.body;
    const result = await RegisterController({ id_user, tag });
    res.json(result);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.patch('/register/', async (req, res) => {
  try {
    const {  tag } = req.body;
    const result = await RegisterUpdateController({
      id_user,
      tag,
    });

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
});


module.exports = router;
