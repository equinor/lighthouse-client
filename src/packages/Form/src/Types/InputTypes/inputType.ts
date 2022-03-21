import { DateField } from '../dateField';
import { MultiSelect } from './multiSelectType';
import { NumberInput } from './numberInputType';
import { SingleSelect } from './singleSelectType';
import { TextArea } from './textAreaType';
import { TextInput } from './textInputType';

export type InputType = TextInput | TextArea | SingleSelect | MultiSelect | NumberInput | DateField;
