import sys
import json
from apis_net_pe import ApisNetPe  # ✅ Importación corregida

# Token de la API
APIS_TOKEN = "apis-token-12693.sjLj3f3GLyB6QfsGE6WfZQLTv7tP2Cpg"
api_consultas = ApisNetPe(APIS_TOKEN)

def buscar_dni(dni: str) -> dict:
    """Busca información de una persona por su DNI usando la API de Reniec."""
    try:
        persona = api_consultas.get_person(dni)
        return persona if persona else {"error": "No se encontró información"}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        dni = sys.argv[1]  # Captura el DNI pasado como argumento desde Node.js
        resultado = buscar_dni(dni)
    else:
        resultado = {"error": "DNI no proporcionado"}

    print(json.dumps(resultado))  # Devuelve JSON para que Node.js lo pueda leer
