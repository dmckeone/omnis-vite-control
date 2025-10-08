// Declare ctrl_omnis_vite_control_hooks on window as a generic interface to Omnis
declare global {
  interface Window {
    ctrl_omnis_vite_control_hooks: any
  }
}

export function initEmitter(control_id: any) {
  function emit(omnisEvent: { event: string; payload: string }) {
    const hooks = window.ctrl_omnis_vite_control_hooks.get(control_id)
    if (typeof hooks.emitEvent !== "undefined") {
      hooks.emitEvent(omnisEvent)
    }
  }

  /* EMIT EVENT

  Example code for how to emit a Control Event with jOmnis.

  Control events only have a single row, so it's considered best practice to come up with
  a standard key, like "eventName" below, to categorize the events dispatched to Omnis.  All
  other keys can then be used as arguments/data for that event.

 */
  function emitEvent(name: string, evt: object) {
    const omnisEvent = { event: name, payload: JSON.stringify(evt) }
    emit(omnisEvent)
  }

  return emitEvent
}

export function initHooks(
  control_id: any,
  onLoad: () => void,
  getData: () => {},
  setData: (data: object) => void
) {
  /* OMNIS ON LOAD

   Omnis calls this method when the component is first loaded
  */
  function omnisOnLoad() {
    onLoad()
  }

  /* OMNIS GET DATA

   Omnis has requested the data from this component.  It must be in an Omnis-row compatible
   format.

   DEV WARNING: All nested objects need to be formatted as JSON
  */
  function omnisGetData() {
    return getData()
  }

  /* OMNIS SET DATA

   Omnis is sending data to this component via a $redraw().  This method accepts the new
   data, formats it appropriately, and then redraws the current visual state.

   DEV WARNING: Any nested objects will come in as JSON, e.g. JSON.parse
  */
  function omnisSetData(newData: string) {
    try {
      if (newData != null) {
        let parsed = JSON.parse(newData)
        setData(parsed)
      } else {
        setData({})
      }
    } catch (e) {
      console.log("Receive data error", e)
    }
  }

  // Initialize Generic Callbacks Map
  if (typeof window.ctrl_omnis_vite_control_hooks == "undefined") {
    window.ctrl_omnis_vite_control_hooks = new Map()
  }

  const hooks = {
    onLoad: omnisOnLoad,
    getData: omnisGetData,
    setData: omnisSetData
  }

  window.ctrl_omnis_vite_control_hooks.set(control_id, hooks)
}
