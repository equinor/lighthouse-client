import { AppManifest } from '../../apps/apps';
import Icon from '../Icon/Icon';
import { IconWrapper, ImageWrapper, TitleWrapper, Wrapper } from './HomePageStyles';

export function HomePage({ imageUri, title, icon, tags }: Partial<AppManifest>): JSX.Element {
    const CustomIcon = icon;
    return (
        <>
            {imageUri ? (
                <ImageWrapper>
                    <img
                        src={imageUri}
                        style={{
                            width: '-webkit-fill-available',
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                    />
                </ImageWrapper>
            ) : (
                <Wrapper>
                    <TitleWrapper>
                        <IconWrapper>
                            {CustomIcon && typeof CustomIcon !== 'string' ? (
                                <CustomIcon />
                            ) : (
                                CustomIcon && <Icon name={CustomIcon} />
                            )}
                        </IconWrapper>
                        <h1>{title}</h1>
                        <p>{tags && tags.join('-')}</p>
                    </TitleWrapper>
                    <iframe
                        name="embed-feed"
                        title="Yammer"
                        src="https://web.yammer.com/embed/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxMDA2NTk2NiJ9"
                        style={{
                            border: '0px',
                            overflow: 'hidden',
                            width: '100%',
                            height: '100%',
                            minHeight: '400px',
                        }}
                    ></iframe>
                </Wrapper>
            )}
        </>
    );
}
