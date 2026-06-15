-- ==========================================
-- 004_REQUESTS.SQL
-- Gestion des demandes de sang
-- ==========================================

CREATE TABLE blood_requests (

    id INT AUTO_INCREMENT PRIMARY KEY,

    request_code VARCHAR(50) NOT NULL UNIQUE,

    hospital_id INT NOT NULL,

    requested_group ENUM(
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-'
    ) NOT NULL,

    quantity_requested INT NOT NULL,

    quantity_approved INT DEFAULT 0,

    urgency_level ENUM(
        'Low',
        'Medium',
        'High',
        'Critical'
    ) DEFAULT 'Medium',

    patient_reference VARCHAR(150),

    patient_age INT,

    diagnosis TEXT,

    request_reason TEXT,

    status ENUM(
        'Pending',
        'Approved',
        'Rejected',
        'Partially Delivered',
        'Delivered',
        'Cancelled'
    ) DEFAULT 'Pending',

    request_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    approval_date DATETIME NULL,

    delivery_date DATETIME NULL,

    approved_by INT NULL,

    remarks TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_request_hospital
        FOREIGN KEY (hospital_id)
        REFERENCES hospitals(id),

    CONSTRAINT fk_request_approved_by
        FOREIGN KEY (approved_by)
        REFERENCES users(id)
);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX idx_request_code
ON blood_requests(request_code);

CREATE INDEX idx_request_status
ON blood_requests(status);

CREATE INDEX idx_request_urgency
ON blood_requests(urgency_level);

CREATE INDEX idx_request_group
ON blood_requests(requested_group);

CREATE INDEX idx_request_hospital
ON blood_requests(hospital_id);
```
