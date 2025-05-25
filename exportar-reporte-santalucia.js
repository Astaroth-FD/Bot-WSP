const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const rutaJSON = path.join(__dirname, 'reporteSantaLucia.json');
const archivoExcel = path.join(__dirname, 'reporteSantaLucia.xlsx');

async function exportarReporteSantaLucia() {
    if (!fs.existsSync(rutaJSON)) {
        console.log('⚠️ No hay datos para exportar (reporteSantaLucia.json no existe)');
        return;
    }

    let registros;
    try {
        const contenido = fs.readFileSync(rutaJSON, 'utf8');
        registros = JSON.parse(contenido);
    } catch (err) {
        console.error('❌ Error leyendo/parsing reporteSantaLucia.json:', err);
        return;
    }

    if (!registros || registros.length === 0) {
        console.log('📭 No hay registros que exportar.');
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const hoja = workbook.addWorksheet("ReporteSantaLucia");

    const columnas = Object.keys(registros[0]);
    hoja.columns = columnas.map(col => ({ header: col, key: col }));

    registros.forEach(reg => hoja.addRow(reg));

    await workbook.xlsx.writeFile(archivoExcel);
    console.log(`📊 Excel generado: ${archivoExcel}`);

    // ✅ Si querés borrar el JSON tras exportar:
    // fs.unlinkSync(rutaJSON);
}

exportarReporteSantaLucia().catch(err => console.error("❌ Error al exportar:", err));
