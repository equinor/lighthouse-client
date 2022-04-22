import { tokens } from '@equinor/eds-tokens';

export const PipetestCompletionStatusColors: Record<string, string> = {
    OS: tokens.colors.ui.background__medium.hex,
    PB: '#FBCA36',
    PA: tokens.colors.interactive.danger__resting.hex,
    OK: tokens.colors.interactive.success__resting.hex,
    INACTIVE: tokens.colors.text.static_icons__primary_white.hex,
};

export const PipetestCompletionStatusHoverColors: Record<string, string> = {
    OS: '#9CA6AC',
    PB: '#CCA42C',
    PA: tokens.colors.interactive.danger__hover.hex,
    OK: tokens.colors.interactive.success__hover.hex,
    INACTIVE: tokens.colors.text.static_icons__primary_white.hex,
};
