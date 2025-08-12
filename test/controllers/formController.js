const prisma = require('../utils/db');
const { validateForm } = require('../utils/validation');
const step1Schema = require('../step1_schema.json');
const step2Schema = require('../step2_schema.json');

exports.submitForm = async (req, res) => {
  try {
    const { step, formData } = req.body;

    if (![1, 2].includes(step)) {
      return res.status(400).json({ error: "Invalid step number" });
    }

    const schema = step === 1 ? step1Schema : step2Schema;
    const errors = validateForm(schema, formData);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const savedData = await prisma.registration.create({
      data: {
        step,
        formData
      }
    });

    res.status(201).json(savedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
