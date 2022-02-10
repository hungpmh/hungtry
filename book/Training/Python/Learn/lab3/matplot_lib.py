from matplotlib import pyplot as plt
labels = 'Vinaphone', 'Viettel', 'Mobifone', 'Vietnamobile'
sizes = [15, 50, 30, 5]
explode = (0.1, 0.1, 0.1, 0.1)
plt.pie(sizes, explode=explode, labels=labels,
autopct='%1.1f%%',
shadow=True, startangle=90)
plt.show()