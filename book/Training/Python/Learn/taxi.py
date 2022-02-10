class Taxi:
    numberOfTaxi = 0
    def __init__ (self, driverName, onDuty, cities):
        self.dname = driverName
        self.oduty = onDuty
        self.cities = cities
        self.numPassergers = 0
        Taxi.numberOfTaxi = Taxi.numberOfTaxi + 1

    @classmethod
    def how_many(cls):
        return cls.numberOfTaxi
    
first_tx = Taxi('Tien', True, ['HN','BN'])
second_tx = Taxi('Bao', False, ['HCM','CM'])

print (f'{first_tx.dname} is driving {first_tx.numPassergers} passenger. \n Currently we have : {Taxi.how_many()} taxis')