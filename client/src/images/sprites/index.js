// import gif1 from './1.gif';
// import gif2 from './2.gif';

// const pokemonImages = {
//     1: gif1,
//     2: gif2,
// }


const importImages = (start, end) => {
    const images = {};
    for (let i = start; i <= end; i++) {
        const imageName = `${i}.gif`;
        const image = require(`./${imageName}`);
        images[i] = image;
    }
    return images;
};

const pokemonImages = importImages(1, 100);

export default pokemonImages;

