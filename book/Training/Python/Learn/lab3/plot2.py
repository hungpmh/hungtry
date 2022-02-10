from matplotlib import pyplot as plt
import numpy as np 
x = np.linspace(-10, 10, 50)
y= x**2
fig= plt.figure()
ax= fig.add_axes([1,2,2,2])
ax.plot(x, y)
ax.set_xlabel('X Label')
ax.set_ylabel('Y Label')
ax.set_title('Plot using OOP')
plt.show()