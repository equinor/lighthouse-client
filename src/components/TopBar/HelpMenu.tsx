import { Icon, Popover, Typography } from '@equinor/eds-core-react-old';
import { useLocationKey } from '@equinor/hooks';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { useState, useRef, useMemo } from 'react';
import { getApps } from '../../apps/apps';
import { useContactPerson } from '../../hooks/useContactPerson';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

export const HelpMenu = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  //preload
  useContactPerson();

  return (
    <div ref={ref}>
      <ClickableIcon name="help_outline" onClick={() => setIsOpen(true)} />

      <Popover
        placement="bottom-start"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchorEl={ref.current}
      >
        <Popover.Title>Portal Help</Popover.Title>

        <Popover.Content>
          <Wrapper>
            <ContactPerson />
            <HelpPage />
            <Feedback />
          </Wrapper>
        </Popover.Content>
      </Popover>
    </div>
  );
};

function ContactPerson() {
  const { data } = useContactPerson();

  return (
    <div>
      <StyledContent>
        <Icon color={tokens.colors.interactive.primary__resting.hex} name="support" />
        <Typography variant="h3">Fusion Digital Coach</Typography>
      </StyledContent>
      <Typography variant="h4">
        <a target="_blank" href={`https://teams.microsoft.com/l/chat/0/0?users=${data?.mail}`}>
          {data?.name}
        </a>
        <div>Stord Site 2, 3rd floor</div>
      </Typography>
    </div>
  );
}

function HelpPage() {
  const locationName = useLocationKey();
  const helpPageUrl = useMemo(
    () => getApps().find(({ shortName }) => shortName === locationName)?.helpPageUrl,
    [locationName]
  );

  if (!helpPageUrl) {
    return null;
  }

  return (
    <div>
      <StyledContent>
        <Icon color={tokens.colors.interactive.primary__resting.hex} name="info_circle" />
        <Typography variant="h3">Application help page</Typography>
      </StyledContent>
      <Typography variant="h4">
        <a target="_blank" href={helpPageUrl}>
          Application help page
        </a>
      </Typography>
    </div>
  );
}

function Feedback() {
  return (
    <div>
      <StyledContent>
        <Icon color={tokens.colors.interactive.primary__resting.hex} name="thumbs_up_down" />
        <Typography variant="h3">Feedback</Typography>
      </StyledContent>

      <Typography variant="h4">
        <a href="https://forms.office.com/r/GzdEKzkXWY" target="_blank">
          Give feedback
        </a>
      </Typography>
    </div>
  );
}

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
