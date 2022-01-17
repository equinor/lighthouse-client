import { Schema } from '@equinor/Form';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

interface Category {
    name: string;
}

export const scopeChangeRequestSchema: Schema<ScopeChangeRequest> = {
    title: {
        title: 'Title',
        inputType: { type: 'TextInput' },
        order: 1,
        placeholderText: 'Please add title for the request',
    },
    phase: {
        title: 'Phase',
        inputType: {
            type: 'SingleSelect',
            selectOptions: async () => {
                return await getPhases();
            },
        },
        order: 2,
        placeholderText: 'Select phase',
    },

    category: {
        title: 'Category',
        inputType: {
            type: 'SingleSelect',
            selectOptions: async () => {
                return await getCategories();
            },
        },
        order: 3,
        placeholderText: 'Select category',
    },
    description: {
        title: 'Description',
        inputType: { type: 'TextArea' },
        order: 4,
        placeholderText: 'Please add description',
    },
    guesstimateHours: {
        title: 'Guesstimate hours',
        optional: true,
        inputType: { type: 'NumberInput' },
        order: 5,
    },
    guesstimateDescription: {
        title: 'Guesstimate description',
        optional: true,
        inputType: { type: 'TextInput' },
        order: 5,
        placeholderText: 'Please make your best guess...',
    },
};

