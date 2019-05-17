const sum = (arg1, arg2) => {
    return arg1 + arg2;
}

test('Adds 3 + 2 to equeal 5 ', () => {
  expect(sum(3, 2)).toBe(5);
})
