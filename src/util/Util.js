export default class Util {

  static pickRandomly(candidatesArr) {
    if (!candidatesArr || !Array.isArray(candidatesArr) || candidatesArr.length === 0) {
      throw new Error('Parameter must be a nonempty candiates array.');
    }

    if (candidatesArr.length === 1) {
      return candidatesArr[0];
    }

    return candidatesArr[Math.floor(Math.random() * candidatesArr.length)];
  }

    /*
   * For object: the key which is defined in the exclude array will also be deleted.
   * For array: the value which is put in the exclude array will also be deleted.
   */
  static cleanup(obj, exclude) {
    if (obj) {
      if (Array.isArray(obj)) {
        let i = obj.length - 1;
        while (i >= 0) {
          if (obj[i] === null
              || obj[i] === undefined
              || (typeof obj[i] === 'string' && obj[i].trim().length === 0)
              || (Array.isArray(obj[i]) && obj[i].length === 0)
              || (typeof obj[i] === 'object' && Object.keys(obj[i]).length === 0)
              || (Array.isArray(exclude) && exclude.indexOf(obj[i]) !== -1)) {
            obj.splice(i, 1);
          } else if (Array.isArray(obj[i]) || typeof obj[i] === 'object') {
            this.cleanup(obj[i]);
          } else if (typeof obj[i] === 'string') {
            obj[i] = obj[i].trim();
          }
          i--;
        }
      } else if (typeof obj === 'object') {
        const keys = Object.keys(obj);
        let i = keys.length - 1;
        while (i >= 0) {
          if (obj[keys[i]] === null
              || obj[keys[i]] === undefined
              || (typeof obj[keys[i]] === 'string' && obj[keys[i]].trim().length === 0)
              || (Array.isArray(obj[keys[i]]) && obj[keys[i]].length === 0)
              || (typeof obj[keys[i]] === 'object' && Object.keys(obj[keys[i]]).length === 0)
              || (Array.isArray(exclude) && exclude.indexOf(keys[i]) !== -1)) {
            delete obj[keys[i]];
          } else if (Array.isArray(obj[keys[i]]) || typeof obj[keys[i]] === 'object') {
            this.cleanup(obj[keys[i]]);
          } else if (typeof obj[keys[i]] === 'string') {
            obj[keys[i]] = obj[keys[i]].trim();
          }
          i--;
        }
      }
    }
  }
  
}


