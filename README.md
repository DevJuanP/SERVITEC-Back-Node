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

const registrarUsuario = async (nom, corr, pass) => {
    const result = await axios.post('http://localhost:3000/api/auth/register', {
    nombre: nom,
    correo: corr,
    password: pass,
    rol: 'cliente'
    });

    return result.data
}

const handleRegisterclick = async () => {
    try{
        const responseApi = await registrarUsuario(nom, corr, pass)
        if(responseApi.mensaje == 'Usuario registrado con éxito'){
            navigate('/login')
        }
    }catch(e){
        console.log({
            error: e.message
        })
    }
}

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

const loginUsuario = async (corr, pass) => {
    const result = await axios.post('http://localhost:3000/api/auth/login', {
        correo: corr,
        password: pass
    });

    return result.data
}

const handleLoginClick = async () => {
    try{
        const responseApi = await loginUsuario('juan@example.com', '123456')
        if(responseApi.token){
            localStorage.setItem('token', responseApi.token)
        }
    }catch(e){
        console.log({
            error: e.message
        })
    }
}
```

El backend devolverá un objeto como este:

```js
{
  mensaje: 'Login exitoso',
  token: '...',
  usuario: {
    nombre: 'Juan',
    rol: 'cliente'
  }
}
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

const obtenerUsuarios = async (token) => {
    const result = await axios.get('http://localhost:3000/api/auth/usuarios', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return result.data
}

const handleGetUsersClick = async () => {
    try{
        const token = localStorage.getItem('token')
        const responseApi = await obtenerUsuarios(token)
        console.log(responseApi.usuarios)
    }catch(e){
        console.log({
            error: e.message
        })
    }
}
```


## 4. Cómo usar JWT en el frontend con React + Vite

### 4.1 Instalar Axios en el proyecto frontend

Si tu frontend está en Vite, instala Axios con:

```bash
npm install axios
```

### 4.2 Guardar el token al iniciar sesión

Cuando el login sea exitoso, el backend devuelve un campo llamado `token`.

```js
import axios from 'axios';

export const login = async (correo, password) => {
  const result = await axios.post('http://localhost:3000/api/auth/login', {
    correo,
    password
  });

  if (result.data.token) {
    localStorage.setItem('token', result.data.token);
  }

  return result.data;
};

export const handleLoginClick = async () => {
  try {
    const responseApi = await login('juan@example.com', '123456');
    console.log(responseApi);
  } catch (e) {
    console.log({ error: e.message });
  }
};
```

### 4.3 Enviar el token en rutas protegidas

El backend espera el token en el header:

```http
Authorization: Bearer <token>
```

Ejemplo en React + Vite:

```js
import axios from 'axios';

export const obtenerUsuarios = async (token) => {
  const result = await axios.get('http://localhost:3000/api/auth/usuarios', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return result.data;
};

export const handleGetUsersClick = async () => {
  try {
    const token = localStorage.getItem('token');
    const responseApi = await obtenerUsuarios(token);
    console.log(responseApi.usuarios);
  } catch (e) {
    console.log({ error: e.message });
  }
};
```

### 4.4 Configuración recomendada para Axios

En Vite, puedes crear un archivo como `src/api/axios.js` con una configuración base:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

Y luego usarlo así:

```js
import api from './api/axios';

export const obtenerUsuarios = async () => {
  return await api.get('/auth/usuarios');
};
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
