/**
 * Convert an array of 3 bytes into and array of four 6-bits values
 * @param bytes
 * @returns {[]}
 */
function convertThreeBytesToFourNumber(bytes) {
  var first6BitsNumber = bytes[0] >> 2;

  var lastTwoBits = (bytes[0] & 0x03) << 4;
  var secondFourBits = (bytes[1] & 0xF0) >> 4;

  var second6BitsNumber = lastTwoBits + secondFourBits;

  var last4Bits2 = (bytes[1] & 0x0f) << 2;
  var first4Bits2 = (bytes[2] & 0xf0) >> 6;

  var third6BitsNumber = last4Bits2 + first4Bits2;
  var lastNumber = (bytes[2] & 0x3f);

  return [first6BitsNumber, second6BitsNumber, third6BitsNumber, lastNumber]
}

/**
 * Convert a standard ASCII string into a base64 string
 * @param str
 * @returns {string}
 */
function base64(str) {
  var bits = [];
  var numbers = [];

  for(var i = 0; i < str.length; i++){
    bits.push(str.charCodeAt(i));
    if(bits.length === 3) {
      numbers = numbers.concat(convertThreeBytesToFourNumber(bits));
      bits = [];
    }
  }

  if(bits.length) {
    // We add 0's if the amount of characters is not divisible by 3
    while(bits.length < 3) bits.push(0);
    numbers = numbers.concat(convertThreeBytesToFourNumber(bits));
  }

  var text = "";
  for(var i = 0; i < numbers.length; i++) {
    if(numbers[i] === 0) text += "=";
    else if(numbers[i] < 25) {
      text += String.fromCharCode(numbers[i] + 65);
    } else if(numbers[i] < 51) {
      text += String.fromCharCode(numbers[i] + 71);
    } else {
      text += String.fromCharCode(numbers[i] - 4);
    }
  }
  return text;
}

module.exports = base64;