/**
 * 
 * @param {*} tagName 
 * @param {*} content 
 * @returns 
 */
export  const createElementWithText = function(tagName, content) {
    const element = document.createElement(tagName)
    element.innerText = content
    return element
}