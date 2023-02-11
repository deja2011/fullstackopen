const Notification = ({message}) => {
    if (message !== null) {
        return <div className={message.isError ? 'error' : 'info'}>{message.text}</div>
    } else {
        return <div></div>
    }
}


export default Notification