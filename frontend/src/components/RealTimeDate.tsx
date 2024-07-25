import { useState, useEffect } from 'react';


export default function RealTimeDate() {
    const [currentDateTime, setCurrentDateTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            setCurrentDateTime(currentDate.toLocaleString());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <span>{currentDateTime}</span>;
}