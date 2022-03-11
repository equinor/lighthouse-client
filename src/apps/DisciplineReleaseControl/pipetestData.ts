export const pipetestData = [
    {
        //finn alle checkList som har tag.register pipe test (pt)
        name: '5602-L057', // Er samme som tag no tatt bort #T-XXXX (dette nr kan kobles til mcpkg)
        description: 'Pipetest 1', // Kommer fra mcpkg link
        dueDate: '2022-01-25T00:00:00.000000Z',
        checkLists: [
            {
                tagNo: '#T-5602-L057',
                responsible: 'KVF',
                formType: 'PIP04',
                status: 'OK', // sjekk feil i fam med Tord
                commPk: '5602-M03', // for info senere
                mcPk: '5602-L057', // for info senere
                // ta med felt for id til sjekkliste - nyttig for link i frontend mot procosys
                mcStatus: 'Completed',
            },
            {
                tagNo: '#M-5602-L057',
                responsible: 'KVF',
                formType: 'PIP06',
                status: 'OK',
                commPk: '5650-M01',
                mcPk: '5650-S007',
                mcStatus: 'Inactive',
            },
            {
                tagNo: '#Z-5602-L057',
                responsible: 'KVF',
                formType: 'ING04',
                status: 'OK',
                commPk: '5650-M01',
                mcPk: '5650-C007',
                mcStatus: 'Inactive',
            },
            {
                tagNo: '#X-5602-L057',
                responsible: 'KVF',
                formType: 'SUR05',
                status: 'OK',
                commPk: '5650-M01',
                mcPk: '5650-M007',
                mcStatus: 'Completed',
            },
            // {
            //     tagNo: '#T-5602-L057',
            //     responsible: 'KSI',
            //     formType: 'PIP04',
            //     status: 'OS',
            //     commPk: '5602-M03',
            //     mcPk: '5602-L057',
            //     mcStatus: "Completed",
            // },
        ],

        // hva mangler her - varmekabler osv - har bare prosessoversikt nå
        // tabell i MIPS som er testnr og varmekabel
        // når vi har fått tagnr på varmekabler så kan vi finne checkLists som hører til varmekabel
        // disse sjekklistene hører da også til pipe test
        // varmekabler er separat i pcs

        // har enda ikke bestem om vi skal ha et pipe test objekt med checkList og neste steg som skal signeres
        // eller basert på oppgaver/task for
        // spesielt ved endringer senere så er signerings workflow nyttig - ikke i pcs

        // bør ta utgangspunkt i at dette er signaturbasert/workflow og bruke sjekklister som info på warning osv

        lineAndSpools: [
            ['56L00420A', '0855'],
            ['56L00420B', '0856'],
            ['56L00440A', '0857'],
            ['56L00446A', '0858'],
        ],

        tagTree: {
            '': {
                register: '',
                children: ['82EL068-417'],
            },
            '56L00420A': {
                register: 'LINE',
                children: [],
            },
            '56L00420B': {
                register: 'LINE',
                children: [],
            },
            '56L00440A': {
                register: 'LINE',
                children: [],
            },
            '56L00446A': {
                register: 'LINE',
                children: [],
            },
            '82EL068-417': {
                register: 'CIRCUIT_AND_STARTER',
                children: ['PT560747A'],
            },
            '82EL068-417-B01': {
                register: 'JUNCTION_BOX',
                children: ['HT560747A'],
            },
            HT560747A: {
                register: 'HEAT_TRACING_CABLE',
                children: ['56L00420A', '56L00420B', '56L00440A', '56L00446A'],
            },
            PT560747A: {
                register: 'CABLE',
                children: ['82EL068-417-B01'],
            },
        },
    },
    {
        //finn alle checkList som har tag.register pipe test (pt)
        name: '5602-L058', // Er samme som tag no tatt bort #T-XXXX (dette nr kan kobles til mcpkg)
        description: 'Pipetest 2', // Kommer fra mcpkg link
        dueDate: '2022-02-25T00:00:00.000000Z',
        checkLists: [
            {
                tagNo: '#T-5602-L058',
                responsible: 'KVF',
                formType: 'PIP04',
                status: 'OK', // sjekk feil i fam med Tord
                commPk: '5602-M03', // for info senere
                mcPk: '5602-L057', // for info senere
                // ta med felt for id til sjekkliste - nyttig for link i frontend mot procosys
                mcStatus: 'Completed',
            },
            {
                tagNo: '#M-5602-L058',
                responsible: 'KVF',
                formType: 'PIP06',
                status: 'OK',
                commPk: '5650-M01',
                mcPk: '5650-S007',
                mcStatus: 'Completed',
            },
            {
                tagNo: '#Z-5602-L058',
                responsible: 'KVF',
                formType: 'ING04',
                status: 'OK',
                commPk: '5650-M01',
                mcPk: '5650-C007',
                mcStatus: 'Completed',
            },
        ],

        lineAndSpools: [
            ['56L00420A', '0855'],
            ['56L00420B', '0856'],
            ['56L00440A', '0857'],
            ['56L00446A', '0858'],
        ],
        tagTree: {
            '': {
                register: '',
                children: ['82EL068-417'],
            },
            '56L00420A': {
                register: 'LINE',
                children: [],
            },
            '56L00420B': {
                register: 'LINE',
                children: [],
            },
            '56L00440A': {
                register: 'LINE',
                children: [],
            },
            '82EL068-417': {
                register: 'CIRCUIT_AND_STARTER',
                children: ['PT560747A'],
            },
            '82EL068-417-B01': {
                register: 'JUNCTION_BOX',
                children: ['PT560747B'],
            },
            HT560747A: {
                register: 'HEAT_TRACING_CABLE',
                children: ['56L00420A', '56L00420B', '56L00440A'],
            },
            PT560747A: {
                register: 'CABLE',
                children: ['82EL068-417-B01'],
            },
            PT560747B: {
                register: 'CABLE',
                children: ['82EL068-417-B02'],
            },
            '82EL068-417-B02': {
                register: 'JUNCTION_BOX',
                children: ['HT560747A', 'PT560747C'],
            },
            PT560747C: {
                register: 'CABLE',
                children: ['82EL068-417-B03'],
            },
            '82EL068-417-B03': {
                register: 'JUNCTION_BOX',
                children: ['HT560747B'],
            },
            HT560747B: {
                register: 'HEAT_TRACING_CABLE',
                children: ['56L00440Z', '56L00446X'],
            },
            '56L00440Z': {
                register: 'LINE',
                children: [],
            },
            '56L00446X': {
                register: 'LINE',
                children: [],
            },
        },
    },
    {
        //finn alle checkList som har tag.register pipe test (pt)
        name: '5602-L059', // Er samme som tag no tatt bort #T-XXXX (dette nr kan kobles til mcpkg)
        description: 'Pipetest 3', // Kommer fra mcpkg link
        dueDate: '2022-04-25T00:00:00.000000Z',
        checkLists: [
            {
                tagNo: '#T-5602-L059',
                responsible: 'KVF',
                formType: 'PIP04',
                status: 'OK', // sjekk feil i fam med Tord
                commPk: '5602-M03', // for info senere
                mcPk: '5602-L057', // for info senere
                // ta med felt for id til sjekkliste - nyttig for link i frontend mot procosys
                mcStatus: 'Completed',
            },
            {
                tagNo: '#M-5602-L059',
                responsible: 'KVF',
                formType: 'PIP06',
                status: 'OK',
                commPk: '5650-M01',
                mcPk: '5650-S007',
                mcStatus: 'Error',
            },
            {
                tagNo: '#Z-5602-L059',
                responsible: 'KVF',
                formType: 'ING04',
                status: 'OK',
                commPk: '5650-M01',
                mcPk: '5650-C007',
                mcStatus: 'Completed',
            },
        ],

        lineAndSpools: [
            ['56L00420A', '0855'],
            ['56L00420B', '0856'],
            ['56L00440A', '0857'],
            ['56L00446A', '0858'],
        ],
        tagTree: {
            '': {
                register: '',
                children: ['82EL068-417, 82EL068-418'],
            },
            '56L00420A': {
                register: 'LINE',
                children: [],
            },
            '56L00446A': {
                register: 'LINE',
                children: [],
            },
            '56L00446K': {
                register: 'LINE',
                children: [],
            },
            '82EL068-417': {
                register: 'CIRCUIT_AND_STARTER',
                children: ['PT560747A'],
            },
            '82EL068-417-B01': {
                register: 'JUNCTION_BOX',
                children: ['HT560747A'],
            },
            HT560747A: {
                register: 'HEAT_TRACING_CABLE',
                children: ['56L00420A', '56L00446A', '56L00446K'],
            },
            PT560747A: {
                register: 'CABLE',
                children: ['82EL068-417-B01'],
            },
            '56L00420B': {
                register: 'LINE',
                children: [],
            },
            '56L00446B': {
                register: 'LINE',
                children: [],
            },
            '82EL068-418': {
                register: 'CIRCUIT_AND_STARTER',
                children: ['PT560747B'],
            },
            '82EL068-417-B02': {
                register: 'JUNCTION_BOX',
                children: ['HT560747B'],
            },
            HT560747B: {
                register: 'HEAT_TRACING_CABLE',
                children: ['56L00420B', '56L00446B'],
            },
            PT560747B: {
                register: 'CABLE',
                children: ['82EL068-417-B02'],
            },
        },
    },
];

