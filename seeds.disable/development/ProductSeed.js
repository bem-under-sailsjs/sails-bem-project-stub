var faker = require('faker');

module.exports = (function() {

    var mockData = [];

    for (var i = 0; i < 3; i++) {
        mockData.push({
            title: faker.company.catchPhrase(),
            image: faker.image.technics(),
            price: faker.finance.mask(3)
        });
    }

    return mockData;

}());

