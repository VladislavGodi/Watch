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
                const response = await axios.get('http://worldtimeapi.org/api/timezone/Etc/UTC');
                console.log('ответ: ', response)
                const datetime = response.data.datetime;

                setTime(new Date(datetime).toLocaleTimeString([], { hour:'2-digit', minute: '2-digit'}));
                setLoading(false);
            } catch (error) {
                console.error('Нет данных с сервера', error);
                setLoading(false);
            }
        };
        fetchTime();
        const intervalId = setInterval(fetchTime, 20000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={'clock-container'}>
            {loading ? <div>Загрузка...</div> : <div className="clock">{time}</div>}
        </div>
    );
};

export default WorldClock;
