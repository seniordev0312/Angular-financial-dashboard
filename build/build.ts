
process = require('node:process');
const fs = require('fs');
const path = require('path');
const { exec } = require("child_process");

const build = () => {
    try {
        const environment = process.argv[2];
        const src = path.resolve(__dirname, "..", "src", "assets", "config", `config.${environment}.json`);
        const dest = path.resolve(__dirname, "..", "src", "assets", "config", "config.json");
        fs.copyFile(src, dest, (err: any) => {
            if (err) {
                console.log('Error:', err);
            }
        });
        exec('npm run build');

    } catch (error: any) {
        console.log(error);
    }
}
build();