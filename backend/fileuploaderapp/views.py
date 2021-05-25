from django.shortcuts import render
from rest_framework.viewsets import ViewSet
import logging
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.core.files.storage import FileSystemStorage
import os
from django.http import FileResponse

# Create your views here.
logger = logging.getLogger(__name__)
class UploadViewSet(ViewSet):    


    def list(self, request):
        logger.error("the request is",request.GET)
        logger.info("being called",request.GET.get('filename'))
        filename = request.GET.get('filename')
        
        response = FileResponse(open(r'./DocumentStore/'+filename, 'rb'))
        

        return response

    def create(self, request):

        logger.error("it works")
        response = "it is good"
        response_dicts=[]

        fs = FileSystemStorage()
            #logger.error("is it there:",file_uploaded.name in os.listdir('./DocumentStore/'))
        if(os.path.exists('./DocumentStore/') != True):
                os.mkdir('./DocumentStore')
        

        for i in range(0,len(request.data),1):
            file_dict = {}
            file_uploaded = request.data.get('FILES_'+str(i))
            logger.error("the file upload type is:",(file_uploaded))
            content_type = file_uploaded.content_type
            logger.error("the content type is:",type(content_type))
            file_dict['name'] = file_uploaded.name
            file_dict['type'] = content_type
            response_dicts.append(file_dict)
                
            if (file_uploaded.name in os.listdir('./DocumentStore/') ):
                os.remove('./DocumentStore/'+file_uploaded.name)
            fs = FileSystemStorage('./DocumentStore/') 
            filename = fs.save(file_uploaded.name, file_uploaded)
            uploaded_file_url = fs.url(filename)
            logger.error("the url is:",uploaded_file_url)
            

            
            with open(r'C:\Users\srinidhi_kulkarni1\Dell Technologies\Share Point File Upload - Uploads\\'+file_uploaded.name, 'wb+') as destination:
                    for chunk in file_uploaded.chunks():
                        destination.write(chunk)
                    logger.error("pushed","pushed")
            
        response = response_dicts
        return Response(response)

    def delete(self, request):
        logger.error("the delete query params are:",request.GET.get('filename'))
        filename = request.GET.get('filename')
        os.remove(r'C:\Users\srinidhi_kulkarni1\Dell Technologies\Share Point File Upload - Uploads\\'+filename)
        response = "The {} file deleted successfully".format(filename)
        
        return Response(response)
