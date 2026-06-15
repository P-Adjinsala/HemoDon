-- ==========================================
-- 002_DONORS.SQL
-- Gestion des donneurs de sang
-- ==========================================

CREATE TABLE donors (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NULL,

    donor_code VARCHAR(50) NOT NULL UNIQUE,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    gender ENUM(
        'Male',
        'Female'
    ) NOT NULL,

    date_of_birth DATE NOT NULL,

    blood_group ENUM(
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-'
    ) NOT NULL,

    weight DECIMAL(5,2),

    phone VARCHAR(30),

    email VARCHAR(150),

    region VARCHAR(150),

    city VARCHAR(150),

    address TEXT,

    occupation VARCHAR(150),

    emergency_contact_name VARCHAR(150),

    emergency_contact_phone VARCHAR(30),

    last_donation_date DATE NULL,

    next_eligible_date DATE NULL,

    total_donations INT DEFAULT 0,

    is_eligible BOOLEAN DEFAULT TRUE,

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_donor_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX idx_donor_code
ON donors(donor_code);

CREATE INDEX idx_donor_blood_group
ON donors(blood_group);

CREATE INDEX idx_donor_phone
ON donors(phone);

CREATE INDEX idx_donor_city
ON donors(city);

CREATE INDEX idx_donor_eligible
ON donors(is_eligible);
```
