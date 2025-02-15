window._just_Manifest = _just_buildManifest;

/* Example usage:


let buildManifestString = '';
const pathToCurrentSite = `${window.location.protocol}//${window.location.hostname}`
_just_Manifest.forEach((item) => {
    buildManifestString += `\n${pathToCurrentSite}/${item.path} - ${item.type} - ${item.size.string}`
})
console.log(`%c${buildManifestString}`, `color: #6e3bf3; background-color: #161616; padding-left: 5px; padding-right: 5px; border-radius: 5px;`);


*/