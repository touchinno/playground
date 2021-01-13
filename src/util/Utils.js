
export function deepClone(src) {
  return JSON.parse(JSON.stringify(src));
}

export function toString(value) {
  return String(value);
}

export function validText(text) {
  let validRegex = /.+$/g;
  return validRegex.test(text);
}

export function validName(name) {
  let validRegex = /^[\w\s-+#*.]+$/g;
  return validRegex.test(name);
}

export function validArrayName(name) {
  let validRegex = /^[\w-+#*.]+(,[\w-+#*.]+)*$/g;
  return validRegex.test(name);
}

export function validRoles(roles) {
  let validRegex = /^[A-Z]+(,[A-Z]+)*$/g;
  return validRegex.test(roles);
}

export function validGlobPattern(name) {
  let validRegex = /^[\w\-:*]+$/g;
  return validRegex.test(name);
}

export function toNumber(num) {
  return Math.floor(Number(num));
}

export function validPositiveNumber(num, min = 0) {
  let n = toNumber(num);
  return (n !== Infinity && String(n) === num && n > min);
}

export function validNumber(num) {
  num = (num || '').replace(/^[0\s]+/, '');
  if (!num) return true;
  let n = toNumber(num);
  return (n !== Infinity && String(n) === num);
}

export function validJSON(text) {
  try {
    return [true, JSON.parse(text)];
  } catch(e) {
    return [false, '{}'];
  }
}

export function validURL(str) {
  let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    //'((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)[\\.]?)+[a-z]{2,}|'+ // domain name
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)[\\.]?)+|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+:]*)*'+ // port and path
    '(\\?[{};&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

export function removeLineBreak(name) {
  if (name) {
    name = name.replace(/\r?\n|\r/g, '');
  }
  return name;
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export let Base64 = {
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  encode : function (input) {
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }

    return output;
  },

  decode : function (input) {
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    input = input.replace(/[^A-Za-z0-9+/=]/g, "");

    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    return Base64._utf8_decode(output);
  },

  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    let utftext = "";

    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode : function (utftext) {
    let string = "";
    let i = 0;
    let c = 0, c2 = 0, c3 = 0;

    while ( i < utftext.length ) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }

    return string;
  }
}

console.debug = (function() {
  let debug = console.debug;
  return function() {
    if (localStorage.getItem('volutodebug') === 'true') {
      debug.apply(console, arguments);
    }
  }
})();
