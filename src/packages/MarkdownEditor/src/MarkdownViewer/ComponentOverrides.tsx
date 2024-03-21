export const LI = ({ children }: { children: JSX.Element }): JSX.Element => {
  return <li style={{ fontSize: '16px' }}>{children}</li>;
};
export const OL = ({ children }: { children: JSX.Element }): JSX.Element => {
  return <ol style={{ lineHeight: '1em' }}>{children}</ol>;
};
