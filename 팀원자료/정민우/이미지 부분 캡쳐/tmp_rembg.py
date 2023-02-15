# 파이썬 3.8 ~ 3.10 버전 중 하나에서
# pip install rembg 
# pip install -U Pillow
# 이후 실행할 것


from rembg import remove
from PIL import Image

input_path = 'input.jpg' # input image path
output_path = 'output.png' # output image path

input = Image.open(input_path) # load image
output = remove(input) # remove background
output.save(output_path) # save image