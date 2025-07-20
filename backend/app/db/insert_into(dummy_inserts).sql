-- Öğrenciler
INSERT INTO users (name, email, password_hash, role) VALUES
('Ali Veli', 'ali@student.com', 'hashed_pass1', 'student'),
('Ayşe Yılmaz', 'ayse@student.com', 'hashed_pass2', 'student');

-- Öğretmen
INSERT INTO users (name, email, password_hash, role) VALUES
('Mehmet Hoca', 'mehmet@teacher.com', 'hashed_pass3', 'teacher');

-- Rehber Öğretmen
INSERT INTO users (name, email, password_hash, role) VALUES
('Zeynep Danışman', 'zeynep@counselor.com', 'hashed_pass4', 'counselor');

-- Dersler
INSERT INTO subjects (name) VALUES
('Matematik'), ('Fen Bilimleri');

INSERT INTO topics (subject_id, name) VALUES
(1, 'Çarpma İşlemi'), (1, 'Bölme İşlemi'),
(2, 'Fotosentez'), (2, 'Işık ve Ses');


-- Ali Veli'nin chat geçmişi
INSERT INTO chat_logs (student_id, topic_id, question, student_answer, system_feedback, emotion_detected)
VALUES
(1, 5, '2x3 kaç eder?', '6', 'Harika, doğru cevap!', 'joy'),
(1, 6, '10 / 2 kaç eder?', '5', 'Aferin!', 'joy');


INSERT INTO student_emotions (student_id, emotion_label, emotion_score, message)
VALUES
(6, 'sadness', 0.85, 'Bugün hiç iyi hissetmiyorum.'),
(7, 'anger', 0.78, 'Bu konu çok zor, sinir oldum.');

-- Zeynep Danışman'a uyarı gönder
INSERT INTO emotion_notifications (student_id, counselor_id, emotion_id, risk_level, message)
VALUES
(6, 1, 7, 'high', 'Ali Veli ciddi şekilde üzgün görünüyor.');


INSERT INTO login_audit (user_id, ip_address, user_agent)
VALUES
(1, '192.168.1.2', 'Mozilla/5.0'),
(2, '192.168.1.3', 'Mozilla/5.0');