// export const checkLists = [
//     {
//         tagNo: '#T-5602-L057',
//         responsible: 'KVF',
//         formType: 'PIP04',
//         status: 'OK', // sjekk feil i fam med Tord
//         commPk: '5602-M03', // for info senere
//         mcPk: '5602-L057', // for info senere
//         // ta med felt for id til sjekkliste - nyttig for link i frontend mot procosys
//     },
//     {
//         tagNo: '#M-5602-L057',
//         responsible: 'KVF',
//         formType: 'PIP06',
//         status: 'OK',
//         commPk: '5650-M01',
//         mcPk: '5650-S007',
//     },
//     {
//         tagNo: '#Z-5602-L057',
//         responsible: 'KVF',
//         formType: 'ING04',
//         status: 'OK',
//         commPk: '5650-M01',
//         mcPk: '5650-C007',
//     },
//     {
//         tagNo: '#X-5602-L057',
//         responsible: 'KVF',
//         formType: 'SUR05',
//         status: 'OK',
//         commPk: '5650-M01',
//         mcPk: '5650-M007',
//     },
//     {
//         tagNo: '#T-5602-L057',
//         responsible: 'KSI',
//         formType: 'PIP04',
//         status: 'OS',
//         commPk: '5602-M03',
//         mcPk: '5602-L057',
//     },
// ];
