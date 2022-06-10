import styled from 'styled-components';

interface TagIconProps {
    icon: JSX.Element;
    legendColor: string;
}
/**
 * Component that will wrap the provided icon with a background color (usually the legend color)
 *
 * @param {TagIconProps} {
 *  icon: Icon to be wrapped
 *  legendColor: background color to apply. Need to be valid css color
 * }
 * @return {*}  {JSX.Element} Wrapped icon with provided color
 */
export const TagIcon: React.FC<TagIconProps> = ({
    icon,
    legendColor,
}: TagIconProps): JSX.Element => {
    return <Icon style={{ background: legendColor }}>{icon}</Icon>;
};

export default TagIcon;

const Icon = styled.div`
    position: relative;
    width: 46px;
    height: 46px;
    border: 3px solid #ffffff;
    border-radius: 10rem;
    padding: 8px;
    box-sizing: border-box;
`;
