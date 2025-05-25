const fs = require("fs");
const ExcelJs = require("exceljs");

const bufferAtencion2 = [];


// Función para registrar eventos en Excel sin sobrescribir registros anteriores
async function registrarAtencion(nombreGrupo, comando) {
    const FilePath = "registros.xlsx";
    let libro = new ExcelJs.Workbook();
    let sheet;

    // Verificar si el archivo ya existe
    if (fs.existsSync(FilePath)) {
        await libro.xlsx.readFile(FilePath);
        sheet = libro.getWorksheet("Registros");
    }

    // Si la hoja no existe, la creamos
    if (!sheet) {
        sheet = libro.addWorksheet("Registros");
        sheet.columns = [
            { header: "Fecha y Hora", key: "fechaHora", width: 25 },
            { header: "Nombre del Grupo", key: "nombreGrupo", width: 30 },
            { header: "Comando", key: "comando", width: 30 },
        ];
    }

    // Obtener la fecha y hora actual en formato adecuado
    const fechaHora = new Date().toLocaleString("es-ES", { timeZone: "America/Lima" });

    // Agregar una nueva fila en la última posición disponible
    sheet.addRow([fechaHora, nombreGrupo, comando]); // ⬅ Agregado en formato de array

    // Guardar cambios en el mismo archivo sin eliminar registros previos
    await libro.xlsx.writeFile(FilePath);

    console.log(`✅ Registro guardado: Grupo "${nombreGrupo}" - Comando "${comando}" - ${fechaHora}`);
}






function pushAtencion2(nombreGrupo, numeroUsuario, comando) {
    bufferAtencion2.push({ nombreGrupo, numeroUsuario, comando });
}

async function guardarBufferAtencion2(buffer) {
    const FilePath = "registros2.xlsx";
    let libro = new ExcelJs.Workbook();
    let sheet;

    if (fs.existsSync(FilePath)) {
        await libro.xlsx.readFile(FilePath);
        sheet = libro.getWorksheet("Registros");
    }

    if (!sheet) {
        sheet = libro.addWorksheet("Registros");
        sheet.columns = [
            { header: "Fecha y Hora", key: "fechaHora", width: 25 },
            { header: "Nombre del Grupo", key: "nombreGrupo", width: 30 },
            { header: "numeroUsuario", key: "numeroUsuario", width: 30 },
            { header: "Comando", key: "comando", width: 30 },
        ];
    }

    for (const entrada of buffer) {
        const fechaHora = new Date().toLocaleString("es-ES", { timeZone: "America/Lima" });
        sheet.addRow([fechaHora, entrada.nombreGrupo, entrada.numeroUsuario, entrada.comando]);
    }

    if (fs.existsSync(FilePath)) {
        fs.copyFileSync(FilePath, `${FilePath}.bak`);
    }

    await libro.xlsx.writeFile(FilePath);
    console.log(`✅ Se guardaron ${buffer.length} registros en registros2.xlsx`);
    // console.log(`✅ Registro guardado: Grupo "${nombreGrupo}" "${numeroUsuario}" - Comando "${comando}" - ${fechaHora}`);
}

const maxLote = 20;
setInterval(async () => {
    // if (bufferAtencion2.length > 0) {
    //     const copia = [...bufferAtencion2];
    //     bufferAtencion2.length = 0;
    if (bufferAtencion2.length > 0) {
        const copia = bufferAtencion2.splice(0, maxLote);

        let guardadoExitoso = false;

        try {
            await guardarBufferAtencion2(copia);
            guardadoExitoso = true;
        } catch (error) {
            console.error("❌ Error al guardar registros2.xlsx:", error);
        }

        // Si no fue exitoso, reagrega SOLO SI el buffer está vacío (evitar duplicados)
        if (!guardadoExitoso && bufferAtencion2.length === 0) {
            bufferAtencion2.push(...copia);
        }
    }
}, 10000);






async function registraReporte(nombreGrupo,numeroUsuario,mensaje) {
    const FilePath = "ReporteSantaLucia.xlsx";
    let libro = new ExcelJs.Workbook();
    let sheet;

    // Verificar si el archivo ya existe
    if (fs.existsSync(FilePath)) {
        await libro.xlsx.readFile(FilePath);
        sheet = libro.getWorksheet("ReporteSantaLucia");
    }

    // Si la hoja no existe, la creamos
    if (!sheet) {
        sheet = libro.addWorksheet("ReporteSantaLucia");
        sheet.columns = [
            { header: "Fecha y Hora", key: "fechaHora", width: 25 },
            { header: "Nombre del Grupo", key: "nombreGrupo", width: 30 },
            { header: "numeroUsuario", key: "numeroUsuario", width: 30 },
            { header: "mensaje", key: "mensaje", width: 30 },

        ];
    }

    // Obtener la fecha y hora actual en formato adecuado
    const fechaHora = new Date().toLocaleString("es-ES", { timeZone: "America/Lima" });

    // Agregar una nueva fila en la última posición disponible
    sheet.addRow([fechaHora, nombreGrupo,numeroUsuario,mensaje]); // ⬅ Agregado en formato de array

    // Guardar cambios en el mismo archivo sin eliminar registros previos
    await libro.xlsx.writeFile(FilePath);

    console.log(`✅ Registro guardado: Grupo "${nombreGrupo}" "${numeroUsuario}"- mensaje "${mensaje}" - ${fechaHora}`);
}




// Exportar función para usarla en bot.js
module.exports = { registrarAtencion, pushAtencion2, registraReporte};

