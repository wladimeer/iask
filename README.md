# IAsk

IAsk es una aplicación para administrar tareas. Permite agregar nuevas tareas, y mediante la integración con Llama 3, genera automáticamente la categoría y los pasos a seguir de cada tarea a partir de su descripción.

## Pasos para levantar la aplicación

1. Crear un archivo `.env` en la raíz del proyecto con la siguiente información:

```
POSTGRES_DB=tasksdb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
```

2. Construir los contenedores de Docker:

```
docker compose build
```

3. Crear las migraciones del backend:

```
docker compose run backend python manage.py makemigrations
```

4. Aplicar las migraciones:

```
docker compose run backend python manage.py migrate
```

5. Levantar la aplicación completa:

```
docker compose up
```

## Tecnologías utilizadas

**Backend:**

- Django 5.2.8
- Django REST Framework 3.16.1
- django-cors-headers 4.4.0
- psycopg2-binary 2.9.9
- LangChain 1.0.7
- LangChain Community 0.4.1
- LangChain Ollama 1.0.0

**Frontend:**

- React 19.2.0
- TypeScript 5.9.3
- TailwindCSS 4.1.17
- Material UI 7.3.5
- Formik 2.4.9
- Yup 1.7.1
- Axios 1.13.2
- Vite 7.2.4

**Docker:**

- Docker Compose para orquestar backend, frontend y base de datos PostgreSQL
