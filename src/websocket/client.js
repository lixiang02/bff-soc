const WebSocket = require('ws')

async function main() {
    let arr = new Array(100).fill(1)
    let length = arr.length
    let finishedRequest=0;
    async function processNext(i) {
        console.log('i: ', i, 'f: ', finishedRequest)
        const item = arr.shift()
        if (item) {
            const client = new WebSocket('ws://localhost:4000')
            client.addEventListener('message', ((finishedRequest, e) => {
                console.log(`index: ${finishedRequest}, data: ${e.data}`)
            }).bind(this,finishedRequest ))
            client.on('open',() => {
                client.send(JSON.stringify({ 
                    type: 'addGroups', 
                    data: { 
                        key: "module", 
                        params: { 
                            aaa: 1
                        } 
                    } 
                }))
                client.send(JSON.stringify({ type: 'subscription' }))
            })
            client.on('error', (err) => {
                // console.log('==error===', err.message)
            })
            finishedRequest++;
            await processNext(i)
        }
    }
    for (let i = 0; i < 100; i++) {
        processNext(i).catch(err => console.error)
    }
}
main().catch(err => { console.log('---') })

process.on('uncaughtException', (e) => {
    console.error('uncaughtException', e)
})