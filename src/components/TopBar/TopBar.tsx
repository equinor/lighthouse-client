import { Avatar, TopBar } from "@equinor/eds-core-react";
import { useGraphClient } from "@equinor/http-client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useClientContext from "../../context/clientContext";
import Icon from "../Icon/Icon";
import Logo from "./Logo/Logo";

const Icons = styled.div`
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      > * {
        margin-left: 40px;
      }
    `

const CustomContentWrapper = styled.div`
display: flex;
align-items: center;
flex-direction: row;
> * {
  margin-left: 40px;
}
`


const TopBarWrapper = styled.div`
    position: fixed;
    width: 100%;
    z-index: 2;
    height: 48px 
    > header {
        padding-left: 16px;
    }
`


const ProCoSysTopBar = (): JSX.Element => {

    const { toggleAppPanel, authProvider } = useClientContext();
    const graph = useGraphClient(authProvider)
    const [image, setImage] = useState<string | undefined>(undefined)
    useEffect(() => {

        graph.graphGetProfilePicture().then(img => setImage(img));
    }, [])
    return (
        <TopBarWrapper>
            <TopBar>
                <TopBar.Header>
                    <div onClick={() => toggleAppPanel()} style={{ cursor: "pointer" }}>
                        <Icon name="menu" />
                    </div>
                    <Logo />
                </TopBar.Header>
                <TopBar.CustomContent>
                    {/* <CustomContentWrapper>
                        <PlantSelector />
                        <Search aria-label="sitewide" id="search-normal" placeholder="Search..." />
                    </CustomContentWrapper> */}
                </TopBar.CustomContent>
                <TopBar.Actions>
                    <Icons>
                        {image && <Avatar alt="User avatar" size={16} src={image} />}
                        <Icon name="notifications" size={16} />
                    </Icons>
                </TopBar.Actions>
            </TopBar>
        </TopBarWrapper>
    )
}

export default ProCoSysTopBar;