-- ==========================================
-- 003_DONATIONS.SQL
-- Gestion des dons de sang
-- ==========================================

CREATE TABLE donations (

    id INT AUTO_INCREMENT PRIMARY KEY,

    donor_id INT NOT NULL,

    center_id INT NOT NULL,

    donation_code VARCHAR(50) NOT NULL UNIQUE,

    donation_date DATETIME NOT NULL,

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

    donation_type ENUM(
        'Whole Blood',
        'Plasma',
        'Platelets'
    ) DEFAULT 'Whole Blood',

    volume_ml INT DEFAULT 450,

    hemoglobin DECIMAL(4,2),

    blood_pressure VARCHAR(20),

    pulse_rate INT,

    weight DECIMAL(5,2),

    screening_status ENUM(
        'Pending',
        'Passed',
        'Failed'
    ) DEFAULT 'Pending',

    status ENUM(
        'Collected',
        'Validated',
        'Rejected'
    ) DEFAULT 'Collected',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_donation_donor
        FOREIGN KEY (donor_id)
        REFERENCES donors(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_donation_center
        FOREIGN KEY (center_id)
        REFERENCES blood_centers(id)
);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX idx_donation_date
ON donations(donation_date);

CREATE INDEX idx_donation_donor
ON donations(donor_id);

CREATE INDEX idx_donation_group
ON donations(blood_group);

CREATE INDEX idx_donation_status
ON donations(status);
```
