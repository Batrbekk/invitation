import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Конфигурация Google Sheets
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: "batrbekk@gen-lang-client-0790452627.iam.gserviceaccount.com",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnaSL+gyR/zmNC\nSMuc77hhE7AtpEkXQ0D3Z2JKkElzSSoZCqLxNLqrLIyW97sv37RlG4YRBkNTGSmR\nRQoeeRbiHX+zBN7zvZEQqGG0UlRFUV5d5XO5O2Cvg/xKvF8FD+8RqDaFgfUgM0pc\nii2EESd3vk4mfHIFiDjogjRAUTcYiWh67JpEpSnsnP/xdTQ9YZjEKl+qbIFdqulh\nwwgGLyEhBESd+Czq9sJAcZMwNYlIOzDvZnBxEwv9ayyr/cZhRFe65U6E4HvUSHN2\nh3WFPe32PP88fe+baJlTlQcbmsJ308bT/gvBdB+kYu52Y4/QsN8iSRScxfqLiiC8\nrDXjROaHAgMBAAECggEAB3W3jyXNiOXBJeFT3rtj45eFVeiohSEvEkHeGbp85hE6\n5Ktvqqs8gjIrAEiBDoIRFMxO2Lqxt1CQufNx9FJVrbUTd/5d56M+hUKA5WXMcYZN\nsTDEoQVp/92JbtR0BigOnCJ7GM87WrhOYPnwoJ5EZvaTnu1pW0vAVW6v4LR9wwRn\nWsvxw3E9Kqn7hBtovVeJBEAw1WUx6YAmDdf2qb2JfiBfKheKL4+rNcuJhEUqI+vP\nxOX7kSLm82PgWZKEz5uZ1fWIyjjM11GYhX+v+NQL/hkdN+0kQW1nvXoJiBBAI8a8\nPUbK/UXDEZx/BEofH0Y37GR2JNpt7gsXOmbLHyt0CQKBgQDSBBrq5+9FqDmvhOHx\n1UQN4saQ/LlYENMOPCQRVBNAkgdxiB309e5fW/OkVyyfi4ziMQkDHzVdTngP4ztI\n1Ql6TuqqIhB0oGzeqJEN4cSt6Yd9+3/+6HHHy/qW0sJE/5QF06/AE4Z3CArhZ30s\ntdvx7c+6huXC/G14/KuduSXZwwKBgQDMEOa7qMViL7dOmsd9XbfS9OuO1sf/bL8d\nva6ywUk08oYxg6jPzohzPpnAskmKtGptL/7jLzpVJ9mCSSpsS/Aq+2s4nP9Fottk\nBwL8nhDy9BiXwAK+4wg/lYgd38nGQWJR/egtG++OqNR5koaYg6UL1TYCoWHblxZZ\nXe/OI0qv7QKBgCmots4yA7yFiivO6CLYcw9uFIVeHEXj0HnaZC0ryEXesatLnOWi\ngw5XZxUKVcewHtofb/I2lpdToW1FXdUsrRyd2t60sx7vU6k3Ns7SIfl9gWr0IIeo\nBCnlxGd2lyKor+wX+ZzYQqwJ5F6h8KqVyHNNAQ+3AoyTFgQR2tkGiQORAoGBAJJD\nJu2oWNk4NB196LAdhQ0KCPAXV7/mtNDfTKDI0uzFS5Oft1ZCxSA85TztTLLC/2kF\nNp6lEh1I86hjQqnef+R+0eoA9SJ3SOJX+DcSIDnS5PGXaSBiX14bkjU/WkLkSFFW\nOJxkYn6Q2cHNWPVlnd1uU0jtXNNkZltlbeUE/Jo9AoGAB1YFZ/xjPSW0pCxd7b0a\niHm93/FWVIeJ/vHUGBq8iLPRQhMcIJaDUNVooDfQMtD2bpbBCnZt2hqS3ty+gppN\n0QFZx57qx54loF7oR/Y2OpX/w9Yw+cGflBrJXOZQlynDjErQw40qGTpCd9Zc46Jh\nkB4E49GJq+63z5x02BCi8F4=\n-----END PRIVATE KEY-----\n",
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, attendance } = body;

        // Получаем текущую дату и время
        const date = new Date().toLocaleString('kk-KZ', { timeZone: 'Asia/Almaty' });

        // Добавляем данные в таблицу
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: "13BPv9fQioYSxDZ7qMOUFqTR2jnJEXhlubZ_-PNK8JkA",
            range: 'Лист1!A1',
            insertDataOption: 'INSERT_ROWS',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                majorDimension: 'ROWS',
                values: [[
                    date,
                    name,
                    attendance
                ]],
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to append data to sheet');
        }

        return NextResponse.json({ 
            success: true,
            message: 'Сіздің жауабыңыз сәтті жіберілді'
        });
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json(
            { error: 'Жіберу кезінде қате шықты' },
            { status: 500 }
        );
    }
} 