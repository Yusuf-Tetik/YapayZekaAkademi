# backend/config.py
import os
from dotenv import load_dotenv

# .env dosyasını yükle
load_dotenv()

# Ortam değişkenlerinden yapılandırmaları al
#DATABASE_URL = "postgresql://postgres:seydid07.@localhost:5432/mindsense"
DATABASE_URL="sqlite:///./mindsense.db"
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
PASSWORD_HASH_SCHEME = "bcrypt"
