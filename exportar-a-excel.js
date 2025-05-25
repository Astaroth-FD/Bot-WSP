const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const rutaBase = path.join(__dirname, 'registros'); // Carpeta con los .json
const archivoSalida = path.join(__dirname, 'registros_exportados.xlsx');

async function exportarAExcelAcumulativo() {
    const workbook = new ExcelJS.Workbook();

    // Si ya existe el archivo Excel, lo abrimos
    if (fs.existsSync(archivoSalida)) {
        await workbook.xlsx.readFile(archivoSalida);
        console.log('📁 Archivo Excel existente cargado.');
    }

    const archivos = fs.readdirSync(rutaBase).filter(file => file.endsWith('.json'));

    for (const archivo of archivos) {
        const nombreGrupo = path.basename(archivo, '.json').substring(0, 31);
        const rutaArchivo = path.join(rutaBase, archivo);

        // Leer el archivo JSON
        let registros;
        try {
            const contenido = fs.readFileSync(rutaArchivo, 'utf8');
            registros = JSON.parse(contenido);
        } catch (err) {
            console.error(`❌ Error leyendo/parsing ${archivo}:`, err);
            continue; // si falla no lo eliminamos
        }

        if (!registros || registros.length === 0) continue;

        // Obtener o crear hoja
        let hoja = workbook.getWorksheet(nombreGrupo);
        if (!hoja) {
            const columnas = Object.keys(registros[0]);
            hoja = workbook.addWorksheet(nombreGrupo);
            hoja.columns = columnas.map(col => ({ header: col, key: col }));
        }

        // Agregar filas
        registros.forEach(reg => hoja.addRow(reg));

        console.log(`✅ ${registros.length} registros agregados en hoja "${nombreGrupo}"`);

        // ✅ Eliminar el archivo JSON si fue procesado exitosamente
        try {
            fs.unlinkSync(rutaArchivo);
            console.log(`🧹 ${archivo} eliminado tras procesarse`);
        } catch (err) {
            console.error(`⚠️ No se pudo eliminar ${archivo}:`, err);
        }
    }

    // Guardar el archivo Excel
    await workbook.xlsx.writeFile(archivoSalida);
    console.log(`📊 Excel actualizado: ${archivoSalida}`);
}

exportarAExcelAcumulativo().catch(err => console.error("❌ Error al exportar:", err));
