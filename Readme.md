# **Image Processing Project**
## **Summary**
> This project is mainly about dealing with images and rescaling it, then it will be downloaded to your machine. so first of all you need to install all depencineceies for this project.
***
## **How to use it ?**
### First :
```bash
npm install
```

### Then run this command : 
```bash
npm run start
```
### the server will start on [Click Here](http://localhost:3000/api/image)
add the query parameter to the link with 
- filename:
    -
    - the file name of the photo which exisit in the images folder **without jpg**
- width & height :
    - 
    - add the width and height respectivley to the link, and both must be a numbers.

# **Process Steps**
> ### when the server recived Request it passes through two middelwares:
> ## 1. validateQuary :  it checks if the quary is validated or not like if it empty or not. 
> ## 2. checkImage : it checks if the image is in the cache already or not if it dose it will send the file in the cache else it will generate one through next middleware.  
  
# Final 
The new processed photo will be add to the thumbnails folder  .

 