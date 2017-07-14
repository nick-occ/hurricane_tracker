import re

text = " AL162 016 "

print(text.strip())

m = re.search('^AL+\w*', text)

number = "40.7N"

print(number[:-1])

try:
    print(m.group(0))
except:
    pass