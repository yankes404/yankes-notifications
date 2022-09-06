// CONFIG

const DEFAULT_DELAY = 3000; // miliseconds
const DEFAULT_MESSAGE = "I love yankes scripts!";
const THEME = "notifyDarkTheme"; // If you'd like to use white theme change on notifyWhiteTheme


// CODE

const switched = [];

const notifications = document.getElementById("notifications");

let lastid = 0;

async function sendYankesNotify(content, delay) {
    const message = content || DEFAULT_MESSAGE;
    const messageDelay = delay || DEFAULT_DELAY;

    const element = document.createElement("div");
    element.classList.add("notify");
    element.classList.add(THEME);

    element.setAttribute("id", `notify${lastid}`);

    const xmark = createXmark();
    element.appendChild(xmark);

    const messageContent = createMessage(message);
    element.appendChild(messageContent);

    const timeline = createTimeline(messageDelay);
    element.appendChild(timeline);

    switched[`notify${lastid}`] = true;

    const audio = new Audio('notify-plugin/sounds/in.mp3');
    audio.play();

    setTimeout(() => {

        element.style.opacity = "0";
        element.style.transform = "translateX(200%)";
        element.style.animation = "hideNotify .5s ease-in-out";

        if (switched[`notify${lastid}`] === true) {
            const audio2 = new Audio('notify-plugin/sounds/out.mp3');
            audio2.play();
        }
        setTimeout(() => {
            element.remove();
            lastid++;
        }, 1000)

    }, messageDelay);

    notifications.appendChild(element);
}

function createXmark() {
    const xmark = document.createElement("div");
    xmark.classList.add("xmark");
    xmark.setAttribute("id", `notify-xmark${lastid}`);
    xmark.setAttribute("onclick", `removeNotify(${lastid})`);

    const i = document.createElement("i");
    i.classList.add("fa-solid");
    i.classList.add("fa-xmark");

    xmark.appendChild(i);
    return xmark;
}

function createMessage(content) {
    const message = document.createElement("p");

    message.innerHTML = content;
    return message;
}

function removeNotify(id) {
    const notify = `notify${id}`;

    const message = document.getElementById(notify);
    message.style.opacity = "0";
    message.style.transform = "translateX(200%)";
    message.style.animation = "hideNotify .5s ease-in-out";

    const audio2 = new Audio('notify-plugin/sounds/out.mp3');
    audio2.play();
    setTimeout(() => {
        message.remove();
    }, 1000)
    switched[`notify${lastid}`] = false;
}

function createTimeline(messageDelay) {
    const timeline = document.createElement("div");
    timeline.classList.add("timeline");

    const line = document.createElement("div");
    line.classList.add("line");
    line.style.animation = `line ${messageDelay}ms linear`;

    timeline.appendChild(line);

    return timeline;
}