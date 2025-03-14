# 💬 ServicioChatGAM  

**ServicioChatGAM** es el servicio de chat en tiempo real para la aplicación **GameAndMatch**, permitiendo la comunicación entre los usuarios a través de WebSockets con **Socket.IO** y **Express**.  

## 🚀 Características  

- 🔥 Comunicación en tiempo real mediante **WebSockets**.  
- 📡 API REST para gestionar los grupos de chat.  
- ⚡ Uso de **Socket.IO** para conexiones eficientes y rápidas.  

## ⚙️ Instalación y ejecución  

### 1️⃣ Requisitos previos  
Asegúrate de tener instalado:  
- [Node.js](https://nodejs.org/)  

### 2️⃣ Clonar el repositorio  
```bash
git clone https://github.com/CamarillaGuanxi/ServicioChatGAM.git
cd ServicioChatGAM
```
### 3️⃣ Instalar dependencias
```bash
npm install
```
### 4️⃣ Iniciar el servicio
```bash
npm start
```
### 🌐 API REST
Endpoints
`GET /api` → Devuelve la lista de grupos de chat.
`GET /ping` → Devuelve "Pong" para verificar que el servidor está activo.
## 🔄 Eventos de WebSockets  

### Cliente → Servidor  
- `getAllGroups` → Solicita la lista de grupos de chat.  
- `createNewGroup` → Crea un nuevo grupo de chat.  
- `findGroup` → Busca un grupo de chat por su ID.  
- `newChatMessage` → Envía un nuevo mensaje a un grupo de chat.  

### Servidor → Cliente  
- `groupList` → Lista actualizada de grupos de chat.  
- `groupChatMessage` → Recibe un mensaje nuevo en un grupo.  

🔗 **Repositorio:** [ServicioChatGAM](https://github.com/CamarillaGuanxi/ServicioChatGAM)

