import styled from "styled-components"
import { MainMenu } from "../Menu/MainMenu"

const Wrapper = styled.div`
position: absolute;
top: 64px;
height: calc(100vh - 64px);
display: flex;
width: 100vw;
`
const ChildrenWrapper = styled.div`
    flex: 1;
`
const MainMenuWrapper = styled.div`
   width: 360px;
`

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Wrapper>
            <MainMenuWrapper>
                <MainMenu />
            </MainMenuWrapper>
            <ChildrenWrapper>
                {children}
            </ChildrenWrapper>

        </Wrapper>
    )
}