const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).send('Заповніть усі поля!');
    }

    // Збереження даних у файлі
    const data = `Ім'я: ${name}, Телефон: ${phone}\n`;
    fs.appendFileSync('submissions.txt', data);

    res.send('Дякуємо за заявку!');
});

app.listen(PORT, () => {
    console.log(`Сервер працює на порті ${PORT}`);
});
