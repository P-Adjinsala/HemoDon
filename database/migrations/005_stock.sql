-- ==========================================
-- 005_STOCK.SQL
-- Gestion du stock sanguin
-- ==========================================

CREATE TABLE blood_stock (

    id INT AUTO_INCREMENT PRIMARY KEY,

    center_id INT NOT NULL,

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

    units_available INT NOT NULL DEFAULT 0,

    critical_threshold INT NOT NULL DEFAULT 10,

    last_inventory_date DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_stock_center
        FOREIGN KEY (center_id)
        REFERENCES blood_centers(id)
        ON DELETE CASCADE
);

-- ==========================================
-- UNICITE PAR CENTRE ET GROUPE
-- ==========================================

ALTER TABLE blood_stock
ADD CONSTRAINT uq_stock_center_group
UNIQUE(center_id, blood_group);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX idx_stock_group
ON blood_stock(blood_group);

CREATE INDEX idx_stock_center
ON blood_stock(center_id);

CREATE INDEX idx_stock_units
ON blood_stock(units_available);
```
