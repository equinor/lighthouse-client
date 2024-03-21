import text from '../../../../package.json';
import { BetaTag } from './DevBarStyles';

interface DevBarProps {
  env: string;
}

export const DevBar = ({ env }: DevBarProps): JSX.Element | null => {
  if (env === 'test' || env === 'dev')
    return (
      <BetaTag title="This site contains test data.">
        <b>{env.toUpperCase()} </b>

        <p>V.{text.version}</p>
      </BetaTag>
    );

  return null;
};
