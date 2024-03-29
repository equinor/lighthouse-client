import { TextField } from '@equinor/eds-core-react-old';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';

export const TitleInput = (): JSX.Element => {
  const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

  const title = useAtomState((s) => s.title);

  const updateTitle = (e) => {
    updateAtom({ title: e.target.value });
  };

  return (
    <TextField
      id={Math.random().toString()}
      value={title}
      label={'Title'}
      placeholder={'Enter title...'}
      type={'text'}
      onInput={updateTitle}
      meta={'(Required)'}
    />
  );
};
