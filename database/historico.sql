CREATE TABLE historico (
    id SERIAL PRIMARY KEY,
    winner INT NOT NULL,
    loser INT NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (winner) REFERENCES characters(id),
    FOREIGN KEY (loser) REFERENCES characters(id)
);

SELECT c.name AS winner, c2.name AS loser, h.data 
FROM historico h
JOIN characters c ON c.id = h.winner
JOIN characters c2 ON c2.id = h.loser;