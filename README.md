# Lions Gym - Backend del Sistema de Gestión de Gimnasios

## Descripción General del Backend

Este repositorio contiene el código fuente del **backend** para el sistema de gestión integral "Lions Gym". El backend está desarrollado con **Java y Spring Boot** y es responsable de toda la lógica de negocio, procesamiento de datos y exposición de APIs para las interfaces de usuario (tanto el portal público como el panel de administración).

El sistema está diseñado para optimizar la gestión administrativa y operativa de gimnasios, automatizando tareas clave como el registro y autenticación de usuarios, manejo de membresías, procesamiento de pagos, reserva de clases y control de acceso mediante códigos QR.

## Lógica de Negocio y Funcionalidades del Backend

El backend implementa la lógica central para:

* **Gestión de Usuarios:**
    * Registro de nuevos usuarios con datos personales (nombre, apellido, email, teléfono, fecha de nacimiento, género) y encriptación de contraseñas (utilizando BCrypt).
    * Autenticación y autorización de usuarios, gestionada por Spring Security.
    * Exposición de endpoints para operaciones de usuario bajo `/api/usuarios` (ej. `/registrar`).
* **Gestión de Membresías:** Administración del ciclo de vida de las membresías de los clientes (registro, renovación, cancelación).
* **Sistema de Pagos:** Lógica para procesar pagos en línea (integraciones con PSE, Nequi, tarjetas).
* **Control de Acceso:** Generación y validación de códigos QR o tarjetas digitales para el ingreso al gimnasio.
* **Reservas de Clases:** Gestión de reservas en tiempo real con control de cupos.
* **Administración Centralizada:** Endpoints para que el panel de administración gestione horarios, promociones, usuarios, etc.
* **Reportes y Analíticas:** Lógica para generar reportes sobre ingresos, asistencia y rendimiento general del gimnasio.
* **Notificaciones:** Funcionalidad para enviar notificaciones automáticas a los usuarios.

## Tecnologías del Backend

* **Lenguaje y Framework Principal:**
    * Java (Versión 24)
    * Spring Boot (Versión 3.4.5)
* **Módulos Clave de Spring Boot:**
    * **Spring Data JPA:** Para la persistencia de datos y la interacción con la base de datos PostgreSQL. Define entidades como `Usuario` y repositorios como `UsuarioRepository`.
    * **Spring Web (MVC):** Para la creación de APIs RESTful, como `UsuarioController`.
    * **Spring Security:** Para la autenticación, autorización y protección de los endpoints. Incluye el uso de `BCryptPasswordEncoder` para contraseñas y configuración para OAuth2 Client.
    * **Spring Boot DevTools:** Para facilitar el desarrollo.
* **Base de Datos:**
    * PostgreSQL. La configuración se encuentra en `application.properties`, incluyendo el driver, URL, usuario y contraseña.
* **Construcción y Dependencias:**
    * Apache Maven.
* **Utilidades:**
    * Lombok: Para reducir código boilerplate en modelos y otras clases.

## Prerrequisitos del Backend

* JDK 24 o superior.
* Apache Maven.
* PostgreSQL.

## Configuración del Backend

### 1. Base de Datos
1.  Asegúrate de tener PostgreSQL instalado y corriendo.
2.  Crea una base de datos llamada `gimnasio`.
3.  Actualiza las credenciales de la base de datos en el archivo `Backend/src/main/resources/application.properties` si es necesario:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/gimnasio
    spring.datasource.username=postgres # Tu usuario de PostgreSQL
    spring.datasource.password=postgres # Tu contraseña de PostgreSQL
    spring.jpa.hibernate.ddl-auto=update # Creará/actualizará las tablas automáticamente
    spring.jpa.show-sql=true # Opcional: para ver las consultas SQL en consola
    ```

### 2. Compilación del Backend
1.  Clona el repositorio (si aplica).
2.  Navega al directorio raíz del backend (`Backend/`).
3.  Compila el proyecto usando Maven:
    ```bash
    mvn clean install
    ```

## Ejecución del Backend

Una vez compilado, puedes ejecutar la aplicación Spring Boot desde el directorio `Backend/`:
```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
 ```

El backend se iniciará en el puerto 8081 (configurable en application.properties).
El UsuarioController habilita CORS para todos los orígenes (@CrossOrigin(origins = "*")), permitiendo que el frontend consuma sus servicios.

## Frontend (Consumidor de la API)
El proyecto incluye un frontend (HTML, CSS, JavaScript, Bootstrap) que consume las APIs expuestas por este backend. Se encuentra en la carpeta Frontend/ y se divide en una sección pública (Frontend/public/) y un panel de administración (Frontend/admin/). 
Para su funcionamiento, requiere que el backend esté en ejecución y accesible.

## Estructura del Proyecto (Enfoque Backend)
 ```
lionsgym/
├── Backend/                 # === FOCO PRINCIPAL DE ESTE README ===
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/lionsgym/webApp/  # Código fuente Java
│   │   │   │   ├── controller/          # Controladores REST (API Endpoints)
│   │   │   │   │   └── UsuarioController.java
│   │   │   │   ├── model/               # Entidades JPA (Modelo de Datos)
│   │   │   │   │   └── Usuario.java
│   │   │   │   ├── repository/          # Repositorios Spring Data JPA
│   │   │   │   │   └── UsuarioRepository.java
│   │   │   │   ├── service/             # Lógica de negocio
│   │   │   │   │   └── UsuarioService.java
│   │   │   │   └── WebAppApplication.java # Clase principal de Spring Boot
│   │   │   └── resources/
│   │   │       └── application.properties # Configuración (puerto, BD, JPA)
│   │   └── test/                          # Pruebas
│   ├── pom.xml                          # Configuración de Maven (dependencias, build)
│   └── HELP.md                          # Documentación de Spring Boot
├── Documentacion/           # Documentos PDF del proyecto (contexto y requisitos)
├── Frontend/                # Interfaces de usuario (consumen el Backend)
│   └── ...
└── package.json             # Posibles dependencias para herramientas de desarrollo
 ```

## Autores
El proyecto está siendo desarrollado por estudiantes de la Universidad de Pamplona, Facultad de Ingenierías y Arquitectura, Programa Ingeniería de Sistemas, para la asignatura Desarrollo Orientado a Plataformas (2025):

* ACEVEDO GOMEZ BRIAN DAVID
* AMADO RAMIREZ BRAYAN DAVID
* CARRILLO REYES JULIO SEBASTIAN
* VERGARA GARCIA GERON JOSE
## Docente:
* FANNY CASADIEGO CHIQUILLO
