const express = require("express");
const path = require("path");
const cors = require("cors")

const app = express();

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname)));

let avaliacoes = [
    {
        id: 1,
        nome: "Antônio B.",
        nota: 5,
        review: "Profissional excepcional, acolhedora e muito preparada. Transmite segurança e empatia desde o primeiro atendimento. Experiência extremamente positiva!"
    },
    {
        id: 2,
        nome: "Taianna S.",
        nota: 5,
        review: "Excelente profissional! Minha vida mudou completamente!"
    },
    {
        id: 3,
        nome: "Edson P.",
        nota: 5,
        review: "Foi muito importante, me ajudou e ajuda muito, indico com muita tranquilidade, ótima profissional, muito segura, vale a pena fazer uma consulta."
    },
    {
        id: 4,
        nome: "Carol M.",
        nota: 5,
        review: "Uma excelente profissional, extremamente dedicada e acolhedora. Indico de olhos fechados!"
    },
    {
        id: 5,
        nome: "Carlos S.",
        nota: 5,
        review: "Uma pessoa muito humana! Escuta atenciosa e com cuidado em cada detalhe!"
    },
];

let pacientes = [
    { 
        id: 1, 
        nome: "João Silva", 
        contato: 71999887777, 
        dataInicio: 1768446000000 
    },
    { 
        id: 2, 
        nome: "Maria Souza", 
        contato: 11988231476, 
        dataInicio: new Date('2026-05-20T00:00:00').getTime() 
    },
    { 
        id: 3, 
        nome: "José Luis", 
        contato: 71981162025, 
        dataInicio: new Date('2026-07-07T00:00:00').getTime() 
    },
    { 
        id: 4, 
        nome: "Giulia Santos", 
        contato: 71988231476, 
        dataInicio: new Date('2025-09-27T00:00:00').getTime() 
    },
    { 
        id: 5, 
        nome: "Carlos Santos", 
        contato: 73988231476, 
        dataInicio: new Date('2025-11-16T00:00:00').getTime() 
    },
];

app.get("/pacientes", (req, res) => {
    try {
        return res.status(200).json({ pacientes: pacientes });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar pacientes", error: String(error) });
    }
});

app.post("/paciente", (req, res) => {
    try {
        const { nome, contato, dataInicio } = req.body;

        if (!nome || !contato || !dataInicio) {
            return res.status(400).json({ message: "Preencha todos os campos." });
        }

        const novoPaciente = {
            id: pacientes.length > 0 ? pacientes[pacientes.length - 1].id + 1 : 1,
            nome: nome,
            contato: Number(contato),
            dataInicio: Number(dataInicio)
        };

        pacientes.push(novoPaciente);

        return res.status(201).json({ message: "Paciente cadastrado com sucesso!", novoPaciente });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao cadastrar paciente", error: String(error) });
    }
});

app.post("/login", async (req, res) => {
    try {
        
        const { nome, senha } = req.body

        if (!nome || !senha) {
            return res.status(400).json({
                message: "O campo de usuário ou senha não foi preenchido!"
            });
        }

        if (nome !== "admin" || senha !== "123456") {
            return res.status(401).json({
                message: "O nome de usuário ou senha está incorreto ou não foi cadastrado!"
            });
        }

        return res.status(200).json({
            id: 1,
            nome: "admin",
            email: "admin@email.com"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!",
            error: String(error)
        });
    }
});

app.get("/reviews", (req, res) => {
    try {
        return res.status(200).json({ reviews: avaliacoes});
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar as avaliações",
            error: String(error)
        });
    }
});

app.post("/review", (req, res) => {
    try {
        const { nome, nota, review } = req.body;

        if (!nome || !nota || !review) {
            return res.status(400).json({
                message: "Por favor, preencha todos os campos: nome, nota e avaliacao."
            });
        }

        const novaAvaliacao = {
            id: avaliacoes.length > 0 ? avaliacoes[avaliacoes.length - 1].id + 1 : 1,
            nome: nome,
            nota: nota,
            review: review
        };

        avaliacoes.push(novaAvaliacao);

        return res.status(201).json({
            message: "Avaliação adicionada com sucesso!",
            novaAvaliacao
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao adicionar a avaliação",
            error: String(error)
        });
    }
});

app.listen(3001, () => {
    console.log("API running on http://localhost:3001/");
});