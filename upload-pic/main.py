import os
import tempfile
from google.cloud import storage
from werkzeug.utils import secure_filename
from functools import wraps

storage_client = storage.Client().from_service_account_json('./sa.json')

# Helper function that computes the filepath to save files to
def get_file_path(filename):
    # Note: tempfile.gettempdir() points to an in-memory file system
    # on GCF. Thus, any files in it must fit in the instance's memory.
    file_name = secure_filename(filename)
    return os.path.join(tempfile.gettempdir(), file_name)

def cors(handler):
    @wraps(handler)
    def wrapped(request):
        if request.method == 'OPTIONS':
            # Allows GET requests from any origin with the Content-Type
            # header and caches preflight response for an 3600s
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600'
            }

            return ('', 204, headers)

        return handler(request)
    return wrapped

@cors
def get_signed_url(request):
    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    
    files = request.files.to_dict()
    for file_name, file in files.items():
        temp_path = get_file_path(file_name)
        file.save(temp_path)
        blob = storage_client.bucket('jmkac-postcard').blob(file_name)
        blob.upload_from_filename(temp_path)
        os.remove(temp_path)
        
    return ('Ok', 201, headers)