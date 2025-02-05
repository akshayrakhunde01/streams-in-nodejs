import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 4000;
const VIDEO_PATH = path.join('200MB_1080P_THETESTDATA.COM_mp4_new.mp4'); 

const server = http.createServer((req, res) => {
    if (req.url !== '/') {
        res.statusCode = 404;
        res.end('Not Found');
        return;
    } else {
        // Check if the range header is provided (for streaming)
        const stat = fs.statSync(VIDEO_PATH);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            // Parse the range header (e.g., "bytes=0-1023")
            const [start, end] = range.replace(/bytes=/, '').split('-').map(Number);

            const chunkStart = start;
            const chunkEnd = end ? end : Math.min(chunkStart + 1024 * 1024, fileSize - 1); // Default chunk size is 1MB
            const chunkSize = chunkEnd - chunkStart + 1;

            res.writeHead(206, {
                'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            });

            const videoStream = fs.createReadStream(VIDEO_PATH, { start: chunkStart, end: chunkEnd });
            videoStream.pipe(res);  // Stream the data to the client
        } else {
            // If no range header, send the entire file
            res.writeHead(200, {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            });

            const videoStream = fs.createReadStream(VIDEO_PATH);
            videoStream.pipe(res);  // Stream the entire video file
        }
    }
});

server.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
