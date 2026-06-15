-- ==========================================
-- DEMO DATA - HEMODON v1.0
-- Compatible avec le schéma actuel
-- ==========================================

-- ==========================================
-- BLOOD CENTERS
-- ==========================================

INSERT INTO blood_centers (
    name,
    region,
    city,
    address,
    phone,
    email
)
VALUES
(
    'Centre National de Transfusion Sanguine',
    'Centre',
    'Yaoundé',
    'Bastos',
    '+237670000001',
    'cnts@hemodon.cm'
),
(
    'Centre Régional de Transfusion',
    'Littoral',
    'Douala',
    'Akwa',
    '+237670000002',
    'crts@hemodon.cm'
);

-- ==========================================
-- HOSPITALS
-- ==========================================

INSERT INTO hospitals (
    name,
    region,
    city,
    address,
    phone,
    email
)
VALUES
(
    'Hôpital Central de Yaoundé',
    'Centre',
    'Yaoundé',
    'Centre-ville',
    '+237680000001',
    'contact@hcy.cm'
),
(
    'Hôpital Général de Douala',
    'Littoral',
    'Douala',
    'Bonanjo',
    '+237680000002',
    'contact@hgd.cm'
),
(
    'Hôpital Laquintinie',
    'Littoral',
    'Douala',
    'Akwa',
    '+237680000003',
    'contact@hl.cm'
);

-- ==========================================
-- DONORS
-- ==========================================

INSERT INTO donors (
    donor_code,
    first_name,
    last_name,
    gender,
    date_of_birth,
    blood_group,
    weight,
    phone,
    email,
    region,
    city,
    is_eligible
)
VALUES

('DON-001','Jean','Mvondo','Male','1995-05-10','O+',72,'670100001','jean@demo.cm','Centre','Yaoundé',TRUE),

('DON-002','Paul','Nana','Male','1993-08-12','A+',75,'670100002','paul@demo.cm','Centre','Yaoundé',TRUE),

('DON-003','Marie','Ewane','Female','1998-01-20','B+',65,'670100003','marie@demo.cm','Littoral','Douala',TRUE),

('DON-004','Alice','Ngono','Female','1997-09-11','AB+',68,'670100004','alice@demo.cm','Centre','Yaoundé',TRUE),

('DON-005','Bruno','Fokou','Male','1991-02-16','O-',78,'670100005','bruno@demo.cm','Littoral','Douala',TRUE),

('DON-006','Sandra','Tchoumi','Female','1996-06-08','A-',60,'670100006','sandra@demo.cm','Ouest','Bafoussam',TRUE),

('DON-007','Kevin','Essomba','Male','1994-03-22','B-',80,'670100007','kevin@demo.cm','Littoral','Douala',TRUE),

('DON-008','Rachel','Meka','Female','1999-07-14','AB-',58,'670100008','rachel@demo.cm','Centre','Yaoundé',TRUE),

('DON-009','Christian','Nkou','Male','1992-11-02','O+',83,'670100009','christian@demo.cm','Centre','Yaoundé',TRUE),

('DON-010','Linda','Manga','Female','1997-12-19','A+',62,'670100010','linda@demo.cm','Littoral','Douala',TRUE);

-- ==========================================
-- DONATIONS
-- ==========================================

INSERT INTO donations (
    donor_id,
    center_id,
    donation_date,
    blood_group,
    volume_ml,
    hemoglobin,
    status,
    notes
)
VALUES

(1,1,'2026-01-10','O+',450,14.5,'Validated','Don validé'),
(2,1,'2026-01-12','A+',450,15.0,'Validated','Don validé'),
(3,2,'2026-01-15','B+',450,13.8,'Validated','Don validé'),
(4,1,'2026-01-18','AB+',450,14.2,'Validated','Don validé'),
(5,2,'2026-01-20','O-',450,15.3,'Validated','Don validé');

-- ==========================================
-- BLOOD STOCK
-- ==========================================

INSERT INTO blood_stock (
    center_id,
    blood_group,
    units_available,
    critical_threshold
)
VALUES

(1,'A+',25,10),
(1,'A-',8,10),
(1,'B+',19,10),
(1,'B-',6,10),
(1,'AB+',12,10),
(1,'AB-',4,10),
(1,'O+',30,10),
(1,'O-',3,10),

(2,'A+',22,10),
(2,'A-',5,10),
(2,'B+',15,10),
(2,'B-',7,10),
(2,'AB+',11,10),
(2,'AB-',2,10),
(2,'O+',27,10),
(2,'O-',4,10);

-- ==========================================
-- BLOOD REQUESTS
-- ==========================================

INSERT INTO blood_requests (
    hospital_id,
    requested_group,
    quantity,
    urgency,
    patient_reference,
    status
)
VALUES

(1,'O-',2,'Critical','PAT-001','Approved'),
(2,'A+',4,'High','PAT-002','Approved'),
(3,'B+',3,'Medium','PAT-003','Pending'),
(1,'AB+',1,'High','PAT-004','Delivered');

-- ==========================================
-- NOTIFICATIONS
-- ==========================================

INSERT INTO notifications (
    title,
    message,
    type,
    is_read
)
VALUES

(
    'Stock critique O-',
    'Le stock O- est inférieur au seuil critique.',
    'Critical',
    FALSE
),

(
    'Nouvelle demande urgente',
    'Une nouvelle demande urgente a été enregistrée.',
    'Warning',
    FALSE
),

(
    'Rappel de don',
    'Vous êtes de nouveau éligible pour un don de sang.',
    'Info',
    FALSE
);
