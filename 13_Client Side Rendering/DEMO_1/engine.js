export function renderTemplate(templateAsString, data) {
    const pattern = /{{(.+?)}}/gm;

    return templateAsString.replace(pattern, (match, propName) => {
        console.log(templateAsString, data, match, propName);
        
        return data[propName];
        
    })

    // templateAsString.replace(pattern, (...params) => {
    //     console.log(params);
    // })

    // templateAsString.replace(pattern, (match, promName) => {
    //     console.log(match, promName, data[promName]);
    // })

    //console.log(templateAsString, data);




}