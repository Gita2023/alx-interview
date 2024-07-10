#!/usr/bin/env node

const request = require('request');

if (process.argv.length !== 3) {
    console.error('Usage: ./0-starwars_characters.js <Movie ID>');
    process.exit(1);
}

const movieId = process.argv[2];
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

request(apiUrl, { json: true }, (err, res, body) => {
    if (err) {
        console.error(err);
        return;
    }

    if (res.statusCode !== 200) {
        console.error(`Failed to fetch movie with ID ${movieId}: ${res.statusCode}`);
        return;
    }

    const characters = body.characters;
    if (!characters) {
        console.error('No characters found for the given movie.');
        return;
    }

    characters.forEach(url => {
        request(url, { json: true }, (err, res, body) => {
            if (err) {
                console.error(err);
                return;
            }

            if (res.statusCode !== 200) {
                console.error(`Failed to fetch character: ${res.statusCode}`);
                return;
            }

            console.log(body.name);
        });
    });
});

