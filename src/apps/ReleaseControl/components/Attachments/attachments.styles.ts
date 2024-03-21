import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const TextWrapper = styled.div`
  display: flex;
  gap: 0.7em;
  flex-direction: column;
  align-items: center;
`;

export const UploadText = styled.div`
  display: flex;
  font-size: 16px;
  gap: 0.2em;
`;

export const Highlight = styled.div`
  color: ${tokens.colors.interactive.primary__resting.hex};
`;

export const Wrapper = styled.div`
  display: flex;
  min-width: 300px;
  flex-direction: column;
`;

export const AttachmentsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
  width: -webkit-fill-available;
  max-width: 600px;
  cursor: pointer;
  border: 2px dotted ${tokens.colors.interactive.primary__resting.hex};
`;

export const DropHere = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const AttachmentsSize = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${tokens.colors.text.static_icons__tertiary.hex};
  text-decoration: underline;
`;

export const AttachmentsName = styled.div`
  font-size: 16px;
`;

export const ViewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
`;

export const Link = styled.a`
  display: flex;
  color: ${tokens.colors.interactive.primary__resting.rgba};
  cursor: pointer;
  text-decoration: underline;
  padding: 8px 0px;
`;

export const AttachmentVisualStyle = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 0.5em;
  font-size: 16px;
  color: ${tokens.colors.text.static_icons__default.hex};
`;

export const HotUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
`;

export const Inline = styled.span`
  display: flex;
  align-items: center;
`;

export const AttachmentsList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5em 0em;
  font-size: 16px;
  align-items: center;
`;

export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
`;
