import { useCallback, useEffect, useState } from 'react';
import { Button } from './components/Button/Button';
import './scss/app.scss';
import { Notification } from './components/Notification/Notification';

interface INotification {
    status: 'success' | 'error'
    label: string;
    text: string;
}

function App() {
    const [isLoading, setIsLoading] = useState(() => false);

    const [showToast, setShowToast] = useState(() => false);

    const [isClosing, setIsClosing] = useState(() => false);

    const [notification, setNotification] = useState<INotification>(
        {
            status: 'error',
            label: 'Ошибка',
            text: 'Ошибка',
        },
    );

    const [isProgress, setIsProgress] = useState(() => false);

    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const handleMouseLeave = useCallback(() => {
        setIsProgress(true);

        const timeoutId = setTimeout(() => {
            setIsClosing(true);

            const timeoutUnmountNotification = setTimeout(() => {
                setShowToast(false);

                setIsClosing(false);
            }, 1000);

            return () => clearTimeout(timeoutUnmountNotification);
        }, 3000);

        setTimer(timeoutId);
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (timer) {
            clearTimeout(timer);
            setIsProgress(false);
        }
    }, [timer]);

    useEffect(() => () => {
        if (timer) {
            clearTimeout(timer);
        }
    }, [timer]);

    function handleAsyncResult(result: INotification) {
        setNotification(result);
        setShowToast(true);
        handleMouseLeave();
    }

    function handleAsyncError(error: INotification) {
        setNotification(error);
        setShowToast(true);
        handleMouseLeave();
    }

    function myAsyncFunction(): Promise<INotification> {
        return new Promise<INotification>((resolve, reject) => {
            setIsLoading(true);
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    setIsLoading(false);
                    resolve(
                        {
                            status: 'success',
                            label: 'Успешно',
                            text: 'Изменения успешно сохранены',
                        },
                    );
                } else {
                    setIsLoading(false);
                    /* eslint-disable prefer-promise-reject-errors */
                    reject(
                        {
                            status: 'error',
                            label: 'Изменения не сохранены',
                            text: 'Потеря интернет соединения',
                        },
                    );
                }
            }, 2000);
        });
    }

    const handleClick = () => {
        myAsyncFunction()
            .then((result) => {
                handleAsyncResult(result);
            })
            .catch((error) => {
                handleAsyncError(error);
            });
    };

    return (
        <div className="wrapper">

            <Button disabled={isLoading || showToast} onClick={handleClick}>
                {
                    isLoading ? <span className="btnLoader" /> : <span>Тест уведомления</span>
                }
            </Button>

            {
                showToast && (
                    <Notification
                        status={notification.status}
                        label={notification.label}
                        text={notification.text}
                        hide={isClosing}
                        startAnimation={isProgress}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                )
            }

        </div>
    );
}

export default App;
