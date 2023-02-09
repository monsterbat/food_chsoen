# Hash code to save password
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()

# return hash number
def create_hash(password):
    password = bcrypt.generate_password_hash(password=password)
    return password

# return True or False
def decode_hash(pure_password, hash_password):
    check_password = bcrypt.check_password_hash(hash_password, pure_password)
    return check_password