CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    HP INT NOT NULL,
    DMG INT NOT NULL,
    DEF INT NOT NULL,
    CLASS VARCHAR(255) NOT NULL
);

-- Inserção de personagens da Marvel
INSERT INTO characters (name, HP, DMG, DEF, CLASS) 
VALUES 
('Homem de Ferro', 800, 600, 500, 'Hero'),
('Thor', 900, 800, 600, 'Hero'),
('Wolverine', 1000, 700, 700, 'Hero'),
('Magneto', 800, 800, 400, 'Villain'),
('Deadpool', 700, 900, 400, 'Anti-Hero');

-- Inserção de personagens da DC Comics
INSERT INTO characters (name, HP, DMG, DEF, CLASS) 
VALUES 
('Superman', 1000, 900, 800, 'Hero'),
('Batman', 800, 700, 600, 'Hero'),
('Coringa', 600, 800, 300, 'Villain'),
('Arlequina', 700, 800, 400, 'Anti-Hero'),
('Flash', 800, 800, 400, 'Hero');