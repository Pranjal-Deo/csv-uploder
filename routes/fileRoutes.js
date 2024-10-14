const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('csvfile'), (req, res) => {
    if (!req.file || path.extname(req.file.originalname) !== '.csv') {
        return res.status(400).send('Please upload a valid CSV file.');
    }
    res.redirect('/files');
});

router.get('/', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan files.');
        }
        res.render('files', { files });
    });
});

router.get('/:filename', (req, res) => {
    const filepath = path.join(__dirname, '..', 'uploads', req.params.filename);
    const results = [];
    fs.createReadStream(filepath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.render('file', { data: results, headers: Object.keys(results[0]) });
        });
});

module.exports = router;
