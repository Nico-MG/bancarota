# Proyecto BancaRota

## Configuracion del proyecto

### **Entorno**

-   Tener instalado node.js https://nodejs.org/en
-   Tener instalado Git https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
-   Tener instalado REST Client en VSCode

### **Instalaciones**

```
git clone https://github.com/Nico-MG/bancarota
cd bancarota
npm install
```

**_Recuerden repetir el 'npm install' si hay cambios en el archivo package.json_**

### **Base de datos**

En el archivo .env (crearlo si no existe) agregar o modificar los datos del servidor PostgreSQL:

```js
PG_NAME = "usuario";
PG_KEY = "contraseña";
```

El archivo .env necesita un par de cosas adicionales, revisar trello para ver el contenido completo

Asegurarse que la información sobre la base de datos en el archivo **database.js** es correcta (host, port, database):

```js
host: "localhost";
port: "5432";
database: "nombre de la db";
```

Crear en la base de datos las tablas e inserts que están en el archivo **bancadb.sql**

**_Si hay cambios en el archivo bancadb.sql deben rehacer las tablas e inserts de la base de datos_**

### **Entorno de trabajo**

Para iniciar el entorno de trabajo ejecutar lo siguiente en la terminal:

```
npm run dev
```

Listo!
