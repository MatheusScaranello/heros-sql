const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "rpg",
    password: "ds564",
    port: 5432,
});

app.get("/characters", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM characters");
        res.send(rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get("/characters/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM characters WHERE id = $1", [id]);
        res.send(rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post("/characters", async (req, res) => {
    const { name, HP, DMG, DEF, AGI, Class  } = req.body;
    try {
        await pool.query("INSERT INTO characters (name, HP, DMG, DEF, AGI, Class) VALUES ($1, $2, $3, $4, $5, $6)", [name, HP, DMG, DEF, AGI, Class]);
        res.send("Personagem adicionado com sucesso!");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put("/characters/:id", async (req, res) => {
    const { id } = req.params;
    const { name, HP, DMG, DEF, AGI, Class } = req.body;
    try {
        await pool.query("UPDATE characters SET name = $1, HP = $2, DMG = $3, DEF = $4, AGI = $5, Class = $6 WHERE id = $7", [name, HP, DMG, DEF, AGI, Class, id]);
        res.send("Personagem atualizado com sucesso!");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete("/characters/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM characters WHERE id = $1", [id]);
        res.send("Personagem deletado com sucesso!");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get("/fight/:id/:id2", async (req, res) => {
    const { id, id2 } = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM characters WHERE id = $1 OR id = $2", [id, id2]);
        const personagem1 = rows[0];
        const personagem2 = rows[1];
        if (!personagem1 || !personagem2) {
            res.send("Personagem não encontrado");
        }
        if (VerificaClass(personagem1.class) && VerificaClass(personagem2.class)) {
            const { HP, DMG, DEF } = Vantagens(personagem1.class, personagem1.hp, personagem1.dmg, personagem1.def, personagem2.class);
            personagem1.hp = HP;
            personagem1.dmg = DMG;
            personagem1.def = DEF;
            personagem2.hp = HP;
            personagem2.dmg = DMG;
            personagem2.def = DEF;
        }
        let winner = null;
        let round = 1;
        while (personagem1.hp > 0 && personagem2.hp > 0) {
            personagem2.hp -= personagem1.dmg - personagem2.def;
            personagem1.hp -= personagem2.dmg - personagem1.def;
            round++;
        }
        if (personagem1.hp <= 0) {
            winner = personagem2;
        } else {
            winner = personagem1;
        }
        res.send({ winner, round });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀🚀`);
});

const VerificaClass = (Class) => {
    if (Class == "Hero" || Class == "Villain" || Class == "Anti-Hero") {
        return true;
    }
    return false;
};

const Vantagens = (Class, HP, DMG, DEF, adversarioClass) => {
    if (Class == "Hero" && adversarioClass == "Villain") {
        HP += 100;
        DMG += 0;
        DEF += 0;
    } else if (Class == "Villain" && adversarioClass == "Anti-Hero") {
        HP += 20;
        DMG += 40;
        DEF += 10;
    } else if (Class == "Anti-Hero" && adversarioClass == "Hero") {
        HP += 0;
        DMG += 10;
        DEF += 120;
    }
    return { HP, DMG, DEF };
};