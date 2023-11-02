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
   
  async function* makeIterator() {
    yield encoder.encode(`你`)
    await sleep(600)
    yield encoder.encode('好')
    await sleep(500)
    yield encoder.encode('啊')
    await sleep(200)
    yield encoder.encode('!')
  }
   
  export async function GET() {
    const iterator = makeIterator()
    const stream = iteratorToStream(iterator)
   
    return new Response(stream)
  }