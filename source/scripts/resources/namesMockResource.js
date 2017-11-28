import faker from 'faker';
import { map, range, filter } from 'lodash';

/**
 * List of all names 
 */
const ALL_NAMES = generateData();
function generateData(count = 10000) {
    return map(range(count), () => {
        return faker.name.findName();
    });
}

/**
 * Use this function to filter the results you want to return to the client.
 * Any edits to this file should only be made in the body of this function,
 * unless you have some really good reason to make other changes
 * @param  {String[]} input     user input
 * @return {String[]}           Filtered names
 */
function filterNames(input) {
  
  let filtered = [];

  for (let i in ALL_NAMES) {
    let name = ALL_NAMES[i];
    let lwrcase = name.toLowerCase();
    if (filtered.length >= 15) break;
    if (lwrcase.indexOf(input.toLowerCase()) >= 0) filtered.push(name);
  }

  return filtered;
}

/**
 * Mock server to return list of names
 * @param  {String}   input user input 
 * @param  {Function} cb    callback
 */
export function getNames(input, cb) {
    setTimeout(() => {
        cb(filterNames(input));
    }, 300);
};
