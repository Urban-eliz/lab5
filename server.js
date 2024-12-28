const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const REVIEWS_FILE = path.join(__dirname, 'reviews.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Отдает файлы из папки lab5

// API для получения всех отзывов
app.get('/reviews', (req, res) => {
    fs.readFile(REVIEWS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла:', err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// API для добавления нового отзыва
app.post('/reviews', (req, res) => {
    const { name, email, review } = req.body;
    if (!name || !review) {
        return res.status(400).json({ error: 'Имя и отзыв обязательны.' });
    }

    fs.readFile(REVIEWS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла:', err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }

        const reviews = JSON.parse(data || '[]');
        const newReview = { name, email, review };
        reviews.push(newReview);

        fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2), (err) => {
            if (err) {
                console.error('Ошибка записи файла:', err);
                return res.status(500).json({ error: 'Ошибка сервера' });
            }
            res.status(201).json(newReview);
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
