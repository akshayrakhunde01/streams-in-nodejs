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
        const readFile = fs.createReadStream('100mb-examplefile-com.txt')
        readFile.on('error',(error)=>{
            res.end(`errrrr ${error.message}`)
        })
      
            readFile.pipe(res)

    }
})




server.listen(PORT,()=>{
    console.log('listing on port',PORT)
})