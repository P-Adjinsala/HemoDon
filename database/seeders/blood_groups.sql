-- ==========================================
-- BLOOD_GROUPS.SQL
-- Référentiel des groupes sanguins
-- ==========================================

CREATE TABLE IF NOT EXISTS blood_groups (

    id INT AUTO_INCREMENT PRIMARY KEY,

    code VARCHAR(5) NOT NULL UNIQUE,

    description VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO blood_groups (
    code,
    description
)
VALUES
('A+',  'A Rhésus positif'),
('A-',  'A Rhésus négatif'),
('B+',  'B Rhésus positif'),
('B-',  'B Rhésus négatif'),
('AB+', 'AB Rhésus positif'),
('AB-', 'AB Rhésus négatif'),
('O+',  'O Rhésus positif'),
('O-',  'O Rhésus négatif');
```
