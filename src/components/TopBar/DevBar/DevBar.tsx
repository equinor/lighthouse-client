import { BetaTag } from './DevBarStyles';

interface DevBarProps {
    env: string;
}

export const DevBar = ({ env }: DevBarProps): JSX.Element | null => {
    if (env === 'test' || env === 'dev')
        return (
            <>
                <BetaTag>
                    <b>UNDER DEVELOPMENT - {env.toUpperCase()} </b>
                    <p>This site contains test data.</p>
                </BetaTag>
            </>
        );

    return null;
};
