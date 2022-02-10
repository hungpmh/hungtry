import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LinearRegression
x = [[5],[7],[8],[7],[2],[17],[2],[9],[4],[11],[12],[9]
,[6]]
y = [99,86,87,88,111,86,103,87,94,78,77,85,86]
model = LinearRegression()
model.fit(x, y)
coef = model.coef_
intercept = model.intercept_
def myfunc(x):
    return coef * x + intercept
mymodel = list(map(myfunc, x))
plt.scatter(x, y, color='red')
plt.xlabel('Years')
plt.ylabel('Speed')
plt.plot(x, mymodel)
plt.show