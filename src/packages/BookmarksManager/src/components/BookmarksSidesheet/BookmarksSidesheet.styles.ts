import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AppBookmarksWrapper = styled.div`
    position: relative;
    ::before {
        content: ' ';
        position: absolute;
        width: 2px;
        top: -7px;
        left: 10px;
        bottom: 0px;
        background-color: #dcdcdc;
    }
`;
export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
export const Bookmarks = styled.div`
    margin-left: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    ::before {
        content: ' ';
        position: absolute;
        width: 2px;
        top: -14px;
        left: -9px;
        bottom: 0px;
        background-color: #dcdcdc;
    }
`;
export const AppBookmarksContainer = styled.div`
    position: relative;
    margin-left: 15px;
`;
export const SidesheetContent = styled.div`
    height: -webkit-fill-available;
    margin-left: 2rem;
    margin-bottom: 2rem;
    overflow: scroll;
`;

export const BookmarkLinkWrapper = styled.div`
    padding: 0.2rem;
    :hover {
        background-color: #f7f7f7;
    }
`;
//@ts-ignore
export const BookmarkLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    font-size: 14px;
`;
