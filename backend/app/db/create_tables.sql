-- Kullanıcılar (Öğrenci, Öğretmen, Danışman)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('student', 'teacher', 'counselor', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dersler
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Konular
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL
);

-- Duygu Analizi Geçmişi
CREATE TABLE student_emotions (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id) ON DELETE CASCADE,
    emotion_label VARCHAR(50), -- sadness, anger, joy, etc.
    emotion_score NUMERIC(4,3),
    message TEXT,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mesajlaşma Kayıtları
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    message TEXT NOT NULL,
    is_voice BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Duygu Uyarı Bildirimleri
CREATE TABLE emotion_notifications (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id),
    counselor_id INT REFERENCES users(id),
    emotion_id INT REFERENCES student_emotions(id),
    risk_level VARCHAR(10) CHECK (risk_level IN ('low', 'medium', 'high')),
    message TEXT,
    notified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_acknowledged BOOLEAN DEFAULT FALSE
);

-- Chatbot Logları
CREATE TABLE chat_logs (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id),
    topic_id INT REFERENCES topics(id),
    question TEXT,
    student_answer TEXT,
    system_feedback TEXT,
    emotion_detected VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kullanıcı Giriş-Çıkış Logları
CREATE TABLE login_audit (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    ip_address VARCHAR(45),
    user_agent TEXT,
    logged_in_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
