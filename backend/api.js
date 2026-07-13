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
        nome: "Ana Silva",
        nota: 5,
        avaliacao: "Excelente sistema, muito rápido!"
    },
    {
        id: 2,
        nome: "Carlos Eduardo",
        nota: 4,
        avaliacao: "Muito bom, mas poderia ter um modo escuro."
    }
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
        // Retorna o array contendo id, nome, nota e avaliacao
        return res.status(200).json(avaliacoes);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar as avaliações",
            error: String(error)
        });
    }
});

app.post("/review", (req, res) => {
    try {
        // Recebe os dados do corpo da requisição (body)
        const { nome, nota, avaliacao } = req.body;

        // Validação simples para garantir que os dados vieram corretos
        if (!nome || !nota || !avaliacao) {
            return res.status(400).json({
                message: "Por favor, preencha todos os campos: nome, nota e avaliacao."
            });
        }

        // Cria o novo objeto simulando um ID auto-incrementado
        const novaAvaliacao = {
            id: avaliacoes.length > 0 ? avaliacoes[avaliacoes.length - 1].id + 1 : 1,
            nome: nome,
            nota: nota,
            avaliacao: avaliacao
        };

        // Adiciona a nova avaliação ao array em memória
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