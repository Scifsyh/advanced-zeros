module.exports = function getZerosCount(number, base) {
  var count = 0, f = 1;
  var baseDivisors = [];
  var counts = [1];
  baseDivisors = factorization(base);
  for (var i = 0; i < baseDivisors.length; i++) {
    for (var j = 1; Math.pow(baseDivisors[i],j) <= number; j++) {
      count += Math.floor(number / Math.pow(baseDivisors[i],j));
    }
    if (counts[counts.length-1] == count) {
      f++;
      count = 0;
      if (i == baseDivisors.length-1) {
        counts[counts.length-1] = Math.floor(counts[counts.length-1] / f);
      }
    } else {
      counts[counts.length-1] = Math.floor(counts[counts.length-1] / f);
      f = 1;
      counts.push(count);
      count = 0;
    }
  }
  counts.shift();
  return findMin(counts);
}

function factorization (number) {
  var count = 0;
  var arr = [];
  for (var i = 2; i <= number; i++) {
    if (number % i == 0 && isItSimple(i)) {
      arr[count] = i;
      count++;
      number /= i;
      i--;
    }
  }
  return arr;
}

function isItSimple (number) {
  for (var i = 2; Math.pow(i, i) <= number; i++) {
    if (number % i == 0) {
      return false;
    }
  }
  return true;
}

function findMin (counts) {
  var min = counts[0];
  for (var i = 0; i < counts.length; i++) {
    if (min > counts[i]) {
      min = counts[i];
    }
  }
  return min;
}