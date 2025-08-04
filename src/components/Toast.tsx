
interface ToastProps {
    showToast: boolean;
    status: string;
    message: string;
}

const Toast: React.FC<ToastProps> = ({ showToast, status, message }) => {
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