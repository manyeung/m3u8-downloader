const fs = require('fs')
const readline = require('readline')
const { exec } = require('child_process')

const file = 'sample/BigBuckBunny.m3u8'

const rl = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity
});

const urlReg = new RegExp('^https?://.*')

let timeout = 0
let index = 1

rl.on('line', line => {
    if (!urlReg.test(line)) {
        return
    }

    setTimeout(() => {
        console.log(`Downloading ${line}...`)
        exec(`curl ${line} > ${index++}.ts`)
    }, timeout)
    
    timeout += 1000
})