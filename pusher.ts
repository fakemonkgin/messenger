import Pusher from "pusher";
import ClientPusher from "pusher-js"

export const serverPusher = new Pusher({
    appId: "1552704",
    key: "984d0d019f108f97d0e1",
    secret: "116013ab906f227ed02f",
    cluster: "us2",
    useTLS: true,
})

export const clientPusher = new ClientPusher('984d0d019f108f97d0e1', {
    cluster: 'us2',
    forceTLS: true
  });