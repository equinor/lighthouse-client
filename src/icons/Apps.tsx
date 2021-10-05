import styled from "styled-components";

const AppsIconWrapper = styled.div`
padding: 8px;
:hover{
        filter: brightness(120%);
    }
`

const AppsIcon = () => {
    return (<AppsIconWrapper>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="3" height="2.8" fill="#0364B8" />
            <rect x="12" width="3" height="2.8" fill="#28A8EA" />
            <rect x="6" width="3" height="2.8" fill="#C43E1C" />
            <rect y="12" width="3" height="2.8" fill="#37C6D0" />
            <rect x="12" y="12" width="3" height="2.8" fill="#038387" />
            <rect x="6" y="12" width="3" height="2.8" fill="#02484B" />
            <rect y="6" width="3" height="2.8" fill="#4B53BC" />
            <rect x="12" y="6" width="3" height="2.8" fill="#CE8F0E" />
            <rect x="6" y="6" width="3" height="2.8" fill="#107C41" />
        </svg>
    </AppsIconWrapper>
    );

};
export default AppsIcon;