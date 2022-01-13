interface SelectOption {
    value: string;
    label: string;
}

interface PCSStructure {
    Key: string;
    Value: string;
}

interface System {
    Description: string;
    Id: string;
    Path: string;
}

export const searchSystem = async (searchString: string): Promise<SelectOption[]> => {
    const selectOptions: SelectOption[] = [];

    const search: PCSStructure[] = [
        {
            Key: 'LibraryCode',
            Value: searchString,
        },
    ];

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiI0NzY0MWM0MC0wMTM1LTQ1OWItOGFiNC00NTllNjhkYzhkMDgiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zYWE0YTIzNS1iNmUyLTQ4ZDUtOTE5NS03ZmNmMDViNDU5YjAvIiwiaWF0IjoxNjQyMDY4MjAxLCJuYmYiOjE2NDIwNjgyMDEsImV4cCI6MTY0MjA3MjQ2MiwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhUQUFBQXdPY3dXcGw5MVB6N3pOdkkvL2lqKzRuMG9INGh6Q090R0lKVHFCRWZncW5NcU8vZHhyaVhNRUdiWklXeGVIc0hpZUtqKy9iYWl0Um85UldpMUZ6WWJRPT0iLCJhbXIiOlsicnNhIiwibWZhIl0sImFwcGlkIjoiMTBiYmU1MWYtMmEyZC00OTVlLTk0MWMtNTcwMjRlODQ5OTNjIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJFaWthYXMiLCJnaXZlbl9uYW1lIjoiR3VzdGF2IiwiaXBhZGRyIjoiMTI4LjM5LjYxLjIwMyIsIm5hbWUiOiJHdXN0YXYgRWlrYWFzIiwib2lkIjoiZGZlYWE4ZGUtOTJkMi00ZWU0LWIxNzEtNmNhYmEwYzE2M2JmIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIyMDUyMzM4OC0xMDg1MDMxMjE0LTcyNTM0NTU0My0yNjE2ODEzIiwicmgiOiIwLkFRc0FOYUtrT3VLMjFVaVJsWF9QQmJSWnNCX2x1eEF0S2w1SmxCeFhBazZFbVR3Q0FOVS4iLCJzY3AiOiJ3ZWJfYXBpIiwic3ViIjoieFN3ZTB2TnZBVUhQMl9PYTdVSllrd3RPYUttSGtyN0JsWFo1aHFWazdIOCIsInRpZCI6IjNhYTRhMjM1LWI2ZTItNDhkNS05MTk1LTdmY2YwNWI0NTliMCIsInVuaXF1ZV9uYW1lIjoiR1VFSUBlcXVpbm9yLmNvbSIsInVwbiI6IkdVRUlAZXF1aW5vci5jb20iLCJ1dGkiOiJkQnZhVUZDZ1NraVI2YkQxYmdGbEFRIiwidmVyIjoiMS4wIn0.bN5hBn_3Qgq5orDdfJ0rr6nMxmUj6i0ct8phw2dulmv3dAdd5OxLfud8P3bGYFiK9qIZDk_g4KKP7gD5HCv9CQIy8yZpBWxOht0JHOVxaYKKVjFUXqrEoNbwyKmKeWZY18gaPRSBqBzUuGJXw0xty4_DJIHl5Udi3oU64H4fVL737JS8YBNcMedpUWETe094XAtDTLQUTAPWAW3YPT4JR9kBKJhgMITSItrpGf3aVs43P02q9mgw3h58ua7iOelDBLxGDWKDcTXOZFCO6cutB23yR1azmwB0n8XwDqw_PHZs6diIAJGmhlY-Y8TWMkUdXnJPp-ikDTztC9kigHMDvA',
        },
        body: JSON.stringify(search),
    };
    try {
        await fetch(
            `https://procosyswebapi.equinor.com/api/Search?plantId=PCS%24JOHAN_CASTBERG&savedSearchId=102704&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                data.map((x: System) => {
                    selectOptions.push({ label: `System: ${x.Path}`, value: x.Id });
                });
            });
    } catch (e) {
        console.log(e);
    }

    console.log(selectOptions);
    return selectOptions || [];
};
