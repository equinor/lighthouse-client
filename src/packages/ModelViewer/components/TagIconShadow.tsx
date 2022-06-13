import React from 'react';
import styled from 'styled-components';

interface TagIconShadowWrapperProps {
    children: React.ReactNode;
}
/**
 * Component that will wrap the provided child element in a shadow.
 * Should be used to add shadow to the tagIcon component
 *
 * @param {TagIconShadowWrapperProps} { children } Child element to wrap
 * @return {*} {JSX.Element} wrapped child element in a shadow
 */
export const TagIconShadowWrapper: React.FC<TagIconShadowWrapperProps> = ({
    children,
}: TagIconShadowWrapperProps): JSX.Element => {
    return <Shadow>{children}</Shadow>;
};

export default TagIconShadowWrapper;

const Shadow = styled.div`
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    width: 46px;
    height: 46px;
    border-radius: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
