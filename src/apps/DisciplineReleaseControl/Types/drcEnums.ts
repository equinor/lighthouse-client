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
    HtCTest = 'C-test',
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
    HtCTest = 'ELE19.3',
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
    PressureTest = 1,
    ChemicalCleaning = 2,
    HotOilFlushing = 3,
    Bolttensioning = 4,
    Painting = 5,
    HtTest = 6,
    Insulation = 7,
    BoxInsulation = 8,
    HtRetest = 9,
    HtCTest = 10,
    Marking = 11,
    Complete = 12,
}

export enum PipetestStatusOrder {
    Unknown = 0,
    PressureTest = 1,
    ChemicalCleaning = 2,
    HotOilFlushing = 3,
    Bolttensioning = 4,
    Painting = 5,
    HtTest = 6,
    Insulation = 7,
    BoxInsulation = 8,
    HtRetest = 9,
    HtCTest = 10,
    Marking = 11,
    Complete = 12,
}
