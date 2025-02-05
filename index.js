import http from 'http';
import fs from 'fs'
import { error } from 'console';
const PORT =4000;

const server = http.createServer((req,res)=>{
    if (req.url !== '/') {
        res.statusCode = 404;
        res.end('Not Found');
        return;
    }else{
        const readFile = fs.readFileSync('200MB_1080P_THETESTDATA.COM_mp4_new.mp4')
        // readFile.on('error',(error)=>{
        //     res.end(`errrrr ${error.message}`)
        // })
        res.writeHead(200,{"content-type":'video/mp4'})
            return res.end(readFile)

    }
})




server.listen(PORT,()=>{
    console.log('listing on port',PORT)
})