import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const WorldClock = () => {
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTime = async () => {
            try {
                console.log('Запрос отправляется...');
                const response = await axios.get(
                    'http://worldtimeapi.org/api/timezone/Europe/Samara',
                );
                const datatime = response.data.datetime;

                setTime(new Date(datatime).toLocaleTimeString());
                setLoading(false);
            } catch (error) {
                console.error('Нет данных с сервера', error);
                setLoading(false);
            }
        };
        fetchTime();
        const intervalId = setInterval(fetchTime, 60000);
        return () => clearInterval(intervalId);
    }, []);
};

return (
    <body>
        <div className={'clock-container'}>
            <div className={'clock'}>{time}</div>
        </div>
    </body>
);
export default WorldClock;
