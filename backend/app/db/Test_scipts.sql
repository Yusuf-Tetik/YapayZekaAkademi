--Test Queries
-- Son 24 saatte en çok hangi öğrenci duygu bildirimi aldı?
-- Last 24 hours which students got emotion notification ?

SELECT u.name, COUNT(en.id) AS notification_count
FROM emotion_notifications en
JOIN users u ON u.id = en.student_id
WHERE en.notified_at > NOW() - INTERVAL '1 day'
GROUP BY u.name
ORDER BY notification_count DESC;

-- "Üzgün" (sadness) duygusu ile mesaj atan öğrenciler
-- The students who are sent message with anger emotion

SELECT u.name, se.message, se.emotion_score
FROM student_emotions se
JOIN users u ON u.id = se.student_id
WHERE emotion_label = 'sadness';


-- Her öğrencinin son mesajında hangi duygu tespit edildi?
-- Which emotion suspected for every student

SELECT u.name, se.emotion_label, se.message
FROM (
    SELECT DISTINCT ON (student_id) * 
    FROM student_emotions 
    ORDER BY student_id, detected_at DESC
) se
JOIN users u ON u.id = se.student_id;
