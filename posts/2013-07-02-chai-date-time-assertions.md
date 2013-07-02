# Chai Date and Time Assertions

We are using Konacha and Chai on a project and we needed to compare a
bunch of time values in our specs.

## Comparing dates and times in JavaScript

Date equality in JavaScript is not based on value.

```javascript
var t1 = new Date(2013, 4, 30, 16, 5)
var t2 = new Date(2013, 4, 30, 16, 5)

t1 == t2 // => false
t1 === t2 // => false
t1.getTime() === t2.getTime() // => true
```

## Example Specs (Before)

I was growing very tired of calling getTime() on my expected and
actual values. Here is what the specs were looking like before we
added custom assertions.

```javascript
describe('time equality', function() {
  it('returns true when they are the same time', function() {
    var actual = new Date(2013, 4, 30, 16, 5),
        expected = new Date(2013, 4, 30, 16, 5);

    actual.getTime().should.equal(expected.getTime());
  });

  it('returns false when they are not the same time', function() {
    var actual = new Date(2013, 4, 30, 16, 6),
        expected = new Date(2013, 4, 30, 16, 5);

    actual.getTime().should.not.equal(expected.getTime());
  });
});
```

Not only does this seem like a lot of repetition, it also provides
poor feedback when the assertion fails because we're comparing numeric
values instead of the times themselves.

```javascript
describe('failing time equality', function() {
  it('fails to have readable failure messages', function() {
    var actual = new Date(2013, 4, 30, 16, 6),
        expected = new Date(2013, 4, 30, 16, 5);

    actual.getTime().should.equal(expected.getTime());
  });
});
```

    AssertionError: expected 1369944360000 to equal 1369944300000

## Custom Chai Assertions

```javascript
chai.Assertion.addChainableMethod('equal_time', function(time) {
  var expected = time.getTime(),
      actual = this._obj.getTime();

  return this.assert(
    actual == expected,
    'expected ' + this._obj + ' to equal ' + time,
    'expected ' + this._obj + ' to not equal ' + time
  );
});

chai.Assertion.addChainableMethod('equal_date', function(date) {
  var expectedYear  = date.getUTCFullYear(),
      expectedMonth = date.getMonth(),
      expectedDay   = date.getUTCDate(),
      actualYear    = this._obj.getUTCFullYear(),
      actualMonth   = this._obj.getMonth(),
      actualDay     = this._obj.getUTCDate();

  function formatDate(year, month, day) {
    return [year, month, day].join("-");
  }

  return this.assert(
    expectedYear === actualYear && expectedMonth === actualMonth && expectedDay === actualDay,
    'expected ' + formatDate(actualYear, actualMonth, actualDay) + ' to equal' + formatDate(expectedYear, expectedMonth, expectedDay),
    'expected ' + formatDate(actualYear, actualMonth, actualDay) + ' to not equal' + formatDate(expectedYear, expectedMonth, expectedDay)
  );
});
```

## Example Specs (After)

Here are the specs from above with less getTime() noise and better failure messages.

### Passing with less getTime() noise

```javascript
describe('better time equality', function() {
  it('returns true when they are the same time', function() {
    var actual = new Date(2013, 4, 30, 16, 5),
        expected = new Date(2013, 4, 30, 16, 5);

    actual.should.equal_time(expected);
  });

  it('returns false when they are not the same time', function() {
    var actual = new Date(2013, 4, 30, 16, 6),
        expected = new Date(2013, 4, 30, 16, 5);

    actual.should.not.equal_time(expected);
  });
});
```

### Failing with Better Message

```javascript
describe('failing time equality', function() {
  it('fails to have readable failure messages', function() {
    var actual = new Date(2013, 4, 30, 16, 6),
        expected = new Date(2013, 4, 30, 16, 5);

    actual.should.equal_time(expected);
  });
});
```

    AssertionError: expected Thu May 30 2013 16:06:00 GMT-0400 (EDT) to equal Thu May 30 2013 16:05:00 GMT-0400 (EDT)

### Date Assertions

You can also compare dates regardless of their times.

```javascript
describe('date equality', function() {
  it('compares dates regardless of their associated times', function() {
    var actual = new Date(2013, 4, 30, 16, 6),
        expected = new Date(2013, 4, 30);

    actual.should.be.equal_date(expected);
  });
});
```
