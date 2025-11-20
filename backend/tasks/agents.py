from langchain_ollama import OllamaLLM
import json
import re

model = OllamaLLM(model="llama3")


def classify_task(description):
    prompt = f"""
        Clasifica la siguiente tarea en una sola categoría.
        Categorías disponibles: Personal, Trabajo, Urgente, Salud, Finanzas, Hogar, Estudio, Ocio, Administrativo.

        Responde únicamente con el nombre de la categoría, con la primera letra en mayúscula y sin explicaciones adicionales.
        No incluyas puntos, saltos de línea adicionales, ni texto fuera de la categoría.

        Tarea: {description}
    """

    result = model.invoke(prompt).strip()
    result = result.split()[0]

    return result


def generate_subtasks(description):
    prompt = f"""
        Genera una lista de subtareas en formato JSON para la siguiente tarea.
        La respuesta debe ser EXCLUSIVAMENTE un arreglo JSON con subtareas como strings.
        Cada subtarea debe ser una acción concreta y breve en español.
        No agregues nada fuera del JSON.

        Tarea: {description}
    """

    result = model.invoke(prompt).strip()

    try:
        return json.loads(result)
    except:
        pass

    try:
        match = re.search(r"\[.*\]", result, re.DOTALL)

        if match:
            cleaned = match.group(0)
            return json.loads(cleaned)
    except:
        pass

    return []
