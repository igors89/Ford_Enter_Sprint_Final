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