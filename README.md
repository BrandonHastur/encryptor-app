# Encryptor App - Guía de Instalación y Configuración

Este proyecto contiene dos servicios que debes levantar por separado:
- **Backend de cifrado/descifrado** (Node.js)
- **Frontend Angular** (interfaz que consume el backend)

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalados en tu sistema:

- **Node.js** (v14+ recomendado) y **npm** (v6+)
- **Angular CLI** (para compilar y levantar el frontend)

Si aún no tienes Angular CLI, instálala globalmente:

```bash
npm install -g @angular/cli
```

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/BrandonHastur/encryptor-app.git
cd encryptor-app
```

### 2. Instalar dependencias

#### 2.1. Backend (Node.js)
Instala las dependencias del backend ejecutando en la raíz del proyecto:

```bash
npm install
```

Esto instalará paquetes como `express`, `cors`, `body-parser`, etc.

#### 2.2. Frontend (Angular)
Las dependencias de Angular se instalan con el mismo comando anterior. Si necesitas reinstalar específicamente las dependencias de Angular, ejecuta nuevamente:

```bash
npm install
```

Verifica que existe la carpeta `node_modules/@angular/` para confirmar que Angular está correctamente instalado.

## 🔧 Configuración y Ejecución

### 3. Levantar el Backend

En la carpeta raíz del proyecto, ejecuta:

```bash
node index.js
```

El servidor se levantará en `http://localhost:3000` y verás mensajes como:

```
🔒 encryption-service escuchando en http://localhost:3000
🔑 Llave pública guardada en /keys/public_key.pem
🔑 Llave privada guardada en /keys/private_key.pem
```

#### Verificar el Backend

Puedes probar los endpoints con Postman o tu navegador:

**Cifrar mensaje:**
```http
POST http://localhost:3000/api/encrypt
Content-Type: application/json

{
  "text": "Hola Mundo"
}
```

**Respuesta esperada:**
```json
{
  "encrypted": "rZ9U3H04a…=="
}
```

**Descifrar mensaje:**
```http
POST http://localhost:3000/api/decrypt
Content-Type: application/json

{
  "encrypted": "rZ9U3H04a…=="
}
```

**Respuesta esperada:**
```json
{
  "decrypted": "Hola Mundo"
}
```

### 4. Levantar el Frontend

**Importante:** Mantén el backend corriendo y abre una nueva terminal.

En la carpeta raíz del proyecto, ejecuta:

```bash
ng serve --open
```

Esto:
- Compilará el proyecto Angular
- Levantará un servidor de desarrollo en `http://localhost:4200`
- Abrirá automáticamente tu navegador (opción `--open`)

## 🎯 Uso de la Aplicación

Con ambos servicios ejecutándose:

1. **Accede a la interfaz:** `http://localhost:4200`
2. **Escribe tu mensaje** en el campo de texto (o utiliza el micrófono para dictado por voz)
3. **Cifrar:** Haz clic en "Cifrar" → verás el resultado en Base64
4. **Descifrar:** Haz clic en "Descifrar" → la app mostrará el texto original

## 📝 Resumen de Comandos

```bash
# 1. Clonar el repositorio
git clone https://github.com/BrandonHastur/encryptor-app.git
cd encryptor-app

# 2. Instalar dependencias
npm install

# 3. Levantar el backend (mantener esta terminal abierta)
node index.js

# 4. En otra terminal: Levantar el frontend
ng serve --open
```

## 🌐 URLs de los Servicios

- **Backend:** `http://localhost:3000`
- **Frontend:** `http://localhost:4200`

## 🔧 Estructura del Proyecto

```
encryptor-app/
├── index.js                    # Servidor backend
├── package.json               # Dependencias del proyecto
├── encryption.service.ts      # Servicio Angular
├── angular.json              # Configuración Angular
├── src/                      # Código fuente Angular
├── keys/                     # Llaves de cifrado (generadas automáticamente)
└── node_modules/            # Dependencias instaladas
```

## ❗ Solución de Problemas

- **Error con `ng serve`:** Verifica que estés en la carpeta correcta y que exista el archivo `angular.json`
- **Backend no responde:** Asegúrate de que el puerto 3000 no esté ocupado por otro proceso
- **Frontend no conecta:** Verifica que el backend esté corriendo en `http://localhost:3000`
