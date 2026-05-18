FROM python:3.11-slim

# Creamos la carpeta de trabajo donde se va a ejecutar todo
WORKDIR /app

# Este comando copia los requerimientos y ejecuta todo
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Este comando copia el resto del código
COPY . .

EXPOSE 8000

# Este es el Comando que ejecuta el servidor en Docker
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

