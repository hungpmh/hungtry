class Vehicle:
    def __init__(self, driverName, numberOfWheels, numberOfSeats):
        self.dname = driverName
        self.nwheels = numberOfWheels
        self.nseats = numberOfSeats
    def __str__(self):
        return f'This vehicle is driven by: {self.dname} and it has {self.nwheels} wheels'

class Taxi(Vehicle):
    def __init__(self, driverName, numberOfWheels, numberOfSeats, onDuty):
        super.__init__(driverName, numberOfWheels, numberOfSeats)
        self.oduty = onDuty

class Bus(Vehicle):
    def __init__(self, driverName, numberOfWheels, numberOfSeats, color):
        super.__init__(driverName, numberOfWheels, numberOfSeats)
        self.color = color

vehicle_1st = Vehicle('Tien',4,4)
print (vehicle_1st)