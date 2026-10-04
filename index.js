const express = require('express')
const app = express()
app.get('/', (req,res)=> res.send('Nimetsu Bot ON - by Victor'))
app.listen(process.env.PORT || 3000, ()=> console.log('Web ON'))

const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers, makeCacheableSignalKeyStore, delay } = require('@whiskeysockets/baileys')
const P = require('pino')

async function start(){
const { state, saveCreds } = await useMultiFileAuthState('./session')
const { version } = await fetchLatestBaileysVersion()
const sock = makeWASocket({
version,
auth:{creds:state.creds,keys:makeCacheableSignalKeyStore(state.keys,P({level:'silent'}))},
browser:Browsers.macOS('Safari'),
logger:P({level:'silent'})
})
sock.ev.on('creds.update',saveCreds)

if(!state.creds.registered){
await delay(3000)
const code = await sock.requestPairingCode("18295370602")
console.log('============================')
console.log('TU CODIGO ES: '+code)
console.log('============================')
}

sock.ev.on('connection.update',a=>{
const { connection } = a
if(connection==='open') console.log('✅ BOT CONECTADO EXITOSAMENTE')
})
}

start()
