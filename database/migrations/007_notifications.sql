-- ==========================================
-- 007_NOTIFICATIONS.SQL
-- Gestion des notifications
-- ==========================================

CREATE TABLE notifications (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NULL,

    title VARCHAR(255) NOT NULL,

    message TEXT NOT NULL,

    notification_type ENUM(
        'System',
        'Stock',
        'Donation',
        'Request',
        'Reminder',
        'Email',
        'SMS'
    ) DEFAULT 'System',

    priority ENUM(
        'Low',
        'Medium',
        'High',
        'Critical'
    ) DEFAULT 'Medium',

    delivery_channel ENUM(
        'InApp',
        'Email',
        'SMS',
        'Push'
    ) DEFAULT 'InApp',

    status ENUM(
        'Pending',
        'Sent',
        'Delivered',
        'Read',
        'Failed'
    ) DEFAULT 'Pending',

    sent_at DATETIME NULL,

    read_at DATETIME NULL,

    metadata JSON NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX idx_notification_user
ON notifications(user_id);

CREATE INDEX idx_notification_status
ON notifications(status);

CREATE INDEX idx_notification_priority
ON notifications(priority);

CREATE INDEX idx_notification_type
ON notifications(notification_type);

CREATE INDEX idx_notification_created
ON notifications(created_at);
```
