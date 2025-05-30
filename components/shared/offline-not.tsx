'use client';

import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Container } from './index';

export function OfflineNotification() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        setIsOffline(!navigator.onLine);

        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div className="bg-amber-50 border-b border-amber-200 py-2 animate-in fade-in duration-300">
            <Container>
                <Alert variant="default" className="border-amber-300 bg-transparent">
                    <div className="text-center">
                        <AlertDescription className="text-amber-800 block mt-1">
                            Вы в офлайне, некоторые функции могут не работать. Проверьте подключение к интернету и обновите страницу.
                        </AlertDescription>
                    </div>
                </Alert>
            </Container>
        </div>
    );
}
