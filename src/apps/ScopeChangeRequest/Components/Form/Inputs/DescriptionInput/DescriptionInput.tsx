import { useCallback } from 'react';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { OnChangeJSON, useHelpers } from '@remirror/react';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';
import { MarkdownEditor } from '@equinor/markdown-editor';
const DescriptionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.333em;
  color: ${tokens.colors.text.static_icons__tertiary.hex};
`;

export const DescriptionInput = (): JSX.Element => {
  // Not using the scopeChangeFormAtomApi because its inital value is undefined(?), and the editor won't update initialConfig more than once...
  const description = useScopeChangeContext((s) => s.request.description);

  return (
    <div>
      <DescriptionHeader>
        <div>Description</div>
        <div>(Required)</div>
      </DescriptionHeader>
      <MarkdownEditor initialContent={description} placeholder="Please enter scope description">
        <DescriptionChanges />
      </MarkdownEditor>
    </div>
  );
};
export const DescriptionChanges = (): JSX.Element => {
  const { updateAtom } = scopeChangeFormAtomApi;
  const { getMarkdown } = useHelpers(true);
  const onChange = useCallback(() => {
    updateAtom({ description: getMarkdown() });
  }, [getMarkdown, updateAtom]);
  return <OnChangeJSON onChange={onChange} />;
};
