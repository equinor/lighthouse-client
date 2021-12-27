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
        title: 'Id',
        inputType: { type: 'TextInput' },
        order: 1,
        validationFunction: (value: string | undefined) => {
            if (!value) {
                return false;
            }
            if (value.length > 2) {
                return true;
            } else {
                return false;
            }
        },
    },
    name: {
        title: 'Name',
        inputType: {
            type: 'SingleSelect',
            selectOptions: async () => {
                return await getNames();
            },
        },
        order: 2,
    },

};

In your .tsx file
 const formData = useForm(testSchema);

    useEffect(() => {
        setHasUnsavedChanges(formData.getChangedData() !== undefined);
    }, [formData]);

    const SubmitButton = () => {
        return (
            <Button disabled={!formData.isValidForm()} onClick={onSubmit}>
                Submit form
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button disabled={!formData.isValidForm()} variant={'outlined'} onClick={onSave}>
                Save
            </Button>
        );
    };

return (
            <GeneratedForm
                formData={formData}
                editMode={false}
                buttons={[SubmitButton, SaveButton]}
            />
);
```

