//procosyswebapiqp.equinor.com/api/Systems?plantId=PCS%24JOHAN_CASTBERG&projectId=177433&onlyActiveSystems=true&api-version=4.1

interface SelectOption {
    value: string;
    label: string;
}

interface System {
    Code: string;
    Id: string;
    Description: string;
}

export const getSystems = async (): Promise<SelectOption[]> => {
    const selectOptions: SelectOption[] = [];

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiIyZDBlZDgwZi0zMDEzLTQyMmQtYjhiZC0yYjhhYzcwYjJjZTEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zYWE0YTIzNS1iNmUyLTQ4ZDUtOTE5NS03ZmNmMDViNDU5YjAvIiwiaWF0IjoxNjQyMDU5NTY3LCJuYmYiOjE2NDIwNTk1NjcsImV4cCI6MTY0MjA2NDY5MiwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhUQUFBQWpmSUdmUjdUay9JK01DOXNuSVpKMkwzNmloSTFuYno2R25yUzE4MkxsbVc2c1lxd2p6TXJCbHNzOGpwUE44Q1MvekMrV0YwVzh5NWppRDVrbHM5WjlnPT0iLCJhbXIiOlsicnNhIiwibWZhIl0sImFwcGlkIjoiM2Q5OWU0YWMtZTI5Yi00OTZlLWFlY2EtOTViMjBiNjkyOGJhIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJFaWthYXMiLCJnaXZlbl9uYW1lIjoiR3VzdGF2IiwiaXBhZGRyIjoiMTI4LjM5LjYxLjIwMyIsIm5hbWUiOiJHdXN0YXYgRWlrYWFzIiwib2lkIjoiZGZlYWE4ZGUtOTJkMi00ZWU0LWIxNzEtNmNhYmEwYzE2M2JmIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIyMDUyMzM4OC0xMDg1MDMxMjE0LTcyNTM0NTU0My0yNjE2ODEzIiwicmgiOiIwLkFRc0FOYUtrT3VLMjFVaVJsWF9QQmJSWnNLemttVDJiNG01SnJzcVZzZ3RwS0xvQ0FOVS4iLCJzY3AiOiJ3ZWJfYXBpIiwic3ViIjoiUEhCVzU0d1NOSkh2WVRua0RSdTNuV1ZEZl9LY2MxTHBTY2R5Wnp1RTNGVSIsInRpZCI6IjNhYTRhMjM1LWI2ZTItNDhkNS05MTk1LTdmY2YwNWI0NTliMCIsInVuaXF1ZV9uYW1lIjoiR1VFSUBlcXVpbm9yLmNvbSIsInVwbiI6IkdVRUlAZXF1aW5vci5jb20iLCJ1dGkiOiJXdFRtX25QazZFR21qalNJWDk1ckFRIiwidmVyIjoiMS4wIn0.SnyQtPptsQb8h_pqyGwh-aYmcj4hXuSVMp6h0k8iRf0PxK1mfcY60-x5yX-dnYkDsrruHZCPtzA2hrfIxVe8Q9bBcVAxyvejazgczunvn5F4Akd73LCn239C8oibtwEEcU17RDL35osIZSRlv4bq-docU8u9aPtN6fjhXc0Eh8m5KXJmEk5GA_JyyY54OoNFZCZFUzvicw1Y3krysiNoTzCkMCpdh0sSTkPDhisK1nqag4WZhtHENSv0dXKXYfmND9V6LAQiGnFwu0XBXo1vxzf8gxwxSKAqwiD6w37HTWDcqP68z0g0SR2qn3rWsJpXI7aFI9vetAgyjeGA8TURZQ',
        },
    };
    try {
        await fetch(
            `procosyswebapiqp.equinor.com/api/Systems?plantId=PCS%24JOHAN_CASTBERG&projectId=177433&onlyActiveSystems=true&api-version=4.1`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                data.map((x: System) => {
                    selectOptions.push({ label: `System ${x.Code}`, value: x.Id });
                });
            });
    } catch (e) {
        console.log(e);
    }

    console.log(selectOptions);
    return selectOptions || [];
};
