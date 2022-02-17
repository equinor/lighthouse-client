async function getTasks(): Promise<ProcosysTasks[] | undefined> {
    try {
        const response = await customHttpClient.get(
            'https://pro-s-fusiontasks-fprd.azurewebsites.net/persons/me/tasks/procosys'
        );
        return await response.json();
    } catch (error) {
        console.error('Fails to get tasks: ', error);
    }
}
