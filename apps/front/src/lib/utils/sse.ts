interface convertMessageParams {
    type: string;
    [key: string]: any;
}

export const convertMessage = ({ type, ...data }: convertMessageParams) => {
    // console.log(`event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`);
    return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
};
