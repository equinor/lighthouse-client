import styled from "styled-components";



const ImageWrapper = styled.div`
 
`
export const ImageTab = ({ imageUri }) => {

    return (
        <ImageWrapper>
            <img src={imageUri} style={{
                width: "-webkit-fill-available",
                maxWidth: "100%",
                height: "auto"
            }} />
        </ImageWrapper>
    );

}

