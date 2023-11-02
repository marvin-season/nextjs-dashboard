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
    yield encoder.encode(`<h1 class='font-bold'>One</h1>`)
    await sleep(1000)
    yield encoder.encode('<h2>Two</h2>')
    await sleep(1000)
    yield encoder.encode('<h3>Three</h3>')
  }
   
  export async function GET() {
    const iterator = makeIterator()
    const stream = iteratorToStream(iterator)
   
    return new Response(stream)
  }