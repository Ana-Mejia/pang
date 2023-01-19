import random
from PIL import Image
from captcha.image import ImageCaptcha

def getCaptcha():
    _chars = 'ABCDEFGHJKLMNPQRSTUVWXY23456789'
    chars = random.sample(_chars, 4)
    #image = ImageCaptcha(width=150, height=60, fonts=['/var/www/pangeos.com/static/fonts/LibreBaskervilleRegular.ttf','/var/www/pangeos.com/static/fonts/UbuntuRegular.ttf','/var/www/pangeos.com/static/fonts/PlayfairDisplayItalicVariableFontwght.ttf'])
    image = ImageCaptcha(width=150, height=60, fonts=['./static/fonts/LibreBaskerville-Regular.ttf','./static/fonts/Ubuntu-Regular.ttf','./static/fonts/Merriweather-Regular.ttf','./static/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf'])
    data = image.generate(chars)
    try:
        #image.write(chars,'/var/www/pangeos.com/static/captcha/c.png')
        image.write(chars,'static/captcha/c.png')
    except:
        print("Error write captcha")
    i = Image.new("RGB", (300, 50))
    i.save(data, 'PNG')
    d = {
        "data":i,
        "chars":chars
    }
    return d

