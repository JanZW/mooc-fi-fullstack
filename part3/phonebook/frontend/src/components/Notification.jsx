const Notification = ({message, className}) => {
    console.log('render notification')
    if (message == null || message === "") {
        return null;
    }
    return (
    <div className={className}>{message}</div>
    );

}

export default Notification;