import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { AllStyledComponent } from '@remirror/styles/styled-components';
type StyledContainerProps = {
  isReadonly: boolean;
}

export const StyledContainer = styled(AllStyledComponent) <StyledContainerProps>`
    font-size: 16px;
    p {
        font-size: 16px !important;
        margin-block-end: 1em !important;
        line-height: 20px;
    }

    // Custom styling for unordered list items
    .remirror-list-item-marker-container {
        width: 10px;
        left: -16px;
    }
    label {
        // Custom styling for unordered list items
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
                min-height: 50px;
                height: auto;
                max-height: 500px;
                // Gray border bottom of the container
                box-shadow: ${(props) => props.isReadonly ? "none" : "inset 0px -1px 0px 0px rgba(111, 111, 111, 1)"};
                overflow: auto;
                resize: vertical;

                // Removing max height when user is resizing the container
                &[style*='height'] {
                    max-height: unset;
                }

                // Custom green border of container when user is focusing on text field.
                &:focus {
                    box-shadow: ${props => props.isReadonly ? "none" : "#007079 0px 0px 0px 2px"};
                }

                // Placeholder text styling
                .remirror-is-empty::before {
                    font-style: normal;
                    font-weight: 400;
                    color: gray;
                }
            }
        }
    }
`;
