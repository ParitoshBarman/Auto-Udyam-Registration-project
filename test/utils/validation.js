function validateForm(schema, formData) {
  const errors = [];

  schema.fields.forEach(field => {
    const value = formData[field.name];

    if (field.required && (value === undefined || value === "")) {
      errors.push(`${field.label || field.name} is required`);
    }

    if (field.maxlength && value && value.length > parseInt(field.maxlength)) {
      errors.push(`${field.label || field.name} exceeds max length of ${field.maxlength}`);
    }

    if (field.pattern && value) {
      const regex = new RegExp(field.pattern);
      if (!regex.test(value)) {
        errors.push(`${field.label || field.name} is invalid`);
      }
    }
  });

  return errors;
}

module.exports = { validateForm };