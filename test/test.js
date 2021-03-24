const assert = require('assert');
const query = require('../src/lib.js');

describe("BasicQuery", () => {
    let input = [
        1,
        5,
        8,
        3,
        9,
        123,
        512,
        3.4,
        5
    ];
    it("Should have the right length", () => {
        let result = new query.BasicQuery().in(input)
                                        .where(() => { return value < 10; })
                                        .get();

        assert.strictEqual(result.length, 7);
    });

    it("Should orders correctly", () => {
        let outputAscendant = [1, 3, 3.4, 5, 5, 8, 9];
        let resultAscendant = new query.BasicQuery().in(input)
                                        .where(() => { return value < 10; })
                                        .orderAscendant()
                                        .get();
        let outputDescendant = [9, 8, 5, 5, 3.4, 3, 1];
        let resultDescendant = new query.BasicQuery().in(input)
                                        .where(() => { return value < 10; })
                                        .orderDescendant()
                                        .get();

        for (let i = 0; i < outputDescendant.length; i++) {
            assert.strictEqual(resultAscendant[i], outputAscendant[i]);
            assert.strictEqual(resultDescendant[i], outputDescendant[i]);
        }
    });
});

describe("AdvancedQuery", () => {
    let input = [
        {
            name: "Loris",
            age: 18,
        },
        {
            name: "Gonçalo",
            age: 19,
        },
        {
            name: "Aleh",
            age: 24,
        },
    ];


    it("Should have the right length", () => {
        let result = new query.AdvancedQuery().from("name")
                            .in(input)
                            .where(() => { return values.name.startsWith('L'); })
                            .select("name")
                            .get().length;

        assert.strictEqual(result, 1);
    });

    it("Should have the right output", () => {
        let result = new query.AdvancedQuery().from("name")
                            .in(input)
                            .where(() => { return values.name.startsWith('L'); })
                            .select("name")
                            .get();

        assert.strictEqual(result[0].name, "Loris");
        assert.strictEqual(result[1], undefined);
    });

    it("Should order correctly", () => {
        let result1 = new query.AdvancedQuery().from("age")
                            .in(input)
                            .where(() => { return values.age < 20; })
                            .select("name", "age")
                            .orderby("name")
                            .get();
        let result2 = new query.AdvancedQuery().from("age")
                            .in(input)
                            .where(() => { return values.age < 20; })
                            .select("name", "age")
                            .orderby("age")
                            .get();

        assert.ok(result2[0].age == 18);
        assert.ok(result2[1].age == 19);
        assert.ok(result1[0].name == "Gonçalo");
        assert.ok(result1[1].name == "Loris");
    });
});