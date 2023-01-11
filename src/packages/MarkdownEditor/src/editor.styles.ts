import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { AllStyledComponent } from '@remirror/styles/styled-components';

export const StyledContainer = styled(AllStyledComponent)`
    font-size: 16px;
    p {
        font-size: 16px !important;
    }
    .remirror-list-item-marker-container {
        width: 10px;
        left: -16px;
    }
    label {
        .remirror-collapsible-list-item-button {
            background-color: #007079 !important;
            width: 4px;
            height: 4px;
        }
    }

    .remirror-theme {
        .remirror-editor-wrapper {
            .ProseMirror,
            .remirror-editor {
                background-color: ${tokens.colors.ui.background__light.rgba};
                min-height: 150px;
                height: auto;
                max-height: 500px;
                box-shadow: inset 0px -1px 0px 0px rgba(111, 111, 111, 1);
                overflow: auto;
                resize: vertical;

                &[style*='height'] {
                    max-height: unset;
                }
                &:focus {
                    box-shadow: #007079 0px 0px 0px 2px;
                }
            }
        }
    }
`;
