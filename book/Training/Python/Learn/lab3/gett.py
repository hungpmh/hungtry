import requests
url = 'https://web.com'
#use the 'headers' parameter to set the HTTP headers:
x = requests.get(url, headers = {"HTTP_HOST": "MyVeryOwnHost"})
print(x.text)

