export const validator = data => {
    let errors = {};

    if (!data.name) {
        errors.name1 = 'Ingresa un nombre.';
    } else {
        errors.name1 = '';
    }

    if (data.name && !/^[a-zA-Z\s]+$/.test(data.name)) {
        errors.name2 = 'El nombre no puede tener numeros o caracteres especiales.';
    } else {
        errors.name2 = '';
    }

    if (data.name.length > 35) {
        errors.name3 = 'Debe tener menos de 36 caracteres.';
    } else {
        errors.name3 = '';
    }

    const numericFields = ['hp', 'attack', 'defense', 'speed', 'weight', 'height'];

    numericFields.forEach(field => {
        if (!/^\d{1,2}$/.test(data[field])) {
            errors[field] = `Ingresa un número válido de 0 a 99 en ${field}.`;
        } else {
            errors[field] = '';
        }
    });

    return errors;
};