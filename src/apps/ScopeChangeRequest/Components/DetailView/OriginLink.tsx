import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { getDocumentIdByNo } from '@equinor/Workflow';
import { useMemo } from 'react';
import styled from 'styled-components';
import { OriginType } from '../../types/scopeChangeRequest';

interface OriginLinkProps {
  type: OriginType;
  id?: string;
  onlyUnderlineOnHover?: boolean;
}

export const OriginLink = ({
  type,
  id,
  onlyUnderlineOnHover = false,
}: OriginLinkProps): JSX.Element => {
  async function onClickRedirectOrigin(id: string) {
    const pcsId = await getDocumentIdByNo(id);
    window.open(proCoSysUrls.getDocumentUrl(pcsId), '_blank');
  }

  const Component = useMemo(() => {
    switch (type) {
      case 'DCR': {
        if (!id) return <div>Error query without id</div>;
        return (
          <div>
            {type} - {id}
          </div>
        );
      }
      case 'NCR': {
        if (!id) return <div>Error query without id</div>;
        return (
          <Link hideUnderline={onlyUnderlineOnHover} onClick={() => onClickRedirectOrigin(id)}>
            {type} - {id}
          </Link>
        );
      }
      case 'Query': {
        if (!id) return <div>Error query without id</div>;
        return (
          <Link hideUnderline={onlyUnderlineOnHover} onClick={() => onClickRedirectOrigin(id)}>
            {type} - {id}
          </Link>
        );
      }
      case 'Punch': {
        if (!id) return <div>Error query without id</div>;
        return (
          <Link
            hideUnderline={onlyUnderlineOnHover}
            onClick={() => window.open(proCoSysUrls.getPunchUrl(id), '_blank')}
          >
            {type} - {id}
          </Link>
        );
      }
      case 'SWCR': {
        if (!id) return <div>Error query without id</div>;
        return (
          <Link hideUnderline={onlyUnderlineOnHover} onClick={() => onClickRedirectOrigin(id)}>
            {type} - {id}
          </Link>
        );
      }
      case 'Not Applicable': {
        return <div>Not applicable</div>;
      }
    }
  }, [type, id, onlyUnderlineOnHover]);

  return <div>{Component}</div>;
};

const Link = styled.div`
  color: ${tokens.colors.interactive.primary__resting.hex};
  text-decoration: ${({ hideUnderline }: { hideUnderline: boolean }) =>
    hideUnderline ? 'none' : 'underline'};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
