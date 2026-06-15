-- ==========================================
-- 006_HOSPITALS.SQL
-- Gestion des hôpitaux partenaires
-- ==========================================

CREATE TABLE hospitals (

    id INT AUTO_INCREMENT PRIMARY KEY,

    hospital_code VARCHAR(50) NOT NULL UNIQUE,

    name VARCHAR(255) NOT NULL,

    hospital_type ENUM(
        'Public',
        'Private',
        'Military',
        'Faith-Based',
        'University'
    ) DEFAULT 'Public',

    region VARCHAR(150) NOT NULL,

    city VARCHAR(150) NOT NULL,

    address TEXT,

    phone VARCHAR(30),

    emergency_phone VARCHAR(30),

    email VARCHAR(150),

    contact_person VARCHAR(150),

    latitude DECIMAL(10,8),

    longitude DECIMAL(11,8),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX idx_hospital_code
ON hospitals(hospital_code);

CREATE INDEX idx_hospital_name
ON hospitals(name);

CREATE INDEX idx_hospital_region
ON hospitals(region);

CREATE INDEX idx_hospital_city
ON hospitals(city);
```
