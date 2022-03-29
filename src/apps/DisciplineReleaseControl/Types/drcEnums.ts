export enum PipetestStep {
    Unknown = 'Unknown',
    Bolttensioning = 'Bolt tensioning',
    PressureTest = 'Pressure test',
    ChemicalCleaning = 'Chemical cleaning',
    HotOilFlushing = 'Hot oil flushing',
    Painting = 'Painting',
    HtTest = 'A-test',
    Insulation = 'Insulation',
    BoxInsulation = 'Box insulation',
    HtRetest = 'B-test',
    Marking = 'Marking',
    Complete = 'Complete',
}

export enum CheckListStepTag {
    Unknown = '#U',
    Bolttensioning = '#B',
    PressureTest = '#T',
    ChemicalCleaning = '#C',
    HotOilFlushing = '#H',
    Painting = '#X',
    HtTest = 'ELE19.1',
    Insulation = '#Z',
    BoxInsulation = '#I',
    HtRetest = 'ELE19.2',
    HtTemporary = 'ELE99',
    Marking = '#M',
    Complete = 'C',
}

export enum CheckListStatus {
    OK = 'OK',
    Outstanding = 'OS',
    PunchAError = 'PA',
    PunchBError = 'PB',
    Inactive = 'IN',
}

export enum PipetestCompletionStatus {
    Complete = 'Complete',
    Outstanding = 'Outstanding',
    PunchAError = 'PunchAError',
    PunchBError = 'PunchBError',
    Inactive = 'Inactive',
}

export enum PipetestCheckListOrder {
    Unknown = 0,
    Bolttensioning = 1,
    PressureTest = 2,
    Painting = 3,
    HtTest = 4,
    Insulation = 5,
    BoxInsulation = 6,
    HtRetest = 7,
    Marking = 8,
    Complete = 9,
}

export enum PipetestStatusOrder {
    Unknown = 0,
    Bolttensioning = 1,
    PressureTest = 2,
    Painting = 3,
    HtTest = 4,
    Insulation = 5,
    BoxInsulation = 6,
    HtRetest = 7,
    Marking = 8,
    Complete = 9,
}
