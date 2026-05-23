export const mockUsers = [
    {
        id: "1",
        nome: "Leonardo Campos",
        email: "tutor1@petcore.com",
        senha: "123456",
        tipoPerfil: "tutor",
        telefone: "(11) 99999-9999",
        genero: "Masculino",
        nascimento: "16/07/1995",
    },
    {
        id: "2",
        nome: "Deise Almeida",
        email: "tutor2@petcore.com",
        senha: "123456",
        tipoPerfil: "tutor",
        telefone: "(11) 99999-9998",
        genero: "Feminino",
        nascimento: "10/05/1990",
    },
    {
        id: "VET1",
        nome: "Ariane Barroni",
        email: "vet1@petcore.com",
        senha: "123456",
        tipoPerfil: "veterinario",
        especializacao: "Clínica geral",
        clinica: "PetCore Clínica Veterinária",
        cnpj: "00.000.000/0001-00",
        nomeClinica: "PetCore Clínica Veterinária",
        cep: "00000-000",
        complemento: "Sala 10",
    },
    {
        id: "VET2",
        nome: "Guilherme Oliveira",
        email: "vet2@petcore.com",
        senha: "123456",
        tipoPerfil: "veterinario",
        especializacao: "Ortopedista",
        clinica: "Clínica Vida Animal",
        cnpj: "11.111.111/0001-11",
        nomeClinica: "Clínica Vida Animal",
        cep: "02000-000",
        complemento: "Unidade Centro",
    },
];

export const mockPets = [
    {
        id: "PET1",
        tutorId: "1",
        nome: "Bolt",
        nascimento: "01/05/2025",
        especie: "Canino",
        raca: "Golden Retriever",
        porte: "Grande",
        pelagem: "Dourada",
        sexo: "Macho",
        obitoInformado: false,
        comedouroStatus: "cheio",
    },
    {
        id: "PET2",
        tutorId: "1",
        nome: "Nina",
        nascimento: "10/02/2016",
        especie: "Canino",
        raca: "Bernese",
        porte: "Grande",
        pelagem: "Tricolor",
        sexo: "Fêmea",
        obitoInformado: false,
        comedouroStatus: "vazio",
    },
    {
        id: "PET3",
        tutorId: "2",
        nome: "Kitty",
        nascimento: "23/08/2025",
        especie: "Felino",
        raca: "SRD",
        porte: "Pequeno",
        pelagem: "Curta",
        sexo: "Fêmea",
        obitoInformado: false,
        comedouroStatus: "cheio",
    },
];

export const especializacoes = [
    "Clínica geral",
    "Dermatologia",
    "Cardiologia",
    "Ortopedia",
    "Oncologia",
    "Oftalmologia",
    "Endocrinologia",
];

export const clinicas = [
    {
        nome: "PetCore Clínica Veterinária",
        cnpj: "00.000.000/0001-00",
        cep: "01000-000",
        complemento: "Sala 10",
    },
    {
        nome: "Clínica Vida Animal",
        cnpj: "11.111.111/0001-11",
        cep: "02000-000",
        complemento: "Unidade Centro",
    },
    {
        nome: "Hospital Veterinário São Francisco",
        cnpj: "22.222.222/0001-22",
        cep: "03000-000",
        complemento: "Prédio principal",
    },
    {
        nome: "Vet Mais Saúde",
        cnpj: "33.333.333/0001-33",
        cep: "04000-000",
        complemento: "Loja 2",
    },
    {
        nome: "Centro Veterinário PetCare",
        cnpj: "44.444.444/0001-44",
        cep: "05000-000",
        complemento: "Térreo",
    },
];

export const examesDisponiveis = [
    "Hemograma completo",
    "Exame de urina",
    "Exame de fezes",
    "Raio-X",
    "Ultrassom abdominal",
    "Função renal",
    "Função hepática",
];

export const protocolos = [
    {
        id: "PROTO1",
        titulo: "Preventivo contra picadas",
        texto:
        "Pulgas, carrapatos e mosquitos podem transmitir doenças importantes aos pets. A prevenção pode ser feita com produtos tópicos, comprimidos ou coleiras específicas. Alguns produtos têm aplicação mensal, enquanto outros podem proteger por até três meses, conforme orientação do médico veterinário.",
    },
    {
        id: "PROTO2",
        titulo: "Vermifugação",
        texto:
        "A vermifugação ajuda a prevenir parasitas intestinais que podem causar perda de peso, diarreia, anemia e outros problemas. A frequência varia conforme idade, ambiente, hábitos do pet e risco de exposição.",
    },
    {
        id: "PROTO3",
        titulo: "FIV e FeLV",
        texto:
        "FIV e FeLV são doenças virais que acometem gatos. A testagem é importante, especialmente em felinos resgatados, com acesso à rua ou que convivem com outros gatos.",
    },
];