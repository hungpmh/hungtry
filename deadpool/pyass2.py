file = open('data.txt','r')
data = file.read()
words = data.lower().split()

print('So tu trong text file: ', len(words))
file.close()

dic = dict()
for i in words:
    if i[-1] == ',' or i[-1] == '.' or i[-1] == '?' or i[-1] == '!'           or i[-1] == ':' or i[-1] == ';':
        i = i[0:-1]
        if i in dic:
            dic[i] = dic[i] + 1
        else:
            dic[i] = 1
    elif i in dic:
        dic[i] = dic[i] + 1
    else:
        dic[i] = 1
for key in list(dic.keys()):
    print(key,': ', dic[key])

file2 = open('voca.txt', 'w')
for key in list(dic.keys()):
    string = str(key) + ': ' + str(dic[key])
    file2.write(string + '\n')
file2 = open('voca.txt', 'r')
print(file2.read())
file2.close()  
