interface SelectOption {
    value: string;
    label: string;
}

interface Tag {
    TagNo: string;
    Id: string;
}

export const searchTags = async (searchString: string): Promise<SelectOption[]> => {
    const selectOptions: SelectOption[] = [];

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiI0NzY0MWM0MC0wMTM1LTQ1OWItOGFiNC00NTllNjhkYzhkMDgiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zYWE0YTIzNS1iNmUyLTQ4ZDUtOTE5NS03ZmNmMDViNDU5YjAvIiwiaWF0IjoxNjQyMDY4MjAxLCJuYmYiOjE2NDIwNjgyMDEsImV4cCI6MTY0MjA3MjQ2MiwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhUQUFBQXdPY3dXcGw5MVB6N3pOdkkvL2lqKzRuMG9INGh6Q090R0lKVHFCRWZncW5NcU8vZHhyaVhNRUdiWklXeGVIc0hpZUtqKy9iYWl0Um85UldpMUZ6WWJRPT0iLCJhbXIiOlsicnNhIiwibWZhIl0sImFwcGlkIjoiMTBiYmU1MWYtMmEyZC00OTVlLTk0MWMtNTcwMjRlODQ5OTNjIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJFaWthYXMiLCJnaXZlbl9uYW1lIjoiR3VzdGF2IiwiaXBhZGRyIjoiMTI4LjM5LjYxLjIwMyIsIm5hbWUiOiJHdXN0YXYgRWlrYWFzIiwib2lkIjoiZGZlYWE4ZGUtOTJkMi00ZWU0LWIxNzEtNmNhYmEwYzE2M2JmIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIyMDUyMzM4OC0xMDg1MDMxMjE0LTcyNTM0NTU0My0yNjE2ODEzIiwicmgiOiIwLkFRc0FOYUtrT3VLMjFVaVJsWF9QQmJSWnNCX2x1eEF0S2w1SmxCeFhBazZFbVR3Q0FOVS4iLCJzY3AiOiJ3ZWJfYXBpIiwic3ViIjoieFN3ZTB2TnZBVUhQMl9PYTdVSllrd3RPYUttSGtyN0JsWFo1aHFWazdIOCIsInRpZCI6IjNhYTRhMjM1LWI2ZTItNDhkNS05MTk1LTdmY2YwNWI0NTliMCIsInVuaXF1ZV9uYW1lIjoiR1VFSUBlcXVpbm9yLmNvbSIsInVwbiI6IkdVRUlAZXF1aW5vci5jb20iLCJ1dGkiOiJkQnZhVUZDZ1NraVI2YkQxYmdGbEFRIiwidmVyIjoiMS4wIn0.bN5hBn_3Qgq5orDdfJ0rr6nMxmUj6i0ct8phw2dulmv3dAdd5OxLfud8P3bGYFiK9qIZDk_g4KKP7gD5HCv9CQIy8yZpBWxOht0JHOVxaYKKVjFUXqrEoNbwyKmKeWZY18gaPRSBqBzUuGJXw0xty4_DJIHl5Udi3oU64H4fVL737JS8YBNcMedpUWETe094XAtDTLQUTAPWAW3YPT4JR9kBKJhgMITSItrpGf3aVs43P02q9mgw3h58ua7iOelDBLxGDWKDcTXOZFCO6cutB23yR1azmwB0n8XwDqw_PHZs6diIAJGmhlY-Y8TWMkUdXnJPp-ikDTztC9kigHMDvA',
        },
    };
    try {
        const baseUrl = 'https://procosyswebapi.equinor.com/api';
        const uri = 'Tag/Search';
        const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&startsWithTagNo=${encodeURIComponent(
            searchString
        )}&includeClosedProjects=false&currentPage=0&itemsPerPage=7&api-version=4.1`;

        const url = `${baseUrl}/${uri}?${queryParameters}`;

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data: Tag[]) => {
                data['Items'].forEach((x) => {
                    selectOptions.push({ label: x.TagNo, value: x.Id });
                });
            });
    } catch (e) {
        console.log(e);
    }

    console.log(selectOptions);
    return selectOptions || [];
};
