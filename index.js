import http from 'http';

const PORT =4000;

const server = http.createServer((req,res)=>{
    console.log('hello')
})




server.listen(PORT,()=>{
    console.log('listing on port',PORT)
})