const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { time } = require("console");
const registro = require("./resgistro");
//importar mi función de php a js
const { exec } = require("child_process");
const respuestas = require("./respuestas");


// Función para esperar un tiempo específico en milisegundos
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Crear una nueva instancia del cliente
const client = new Client({
    authStrategy: new LocalAuth(),
});





// Escanear el código QR para iniciar sesión
client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("Escanea el QR con WhatsApp");
});

// Confirmar la conexión
client.on("ready", () => {
    console.log("Bot conectado a WhatsApp");
});

// Manejar mensajes entrantes
client.on("message", async (message) => {
    try {
        const msg = message.body.toLowerCase().trim(); // Normaliza el mensaje

        // if (msg === "!soporte") {
        //     await sleep(10000);
        //     await client.sendMessage(message.from, "pong");
        // }

        if (message.from.endsWith("@g.us")) {  // Verifica si el mensaje es de un grupo
            const chat = await message.getChat();
            const namegrup = chat.name;
            console.log(`El ID del grupo es: ${message.from} nombre: ${namegrup}`);
        }

        const grupoSantaLucia = "120363221225506190@g.us";

        const gruposPermitidos = [
            //Grupos Prueba
            "120363401679105371@g.us",
            "120363401715159930@g.us",
            //Grupos Contingencia h2h
            "120363407267892911@g.us",
            "120363402088964245@g.us",
            //Grupo Micro
            "120363046267515244@g.us",
            //Grupos Soporte Operaciones
            "120363404450949551@g.us",
            "120363404799964027@g.us",
            //Grupos Impulsa
            "120363402110203547@g.us",
            "120363377445352300@g.us",
            "120363394642056940@g.us",
            "120363375410855200@g.us",
            "120363377733925660@g.us",
            "120363379787897987@g.us",
            "120363379256456104@g.us",
            "120363396086003244@g.us",
            "120363420288762126@g.us",
            "120363392548018180@g.us",
            "120363395965136485@g.us",
            "120363379404641474@g.us",
            "120363398660074170@g.us",
            "120363397411205057@g.us",
            "120363396904418634@g.us",
            "120363394127459979@g.us",
            "120363376384420090@g.us",
            "120363376065892829@g.us",
            "120363394676214984@g.us",
            "120363395961329913@g.us",
            "120363396308272357@g.us",
            "120363376495139180@g.us",
            "120363374155820325@g.us",
            //Grupos Tigre
            "120363386174917036@g.us",
            "120363404070830640@g.us",
            "120363403661172889@g.us",
            "120363403664576406@g.us",
            "120363403386865974@g.us",
            "120363416686074669@g.us",
            "120363385992777786@g.us",
            "120363388454176056@g.us",
            "120363399690263522@g.us",
            "120363385603886591@g.us",
            //Grupo Impulsa Pyme
            "120363361761824511@g.us",
            //Grupo Santa Lucía
            "120363221225506190@g.us",
        ];
        


        


        const chatID = message.from;


        if (chatID.endsWith("@g.us") && gruposPermitidos.includes(chatID)) {
            console.log('Author:', message.author);
        
            if (chatID === grupoSantaLucia) {
                const numeroUsuario = message.author.split("@")[0];
                const chat = await message.getChat();
                const nombreGrupo = chat.name;
                const mensaje = await message.body;
        
                console.log('Mensaje de Santa Lucia, usuario capturado correctamente');
        
                await registro.registraReporte(nombreGrupo, numeroUsuario, mensaje);
            } else {
                if (msg.startsWith("atendido, ") && chatID.endsWith("@g.us")) {
                    const chat = await message.getChat();
                    const nombreGrupo = chat.name;
                    const solicitud = msg.replace("atendido,", "").trim();
                    const comando = solicitud;
        
                    console.log(`📌 Comando detectado en el grupo: ${nombreGrupo}`);
        
                    await registro.registrarAtencion(nombreGrupo, comando);
                } else {
                    const numeroUsuario = message.author.split("@")[0];
                    const chat = await message.getChat();
                    const nombreGrupo = chat.name;
                    const mensaje = await message.body;
        
                    console.log(`📌 Comando detectado en el grupo: ${nombreGrupo}`);
        
                    // En lugar de guardar directamente, agregamos al buffer
                    registro.pushAtencion2(nombreGrupo, numeroUsuario, mensaje);
                }
            }
        }



    } catch (error) {
        console.error("Error al procesar el mensaje:", error);
    }
});



// Manejar desconexión
client.on("disconnected", (reason) => {
    console.log("El bot se ha desconectado:", reason);
});

// Iniciar el cliente
client.initialize();
