"""
WSGI config for pangeos project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os, sys

from django.core.wsgi import get_wsgi_application
#sys.path.append('/var/www/pangeos.com/')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pangeos.settings')
#os.environ['DJANGO_SETTINGS_MODULE'] = "pangeos.settings"

application = get_wsgi_application()
