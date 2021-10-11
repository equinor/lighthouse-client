import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    overflow: auto;
    height: calc(100vh - 64px);
    padding: 1rem;
`;


export const Dashboard = () => {
    return (
        <Wrapper>
            <section>
                <h1>
                    Overview
                </h1>
                <p>
                    Below is an overview of the status on the items that matches the filter for your tasks
                </p>
            </section>
            <section>

            </section>
            <section>
                <h1>
                    ProCoSys news
                </h1>
                <h3>
                    Mechanical Completion and Commissioning apps
                </h3>
                <p>
                    MC App and COMM App is available in Equinor Apps, Google Play and Apple Appstore. The app's allow you to search for scope, open saved search, fill in and check out chec...
                </p>

                <h3>
                    Mechanical Completion and Commissioning apps
                </h3>
                <p>
                    MC App and COMM App is available in Equinor Apps, Google Play and Apple Appstore. The app's allow you to search for scope, open saved search, fill in and check out chec...
                </p>
            </section>
            <section>
                <h1>
                    Johan Castberg news
                </h1>
                <h3>
                    Mechanical Completion and Commissioning apps
                </h3>
                <p>
                    MC App and COMM App is available in Equinor Apps, Google Play and Apple Appstore. The app's allow you to search for scope, open saved search, fill in and check out chec...
                </p>
                <h3>
                    Mechanical Completion and Commissioning apps
                </h3>
                <p>
                    MC App and COMM App is available in Equinor Apps, Google Play and Apple Appstore. The app's allow you to search for scope, open saved search, fill in and check out chec...
                </p>
            </section>
        </Wrapper>
    )
}