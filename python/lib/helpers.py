from uuid import uuid4
from flask import session

def set_session():
  if not 'session_id' in session:
    session['session_id'] = str(uuid4())