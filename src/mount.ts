// Shared imports
import "./shared"
import { initEmitter, initHooks } from "@/omnis.ts"

function render(elem: HTMLElement | null, data: any, emit: (name: string, evt: object) => void) {
  if (!elem) return

  // Remove all existing elements
  while (elem.lastElementChild) {
    elem.removeChild(elem.lastElementChild)
  }
  elem.innerText = ""

  // Render new elements
  let name = data["name"]
  if (!name) {
    name = "World"
  }

  let header = document.createElement("h1")
  header.innerHTML = `Hello ${name}!`
  elem.append(header)

  let button = document.createElement("button")
  button.innerText = "Click me!"
  button.onclick = () => {
    emit("user-event", { message: "Hello!" })
  }
  elem.append(button)
}

// App factory for binding to all elements that use the class "omnis-vite-control"
export function mountApp(id: any, elem: HTMLElement | null) {
  let data = {}

  const emit = initEmitter(id)

  initHooks(
    id,
    () => {},
    () => data,
    (newData: object) => {
      data = newData
      render(elem, newData, emit)
    }
  )

  render(elem, data, emit)
}
