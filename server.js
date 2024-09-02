const express = require('express');
const upload = require('./multer');
const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
    response.send('Hello');
})

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (request, response) => {
    if(request.file) {
        response.status(200).json({message: 'Uploaded', filepath: `/uploads/${request.file.filename}`})
    } else {
        response.status(400).json({ message: 'failed'})
    }
})

app.get('/view/:filename', (request, response) => {
    const filename = request.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);
    response.sendFile(filepath);
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
