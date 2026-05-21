import os

from dotenv import load_dotenv
import psycopg

load_dotenv(".env.test")


def get_test_connection():
    return psycopg.connect(os.getenv("DATABASE_URL"))
