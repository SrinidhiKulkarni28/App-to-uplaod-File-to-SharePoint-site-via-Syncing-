from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework_bulk.routes import BulkRouter
from django.conf.urls.static import static
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
router = BulkRouter()
router.register(r'upload',views.UploadViewSet,basename="upload")


urlpatterns = [
	# path('', views.home_view, name='home_view'),
    path('fileuploaderapp/', include(router.urls)),

]   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)