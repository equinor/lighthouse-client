
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
    flex-direction: row;
    align-items: center;
    padding: 28px;
`

export const HomePage: React.FC<Partial<AppManifest>> = ({ imageUri, title, icon, tags }: Partial<AppManifest>) => {
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
                    <IconWrapper>
                        {icon && <Icon name={icon} />}
                    </IconWrapper>
                    <h1>{title}</h1>
                    <p>{tags && tags.join("-")}</p>
                </Wrapper>

            )}
        </>
    );
}


