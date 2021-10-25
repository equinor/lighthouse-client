
import styled from "styled-components";
import { AppManifest } from "../../apps/apps";
import Icon from "../Icon/Icon";


const ImageWrapper = styled.div`
 
`

const IconWrapper = styled.div`
    padding: 18px;

`


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    

`

export const HomePage: React.FC<Partial<AppManifest>> = ({ imageUri, title, icon, tags }: Partial<AppManifest>) => {
    const CustomIcon = icon
    return (
        <>

            {imageUri ? (
                <ImageWrapper>
                    <img src={imageUri} style={{
                        width: "-webkit-fill-available",
                        maxWidth: "100%",
                        height: "auto"
                    }} />
                </ImageWrapper>
            ) : (

                <Wrapper>
                    <TitleWrapper>
                        <IconWrapper>
                            {(CustomIcon && typeof CustomIcon !== "string") ? <CustomIcon /> : CustomIcon && <Icon name={CustomIcon} />}
                        </IconWrapper>
                        <h1>{title}</h1>
                        <p>{tags && tags.join("-")}</p>
                    </TitleWrapper>
                    <iframe name="embed-feed" title="Yammer" src="https://web.yammer.com/embed/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxMDA2NTk2NiJ9" style={{ border: "0px", overflow: "hidden", width: "100%", height: "100%", minHeight: "400px" }}></iframe>


                    <table>
                        <thead>
                            <tr>
                                <td>Test</td>
                                <td>Test2</td>
                                <td>Test3</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    Dette er en test
                                </td>

                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                </Wrapper>

            )}
        </>
    );
}


