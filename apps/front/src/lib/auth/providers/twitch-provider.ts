import TwitchProvider from "next-auth/providers/twitch";

export default TwitchProvider({
    clientId: process.env.TWITCH_CLIENT_ID as string,
    clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
});
