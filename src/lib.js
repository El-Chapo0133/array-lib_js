

class BasicQuery {
    constructor() {
        this.array;
        this.toReturn = [];
    }
    in(array) {
        this.array = array;
        return this;
    }
    where(lambda) {
        for (let i = 0; i < this.array.length; i++) {

            let value = this.array[i];

            const lambdaParsed = eval(lambda.toString());

            if (lambdaParsed()) {
                this.toReturn.push(this.array[i]);
            }
        }
        return this;
    }
    orderAscendant() {
        this.toReturn.sort((a, b) => {
            return a - b;
        });
        return this;
    }
    orderDescendant() {
        this.toReturn.sort((a, b) => {
            return b - a;
        });
        return this;
    }
    get() {
        return this.toReturn;
    }
}

class AdvancedQuery {
    constructor() {
        this.array;
        this.value_names = [];

        this.toReturn = [];
    }

    from(value) {
        this.value_names.push(value);
        return this;
    }
    in(array) {
        this.array = array;
        return this;
    }
    where(lambda) {
        for (let i = 0; i < this.array.length; i++) {

            let values = {};
            for (let x = 0; x < this.value_names.length; x++) {
                values[this.value_names[x]] = this.array[i][this.value_names[x]];
            }


            const lambdaParsed = eval(lambda.toString());

            if (lambdaParsed()) {
                this.toReturn.push(this.array[i]);
            }
        }
        return this;
    }
    select(...names) {
        let newResult = [];
        for (let i = 0; i < this.toReturn.length; i++) {
            let temp = {};
            for (let key in this.toReturn[i]) {
                names.forEach(name => {
                    if (key == name) {
                        temp[key] = this.toReturn[i][key];
                    }
                });
            }
            newResult.push(temp);
        }
        this.toReturn = newResult;
        return this;
    }
    orderby(value) {
        if (typeof(this.toReturn[0][value]) == "number") {
            this.toReturn.sort((a, b) => {
                return a[value] - b[value];
            });
        } else {
            this.toReturn.sort((a, b) => {
                return a[value].localeCompare(b[value]);
            });

        }

        return this;
    }

    get() {
        return this.toReturn;
    }
}

module.exports = {
    BasicQuery: BasicQuery,
    AdvancedQuery: AdvancedQuery,
}