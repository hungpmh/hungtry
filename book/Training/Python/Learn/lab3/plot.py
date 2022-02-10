# Import module
from matplotlib import pyplot as plt
import numpy as np 
x = np.linspace(-10, 10, 50)
y= x**2
plt.subplot(1,2,1)
plt.plot(x, y)
plt.title('First Plot')
plt.subplot(1,2,2)
plt.plot(y, x)
plt.title('Second Plot')
plt.show()