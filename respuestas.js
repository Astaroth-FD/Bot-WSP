

function obtenerRespuesta(comando){

        if (comando == "como acceder a otro usuario?"){

            return "Buen día, para ingresar con el usuario de un compañero o desde otro equipo corporativo, su administrador debe solicitarlo por medio de un ticket con la conformidad del gerente de producto o el jefe regional.\nSi ya se realizo este proceso enviar numero de ticket, para verificar la confirmacion";
        }
        
        if (comando == "se puede corregir dni?"){
            return "El DNI debe ingresarse correctamente al agregar a la socia, ya que con él se vincula toda su información (SENTINEL, RIESGOS, PEP, LISTA NEGRA, etc.).Si se ingresó mal, sigue estos pasos:👇 \n1️⃣ Elimina la socia del grupo.\n2️⃣ Agrégala nuevamente con el DNI correcto.\n3️⃣ Realiza la evaluación correspondiente.\n✅ Es importante asegurarse de que el DNI sea el correcto desde el inicio para evitar inconvenientes. \n¡Avísame si necesitas ayuda! 😊";
        }
        if (comando == "que perfil puede tomar foto de excepcion socia pep?"){
            return "Buen día, el perfil que puede tomar foto de excepción de una socia PEP es el de *ASESOR*.\n";
        }
        if (comando == "socia pep"){
            return "Buen día, si una socia aparece en la lista PEP, debes seguir estos pasos:👇 \n1️⃣ Realiza la evaluación correspondiente.\n 2)Resvisa si socia tiene creditos vigentes en impulsa o tigre \n ";
        }   
        if(comando=="si tiene creditos"){
            return "Dirigete a la db de impulsa y realiza los siguientes pasos: \n 1) ingresa a SCHEMAS \n 2) selecciona DBO \n 3) selecciona PROCEDURES \n 4)Selecciona o busca PA_VALIDAR_SOLICITUD_DETALLE_PARA_FIRMA \n 5) Doble clic en el PA \n 6) Selecciona en SOURCE para ver el PA \n 7)Buscar la linea que dice no se permiten socias pep\n 8)Luego 2 lineas arriba agregas el DNI de la socia \n 9) cierras el PA";    
        } 

        if (comando == "cuando un socio puede ser renovado?"){
            return "Pueder ser renovado cuando ah tenido aportaciones en cualquier producto de credito";
        }
        if (comando =="¿cómo cambiar socio de nuevo a renovado?") {
            return `Para cambiar a un socio de "nuevo" a "renovado", sigue estos pasos:👇 
                1️⃣ Ingresa a la base de datos de Impulsa.
                2️⃣ Busca la tabla *solicitud_detalle*.
                3️⃣ Encuentra al socio que deseas cambiar.
                4️⃣ En la columna *Renovación*, cambia el valor a 1.
                5️⃣ Luego, actualiza sus fotos como "socio renovado" con el siguiente script:

                \`\`\`sql
                SELECT TF.tipoFoto, PF.idPlantillaFoto, PF.codTipoFoto, PF.socioNuevo, PF.ciclo, PF.modulo
                FROM PlantillaFoto PF
                INNER JOIN TipoFoto TF ON PF.codTipoFoto = TF.codTipoFoto
                WHERE ciclo = 5 AND modulo <> 'TIGRE';
                \`\`\`
                    `;
        }

        if (comando == "configuracion para archivos excel?"){
            return "configuración para documentos excel en separación de datos, se ingresa a panel de control - cambiar formatos de fecha, hora o numero - configuración adicional y se cambia:\nsimbolo decimal: .\nsimbolo de separación de miles: ,\nseparador de listas: ,";
        }
        if (comando == "en que codsiutacion se marca flexibilidad?"){
            return "La fllag de flexibilidad se marca en la codsiutacion de observados, por asesor";
        }

        if (comando == "una consulta"){
            return "Las consultas disponibles son: \n1️⃣se puede corregir dni? \n2️⃣ como acceder a otro usuario?\n que perfil puede tomar foto de excepcion socia pep?";
        }

        if (comando == "ingresar en dispositivo personal por robo"){
            return "Buen dia, Se debe enviar un correo a jefe regional solicitando el permiso para ingresar a un dispositivo personal por robo.";
        }
        return "No entiendo el comando";
    }


module.exports = { obtenerRespuesta };