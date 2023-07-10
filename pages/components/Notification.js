export default function Notification() {
    return <div className="notification__container"></div>;
}

export function ShowError(message) {
    const ErrorIcon = `<svg
            xmlns="http://www.w3.org/2000/svg"
            height="22"
            viewBox="0 0 32 32"
            width="22"
        >
            <circle
                cx="16"
                cy="16"
                id="BG"
                r="16"
                style="fill:#D72828"
            />
            <path
                d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z"
                id="Exclamatory_x5F_Sign"
                style="fill: #E6E6E6"
            />
        </svg>`;

    const notification_box = document.querySelector(".notification__container");

    if (notification_box.children.length >= 3) {
        notification_box.removeChild(notification_box.children[0]);
    }

    notification_box.innerHTML += `
        <div class="notification__box">
            <div class="notification_icon">${ErrorIcon}</div>
            <div class="notification_message">${message}</div>
        </div>`;

    setTimeout(() => {
        if (notification_box.children.length > 0) {
            notification_box.children[0].style.opacity = 0;
            setTimeout(() => {
                if (notification_box.children.length > 0) {
                    notification_box.removeChild(notification_box.children[0]);
                }
            }, 850);
        }
    }, 6000);
}
