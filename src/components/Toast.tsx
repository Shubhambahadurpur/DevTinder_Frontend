import { useEffect } from "react";

interface ToastProps {
    showToast: boolean;
    status: string;
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ showToast, status, message, onClose }) => {

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                onClose()
            }, 1000)
            return () => clearTimeout(timer);
        }
    }, [onClose, showToast])

    if (!showToast) return null;

    return (
        <div className="toast toast-top toast-end mt-20">
            <div className={`alert alert-${status}`}>
                <span>{message}</span>
            </div>
        </div>
    )
}

export default Toast