const getCategories = async (): Promise<string[]> => {
    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJkZjcxZjViNS1mMDM0LTQ4MzMtOTczZi1hMzZjMmQ1ZjllMzEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zYWE0YTIzNS1iNmUyLTQ4ZDUtOTE5NS03ZmNmMDViNDU5YjAvIiwiaWF0IjoxNjQyMDYxNDkwLCJuYmYiOjE2NDIwNjE0OTAsImV4cCI6MTY0MjA2Njg2MiwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQThraEpMOWRRUG5qcEFHNWpxckl6bE82a0VKMmJlckZVUTZndmZqT3BHVVRxdk9uS1F0Q3pidmljNnNGdWF0ekhrenB3U0N4N0FkeXJ2TncvRVJ2dUlLN040dzlPRjRjWHhsTWx1aEdFd0lZPSIsImFtciI6WyJyc2EiLCJtZmEiXSwiYXBwaWQiOiIzYmVjYzY5Zi01MTBhLTQxMWItOTJhNC1jMGJmOGQ1Y2E1ODgiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkVpa2FhcyIsImdpdmVuX25hbWUiOiJHdXN0YXYiLCJpcGFkZHIiOiIxMjguMzkuNjEuMjAzIiwibmFtZSI6Ikd1c3RhdiBFaWthYXMiLCJvaWQiOiJkZmVhYThkZS05MmQyLTRlZTQtYjE3MS02Y2FiYTBjMTYzYmYiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjIwNTIzMzg4LTEwODUwMzEyMTQtNzI1MzQ1NTQzLTI2MTY4MTMiLCJyaCI6IjAuQVFJQU5hS2tPdUsyMVVpUmxYX1BCYlJac0pfRzdEc0tVUnRCa3FUQXY0MWNwWWdDQU5VLiIsInNjcCI6IkZpbGVzLnJlYWR3cml0ZSIsInN1YiI6ImlPXzM4T2pBX1BhZ0I3MmlWYjhFTDd2QTBvcWVEZWlOYm5vR3NzS2ZSemsiLCJ0aWQiOiIzYWE0YTIzNS1iNmUyLTQ4ZDUtOTE5NS03ZmNmMDViNDU5YjAiLCJ1bmlxdWVfbmFtZSI6IkdVRUlAZXF1aW5vci5jb20iLCJ1cG4iOiJHVUVJQGVxdWlub3IuY29tIiwidXRpIjoiZlVXM25YWjZEVU9PS0JackpkY0dBZyIsInZlciI6IjEuMCJ9.Vqn5Y_iq-0uFSXfu1ZJO0pqHY9024b5mtj4BoCoXWxmz2Of9syMDDF0DWLjz4zxBXyMv80WnzHcnNEIKJ93_cNZS-pWyIseiadjzRDeREI1c4JtQc-dlgonAYUBQwrACYP5KoW5ppIxL6Tg7CHT1Mh1h5DCfLe_70nQmXbKX5RU6ekMjBdczoDSM_FnUjkY_Js6i6nzfSXQ_6dnNjSc1F5tD81fDNkp29xQ_v0HkLZ9tYRdUohCJyjgc7SAve6-dieEO-2SESug74WTvK6wCG96Bej6G3hyjjl4RGfcxCGuW44I4N2rYK9p8U7nfmhn5qjXS7DKJDuV1v9RHkaWRdQ',
        },
    };
    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/categories`,
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Category) => x.name);
        });

    return selectOptions;
};

const getPhases = async (): Promise<string[]> => {
    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJkZjcxZjViNS1mMDM0LTQ4MzMtOTczZi1hMzZjMmQ1ZjllMzEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zYWE0YTIzNS1iNmUyLTQ4ZDUtOTE5NS03ZmNmMDViNDU5YjAvIiwiaWF0IjoxNjQyMDYxNDkwLCJuYmYiOjE2NDIwNjE0OTAsImV4cCI6MTY0MjA2Njg2MiwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQThraEpMOWRRUG5qcEFHNWpxckl6bE82a0VKMmJlckZVUTZndmZqT3BHVVRxdk9uS1F0Q3pidmljNnNGdWF0ekhrenB3U0N4N0FkeXJ2TncvRVJ2dUlLN040dzlPRjRjWHhsTWx1aEdFd0lZPSIsImFtciI6WyJyc2EiLCJtZmEiXSwiYXBwaWQiOiIzYmVjYzY5Zi01MTBhLTQxMWItOTJhNC1jMGJmOGQ1Y2E1ODgiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkVpa2FhcyIsImdpdmVuX25hbWUiOiJHdXN0YXYiLCJpcGFkZHIiOiIxMjguMzkuNjEuMjAzIiwibmFtZSI6Ikd1c3RhdiBFaWthYXMiLCJvaWQiOiJkZmVhYThkZS05MmQyLTRlZTQtYjE3MS02Y2FiYTBjMTYzYmYiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjIwNTIzMzg4LTEwODUwMzEyMTQtNzI1MzQ1NTQzLTI2MTY4MTMiLCJyaCI6IjAuQVFJQU5hS2tPdUsyMVVpUmxYX1BCYlJac0pfRzdEc0tVUnRCa3FUQXY0MWNwWWdDQU5VLiIsInNjcCI6IkZpbGVzLnJlYWR3cml0ZSIsInN1YiI6ImlPXzM4T2pBX1BhZ0I3MmlWYjhFTDd2QTBvcWVEZWlOYm5vR3NzS2ZSemsiLCJ0aWQiOiIzYWE0YTIzNS1iNmUyLTQ4ZDUtOTE5NS03ZmNmMDViNDU5YjAiLCJ1bmlxdWVfbmFtZSI6IkdVRUlAZXF1aW5vci5jb20iLCJ1cG4iOiJHVUVJQGVxdWlub3IuY29tIiwidXRpIjoiZlVXM25YWjZEVU9PS0JackpkY0dBZyIsInZlciI6IjEuMCJ9.Vqn5Y_iq-0uFSXfu1ZJO0pqHY9024b5mtj4BoCoXWxmz2Of9syMDDF0DWLjz4zxBXyMv80WnzHcnNEIKJ93_cNZS-pWyIseiadjzRDeREI1c4JtQc-dlgonAYUBQwrACYP5KoW5ppIxL6Tg7CHT1Mh1h5DCfLe_70nQmXbKX5RU6ekMjBdczoDSM_FnUjkY_Js6i6nzfSXQ_6dnNjSc1F5tD81fDNkp29xQ_v0HkLZ9tYRdUohCJyjgc7SAve6-dieEO-2SESug74WTvK6wCG96Bej6G3hyjjl4RGfcxCGuW44I4N2rYK9p8U7nfmhn5qjXS7DKJDuV1v9RHkaWRdQ',
        },
    };
    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/phases`,
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Category) => x.name);
        });

    return selectOptions;
};
