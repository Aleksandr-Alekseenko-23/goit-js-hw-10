export function getCountry(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(data => {
    console.log(data);
    if (!data.ok) {
      throw new Error(data.statusText);
    }

    return data.json();
  });
}
