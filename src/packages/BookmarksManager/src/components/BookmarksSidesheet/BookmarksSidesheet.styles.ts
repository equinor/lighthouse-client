import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AppBookmarksWrapper = styled.div`
  position: relative;
  ::before {
    content: ' ';
    position: absolute;
    width: 1px;
    top: 0px;
    left: 11px;
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
    width: 1px;
    top: 0px;
    left: -9px;
    bottom: 0px;
    background-color: #dcdcdc;
  }
`;
export const AppBookmarksContainer = styled.div`
  position: relative;
  margin-left: 15px;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
`;
export const SidesheetContent = styled.div`
  height: -webkit-fill-available;
  margin-left: 24px;
  margin-top: 26px;
  margin-bottom: 2rem;
  overflow: scroll;
`;

export const BookmarkLinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
  align-items: center;
  margin-left: 15px;
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
  :hover {
    text-decoration: underline;
  }
`;
export const Center = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
`;

export const InfoText = styled.div`
  font-size: 24px;
`;
