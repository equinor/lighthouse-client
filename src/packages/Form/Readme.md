How to use this package

1. Define interface for your model
2. Define schema (omit the fields you dont want in the form)
3. Invoke hook and call GenerateForm

```TS
interface Test{
    id: string;
    name: string;
    email: string;
}


export const testSchema: Schema<Test> = {
    id: {
        isRequired: true,
        label: 'Id',
        editable: true,
        inputType: { type: 'TextInput' },
        order: 0,
        validationFunction: (value: string) => {
            if (value.length > 2) {
                return true;
            } else {
                return false;
            }
        },
    },
    name: {
        isRequired: true,
        label: 'Description',
        editable: true,
        inputType: { type: 'TextArea' },
        order: 1,
    },
};

In your .tsx file

const intialTest = {
    id: "",
    name: "",
    email: "",
}

const formData = useFormSchema(initialTest, testSchema);

<GeneratedForm formData={formData} editMode={false} events={{onSubmit, onCancel}}>

```