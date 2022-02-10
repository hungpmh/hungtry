from mod1 import word_count, sum_ab
from packagee.text_processing import word_count as word_count_pkg

def print_hi(name):
    print ('Hi',{name})

if __name__ == '__main__':
    print_hi('PyCharm')
    print(sum_ab(1,2))
    words = word_count('Hung sldfkalk lfkdslak ldfklsakwf dfsal')
    print(len(words))
    words2 = word_count_pkg('fhdusahfushuas')
    print(len(words2))
    


