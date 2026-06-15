-- ==========================================
-- ADMIN.SQL
-- Données initiales HemoDon
-- ==========================================

-- ==========================
-- ROLES
-- ==========================

INSERT INTO roles (name, description)
VALUES
('ADMIN', 'Administrateur système'),
('DONOR', 'Donneur de sang'),
('CENTER', 'Centre de collecte'),
('HOSPITAL', 'Hôpital partenaire');

-- ==========================
-- ADMINISTRATEUR PAR DEFAUT
-- ==========================
-- Mot de passe : Admin@123
-- Remplacer le hash en production

INSERT INTO users (
    role_id,
    first_name,
    last_name,
    email,
    phone,
    password_hash,
    is_active
)
VALUES (
    1,
    'System',
    'Administrator',
    'admin@hemodon.com',
    '+237000000000',
    '$2b$10$XW7Q2r5QmM0M3Wn5wM0YcOq2Xg2K4zv0j5N2P5Yx0X7fF9jR4kK6K',
    TRUE
);

-- ==========================
-- CENTRE DE COLLECTE DEMO
-- ==========================

INSERT INTO blood_centers (
    name,
    region,
    city,
    address,
    phone,
    email
)
VALUES (
    'Centre National de Transfusion Sanguine',
    'Centre',
    'Yaoundé',
    'Yaoundé, Cameroun',
    '+237000000001',
    'cnts@hemodon.org'
);

-- ==========================
-- HOPITAL DEMO
-- ==========================

INSERT INTO hospitals (
    name,
    region,
    city,
    address,
    phone,
    email
)
VALUES (
    'Hôpital Central',
    'Centre',
    'Yaoundé',
    'Yaoundé, Cameroun',
    '+237000000002',
    'hospital@hemodon.org'
);
```
