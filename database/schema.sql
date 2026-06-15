-- ==========================================
-- HEMODON v1.0
-- Database Schema
-- ==========================================

-- ==========================================
-- ROLES
-- ==========================================

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- USERS
-- ==========================================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30),

    password_hash VARCHAR(255) NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id)
        REFERENCES roles(id)
);

-- ==========================================
-- BLOOD CENTERS
-- ==========================================

CREATE TABLE blood_centers (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    region VARCHAR(150),
    city VARCHAR(150),

    address TEXT,

    phone VARCHAR(30),
    email VARCHAR(150),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- HOSPITALS
-- ==========================================

CREATE TABLE hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    region VARCHAR(150),
    city VARCHAR(150),

    address TEXT,

    phone VARCHAR(30),
    email VARCHAR(150),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- DONORS
-- ==========================================

CREATE TABLE donors (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NULL,

    donor_code VARCHAR(50) UNIQUE,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    gender ENUM('Male','Female') NOT NULL,

    date_of_birth DATE NOT NULL,

    blood_group ENUM(
        'A+','A-',
        'B+','B-',
        'AB+','AB-',
        'O+','O-'
    ) NOT NULL,

    weight DECIMAL(5,2),

    phone VARCHAR(30),
    email VARCHAR(150),

    region VARCHAR(150),
    city VARCHAR(150),

    address TEXT,

    last_donation_date DATE,

    is_eligible BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);

-- ==========================================
-- DONATIONS
-- ==========================================

CREATE TABLE donations (
    id INT AUTO_INCREMENT PRIMARY KEY,

    donor_id INT NOT NULL,
    center_id INT NOT NULL,

    donation_date DATE NOT NULL,

    blood_group ENUM(
        'A+','A-',
        'B+','B-',
        'AB+','AB-',
        'O+','O-'
    ) NOT NULL,

    volume_ml INT DEFAULT 450,

    hemoglobin DECIMAL(4,2),

    status ENUM(
        'Collected',
        'Validated',
        'Rejected'
    ) DEFAULT 'Collected',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (donor_id)
        REFERENCES donors(id),

    FOREIGN KEY (center_id)
        REFERENCES blood_centers(id)
);

-- ==========================================
-- BLOOD STOCK
-- ==========================================

CREATE TABLE blood_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,

    center_id INT NOT NULL,

    blood_group ENUM(
        'A+','A-',
        'B+','B-',
        'AB+','AB-',
        'O+','O-'
    ) NOT NULL,

    units_available INT DEFAULT 0,

    critical_threshold INT DEFAULT 10,

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (center_id)
        REFERENCES blood_centers(id)
);

-- ==========================================
-- BLOOD UNITS
-- ==========================================

CREATE TABLE blood_units (
    id INT AUTO_INCREMENT PRIMARY KEY,

    donation_id INT NOT NULL,

    unit_code VARCHAR(100) UNIQUE NOT NULL,

    blood_group ENUM(
        'A+','A-',
        'B+','B-',
        'AB+','AB-',
        'O+','O-'
    ) NOT NULL,

    collection_date DATE NOT NULL,

    expiration_date DATE NOT NULL,

    status ENUM(
        'Available',
        'Reserved',
        'Delivered',
        'Expired'
    ) DEFAULT 'Available',

    FOREIGN KEY (donation_id)
        REFERENCES donations(id)
);

-- ==========================================
-- BLOOD REQUESTS
-- ==========================================

CREATE TABLE blood_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,

    hospital_id INT NOT NULL,

    requested_group ENUM(
        'A+','A-',
        'B+','B-',
        'AB+','AB-',
        'O+','O-'
    ) NOT NULL,

    quantity INT NOT NULL,

    urgency ENUM(
        'Low',
        'Medium',
        'High',
        'Critical'
    ) DEFAULT 'Medium',

    patient_reference VARCHAR(150),

    status ENUM(
        'Pending',
        'Approved',
        'Rejected',
        'Delivered'
    ) DEFAULT 'Pending',

    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (hospital_id)
        REFERENCES hospitals(id)
);

-- ==========================================
-- NOTIFICATIONS
-- ==========================================

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    title VARCHAR(255) NOT NULL,

    message TEXT NOT NULL,

    type ENUM(
        'Info',
        'Warning',
        'Success',
        'Critical'
    ) DEFAULT 'Info',

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- ==========================================
-- AUDIT LOGS
-- ==========================================

CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    action VARCHAR(255) NOT NULL,

    entity_name VARCHAR(100),

    entity_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX idx_donor_blood_group
ON donors(blood_group);

CREATE INDEX idx_request_status
ON blood_requests(status);

CREATE INDEX idx_stock_group
ON blood_stock(blood_group);

CREATE INDEX idx_notification_user
ON notifications(user_id);