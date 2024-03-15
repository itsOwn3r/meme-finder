# Meme Finder


This is a great project to keep track of your **Memes**. This project is made to be run on localhost, where [Tesseract](https://github.com/tesseract-ocr/tesseract) extracts text from the image and saves it to the database; alongside all the other data that can be set for the Meme. [See Here](https://meme.own3r.me/new)

You can search for the Memes, by:

`title`

`description`

`OCR`

`category`

`source`

`tags`





![Meme-Finder-min](https://github.com/itsOwn3r/meme-finder/assets/119396660/73f6afda-8591-44cd-85f7-712902a4856a)



## Keep in mind
* Sending new Memes: In `prisma.schema` I've set `isActive` to `false` by default. in this case, after sending a new Meme, 404 page should appear. if `isActive` is set to `true`, you would be redirected to the new Meme's page.
* Tesseract: If you want to use Tesseract, after installing it, you should set an environment variable `IS_OCR_ACTIVE="yes"`.
* Uploading images: Im using Cloudinary here, so don't forget to set `cloud_name` and `upload_preset` as environment variables.
