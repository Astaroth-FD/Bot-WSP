const { timeout } = require("puppeteer");
const puppeteer = require("puppeteer");

puppeteer.launch({ headless: false }).then(async (browser) => {
    const page = await browser.newPage(
        {
            //agregar tiemo de espera
            timeout: 10000
        }
    );
    await page.goto("http://192.168.10.3:8501/");

    // Esperar y seleccionar el campo de usuario
    await page.waitForSelector("input[type='text']");
    await page.type("input[type='text']", "matarama");

    // Esperar y seleccionar el campo de contraseña
    await page.waitForSelector("input[type='password']");
    await page.type("input[type='password']", "T3S5T#e3.");

    // Hacer clic en el botón "Iniciar Sesión"
    const botonSelector = "#root > div:nth-child(1) > div.withScreencast > div > div > section > div.stMainBlockContainer.block-container.st-emotion-cache-13ln4jf.ea3mdgi5 > div > div > div > div:nth-child(4) > div > button";
    await page.waitForSelector(botonSelector);
    await page.click(botonSelector);
    console.log("✅ Inicio de sesión completado.");

    // Espera unos segundos antes de cerrar (opcional)
    //await page.waitForTimeout(10000);
    ///await browser.close();
});
