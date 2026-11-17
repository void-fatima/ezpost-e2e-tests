const net=require('node:net'),fs=require('node:fs');
const sock=net.connect(6000,'127.0.0.1');let buf=Buffer.alloc(0),n=0;
sock.on('data',d=>{buf=Buffer.concat([buf,d]);while(true){const sep=buf.indexOf(':');if(sep<0)break;const len=Number(buf.subarray(0,sep).toString());if(buf.length<sep+1+len)break;const msg=JSON.parse(buf.subarray(sep+1,sep+1+len));buf=buf.subarray(sep+1+len);console.log(JSON.stringify(msg));if(n++===0)send({to:'root',type:'listTabs'});else if(msg.tabs){fs.writeFileSync(__dirname+'/firefox/rdp-tabs.json',JSON.stringify(msg,null,2));sock.end();}}});
function send(o){const s=JSON.stringify(o);sock.write(Buffer.byteLength(s)+':'+s)}
sock.on('error',console.error);
setTimeout(()=>process.exit(0),8000);
