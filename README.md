# SERVITEC Back Node

API backend para autenticación de usuarios con Node.js, Express y MongoDB.

## 1. Requisitos

- Node.js 18+
- MongoDB en ejecución
- Variables de entorno configuradas

### Variables de entorno
Crea un archivo `.env` en la raíz del proyecto con algo similar a:

```env
PORT=3000
JWT_SECRET=mi_clave_secreta_super_segura
MONGODB_URI=mongodb://localhost:27017
DB_NAME=servitec
```

## 2. Instalación

```bash
npm install
npm run dev
```

El servidor quedará disponible en:

```text
http://localhost:3000
```

## 3. Rutas disponibles

La API está montada bajo el prefijo:

```text
/api/auth
```

### 3.1 Registro de usuario

- Método: `POST`
- Ruta: `/api/auth/register`

#### Body esperado

```json
{
  "nombre": "Juan",
  "correo": "juan@example.com",
  "password": "123456",
  "rol": "cliente"
}
```

#### Respuesta exitosa (201)

```json
{
  "mensaje": "Usuario registrado con éxito",
  "usuario": {
    "nombre": "Juan",
    "correo": "juan@example.com",
    "rol": "cliente"
  }
}
```

#### Ejemplo con Axios

```js
import axios from 'axios';

await axios.post('http://localhost:3000/api/auth/register', {
  nombre: 'Juan',
  correo: 'juan@example.com',
  password: '123456',
  rol: 'cliente'
});
```

---

### 3.2 Login de usuario

- Método: `POST`
- Ruta: `/api/auth/login`

#### Body esperado

```json
{
  "correo": "juan@example.com",
  "password": "123456"
}
```

#### Respuesta exitosa (200)

```json
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "nombre": "Juan",
    "rol": "cliente"
  }
}
```

#### Ejemplo con Axios

```js
import axios from 'axios';

await axios.post('http://localhost:3000/api/auth/login', {
  correo: 'juan@example.com',
  password: '123456'
});
```

---

### 3.3 Obtener usuarios (solo administradores)

- Método: `GET`
- Ruta: `/api/auth/usuarios`

#### Requiere

- Header `Authorization: Bearer <token>`
- El usuario debe tener rol `admin`

#### Respuesta exitosa (200)

```json
{
  "usuarios": [
    {
      "_id": "123",
      "nombre": "Juan",
      "correo": "juan@example.com",
      "rol": "cliente",
      "activo": true,
      "fechaRegistro": "2026-06-14T00:00:00.000Z"
    }
  ]
}
```

#### Ejemplo con Axios

```js
import axios from 'axios';

const token = localStorage.getItem('token');

await axios.get('http://localhost:3000/api/auth/usuarios', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

## 4. Cómo usar JWT en el frontend

### 4.1 Guardar el token al iniciar sesión

Cuando el login sea exitoso, el backend devuelve un campo llamado `token`. En una app React con Vite, suele guardarse en `localStorage` para reutilizarlo en futuras peticiones.

```js
import axios from 'axios';

const login = async (correo, password) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      correo,
      password
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};
```


### 4.2 Enviar el token en rutas protegidas

El backend espera el token en el header:

```http
Authorization: Bearer <token>
```

En React con Vite, este header se suele agregar de forma centralizada en un cliente Axios:

```js
import axios from 'axios';

const token = localStorage.getItem('token');

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
```

Y luego:

```js
const response = await api.get('/api/auth/usuarios');
```

### 4.3 Qué contiene el token

El token JWT contiene datos básicos del usuario, como:

```json
{
  "id": "id_del_usuario",
  "rol": "cliente"
}
```

El backend lo valida en cada petición protegida y, si es válido, lo deja pasar.

### 4.4 Importante

- El token expira en 2 horas.
- Si expira, el backend responderá con un error como:

```json
{
  "error": "Token inválido o expirado"
}
```

- Si no envías el token, el backend responderá con:

```json
{
  "error": "Acceso denegado. No se proporcionó un token."
}
```

## 5. Estructura de respuestas JSON

### Respuesta de éxito en login

```json
{
  "mensaje": "Login exitoso",
  "token": "jwt",
  "usuario": {
    "nombre": "Juan",
    "rol": "cliente"
  }
}
```

### Respuesta de éxito en registro

```json
{
  "mensaje": "Usuario registrado con éxito",
  "usuario": {
    "nombre": "Juan",
    "correo": "juan@example.com",
    "rol": "cliente"
  }
}
```

### Respuesta de error

```json
{
  "error": "Mensaje descriptivo del error"
}
```

## 6. Notas para el frontend

- Nunca guardar la contraseña en el frontend después del login.
- Guardar únicamente el `token` en memoria o en `localStorage` si es necesario.
- Para rutas protegidas, siempre agregar el header `Authorization`.
- Si el usuario es admin, podrá consumir `/api/auth/usuarios`.

## 7. Endpoints actuales

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/usuarios` (protegido y solo admin)
