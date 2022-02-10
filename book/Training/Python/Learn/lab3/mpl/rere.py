import re
sentence = 'This is a sample string, sammmple'
x = re.sub("\s", "-", sentence)
print(x)