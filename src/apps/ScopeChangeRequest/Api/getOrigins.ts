interface Category {
    name: string;
}
interface SelectOption {
    value: string;
    label: string;
}

export const getOrigins = async (): Promise<SelectOption[]> => {
    const selectOptions: SelectOption[] = [];
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJkZjcxZjViNS1mMDM0LTQ4MzMtOTczZi1hMzZjMmQ1ZjllMzEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zYWE0YTIzNS1iNmUyLTQ4ZDUtOTE5NS03ZmNmMDViNDU5YjAvIiwiaWF0IjoxNjQyMDYxNDkwLCJuYmYiOjE2NDIwNjE0OTAsImV4cCI6MTY0MjA2Njg2MiwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQThraEpMOWRRUG5qcEFHNWpxckl6bE82a0VKMmJlckZVUTZndmZqT3BHVVRxdk9uS1F0Q3pidmljNnNGdWF0ekhrenB3U0N4N0FkeXJ2TncvRVJ2dUlLN040dzlPRjRjWHhsTWx1aEdFd0lZPSIsImFtciI6WyJyc2EiLCJtZmEiXSwiYXBwaWQiOiIzYmVjYzY5Zi01MTBhLTQxMWItOTJhNC1jMGJmOGQ1Y2E1ODgiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkVpa2FhcyIsImdpdmVuX25hbWUiOiJHdXN0YXYiLCJpcGFkZHIiOiIxMjguMzkuNjEuMjAzIiwibmFtZSI6Ikd1c3RhdiBFaWthYXMiLCJvaWQiOiJkZmVhYThkZS05MmQyLTRlZTQtYjE3MS02Y2FiYTBjMTYzYmYiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjIwNTIzMzg4LTEwODUwMzEyMTQtNzI1MzQ1NTQzLTI2MTY4MTMiLCJyaCI6IjAuQVFJQU5hS2tPdUsyMVVpUmxYX1BCYlJac0pfRzdEc0tVUnRCa3FUQXY0MWNwWWdDQU5VLiIsInNjcCI6IkZpbGVzLnJlYWR3cml0ZSIsInN1YiI6ImlPXzM4T2pBX1BhZ0I3MmlWYjhFTDd2QTBvcWVEZWlOYm5vR3NzS2ZSemsiLCJ0aWQiOiIzYWE0YTIzNS1iNmUyLTQ4ZDUtOTE5NS03ZmNmMDViNDU5YjAiLCJ1bmlxdWVfbmFtZSI6IkdVRUlAZXF1aW5vci5jb20iLCJ1cG4iOiJHVUVJQGVxdWlub3IuY29tIiwidXRpIjoiZlVXM25YWjZEVU9PS0JackpkY0dBZyIsInZlciI6IjEuMCJ9.Vqn5Y_iq-0uFSXfu1ZJO0pqHY9024b5mtj4BoCoXWxmz2Of9syMDDF0DWLjz4zxBXyMv80WnzHcnNEIKJ93_cNZS-pWyIseiadjzRDeREI1c4JtQc-dlgonAYUBQwrACYP5KoW5ppIxL6Tg7CHT1Mh1h5DCfLe_70nQmXbKX5RU6ekMjBdczoDSM_FnUjkY_Js6i6nzfSXQ_6dnNjSc1F5tD81fDNkp29xQ_v0HkLZ9tYRdUohCJyjgc7SAve6-dieEO-2SESug74WTvK6wCG96Bej6G3hyjjl4RGfcxCGuW44I4N2rYK9p8U7nfmhn5qjXS7DKJDuV1v9RHkaWRdQ',
        },
    };
    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/origins`,
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            data.map((x: Category) => {
                selectOptions.push({ label: x.name, value: x.name });
            });
        });
    console.log(selectOptions);
    return selectOptions || [];
};
