import { chat } from "./util"

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next()

            if (done) {
                controller.close()
            } else {
                controller.enqueue(value)
            }
        },
    })
}

function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

const encoder = new TextEncoder()

async function* makeIterator(requestJson: any) {
    yield encoder.encode(`你好, ${requestJson.title}! `)
    await sleep(300)
    yield encoder.encode(` 嘿嘿。 `)
    await sleep(300)
    yield encoder.encode(requestJson.text)
    await sleep(200)
    yield encoder.encode('!')
}


export async function POST(request: Request) {
    const requestJson = await request.json()
    console.log(requestJson);


    const iterator = makeIterator(requestJson)
    const stream = iteratorToStream(iterator)
    return new Response(stream)
}